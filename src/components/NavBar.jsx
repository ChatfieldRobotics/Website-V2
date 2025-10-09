// src/components/NavBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Close dropdowns when clicking outside the navbar
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

  // Smooth scroll with offset (so section starts 4–5 lines below top)
  const scrollToMember = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // adjust for navbar height / desired spacing
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Navigate to /members then scroll with offset
  const goToMember = (id) => {
    setOpenDropdown(null);

    if (location.pathname === "/members") {
      // Already on page — just scroll
      scrollToMember(id);
    } else {
      // Go to /members first, then scroll after navigation
      navigate(`/members`);
      setTimeout(() => {
        scrollToMember(id);
      }, 300);
    }
  };

  // Alphabetically sorted members (first name)
  const members = [
    { name: "Andrew", id: "andrew-albright" },
    { name: "Andy", id: "andy-he" },
    { name: "Anna", id: "annabelle-tanaka" },
    { name: "Azariah", id: "azariah-adams-pacheco" },
    { name: "Bill", id: "bill-kendall" },
    { name: "Daniel B", id: "daniel-brunson" },
    { name: "Evan", id: "evan-pacic" },
    { name: "Henry", id: "henry-wagner" },
    { name: "Jamie", id: "jamie-head" },
    { name: "Katie", id: "katie-stanley" },
    { name: "Keegan", id: "keegan-oneil" },
    { name: "Liam", id: "liam-martin" },
    { name: "Quinn", id: "quinn-johnson" },
    { name: "Tyler", id: "tyler-bergsma" },
  ];

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-[#264653] bg-opacity-95 rounded-b-md px-4 py-3 shadow-md z-50"
      aria-label="Main navigation"
    >
      {/* Top bar: Left/Center/Right */}
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        {/* Left: Donate */}
        <div className="absolute left-0 px-4">
          <Link to="/donate">
            <button
              type="button"
              className="border-2 px-3 sm:px-4 md:px-6 py-2 rounded-md bg-[#E9C46A] hover:bg-[#F4A261] text-black font-semibold transition transform hover:scale-105 text-sm md:text-base"
            >
              Donate
            </button>
          </Link>
        </div>

        {/* Center: Title */}
        <div className="text-center">
          <Link
            to="/"
            className="text-[#E9C46A] text-2xl md:text-4xl font-bold hover:underline transform transition duration-200"
            aria-current="page"
          >
            Chatfield Robotics
          </Link>
        </div>
      </div>

      {/* Navigation buttons */}
      <nav className="mt-3 md:mt-4 flex justify-center space-x-3 md:space-x-4">
        {/* Calendar */}
        <a
          href="https://calendar.google.com/calendar/u/0/embed?color=%23800020&color=%23c0c0c0&src=8ddebaee3e9e7b072ea36083c54675d03e54b2029075ff497f444ff3318a793e@group.calendar.google.com&src=chatfieldrobotics@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <button className="bg-[#8B1E3F] hover:bg-[#F4A261] px-3 py-2 rounded-md text-white transition transform hover:scale-105 text-sm md:text-base">
            Calendar
          </button>
        </a>

        {/* Media Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("media")}
            className="bg-[#8B1E3F] hover:bg-[#F4A261] px-3 py-2 rounded-md text-white transition transform hover:scale-105 text-sm md:text-base"
            aria-expanded={openDropdown === "media"}
            aria-haspopup="true"
          >
            Media ▾
          </button>
          {openDropdown === "media" && (
            <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg z-10 min-w-[10rem]">
              <a href="/seasonImages/2025.html" className="block px-4 py-2 hover:bg-gray-100">
                2025
              </a>
              <a href="/seasonImages/2024.html" className="block px-4 py-2 hover:bg-gray-100">
                2024
              </a>
            </div>
          )}
        </div>

        {/* Programs Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("programs")}
            className="bg-[#8B1E3F] hover:bg-[#F4A261] px-3 py-2 rounded-md text-white transition transform hover:scale-105 text-sm md:text-base"
            aria-expanded={openDropdown === "programs"}
            aria-haspopup="true"
          >
            Programs ▾
          </button>
          {openDropdown === "programs" && (
            <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg z-10 min-w-[10rem]">
              <a href="signupForm.html" className="block px-4 py-2 hover:bg-gray-100">
                Summer Camp
              </a>
              <a href="scouting.html" className="block px-4 py-2 hover:bg-gray-100">
                Scouting
              </a>
              <a href="fundraisers.html" className="block px-4 py-2 hover:bg-gray-100">
                Fundraisers
              </a>
            </div>
          )}
        </div>

        {/* Members Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("members")}
            className="bg-[#8B1E3F] hover:bg-[#F4A261] px-3 py-2 rounded-md text-white transition transform hover:scale-105 text-sm md:text-base"
            aria-expanded={openDropdown === "members"}
            aria-haspopup="true"
          >
            Members ▾
          </button>
          {openDropdown === "members" && (
            <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg z-10 min-w-[12rem]">
              <Link
                to="/members"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpenDropdown(null)}
              >
                View All
              </Link>
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => goToMember(member.id)}
                  className="block text-left w-full px-4 py-2 hover:bg-gray-100"
                >
                  {member.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

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
