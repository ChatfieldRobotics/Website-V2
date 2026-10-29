import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#10151D] text-[#F5F5F5] py-12 w-full font-['Rajdhani',_sans-serif]">
      {/* Outlined Container styled like the "About Us" box */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border border-[#8E1717] rounded-3xl p-8 md:p-10 relative shadow-[0_0_15px_rgba(142,23,23,0.15)] bg-[#20242A]/50">
          {/* Top Divider / Title */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <div className="h-[2px] w-12 bg-[#C62828] rounded-full hidden sm:block"></div>
            <h2 className="text-2xl font-bold tracking-widest text-center flex gap-2">
              <span className="text-[#F5F5F5]">CHATFIELD</span>
              <span className="text-[#C62828]">ROBOTICS</span>
            </h2>
            <div className="h-[2px] w-12 bg-[#C62828] rounded-full hidden sm:block"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-center md:justify-around space-y-8 md:space-y-0">
            {/* Links Section */}
            <div className="flex flex-col text-center md:text-left">
              <p className="font-bold text-[#C62828] mb-3 text-xl tracking-wider uppercase">
                Links
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-[#F5F5F5] hover:text-[#D9A441] transition-colors duration-200 text-lg"
                    href="https://www.instagram.com/chatfieldrobotics/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:chatfieldrobotics@gmail.com"
                    className="text-[#F5F5F5] hover:text-[#D9A441] transition-colors duration-200 text-lg"
                  >
                    Team Email
                  </a>
                </li>
                <li>
                  <a
                    className="text-[#F5F5F5] hover:text-[#D9A441] transition-colors duration-200 text-lg"
                    href="https://www.youtube.com/channel/UCED_kHEcKOkJt5EZ1jsIoRw"
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <Link
                    to="/upload"
                    className="text-[#F5F5F5] hover:text-[#D9A441] transition-colors duration-200 text-lg"
                  >
                    Upload Images
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mentors Section */}
            <div className="flex flex-col text-center md:text-left">
              <p className="font-bold text-[#C62828] mb-3 text-xl tracking-wider uppercase">
                Mentors
              </p>
              <ul className="space-y-2">
                <li>
                  <a className="text-[#F5F5F5] hover:text-[#D9A441] transition-colors duration-200 text-lg">
                    Bill Kendal
                  </a>
                </li>
                <li>
                  <a className="text-[#F5F5F5] hover:text-[#D9A441] transition-colors duration-200 text-lg">
                    Don Baker
                  </a>
                </li>
                <li>
                  <a className="text-[#F5F5F5] hover:text-[#D9A441] transition-colors duration-200 text-lg">
                    Daniel Brunson
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-[#F5F5F5]/60 text-sm tracking-widest font-medium">
            CHATFIELD ROBOTICS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
