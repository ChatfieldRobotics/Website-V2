import { useEffect, useRef, useState } from "react";

export default function ScrollSequence({
  children,
  navHeight = 80,
  animationDistance = 1400,
  className = "",
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const items = Array.isArray(children) ? children : [children];

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      /*
       * The sequence starts when its top reaches the
       * bottom of the viewport.
       */
      const distanceScrolled = window.innerHeight - rect.top;

      /*
       * Every card gets one full animationDistance
       * worth of scrolling.
       */
      const sequenceProgress = distanceScrolled / animationDistance;

      setProgress(Math.max(0, Math.min(items.length, sequenceProgress)));

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", update);

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [animationDistance, items.length]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        height: `${items.length * animationDistance}px`,
      }}
    >
      <div
        className="sticky overflow-hidden"
        style={{
          top: `${navHeight}px`,
          height: `calc(100vh - ${navHeight}px)`,
        }}
      >
        {items.map((child, index) => {
          const p = progress - index;

          /*
           * Each card has a large scroll-controlled
           * entrance and exit.
           *
           * -1 = far below
           *  0 = resting position
           *  1 = leaving
           */
          let y = 120;
          let opacity = 0;

          /*
           * FLY IN
           *
           * Starts well below the screen and slowly
           * moves into position.
           */
          if (p >= -0.45 && p < 0) {
            const t = (p + 0.45) / 0.45;

            // Smoothstep
            const eased = t * t * (3 - 2 * t);

            y = 120 - eased * 120;
            opacity = eased;
          } else if (p >= 0 && p < 0.55) {

          /*
           * REST
           */
            y = 0;
            opacity = 1;
          } else if (p >= 0.55 && p < 1.35) {

          /*
           * FLY OUT
           *
           * The card slowly travels upward instead
           * of simply disappearing.
           */
            const t = (p - 0.55) / 0.8;

            const eased = t * t * (3 - 2 * t);

            y = -eased * 120;
            opacity = 1 - eased;
          } else if (p >= 1.35) {

          /*
           * Completely gone.
           */
            y = -120;
            opacity = 0;
          }

          return (
            <div
              key={index}
              className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8"
              style={{
                transform: `translate3d(0, ${y}vh, 0)`,
                opacity,
                zIndex: items.length - index,
                willChange: "transform, opacity",
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
