"use client";

import { useUIStore } from "../store/useUIStore";
import Wrapper from "../app/assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { NavLinks } from "./NavLinks";
import emmas from "../app/assets/images/emmas.svg";
import Link from "next/link";
import Image from "next/image";

export const SmallSidebar = () => {
  const { showDashboardSidebar, toggleSidebar } = useUIStore();
  return (
    <Wrapper>
      <div
        className={
          showDashboardSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn-a" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Link href="/">
              <Image src={emmas.src} alt="Emmasdale" width={150} height={50} className="emmas" />
            </Link>
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};
