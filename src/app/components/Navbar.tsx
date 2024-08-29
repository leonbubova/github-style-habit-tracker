"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import BurgerMenu from "./BurgerMenu";

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
    { href: "#about", text: "About" },
    { href: "#more", text: "More" },
    {
      href: "#",
      text: user ? "Logout" : "Login",
      onClick: user ? handleLogout : handleLogin,
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-title">Habit Tracker</div>
      <div className="navbar-links">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={(e) => {
              if (link.onClick) {
                e.preventDefault();
                link.onClick();
              }
            }}
          >
            {link.text}
          </a>
        ))}
      </div>
      <BurgerMenu links={links} />

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #ffffff;
          color: #24292e;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          font-family: "Arial", sans-serif;
        }
        .navbar-title {
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(45deg, #40c463, #216e39);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .navbar-links {
          display: flex;
          gap: 1.5rem;
        }
        .navbar-links a {
          color: #24292e;
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 0.5rem 0;
          border: none;
          border-radius: 0;
          font-weight: 500;
          cursor: pointer;
        }
        .navbar-links a:hover {
          color: #40c463;
          background-color: transparent;
          border-bottom: 2px solid #40c463;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
