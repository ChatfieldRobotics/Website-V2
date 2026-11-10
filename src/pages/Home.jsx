import "@splidejs/react-splide/css";
import "../Main.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import SponsorScroller from "../components/sponsorSlider";

const TOPBAR_HEIGHT_FALLBACK = 120;

// Cancels any space the layout leaves above the page so the hero starts at the very top.
const PULL_UP_TO_TOP = true;

// Swap these for your own photos (a path in /public or an imported file).
// Set one to null to turn that backdrop off.
const HERO_BG = "/images/backgrounds/field.webp";
const ABOUT_BG = "/images/about-bg.jpg";
const LOGO = "/images/logos/resonance-number.webp";

const ABOUT_TEXT =
  "Chatfield Robotics was founded in 2018 to participate in the FIRST Tech Challenge (FTC), and now competes in FIRST Robotics Competition (FRC) as Team 9068 The Chargers. The team is student-run and operates out of Chatfield Senior High School, striving to prepare students for excellence in STEM through the development of industry-level skills in engineering, programming, marketing, and leadership fields. Chatfield Robotics also seeks to inspire a passion for STEM in the community via numerous community outreach programs, including cooperation with local organizations and STEM summer camps for middle school students.";

const STATS = [
  { value: 50, suffix: "+", label: "Members educated" },
  { value: 2, suffix: "×", label: "World Championship attendee" },
  { value: 1, suffix: "×", label: "Tournament winner, and counting" },
  { value: 7, suffix: "×", label: "Tournament competitor" },
];

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=swap");

.hm {
  --black: #080808;
  --red: #B5121B;
  --deep: #6E0B12;
  --silver: #BFC3C7;
  --white: #F5F5F5;
  --line: rgba(191, 195, 199, 0.16);
  --display: "Barlow Condensed", "Arial Narrow", Impact, sans-serif;
  --gutter: clamp(1.25rem, 6vw, 6rem);
  background: var(--black);
  color: var(--white);
  overflow-x: clip;
}

.hm-par {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  scroll-margin-top: 100px;
}

.hm-par-bg,
.hm-par-dim {
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
}

.hm-par-bg {
  top: -20%;
  bottom: -20%;
  background-color: var(--black);
  background-image: var(--img);
  background-size: cover;
  background-position: center;
  will-change: transform;
}

.hm-par-dim {
  top: 0;
  bottom: 0;
  background: rgba(8, 8, 8, var(--dim));
}

.hm-bar {
  width: 7rem;
  height: 6px;
  background: var(--red);
  border-radius: 3px;
}

.hm-hero {
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding: calc(var(--topbar) + 2rem) var(--gutter) clamp(5rem, 16vh, 9rem);
  background: var(--black);
}

.hm-hero::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  height: clamp(9rem, 28vh, 16rem);
  background: linear-gradient(
    to bottom,
    rgba(8, 8, 8, 0) 0%,
    rgba(8, 8, 8, 0.35) 40%,
    rgba(8, 8, 8, 0.8) 75%,
    #080808 100%
  );
  pointer-events: none;
}

.hm-hero-inner {
  max-width: 72rem;
}

.hm-kicker {
  margin: 0 0 1rem;
  font-size: clamp(1rem, 1.6vw, 1.25rem);
  color: var(--silver);
}

.hm-title {
  margin: 0;
}

.hm-logo {
  display: block;
  width: auto;
  max-width: 100%;
  height: clamp(8rem, 26vh, 15rem);
  object-fit: contain;
  object-position: left center;
}

.hm-hero .hm-bar {
  margin: clamp(1.25rem, 3vh, 2rem) 0;
}

.hm-tagline {
  margin: 0;
  max-width: 34rem;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  line-height: 1.5;
}

.hm-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}

.hm-btn {
  display: inline-block;
  padding: 0.85rem 1.6rem;
  border: 2px solid var(--red);
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}

.hm-btn--solid {
  background: var(--red);
  color: var(--white);
}

.hm-btn--solid:hover {
  background: var(--deep);
  border-color: var(--deep);
}

.hm-btn--line {
  border-color: var(--silver);
  color: var(--white);
}

.hm-btn--line:hover {
  border-color: var(--white);
  background: rgba(245, 245, 245, 0.1);
}

