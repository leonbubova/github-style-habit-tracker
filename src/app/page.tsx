"use client";
import React from 'react';
import HabitTrackerList from './components/HabitTrackerList';
import Navbar from './components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <HabitTrackerList />
      </div>
      <style jsx>{`
        .home-container {
          background-color: white;
          min-height: 100vh;
        }
        .content {
          padding-top: 80px; // Adjust this value based on your navbar height
        }
      `}</style>
    </div>
  );
};

export default Home;
