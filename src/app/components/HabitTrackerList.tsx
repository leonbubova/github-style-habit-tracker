"use client";
import React, { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
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
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        console.log("User is logged in, loading from Firestore");
        await loadTrackersFromFirestore();
      } else if (!loading) {
        console.log("User is not logged in, loading from localStorage");
        loadTrackersFromLocalStorage();
      }
    };

    loadData();
  }, [user, loading]);

  useEffect(() => {
    if (isLoaded && !user) {
      console.log("Saving trackers to localStorage:", trackers);
      localStorage.setItem("habitTrackers", JSON.stringify(trackers));
    }
  }, [trackers, isLoaded, user]);

  const loadTrackersFromLocalStorage = () => {
    const savedTrackers = localStorage.getItem("habitTrackers");
    if (savedTrackers) {
      setTrackers(JSON.parse(savedTrackers));
    } else {
      setTrackers([{ id: 1, title: "Chores", contributions: [] }]);
    }
    setIsLoaded(true);
  };

  const loadTrackersFromFirestore = async () => {
    try {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Firestore data:", data);
          if (data && data.trackers) {
            setTrackers(data.trackers);
          } else {
            console.log("No trackers found in Firestore, setting default");
            setTrackers([{ id: 1, title: "Chores", contributions: [] }]);
          }
        } else {
          console.log("No document found in Firestore, creating default");
          await setDoc(userDoc, { trackers: [{ id: 1, title: "Chores", contributions: [] }] });
          setTrackers([{ id: 1, title: "Chores", contributions: [] }]);
        }
      }
    } catch (error) {
      console.error("Error loading trackers from Firestore:", error);
      setTrackers([{ id: 1, title: "Chores", contributions: [] }]);
    }
    setIsLoaded(true);
  };

  const saveTrackersToFirestore = async (newTrackers: Tracker[]) => {
    if (user) {
      try {
        const userDoc = doc(db, 'users', user.uid);
        await setDoc(userDoc, { trackers: newTrackers }, { merge: true });
        console.log("Trackers saved to Firestore");
      } catch (error) {
        console.error("Error saving trackers to Firestore:", error);
      }
    }
  };

  const addNewTracker = async () => {
    const newId = trackers.length > 0 ? Math.max(...trackers.map((t) => t.id)) + 1 : 1;
    const newTrackers = [...trackers, { id: newId, title: "New Habit", contributions: [] }];
    setTrackers(newTrackers);
    if (user) await saveTrackersToFirestore(newTrackers);
  };

  const handleAddContribution = async (id: number, duration: string) => {
    const today = new Date().toISOString().split("T")[0];
    const newTrackers = trackers.map((tracker) => {
      if (tracker.id === id) {
        const existingContribution = tracker.contributions.find(
          (c) => c.date === today
        );
        let newDuration = duration;

        if (existingContribution && existingContribution.duration === duration) {
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
    });
    setTrackers(newTrackers);
    if (user) await saveTrackersToFirestore(newTrackers);
  };

  const deleteTracker = async (id: number) => {
    const newTrackers = trackers.filter((tracker) => tracker.id !== id);
    setTrackers(newTrackers);
    if (user) await saveTrackersToFirestore(newTrackers);
  };

  const updateTrackerTitle = async (id: number, newTitle: string) => {
    const newTrackers = trackers.map((tracker) =>
      tracker.id === id ? { ...tracker, title: newTitle } : tracker
    );
    setTrackers(newTrackers);
    if (user) await saveTrackersToFirestore(newTrackers);
  };

  if (loading || !isLoaded) {
    return <div>Loading...</div>;
  }

  console.log("Rendering trackers:", trackers);

  return (
    <div className="habit-tracker-list">
      {trackers.map((tracker) => (
        <div key={tracker.id} className="tracker-container">
          <ContributionGraph
            contributions={tracker.contributions}
            onAddContribution={(duration) =>
              handleAddContribution(tracker.id, duration)
            }
            title={tracker.title}
            onTitleChange={(newTitle) =>
              updateTrackerTitle(tracker.id, newTitle)
            }
            onDelete={() => deleteTracker(tracker.id)}
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
          gap: 80px;
          padding: 20px;
        }
        @media (max-width: 768px) {
          .habit-tracker-list {
            gap: 48px;
          }
        }
        .tracker-container {
          position: relative;
          width: 100%;
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
