"use client";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="root-container">
          <Navbar />
          <main>{children}</main>
          <Footer />
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
          }
          main {
            flex: 1;
          }
        `}</style>
      </body>
    </html>
  );
}
