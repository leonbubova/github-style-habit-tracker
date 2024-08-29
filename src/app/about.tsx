"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Habit Tracker</h1>

      <section className="about-section">
        <h2>How to Use</h2>
        <ol>
          <li>Create a new habit by clicking the "Add Habit" button.</li>
          <li>
            Click on the squares in the contribution graph to log your progress.
          </li>
          <li>Different colors represent different durations of activity.</li>
          <li>Edit the habit name by clicking on it.</li>
          <li>Delete a habit using the trash can icon.</li>
        </ol>
      </section>

      <section className="about-section">
        <h2>Created with AI Assistance</h2>
        <p>
          This app was created in less than 3 hours with the help of advanced AI
          tools:
        </p>
        <div className="ai-tools">
          <div className="ai-tool">
            <Image
              src="/cursor-ai-logo.png"
              alt="Cursor AI Logo"
              width={50}
              height={50}
            />
            <Link
              href="https://cursor.sh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cursor.ai
            </Link>
          </div>
          <div className="ai-tool">
            <Image
              src="/claude-logo.png"
              alt="Claude AI Logo"
              width={50}
              height={50}
            />
            <Link
              href="https://www.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude 3.5 Sonnet
            </Link>
          </div>
        </div>
      </section>

      <Link href="/" className="back-link">
        Back to Tracker
      </Link>

      <style jsx>{`
        .about-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif;
          color: #24292e;
        }
        .about-title {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 24px;
          border-bottom: 1px solid #e1e4e8;
          padding-bottom: 16px;
        }
        .about-section {
          margin-bottom: 32px;
        }
        h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        ol {
          padding-left: 24px;
        }
        li {
          margin-bottom: 8px;
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
        .back-link {
          display: inline-block;
          margin-top: 24px;
          padding: 8px 16px;
          background-color: #0366d6;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: background-color 0.2s ease;
        }
        .back-link:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
