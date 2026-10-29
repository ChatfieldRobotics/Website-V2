import "@splidejs/react-splide/css";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  backOut,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import SponsorScroller from "../components/sponsorSlider";

/* =========================
   CONFIG
========================= */

const TOPBAR_HEIGHT_FALLBACK = 120;

// Lower damping = more rebound (~25 = none)
const SMOOTH = { stiffness: 300, damping: 14, mass: 0.5, restDelta: 0.0005 };

// Slide-ins overshoot slightly before settling
const LAND = { ease: backOut };

// A box growing into the detail popup (and back)
const CARD_SPRING = { type: "spring", stiffness: 260, damping: 22, mass: 0.7 };

// How much bigger the sponsor scroller is drawn
const SPONSOR_SCALE = 1.25;

const ABOUT_TEXT =
  "Chatfield Robotics was founded in 2018 to participate in the FIRST Tech Challenge (FTC), and now competes in FIRST Robotics Competition (FRC) as Team 9068 The Chargers. The team is student-run and operates out of Chatfield Senior High School, striving to prepare students for excellence in STEM through the development of industry-level skills in engineering, programming, marketing, and leadership fields. Chatfield Robotics also seeks to inspire a passion for STEM in the community via numerous community outreach programs, including cooperation with local organizations and STEM summer camps for middle school students.";

// `details` is placeholder copy: replace it with the team's real descriptions
const INFO_ROWS = [
  {
    title: "Engineering",
    text: "Students design, build, and test our competition robot, picking up industry-level skills in mechanical and electrical engineering along the way.",
    details: [
      "The engineering subteam takes the robot from first sketch to competition. Members learn CAD, design reviews, machining, assembly, and wiring, then test and improve the robot between matches.",
      "No experience is required. New members are paired with returning students who teach the tools and shop safety.",
    ],
    art: "robot",
    image: null,
  },
  {
    title: "Programming",
    text: "Our programmers write the code that drives the robot, from autonomous routines to driver controls and vision.",
    details: [
      "The programming subteam writes the software that makes the robot move: driver controls, autonomous routines, and sensor and vision systems.",
      "Students practice teamwork habits used in industry, like version control and code review, and test their code before it ever reaches the robot.",
    ],
    image: null,
  },
  {
    title: "Marketing & Leadership",
    text: "The team is student-run, so students also handle outreach, sponsorship, branding, and the leadership that keeps the season moving.",
    details: [
      "This subteam runs the business side of the team: sponsorship outreach, social media, branding, the team website, and event planning.",
      "Because the team is student-run, members also build leadership skills by organizing projects, managing deadlines, and representing the team to the community.",
    ],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHj0r68jZH4eo3fYSF4w2kuacrnLWu69OP644HsnhNkw&s=10,",
  },
  {
    title: "Community Outreach",
    text: "We work with local organizations and run STEM summer camps for middle school students to share our passion for STEM.",
    details: [
      "Outreach connects the team with its community through demonstrations, partnerships with local organizations, and STEM summer camps for middle school students.",
      "Camps and events give younger students a hands-on first look at robotics, and give our members a chance to teach what they have learned.",
    ],
    image: null,
  },
];

/* =========================
   ROBOT

   A square FRC robot seen from a corner, parallel to the ground: rounded
   bumper base, clear box frame, two intake rollers. Real 3D points are
   projected each frame, and scroll turns the robot a little.
========================= */

const DEG = Math.PI / 180;
const CAM = { height: 1.7, dist: 8 };

const PARTS = {
  frame: { half: 0.82, r: 0.26, y0: 0.15, y1: 1.25 },
  bumper: { half: 1, r: 0.34, y0: 0.15, y1: 0.46 },
};

const ROLLERS = [
  [
    [-0.5, 0.74, -0.62],
    [0.5, 0.74, -0.62],
  ],
  [
    [0.62, 1, -0.5],
    [0.62, 1, 0.5],
  ],
];

function ring(half, r, n = 12) {
  const c = half - r;
  const out = [];
  for (const [cx, cz, a0] of [
    [c, c, 0],
    [-c, c, 90],
    [-c, -c, 180],
    [c, -c, 270],
  ]) {
    for (let i = 0; i <= n; i++) {
      const a = (a0 + (90 * i) / n) * DEG;
      out.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]);
    }
  }
  return out;
}

