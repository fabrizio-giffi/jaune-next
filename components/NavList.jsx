import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

function NavList({open}) {
  return (
    <ul className={open ? styles.menuOpen : styles.menuClosed}>
      <li>
        <Link href="#">About</Link>
      </li>
      <li>
        <Link href="/art">Art</Link>
      </li>
      <li>
        <Link href="#">Contact</Link>
      </li>
    </ul>
  );
}

export default NavList;
