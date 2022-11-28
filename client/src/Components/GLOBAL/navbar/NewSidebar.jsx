import logo from "../../../assets/images/LOGO.png";
import { FaBars, FaTimes } from "react-icons/fa";
import Wrapper from "../../../assets/wrappers/NewSidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";

export const NewSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);
  return (
    <Wrapper>
      <nav className={color ? "app__navbar header-bg" : "app__navbar"}>
        <Link to="/" className="app__navbar-logo">
          <img src={logo} alt="" className="emmas" />
        </Link>
        <ul className="app__navbar-links">
          <Link className="app__flex p-text li" to="/">
            <div />
            Home
          </Link>
          <Link className="app__flex p-text li" to="/new">
            <div />I am new
          </Link>
          <Link className="app__flex p-text li" to="/about">
            <div />
            who are we
          </Link>
          <Link className="app__flex p-text li" to="/ministries">
            <div />
            Ministries
          </Link>
          <Link className="app__flex p-text li" to="/media">
            <div />
            Media
          </Link>
          <Link className="app__flex p-text li" to="/contact">
            <div />
            Contact
          </Link>
          <Link className="app__flex p-text li" to="/resources">
            <div />
            Resources
          </Link>
        </ul>

        <div className="app__navbar-menu">
          <FaBars onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <FaTimes onClick={() => setToggle(false)} />
              <ul>
                <Link className="app__flex p-text li" to="/">
                  Home
                </Link>
                <Link className="app__flex p-text li" to="/new">
                  I am new
                </Link>
                <Link className="app__flex p-text li" to="/about">
                  who are we
                </Link>
                <Link className="app__flex p-text li" to="/ministries">
                  Ministries
                </Link>
                <Link className="app__flex p-text li" to="/media">
                  Media
                </Link>
                <Link className="app__flex p-text li" to="/contact">
                  Contact
                </Link>
                <Link className="app__flex p-text li" to="/resources">
                  Resources
                </Link>
              </ul>
            </motion.div>
          )}
        </div>
      </nav>
    </Wrapper>
  );
};
