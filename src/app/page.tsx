"use client";
import React from 'react';
import HabitTrackerList from './components/HabitTrackerList';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="content">
        <HabitTrackerList />
      </div>
      <style jsx>{`
        .home-container {
          background-color: white;
          min-height: 100vh;
          width: 100%;
        }
        .content {
          padding-top: 80px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Home;
