"use client";

import React from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { quattrocento } from "@/app/layout";
import NavList from "./NavList";
import { useMediaPredicate } from "react-media-hook";

function Navbar() {
  const [open, setOpen] = useState(false);

  const mobile = useMediaPredicate("(max-width: 639px)");

  const toggleBurger = () => {
    setOpen(!open);
  };

  return (
    <nav className={styles.navbar}>
      {/* <div>
        <Image src="/logo.png" alt="Mona en Jaune" width={200} height={100} />
      </div> */}
      <h3 className={[styles.navLogo, quattrocento.className].join(" ")}>Mona en Jaune</h3>
      {mobile && (
        <div>
          <MenuIcon className={styles.hamburger} onClick={toggleBurger} />
          <NavList open={open} />
        </div>
      )}

      {!mobile && (
        <div>
          {console.log("not mobile anymore")}
          <ul className="flex">
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Art</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
