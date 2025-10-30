import React from "react";

function Footer() {
  return (
    <footer className="bg-[#264653] text-white py-6 w-full rounded-t-md shadow-md">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-[#E9C46A] font-semibold text-lg">
            2025 Chatfield Robotics
          </p>
        </div>

        {/* Footer Columns */}
        <div className="flex flex-col md:flex-row justify-center md:justify-around max-w-3xl mx-auto space-y-6 md:space-y-0">
          {/* Links Section */}
          <div className="flex flex-col text-center md:text-left">
            <p className="underline font-bold text-[#E9C46A] mb-2">Links</p>
            <ul>
              <li>
                <a
                  className="text-[#F4A261] hover:text-[#E9C46A] transition"
                  href="https://www.instagram.com/chatfieldrobotics/"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:chatfieldrobotics@gmail.com"
                  className="text-[#F4A261] hover:text-[#E9C46A] transition"
                >
                  Team Email
                </a>
              </li>
              <li>
                <a
                  className="text-[#F4A261] hover:text-[#E9C46A] transition"
                  href="https://www.youtube.com/channel/UCED_kHEcKOkJt5EZ1jsIoRw"
                  target="_blank"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Mentors Section */}
          <div className="flex flex-col text-center md:text-left">
            <p className="underline font-bold text-[#E9C46A] mb-2">Mentors</p>
            <ul>
              <li>
                <a className="text-[#F4A261] hover:text-[#E9C46A] transition" href="#">
                  Bill Kendal
                </a>
              </li>
              <li>
                <a className="text-[#F4A261] hover:text-[#E9C46A] transition" href="#">
                  Don Baker
                </a>
              </li>
              <li>
                <a className="text-[#F4A261] hover:text-[#E9C46A] transition" href="#">
                  Daniel Brunson
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
