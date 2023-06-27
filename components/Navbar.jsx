"use client";

import React from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { quattrocento } from "@/app/layout";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleBurger = () => {
    setOpen(!open);
  };

  return (
    <nav className={styles.navbar}>
      {/* <div>
        <Image src="/logo.png" alt="Mona en Jaune" width={200} height={100} />
      </div> */}
      <h3 className={[styles.navLogo, quattrocento.className].join(" ")}>Mona en Jaune</h3>
      <div>
        <MenuIcon className={styles.hamburger} onClick={toggleBurger} />
        <ul className={open ? styles.menuOpen : styles.menuClosed}>
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
    </nav>
  );
}

export default Navbar;
