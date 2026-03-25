"use client";

import logo from "../../../app/assets/images/LOGO.png";
import { FaBars, FaTimes } from "react-icons/fa";
import Wrapper from "../../../app/assets/wrappers/NewSidebar";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export const NewSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [color, setColor] = useState(false);
  
  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor(true);
      } else {
        setColor(false);
      }
    };
    window.addEventListener("scroll", changeColor);
    return () => window.removeEventListener("scroll", changeColor);
  }, []);

  return (
    <Wrapper>
      <nav className={color ? "app__navbar header-bg" : "app__navbar"}>
        <Link href="/" className="app__navbar-logo">
          <Image src={logo} alt="Emmasdale SDA Church Logo" className="emmas" style={{ width: 'auto', height: 'auto' }} />
        </Link>
        <ul className="app__navbar-links">
          <Link className="app__flex p-text li" href="/">
            <div />
            Home
          </Link>
          <Link className="app__flex p-text li" href="/new">
            <div />I am new
          </Link>
          <Link className="app__flex p-text li" href="/about">
            <div />
            who are we
          </Link>
          <Link className="app__flex p-text li" href="/ministries">
            <div />
            Ministries
          </Link>
          <Link className="app__flex p-text li" href="/media">
            <div />
            Media
          </Link>
          <Link className="app__flex p-text li" href="/contact">
            <div />
            Contact
          </Link>
          <Link className="app__flex p-text li" href="/resources">
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
                <Link className="app__flex p-text li" href="/">
                  Home
                </Link>
                <Link className="app__flex p-text li" href="/new">
                  I am new
                </Link>
                <Link className="app__flex p-text li" href="/about">
                  who are we
                </Link>
                <Link className="app__flex p-text li" href="/ministries">
                  Ministries
                </Link>
                <Link className="app__flex p-text li" href="/media">
                  Media
                </Link>
                <Link className="app__flex p-text li" href="/contact">
                  Contact
                </Link>
                <Link className="app__flex p-text li" href="/resources">
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
