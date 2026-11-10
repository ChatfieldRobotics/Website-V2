import React from "react";
import { Link } from "react-router-dom";
import "../Main.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Outlined Container styled like the "About Us" box */}
        <div className="footer-panel">
          {/* Top Divider / Title */}
          <div className="footer-head">
            <div className="footer-rule"></div>
            <h2 className="footer-title">
              <span>CHATFIELD</span>
              <span className="footer-accent">ROBOTICS</span>
            </h2>
            <div className="footer-rule"></div>
          </div>

          <div className="footer-columns">
            {/* Links Section */}
            <div className="footer-col">
              <p className="footer-heading">Links</p>
              <ul className="footer-list">
                <li>
                  <a
                    className="footer-link"
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
                    className="footer-link"
                  >
                    Team Email
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    href="https://www.youtube.com/channel/UCED_kHEcKOkJt5EZ1jsIoRw"
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <Link to="/upload" className="footer-link">
                    Upload Images
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mentors Section */}
            <div className="footer-col">
              <p className="footer-heading">Mentors</p>
              <ul className="footer-list">
                <li>
                  <a className="footer-link">Bill Kendal</a>
                </li>
                <li>
                  <a className="footer-link">Don Baker</a>
                </li>
                <li>
                  <a className="footer-link">Daniel Brunson</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copy">CHATFIELD ROBOTICS</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