function project([x, y, z], yaw) {
  const a = yaw * DEG;
  const zc = -x * Math.sin(a) + z * Math.cos(a) + CAM.dist;
  return [(x * Math.cos(a) + z * Math.sin(a)) / zc, (CAM.height - y) / zc];
}

function hull(points) {
  const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const p of pts) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    )
      lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    )
      upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

function rawScene(yaw) {
  const out = {};
  for (const [name, part] of Object.entries(PARTS)) {
    const plan = ring(part.half, part.r);
    const bottom = plan.map(([x, z]) => project([x, part.y0, z], yaw));
    const top = plan.map(([x, z]) => project([x, part.y1, z], yaw));
    const c = part.half - part.r;
    const cx = c + part.r * Math.cos(315 * DEG);
    const cz = -c + part.r * Math.sin(315 * DEG);
    out[name] = {
      hull: hull(bottom.concat(top)),
      top,
      corner: [
        project([cx, part.y0, cz], yaw),
        project([cx, part.y1, cz], yaw),
      ],
    };
  }
  out.rollers = ROLLERS.map(([a, b]) => [project(a, yaw), project(b, yaw)]);
  return out;
}

// Scale and center once (at the straight-on corner view) so rotating never rescales
const FIT = (() => {
  const base = rawScene(45);
  const pts = [...base.frame.hull, ...base.bumper.hull];
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const s = Math.min(300 / (maxX - minX), 200 / (maxY - minY));
  return {
    s,
    ox: 200 - ((minX + maxX) / 2) * s,
    oy: 150 - ((minY + maxY) / 2) * s,
  };
})();

function toPath(points, close) {
  const d = points
    .map(
      ([x, y], i) =>
        `${i ? "L" : "M"}${(x * FIT.s + FIT.ox).toFixed(1)} ${(y * FIT.s + FIT.oy).toFixed(1)}`,
    )
    .join(" ");
  return close ? `${d} Z` : d;
}

function buildScene(yaw) {
  const raw = rawScene(yaw);
  const part = (p) => ({
    hull: toPath(p.hull, true),
    top: toPath(p.top, true),
    corner: toPath(p.corner, false),
  });
  return {
    frame: part(raw.frame),
    bumper: part(raw.bumper),
    rollers: raw.rollers.map((r) => toPath(r, false)),
  };
}

function RobotArt({ progress, live }) {
  const on = (style) => (live ? style : undefined);

  const scene = useTransform(progress, (v) =>
    buildScene(live ? 45 + (v - 0.5) * 40 : 45),
  );
  const frameHull = useTransform(scene, (s) => s.frame.hull);
  const frameTop = useTransform(scene, (s) => s.frame.top);
  const frameCorner = useTransform(scene, (s) => s.frame.corner);
  const bumperHull = useTransform(scene, (s) => s.bumper.hull);
  const bumperTop = useTransform(scene, (s) => s.bumper.top);
  const bumperCorner = useTransform(scene, (s) => s.bumper.corner);
  const rollerA = useTransform(scene, (s) => s.rollers[0]);
  const rollerB = useTransform(scene, (s) => s.rollers[1]);

  const frameDraw = useTransform(progress, [0.06, 0.34], [0, 1]);
  const frameFill = useTransform(progress, [0.2, 0.4], [0, 0.16]);
  const rollerDraw = useTransform(progress, [0.3, 0.5], [0, 1]);
  const rollerShow = useTransform(progress, [0.3, 0.33], [0, 1]);
  const bumperDraw = useTransform(progress, [0.16, 0.42], [0, 1]);
  const bumperFill = useTransform(progress, [0.36, 0.52], [0, 1]);

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <g fill="none" stroke="#D9A441" strokeLinejoin="round">
        <motion.path
          d={frameHull}
          fill="#C62828"
          fillOpacity={0.16}
          strokeWidth="3"
          style={on({ pathLength: frameDraw, fillOpacity: frameFill })}
        />
        <motion.path
          d={frameTop}
          strokeWidth="2"
          strokeOpacity=".7"
          style={on({ pathLength: frameDraw })}
        />
        <motion.path
          d={frameCorner}
          strokeWidth="2"
          strokeOpacity=".7"
          style={on({ pathLength: frameDraw })}
        />

        {[rollerA, rollerB].map((d, i) => (
          <motion.g key={i} style={on({ opacity: rollerShow })}>
            <motion.path
              d={d}
              strokeWidth="13"
              strokeLinecap="round"
              style={on({ pathLength: rollerDraw })}
            />
            <motion.path
              d={d}
              stroke="#C62828"
              strokeWidth="7"
              strokeLinecap="round"
              style={on({ pathLength: rollerDraw })}
            />
          </motion.g>
        ))}

        <motion.path
          d={bumperHull}
          fill="#C62828"
          fillOpacity={1}
          strokeWidth="3"
          style={on({ pathLength: bumperDraw, fillOpacity: bumperFill })}
        />
        <motion.path
          d={bumperTop}
          strokeWidth="2"
          strokeOpacity=".7"
          style={on({ pathLength: bumperDraw })}
        />
        <motion.path
          d={bumperCorner}
          strokeWidth="2"
          strokeOpacity=".7"
          style={on({ pathLength: bumperDraw })}
        />
      </g>
    </svg>
  );
}

