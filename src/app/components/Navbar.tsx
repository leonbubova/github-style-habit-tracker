"use client";
import React from "react";
import BurgerMenu from "./BurgerMenu";

const Navbar: React.FC = () => {
  const links = [
    { href: "#about", text: "About" },
    { href: "#more", text: "More" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-title">Habit Tracker</div>
      <div className="navbar-links">
        {links.map((link, index) => (
          <a key={index} href={link.href}>
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
