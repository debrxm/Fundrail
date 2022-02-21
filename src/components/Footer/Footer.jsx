import React from "react";
import { NavLink } from "react-router-dom";
import { useWindowDimensions } from "../../utils/helper";
// import logo from "../../assets/icons/logo-icon.svg";

import "./styles.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  const { width } = useWindowDimensions();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="about">
          <div className="footer-logo-container">
            <NavLink to="/" className="logo-wrap">
              {/* <img src={logo} alt="" className="logo-icon" /> */}
              <h1 className="logo-text">Fundrail</h1>
            </NavLink>
          </div>
          <div className="contact">
            <div className="address">
              <h4>.</h4>
              <span>Terms of Use | Privacy Policy</span>
            </div>
            <div className="number">
              <span>Get in touch</span>
              <h4>+234-811-767-1213</h4>
            </div>
            <div className="social-media">
              <a href="https://facebook.com/" rel="noreferrer" target="_blank">
                <img
                  src={require("../../assets/icons/facebook.svg").default}
                  alt="facebook icon"
                  className="icon"
                />
              </a>
              <a href="https://twitter.com/" rel="noreferrer" target="_blank">
                <img
                  src={require("../../assets/icons/twitter.svg").default}
                  alt="twitter icon"
                  className="icon"
                />
              </a>
              <a href="https://instagram.com/" rel="noreferrer" target="_blank">
                <img
                  src={require("../../assets/icons/instagram.svg").default}
                  alt="twitter icon"
                  className="icon"
                />
              </a>
              <a href="https://linkedin.com/" rel="noreferrer" target="_blank">
                <img
                  src={require("../../assets/icons/linkedin-logo.svg").default}
                  alt="linkedin icon"
                  className="icon"
                />
              </a>
              <a href="https://youtube.com/" rel="noreferrer" target="_blank">
                <img
                  src={require("../../assets/icons/youtube.svg").default}
                  alt="youtube icon"
                  className="icon"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="menu">
          <h2 className="heading">Quick Links</h2>
          <div className="menu-links">
            <NavLink to="/events" className="menu-link">
              Events
            </NavLink>
          </div>
        </div>
        <div className="menu">
          <h2 className="heading">Socials</h2>
          <div className="menu-links">
            <a
              href="https://facebook.com/"
              rel="noreferrer"
              target="_blank"
              className="menu-link"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/"
              rel="noreferrer"
              target="_blank"
              className="menu-link"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/"
              rel="noreferrer"
              target="_blank"
              className="menu-link"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/"
              rel="noreferrer"
              target="_blank"
              className="menu-link"
            >
              Linkedin
            </a>
            <a
              href="https://www.youtube.com/"
              rel="noreferrer"
              target="_blank"
              className="menu-link"
            >
              Youtube
            </a>
          </div>
        </div>
      </div>
      <br />
      <p className="copyright">&copy; Fundrail {year} | Made with love ❤</p>
    </footer>
  );
};

export default Footer;