/* =========================
   GEARS
========================= */

function gearPath(teeth, rOuter, rRoot, rHole) {
  const step = (Math.PI * 2) / teeth;
  const pt = (r, a) =>
    `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;

  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += `${i === 0 ? "M" : "L"} ${pt(rRoot, a)} `;
    d += `L ${pt(rOuter, a + step * 0.15)} `;
    d += `L ${pt(rOuter, a + step * 0.45)} `;
    d += `L ${pt(rRoot, a + step * 0.6)} `;
  }
  d += "Z ";
  d += `M ${rHole} 0 A ${rHole} ${rHole} 0 1 0 ${-rHole} 0 `;
  d += `A ${rHole} ${rHole} 0 1 0 ${rHole} 0 Z`;
  return d;
}

const BIG_GEAR = gearPath(16, 98, 84, 22);
const SMALL_GEAR = gearPath(8, 51.5, 37.5, 12);

function GearArt({ big, small, live }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      aria-hidden="true"
    >
      <g transform="translate(150 195)">
        <g transform="rotate(3.25)">
          <motion.g
            style={
              live
                ? {
                    rotate: big,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }
                : undefined
            }
          >
            <path d={BIG_GEAR} fill="#C62828" fillRule="evenodd" />
          </motion.g>
        </g>
      </g>

      <g transform="translate(264.7 114.7)">
        <g transform="rotate(19)">
          <motion.g
            style={
              live
                ? {
                    rotate: small,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }
                : undefined
            }
          >
            <path d={SMALL_GEAR} fill="#D9A441" fillRule="evenodd" />
          </motion.g>
        </g>
      </g>
    </svg>
  );
}

/* =========================
   INFO ROW
========================= */

function InfoRow({ index, title, text, image, art, onOpen }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const live = !reduceMotion;

  // Odd rows put the box on the right and the text on the left
  const flip = index % 2 === 1;
  const dir = flip ? -1 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, SMOOTH);

  const boxX = useTransform(p, [0, 0.35], [-90 * dir, 0], LAND);
  const boxClip = useTransform(
    p,
    [0, 0.35],
    [
      flip
        ? "inset(0% 0% 0% 100% round 1rem)"
        : "inset(0% 100% 0% 0% round 1rem)",
      "inset(0% 0% 0% 0% round 1rem)",
    ],
  );

  const titleX = useTransform(p, [0.05, 0.38], [110 * dir, 0], LAND);
  const titleOpacity = useTransform(p, [0.05, 0.3], [0, 1]);
  const barScale = useTransform(p, [0.25, 0.45], [0, 1]);
  const bodyX = useTransform(p, [0.1, 0.42], [110 * dir, 0], LAND);
  const bodyOpacity = useTransform(p, [0.1, 0.35], [0, 1]);

  const bigAngle = useTransform(p, [0, 1], [-120 * dir, 120 * dir]);
  const smallAngle = useTransform(p, [0, 1], [240 * dir, -240 * dir]);

  const imgY = useTransform(p, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${index}`}
      transition={CARD_SPRING}
      style={{ borderRadius: 24 }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`relative flex flex-col ${
        flip ? "md:flex-row-reverse" : "md:flex-row"
      } md:items-center gap-6 md:gap-10 bg-[#20242A] hover:bg-[#262B33] transition-colors cursor-pointer p-5 md:p-8 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9A441]`}
    >
      <motion.div
        style={live ? { x: boxX, clipPath: boxClip } : undefined}
        className="w-full md:w-2/5 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden bg-[#8E1717] border border-[#C62828] will-change-transform"
      >
        {art === "robot" ? (
          <RobotArt progress={p} live={live} />
        ) : image ? (
          <motion.img
            src={image}
            alt={title}
            style={live ? { y: imgY, scale: 1.2 } : undefined}
            className="w-full h-full object-cover"
          />
        ) : (
          <GearArt big={bigAngle} small={smallAngle} live={live} />
        )}
      </motion.div>

      <div className="flex-1">
        <motion.h2
          style={live ? { x: titleX, opacity: titleOpacity } : undefined}
          className="text-2xl md:text-3xl font-semibold text-[#D9A441] mb-3"
        >
          {title}
        </motion.h2>
        <motion.div
          style={live ? { scaleX: barScale, originX: 0 } : undefined}
          className="h-1 w-16 rounded-full bg-[#C62828] mb-4"
        />
        <motion.p
          style={live ? { x: bodyX, opacity: bodyOpacity } : undefined}
          className="text-[#F5F5F5]/85 leading-relaxed"
        >
          {text}
        </motion.p>
        <span className="mt-4 inline-block text-sm font-semibold text-[#D9A441]">
          Learn more →
        </span>
      </div>
    </motion.div>
  );
}

