"use client";
import React from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import BurgerMenu from "./BurgerMenu";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const links = [
    { href: "/about", text: "About" },
    { href: "/more", text: "More" }, // Updated this line
    {
      href: "#",
      text: user ? "Logout" : "Login",
      onClick: user ? handleLogout : handleLogin,
    },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarTitle}>
        <Link href="/">Habit Tracker</Link>
      </div>
      <div className={styles.navbarLinks}>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            onClick={(e) => {
              if (link.onClick) {
                e.preventDefault();
                link.onClick();
              }
            }}
            className={styles.navbarLink}
          >
            {link.text}
          </Link>
        ))}
      </div>
      <BurgerMenu links={links} />
    </nav>
  );
};

export default Navbar;
