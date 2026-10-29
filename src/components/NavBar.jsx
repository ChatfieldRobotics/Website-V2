// src/components/NavBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

const PILL =
  "border border-[#8E1717] bg-transparent hover:bg-[#C62828]/10 hover:border-[#C62828] text-[#F5F5F5] px-3 sm:px-5 py-1 rounded-full uppercase tracking-wider transition-all duration-300 text-xs sm:text-sm font-semibold";

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

const ITEM_LINK =
  "block px-4 py-2 text-[#F5F5F5] hover:bg-[#8E1717] transition-colors font-medium text-center";

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
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-[#10151D] bg-opacity-95 border-b border-[#8E1717] shadow-[0_4px_15px_rgba(0,0,0,0.5)] z-50 font-['Rajdhani',_sans-serif] pb-3 pt-2 sm:pt-4"
      aria-label="Main navigation"
    >
      {/* Top Tier: Title */}
      <div className="max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6 mb-3 sm:mb-4">
        <Link
          to="/"
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide transform transition duration-200 flex gap-2"
          aria-current="page"
        >
          <span className="text-[#F5F5F5]">CHATFIELD</span>
          <span className="text-[#C62828]">ROBOTICS</span>
        </Link>
      </div>

      {/* Bottom Tier: Navigation Links */}
      <MotionConfig reducedMotion="user">
        <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 px-2">
          <a
            href="https://calendar.google.com/calendar/u/0/embed?color=%23800020&color=%23c0c0c0&src=8ddebaee3e9e7b072ea36083c54675d03e54b2029075ff497f444ff3318a793e@group.calendar.google.com&src=chatfieldrobotics@gmail.com"
            target="_blank"
            rel="noreferrer"
            className={PILL}
          >
            Calendar
          </a>

          {/* Programs Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("programs")}
              className={PILL}
              aria-expanded={programsOpen}
              aria-haspopup="true"
            >
              Programs{" "}
              <motion.span
                animate={{ rotate: programsOpen ? 180 : 0 }}
                transition={SPRING}
                className="inline-block text-[#C62828] ml-1"
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
                  className="absolute left-1/2 mt-3 z-10 min-w-[12rem] drop-shadow-xl"
                >
                  <motion.div
                    variants={WIPE}
                    className="bg-[#20242A] border border-[#8E1717] rounded-xl overflow-hidden"
                  >
                    <motion.div variants={ITEM}>
                      <Link
                        to="https://book.stripe.com/4gM3cvg1yf2B1PZ9nJ3cc01"
                        className={ITEM_LINK}
                      >
                        Summer Camp
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={ITEM}
                      className="border-t border-[#8E1717]/30"
                    >
                      <a
                        href="https://scout.bergsmaservers.win"
                        className={ITEM_LINK}
                      >
                        Scouting
                      </a>
                    </motion.div>
                    <motion.div
                      variants={ITEM}
                      className="border-t border-[#8E1717]/30"
                    >
                      <a href="fundraisers.html" className={ITEM_LINK}>
                        Fundraisers
                      </a>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/SponsorUs" className={PILL}>
            Sponsor Us
          </Link>

          {/* Donate: filled so it reads as the main action */}
          <a
            href="https://buy.stripe.com/14AdR95mUbQp9ir1Vh3cc00"
            className="border border-[#8E1717] bg-[#8E1717] hover:bg-[#C62828] hover:border-[#C62828] text-[#F5F5F5] px-3 sm:px-5 py-1 rounded-full uppercase tracking-wider transition-all duration-300 text-xs sm:text-sm font-semibold shadow-md"
          >
            Donate
          </a>
        </nav>
      </MotionConfig>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        header { animation: fadeInDown 0.45s ease-out 0s both; }
      `}</style>
    </header>
  );
}
