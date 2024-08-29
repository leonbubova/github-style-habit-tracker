"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">
        About Habit Tracker: Your Pixel-Perfect Progress Pal
      </h1>

      <section className="about-section">
        <h2>🚀 How to Rocket-Boost Your Habits</h2>
        <ol>
          <li>
            Spawn a new habit by smashing that &quot;Add Habit&quot; button.
          </li>
          <li>
            Paint your progress with the magical color buttons below the graph.
          </li>
          <li>
            Marvel at the rainbow of productivity - each color is a different
            duration!
          </li>
          <li>Feeling creative? Rename your habit with a simple click.</li>
          <li>
            Made a mistake? Banish unwanted habits with the mighty &quot;x&quot;
            of doom.
          </li>
          <li>
            Save all your progress by logging in with your Google Account.
            Everything is saved automatically!
          </li>
        </ol>
      </section>

      <section className="about-section">
        <h2>🤖 Crafted by Humans (with AI Superpowers)</h2>
        <p>
          This app materialized in less than 3 hours, thanks to our AI
          sidekicks:
        </p>
        <div className="ai-tools">
          <div className="ai-tool">
            <Image
              src="https://cursor.sh/favicon.ico"
              alt="Cursor AI Logo"
              width={50}
              height={50}
              unoptimized
            />
            <Link
              href="https://cursor.sh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cursor.ai
            </Link>
            <span className="tool-description">The code whisperer</span>
          </div>
          <div className="ai-tool">
            <Image
              src="https://www.anthropic.com/favicon.ico"
              alt="Claude AI Logo"
              width={50}
              height={50}
              unoptimized
            />
            <Link
              href="https://www.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude 3.5 Sonnet
            </Link>
            <span className="tool-description">Our witty wordsmith</span>
          </div>
        </div>
      </section>

      <Link href="/" className="back-link">
        🏠 Back to Habit HQ
      </Link>

      <style jsx>{`
        .about-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 20px 40px; // Increased top padding
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif;
        }
        .about-title {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 24px;
          color: #24292e;
        }
        .about-section {
          margin-bottom: 32px;
          background-color: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #2ea44f;
        }
        ol {
          padding-left: 24px;
        }
        li {
          margin-bottom: 12px;
          line-height: 1.5;
        }
        .ai-tools {
          display: flex;
          justify-content: start;
          gap: 32px;
          margin-top: 16px;
        }
        .ai-tool {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background-color: #f1f8ff;
          padding: 16px;
          border-radius: 8px;
          transition: transform 0.2s ease;
        }
        .ai-tool:hover {
          transform: translateY(-5px);
        }
        .ai-tool a {
          margin-top: 8px;
          color: #0366d6;
          text-decoration: none;
          font-weight: 600;
        }
        .ai-tool a:hover {
          text-decoration: underline;
        }
        .tool-description {
          font-size: 14px;
          color: #586069;
          margin-top: 4px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          margin-top: 24px;
          padding: 12px 24px;
          background: linear-gradient(45deg, #2ea44f, #34d058);
          color: white;
          text-decoration: none;
          border-radius: 30px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(46, 164, 79, 0.2);
        }
        .back-link:hover {
          background: linear-gradient(45deg, #34d058, #2ea44f);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 8px rgba(46, 164, 79, 0.3);
        }
        .back-link::before {
          content: "🏠";
          margin-right: 8px;
          transition: transform 0.3s ease;
        }
        .back-link:hover::before {
          transform: rotate(20deg);
        }
        .back-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: white;
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: right;
        }
        .back-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
