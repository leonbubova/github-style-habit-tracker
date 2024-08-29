"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
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
  const [newHabitId, setNewHabitId] = useState<number | null>(null);
  const newHabitRef = useRef<HTMLDivElement>(null);
  const [deletingHabitId, setDeletingHabitId] = useState<number | null>(null);

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
        const userDoc = doc(db, "users", user.uid);
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
          await setDoc(userDoc, {
            trackers: [{ id: 1, title: "Chores", contributions: [] }],
          });
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
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, { trackers: newTrackers }, { merge: true });
        console.log("Trackers saved to Firestore");
      } catch (error) {
        console.error("Error saving trackers to Firestore:", error);
      }
    }
  };

  const addNewTracker = async () => {
    const newId =
      trackers.length > 0 ? Math.max(...trackers.map((t) => t.id)) + 1 : 1;
    const newTrackers = [
      ...trackers,
      { id: newId, title: "New Habit", contributions: [] },
    ];
    setTrackers(newTrackers);
    if (user) await saveTrackersToFirestore(newTrackers);

    setNewHabitId(newId);
    setTimeout(() => {
      newHabitRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setTimeout(() => setNewHabitId(null), 1000); // Remove animation class after 1 second
    }, 100);
  };

  const handleAddContribution = async (id: number, duration: string) => {
    const today = new Date().toISOString().split("T")[0];
    const newTrackers = trackers.map((tracker) => {
      if (tracker.id === id) {
        const existingContribution = tracker.contributions.find(
          (c) => c.date === today
        );
        let newDuration = duration;

        if (
          existingContribution &&
          existingContribution.duration === duration
        ) {
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
    setDeletingHabitId(id);
    setTimeout(async () => {
      const newTrackers = trackers.filter((tracker) => tracker.id !== id);
      setTrackers(newTrackers);
      if (user) await saveTrackersToFirestore(newTrackers);
      setDeletingHabitId(null);
    }, 100); // Reduced from 1000ms to 200ms for a quicker fade-out
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
    <>
      <div className="habit-tracker-list">
        {trackers.map((tracker) => (
          <div
            key={tracker.id}
            className={`tracker-container ${
              newHabitId === tracker.id ? "new-habit" : ""
            } ${deletingHabitId === tracker.id ? "deleting-habit" : ""}`}
            ref={tracker.id === newHabitId ? newHabitRef : null}
          >
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
      </div>

      <style jsx>{`
        .habit-tracker-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 80px;
          padding: 20px;
          min-height: calc(
            100vh - 60px
          ); /* Adjust this value based on your header height */
          padding-bottom: 60px; /* Add some padding at the bottom for the footer */
        }
        @media (max-width: 768px) {
          .habit-tracker-list {
            gap: 48px;
          }
        }
        .tracker-container {
          position: relative;
          width: 100%;
          transition: all 0.3s ease-out;
        }
        .tracker-container.new-habit {
          animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        .tracker-container.deleting-habit {
          animation: quickFadeOut 0.2s ease-out forwards;
        }
        @keyframes shake {
          10%,
          90% {
            transform: translate3d(-1px, 0, 0);
          }
          20%,
          80% {
            transform: translate3d(2px, 0, 0);
          }
          30%,
          50%,
          70% {
            transform: translate3d(-4px, 0, 0);
          }
          40%,
          60% {
            transform: translate3d(4px, 0, 0);
          }
        }
        @keyframes quickFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
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
          z-index: 1000;
        }
        .add-tracker-button:hover {
          background-color: #2ea44f;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
};

export default HabitTrackerList;