.hm-btn:focus-visible {
  outline: 2px solid var(--white);
  outline-offset: 3px;
}

.hm-stats {
  border-bottom: 1px solid var(--line);
}

.hm-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 76rem;
  margin: 0 auto;
}

.hm-stat {
  padding: clamp(1.75rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
  border-left: 1px solid var(--line);
}

.hm-stat:first-child {
  border-left: 0;
}

.hm-stat-num {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(2.75rem, 6vw, 4.75rem);
  line-height: 1;
}

.hm-stat-label {
  margin-top: 0.5rem;
  color: var(--silver);
  line-height: 1.35;
}

.hm-about {
  padding: clamp(5rem, 14vw, 10rem) 0;
}

.hm-about-inner {
  max-width: 76rem;
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.hm-h2 {
  margin: 0;
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(2.75rem, 8vw, 6rem);
  line-height: 0.95;
  text-transform: uppercase;
}

.hm-about .hm-bar {
  margin: 1.5rem 0 2rem;
}

.hm-about-text {
  margin: 0;
  max-width: 62ch;
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
  line-height: 1.7;
}

.hm-sponsors {
  padding: clamp(3rem, 8vw, 6rem) var(--gutter);
  scroll-margin-top: 100px;
}

@media (max-width: 720px) {
  .hm-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hm-stat:nth-child(odd) {
    border-left: 0;
  }
  .hm-stat:nth-child(n + 3) {
    border-top: 1px solid var(--line);
  }
}
`;

function ParallaxSection({
  id,
  image,
  className = "",
  shift = 12,
  dim = 0.55,
  children,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`]);

  return (
    <section ref={ref} id={id} className={`hm-par ${className}`}>
      {image && (
        <>
          <motion.div
            aria-hidden="true"
            className="hm-par-bg"
            style={{ "--img": `url("${image}")`, y: reduceMotion ? 0 : y }}
          />
          <div
            aria-hidden="true"
            className="hm-par-dim"
            style={{ "--dim": dim }}
          />
        </>
      )}
      {children}
    </section>
  );
}

function Rise({ delay = 0, className, children }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref}>
      {reduceMotion ? value : n}
      {suffix}
    </span>
  );
}

export default function Home() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!PULL_UP_TO_TOP || !el) return;
    const fit = () => {
      el.style.marginTop = "0px";
      const top = el.getBoundingClientRect().top + window.scrollY;
      el.style.marginTop = `${-Math.max(0, top)}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      el.style.marginTop = "";
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="hm"
      style={{ "--topbar": `${TOPBAR_HEIGHT_FALLBACK}px` }}
    >
      <style>{CSS}</style>

      <ParallaxSection className="hm-hero" image={HERO_BG} dim={0.5}>
        <div className="hm-hero-inner">
          <Rise delay={0.1}>
            <h1 className="hm-title">
              <img className="hm-logo" src={LOGO} alt="Chatfield Robotics" />
            </h1>
          </Rise>
          <Rise delay={0.2}>
            <div className="hm-bar" />
          </Rise>
          <Rise delay={0.3}>
            <p className="hm-tagline">
              A student-run FIRST Robotics Competition team from Chatfield
              Senior High School.
            </p>
          </Rise>
          <Rise delay={0.4} className="hm-actions">
            <a className="hm-btn hm-btn--solid" href="#about">
              About us
            </a>
            <a className="hm-btn hm-btn--line" href="#sponsors">
              Our sponsors
            </a>
          </Rise>
        </div>
      </ParallaxSection>

      <section className="hm-stats">
        <div className="hm-stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="hm-stat">
              <div className="hm-stat-num">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="hm-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <ParallaxSection
        id="about"
        className="hm-about"
        image={ABOUT_BG}
        dim={0.72}
      >
        <div className="hm-about-inner">
          <h2 className="hm-h2">About Us</h2>
          <div className="hm-bar" />
          <p className="hm-about-text">{ABOUT_TEXT}</p>
        </div>
      </ParallaxSection>

      <section id="sponsors" className="hm-sponsors">
        <div className="home-sponsors-card">
          <h2 className="home-sponsors-title">Proudly Supported By:</h2>
          <div className="home-sponsors-scale">
            <SponsorScroller />
          </div>
        </div>
      </section>
    </div>
  );
}
