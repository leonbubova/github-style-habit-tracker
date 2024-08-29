"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import "../more-styles.css";

const MorePage: React.FC = () => {
  return (
    <div className="more-container">
      <h1 className="more-title">More About Me</h1>

      <section className="more-section">
        <h2>👨‍💻 About the Developer</h2>
        <p>
          Hi there! I&apos;m a passionate developer who loves creating useful and
          innovative applications. With a keen interest in web technologies and
          AI, I&apos;m always looking for ways to combine cutting-edge tech with
          practical solutions.
        </p>
      </section>

      <section className="more-section">
        <h2>🚀 Other Projects</h2>
        <ul className="project-list">
          <li>
            <a
              href="https://fix-my-data.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fix My Data
            </a>
            <p>An AI-powered data repair tool</p>
          </li>
          <li>
            <a
              href="https://leonbubova.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Personal Website
            </a>
            <p>Leon&apos;s portfolio and personal web presence</p>
          </li>
          <li>
            <a
              href="https://github.com/leonbubova/extension-reload"
              target="_blank"
              rel="noopener noreferrer"
            >
              Extension Reload
            </a>
            <p>A Chrome extension that reloads extensions on page refresh</p>
          </li>
        </ul>
      </section>

      <section className="more-section github-card">
        <h2>🐙 Find Me on GitHub</h2>
        <div className="github-profile">
          <Image
            src="/60527436.jpeg"
            alt="Developer Profile Picture"
            width={100}
            height={100}
            className="github-avatar"
          />
          <div className="github-info">
            <h3>Leon Bubova</h3>
            <p>@leonbubova</p>
            <Link
              href="https://github.com/leonbubova"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              View Profile
            </Link>
          </div>
        </div>
      </section>

      <Link href="/" className="back-link">
        Back to Habit HQ
      </Link>
    </div>
  );
};

export default MorePage;
