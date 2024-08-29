"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/styles/globals.css" as="style" />
      </head>
      <body>
        <div className={`root-container ${isLoading ? "loading" : ""}`}>
          {isLoading ? (
            <div className="initial-loading">Loading...</div>
          ) : (
            <>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </>
          )}
        </div>
        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
          }
          .root-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            width: 100%;
            opacity: 1;
            transition: opacity 0.3s ease-in-out;
          }
          .root-container.loading {
            opacity: 0;
          }
          main {
            flex: 1;
          }
          .initial-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
              Helvetica, Arial, sans-serif;
            font-size: 20px;
            color: #6e7781;
          }
        `}</style>
      </body>
    </html>
  );
}
