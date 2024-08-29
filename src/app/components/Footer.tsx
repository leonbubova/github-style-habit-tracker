"use client";
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/leonbubova"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          @leonbubova
        </Link>
      </p>
      <p>
        with the help of{" "}
        <Link
          href="https://www.anthropic.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          claude
        </Link>{" "}
        and{" "}
        <Link
          href="https://cursor.sh"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          cursor.ai
        </Link>
      </p>

      <style jsx>{`
        .footer {
          width: 100%;
          padding: 20px;
          background-color: white;
          text-align: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif;
          font-size: 14px;
          color: #586069;
        }
        .footer p {
          margin: 0;
          line-height: 1.5;
        }
        .footer-link {
          color: #0366d6;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #2188ff;
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          .footer {
            font-size: 12px;
            padding: 15px 10px;
          }
          .footer p {
            margin-bottom: 5px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
