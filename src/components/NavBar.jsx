// src/components/NavBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import logo from "../assets/logos/Resonance.png";
import "../Main.css";

// Same spring as the homepage rows: stiff, slightly under-damped
const SPRING = { type: "spring", stiffness: 300, damping: 14, mass: 0.5 };

const CLOSED = "inset(0% 0% 100% 0% round 0.75rem)";
const OPEN = "inset(0% 0% 0% 0% round 0.75rem)";

const DROPDOWN = {
  hidden: { y: -12 },
  show: { y: 0, transition: SPRING },
  exit: { y: -12, transition: { duration: 0.18, ease: "easeIn" } },
};

const WIPE = {
  hidden: { clipPath: CLOSED },
  show: {
    clipPath: OPEN,
    transition: { ...SPRING, staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: { clipPath: CLOSED, transition: { duration: 0.18, ease: "easeIn" } },
};

const ITEM = {
  hidden: { x: 40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: SPRING },
};

const CSS = `
header.site-header {
  padding-left: clamp(1rem, 4vw, 2.5rem);
  padding-right: clamp(1rem, 4vw, 2.5rem);
}

.site-header .nav-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  column-gap: clamp(1rem, 3vw, 2.5rem);
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
}

.site-header .nav-row .nav-brand {
  display: flex;
  justify-content: center;
  width: auto;
  margin: 0;
  padding: 0;
}

.site-header .nav-row .nav-side {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
}

.site-header .nav-row .nav-side--left {
  justify-content: flex-end;
}

.site-header .nav-row .nav-side--right {
  justify-content: flex-start;
}

.site-header .nav-pill {
  padding: 0.6rem 1.1rem;
  border-radius: 0.5rem;
  line-height: 1.2;
  white-space: nowrap;
}

.site-header .nav-menu-link {
  white-space: nowrap;
}

@media (max-width: 820px) {
  .site-header .nav-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem 0.75rem;
  }

  .site-header .nav-row .nav-side {
    display: contents;
  }

  .site-header .nav-row .nav-brand {
    flex-basis: 100%;
    order: -1;
  }
}
`;

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Close dropdowns clicking outside the navbar
  useEffect(() => {
    const handleDocClick = (e) => {
      const el = navRef.current;
      if (!el) return;
      if (!el.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  const programsOpen = openDropdown === "programs";

  return (
    <>
      <style>{CSS}</style>

      <header ref={navRef} className="site-header" aria-label="Main navigation">
        <MotionConfig reducedMotion="user">
          <nav className="nav-row">
            <div className="nav-side nav-side--left">
              {/* Programs Dropdown */}
              <div className="nav-dropdown">
                <button
                  type="button"
                  onClick={() => toggleDropdown("programs")}
                  className="nav-pill"
                  aria-expanded={programsOpen}
                  aria-haspopup="true"
                >
                  Programs{" "}
                  <motion.span
                    animate={{ rotate: programsOpen ? 180 : 0 }}
                    transition={SPRING}
                    className="nav-caret"
                  >
                    ▾
                  </motion.span>
                </button>

                <AnimatePresence>
                  {programsOpen && (
                    <motion.div
                      variants={DROPDOWN}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      style={{ x: "-50%" }}
                      className="nav-menu"
                    >
                      <motion.div variants={WIPE} className="nav-menu-panel">
                        <motion.div variants={ITEM} className="nav-menu-item">
                          <Link
                            to="https://book.stripe.com/4gM3cvg1yf2B1PZ9nJ3cc01"
                            className="nav-menu-link"
                          >
                            Summer Camp
                          </Link>
                        </motion.div>
                        <motion.div variants={ITEM} className="nav-menu-item">
                          <a
                            href="https://scout.bergsmaservers.win"
                            className="nav-menu-link"
                          >
                            Scouting
                          </a>
                        </motion.div>
                        <motion.div variants={ITEM} className="nav-menu-item">
                          <a href="fundraisers.html" className="nav-menu-link">
                            Fundraisers
                          </a>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/SponsorUs" className="nav-pill">
                Sponsor Us
              </Link>
            </div>

            <div className="nav-brand">
              <Link to="/" className="nav-brand-link">
                <img src={logo} alt="Chatfield Robotics" className="nav-logo" />
              </Link>
            </div>

            <div className="nav-side nav-side--right">
              {/* Donate: filled so it reads as the main action */}
              <a
                href="https://buy.stripe.com/14AdR95mUbQp9ir1Vh3cc00"
                className="nav-pill nav-pill--filled"
              >
                Donate
              </a>
            </div>
          </nav>
        </MotionConfig>
      </header>
    </>
  );
}