/* =========================
   DETAIL MODAL
========================= */

function DetailModal({ index, row, onClose }) {
  const dialogRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const spring = reduceMotion ? { duration: 0 } : CARD_SPRING;

  useEffect(() => {
    const previous = document.activeElement;
    dialogRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-[#10151D]/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        ref={dialogRef}
        layoutId={`card-${index}`}
        transition={spring}
        style={{ borderRadius: 24 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`detail-title-${index}`}
        tabIndex={-1}
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto overscroll-contain bg-[#20242A] border border-[#8E1717] shadow-2xl outline-none p-6 md:p-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: reduceMotion ? 0 : 0.18, duration: 0.2 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.08 } }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 h-10 w-10 rounded-full border border-[#8E1717] text-[#F5F5F5] hover:bg-[#C62828]/20 hover:border-[#C62828] transition-colors"
          >
            ✕
          </button>

          <h2
            id={`detail-title-${index}`}
            className="text-3xl md:text-4xl font-semibold text-[#D9A441] mb-3 pr-12"
          >
            {row.title}
          </h2>
          <div className="h-1 w-16 rounded-full bg-[#C62828] mb-6" />

          <p className="text-xl leading-relaxed text-[#F5F5F5] mb-5">
            {row.text}
          </p>
          {row.details.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[#F5F5F5]/80 leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* =========================
   ABOUT US WORD REVEAL
========================= */

function RevealText({ text }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return text;

  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 + i * 0.015, duration: 0.4, ease: "easeOut" }}
      >
        {word}
      </motion.span>{" "}
    </Fragment>
  ));
}

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <div className="min-h-screen bg-[#10151D] text-[#F5F5F5]">
      <style>{`
        html, body, #root { scrollbar-width: none; -ms-overflow-style: none; }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar,
        #root::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>

      <main className="flex flex-col">
        <div style={{ height: TOPBAR_HEIGHT_FALLBACK }} />

        <section className="flex items-center justify-center px-4">
          <div className="bg-[#20242A] border-l-4 border-[#C62828] w-4/5 max-w-6xl rounded-lg p-6">
            <h2 className="w-full text-center text-[#D9A441] text-2xl underline mb-4">
              About Us
            </h2>
            <p className="text-justify text-[#F5F5F5] font-light">
              <RevealText text={ABOUT_TEXT} />
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-6 w-4/5 max-w-6xl mx-auto px-0 py-8">
          {INFO_ROWS.map((row, i) => (
            <InfoRow
              key={row.title}
              index={i}
              {...row}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </section>

        <section className="w-4/5 max-w-6xl mx-auto pb-12">
          <div className="bg-[#20242A] rounded-3xl p-6 md:p-8 overflow-hidden">
            <h2 className="w-full text-center text-[#D9A441] text-2xl md:text-3xl underline mb-2">
              Proudly Supported By:
            </h2>
            <div
              className="py-8"
              style={{ transform: `scale(${SPONSOR_SCALE})` }}
            >
              <SponsorScroller />
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {openIndex !== null && (
          <DetailModal
            key={openIndex}
            index={openIndex}
            row={INFO_ROWS[openIndex]}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
