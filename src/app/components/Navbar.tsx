"use client";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Habit Tracker</div>
      <div className="navbar-links">
        <a href="#about">About</a>
        <a href="#more">More</a>
      </div>

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
          box-shadow: none; // Remove the shadow
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
          gap: 1.5rem; // Increase gap between links
        }
        .navbar-links a {
          color: #24292e;
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 0.5rem 0; // Remove horizontal padding
          border: none; // Remove border
          border-radius: 0; // Remove border-radius
          font-weight: 500;
        }
        .navbar-links a:hover {
          color: #40c463;
          background-color: transparent; // Remove background color on hover
          border-bottom: 2px solid #40c463; // Add underline effect on hover
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
