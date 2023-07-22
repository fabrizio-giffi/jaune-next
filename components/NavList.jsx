import React from "react";
import styles from "./Navbar.module.css";

function NavList({open}) {
  return (
    <ul className={open ? styles.menuOpen : styles.menuClosed}>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/art">Art</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
    </ul>
  );
}

export default NavList;
