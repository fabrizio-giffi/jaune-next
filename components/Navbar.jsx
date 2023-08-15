"use client";

import React from "react";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { quattrocento } from "@/app/layout.jsx";
import NavList from "./NavList";
import { useMediaPredicate } from "react-media-hook";
import Link from "next/link";

function Navbar() {
  const [open, setOpen] = useState(false);

  const mobile = useMediaPredicate("(max-width: 639px)");

  const toggleBurger = () => {
    setOpen(!open);
  };

  return (
    <nav className="h-16 flex justify-between items-center bg-amber-200">
      {/* <div>
        <Image src="/logo.png" alt="Mona en Jaune" width={200} height={100} />
      </div> */}
      <Link href="/">
        <h3 className={["m-10 font-normal", quattrocento.className].join(" ")}>Mona en Jaune</h3>
      </Link>
      {mobile && (
        <div>
          <MenuIcon className={styles.hamburger} onClick={toggleBurger} />
          <NavList open={open} />
        </div>
      )}

      {!mobile && (
        <div className="m-10">
          <ul className="flex gap-6">
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
        </div>
      )}
    </nav>
  );
}

export default Navbar;
