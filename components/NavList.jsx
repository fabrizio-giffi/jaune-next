import React from "react";
import styles from "./Navbar.module.css";

function NavList({open}) {
  return (
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
  );
}

export default NavList;
