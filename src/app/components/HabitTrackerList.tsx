"use client";
import React, { useState, useEffect } from "react";
import ContributionGraph from "./habit-tracker";

interface Contribution {
  date: string;
  duration: string;
}

interface Tracker {
  id: number;
  title: string;
  contributions: Contribution[];
}

const HabitTrackerList: React.FC = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load trackers from localStorage on component mount
    const savedTrackers = localStorage.getItem("habitTrackers");
    if (savedTrackers) {
      setTrackers(JSON.parse(savedTrackers));
    } else {
      // If no saved trackers, initialize with one empty tracker
      setTrackers([{ id: 1, title: "Chores", contributions: [] }]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save trackers to localStorage whenever they change
    if (isLoaded) {
      localStorage.setItem("habitTrackers", JSON.stringify(trackers));
    }
  }, [trackers, isLoaded]);

  const addNewTracker = () => {
    const newId =
      trackers.length > 0 ? Math.max(...trackers.map((t) => t.id)) + 1 : 1;
    setTrackers([
      ...trackers,
      { id: newId, title: "New Habit", contributions: [] },
    ]);
  };

  const handleAddContribution = (id: number, duration: string) => {
    const today = new Date().toISOString().split("T")[0];
    setTrackers(
      trackers.map((tracker) => {
        if (tracker.id === id) {
          const existingContribution = tracker.contributions.find(
            (c) => c.date === today
          );
          let newDuration = duration;

          if (
            existingContribution &&
            existingContribution.duration === duration
          ) {
            // If clicking the same duration, remove the contribution
            newDuration = "";
          }

          const updatedContributions = tracker.contributions.filter(
            (c) => c.date !== today
          );
          if (newDuration) {
            updatedContributions.push({ date: today, duration: newDuration });
          }

          return {
            ...tracker,
            contributions: updatedContributions,
          };
        }
        return tracker;
      })
    );
  };

  const deleteTracker = (id: number) => {
    setTrackers(trackers.filter((tracker) => tracker.id !== id));
  };

  const updateTrackerTitle = (id: number, newTitle: string) => {
    setTrackers(
      trackers.map((tracker) =>
        tracker.id === id ? { ...tracker, title: newTitle } : tracker
      )
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="habit-tracker-list">
      {trackers.map((tracker) => (
        <div key={tracker.id} className="tracker-container">
          <button
            className="delete-tracker-button"
            onClick={() => deleteTracker(tracker.id)}
          >
            ×
          </button>
          <ContributionGraph
            contributions={tracker.contributions}
            onAddContribution={(duration) =>
              handleAddContribution(tracker.id, duration)
            }
            title={tracker.title}
            onTitleChange={(newTitle) =>
              updateTrackerTitle(tracker.id, newTitle)
            }
          />
        </div>
      ))}
      <button className="add-tracker-button" onClick={addNewTracker}>
        + Add Habit
      </button>

      <style jsx>{`
        .habit-tracker-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          padding: 20px;
        }
        .tracker-container {
          position: relative;
          width: 100%;
        }
        .delete-tracker-button {
          position: absolute;
          top: 24px;
          right: 465px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #f6f8fa;
          color: #57606a;
          border: none;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s ease;
          z-index: 10;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .delete-tracker-button:hover {
          background-color: #f3f4f6;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .add-tracker-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          background-color: #40c463;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .add-tracker-button:hover {
          background-color: #2ea44f;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default HabitTrackerList;
