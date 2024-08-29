"use client";
import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import Legend from "./Legend";
import ContributionButtons from "./ContributionButtons";
import MonthGrid from "./MonthGrid";

// File: components/ContributionGraph.tsx

interface Contribution {
  date: string; // Format: YYYY-MM-DD
  duration: string;
}

interface ContributionGraphProps {
  contributions: Contribution[];
  onAddContribution: (duration: string) => void;
  title: string;
  onTitleChange: (newTitle: string) => void;
  onDelete: () => void;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({
  contributions,
  onAddContribution,
  title = "",
  onTitleChange,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const totalWeeks = 53;

  const getColor = (duration: string) => {
    if (duration === "") return "#ebedf0";
    if (duration === "15") return "#9be9a8";
    if (duration === "60") return "#40c463";
    if (duration === "120+") return "#30a14e";
    return "#ebedf0";
  };

  const generateDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 365);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    for (let week = 0; week < totalWeeks; week++) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + week * 7 + day);
        dates.push(date);
      }
    }
    return dates;
  };

  const allDates = generateDates();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getMonthPositions = () => {
    const positions: { [key: string]: number } = {};
    allDates.forEach((date, index) => {
      const monthIndex = date.getMonth();
      const weekIndex = Math.floor(index / 7);
      if (!positions[months[monthIndex]] && date.getDate() <= 7) {
        positions[months[monthIndex]] = weekIndex;
      }
    });
    return positions;
  };

  const monthPositions = getMonthPositions();

  const handleContribution = (duration: string) => {
    setIsAnimating(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      disableForReducedMotion: true,
    });
    onAddContribution(duration);
    setTimeout(() => setIsAnimating(false), 1000); // Reset animation after 1 second
  };

  const handleTitleClick = () => {
    setIsEditing(true);
    setTempTitle(title);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (tempTitle.trim() !== "") {
      onTitleChange(tempTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tempTitle.trim() !== "") {
        onTitleChange(tempTitle);
      }
      setIsEditing(false);
    }
  };

  const generateMonthData = () => {
    const monthData: Array<{
      name: string;
      days: Array<{ date: string; duration: string }>;
    }> = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(currentYear, month, 2);
      const endDate = new Date(currentYear, month + 1, 1); // Last day of the current month

      monthData[month] = {
        name: months[month],
        days: [],
      };

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().slice(0, 10);
        const contribution = contributions.find((c) => c.date === dateString);
        monthData[month].days.push({
          date: dateString,
          duration: contribution ? contribution.duration : "",
        });
      }
    }

    return monthData;
  };

  const monthData = generateMonthData();

  const getCurrentDayContribution = () => {
    const today = new Date().toISOString().split("T")[0];
    return contributions.find((c) => c.date === today)?.duration || "";
  };

  const currentContribution = getCurrentDayContribution();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    confetti({
      particleCount: 60,
      spread: 40,
      origin: { x, y },
      colors: ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3'],
      ticks: 150,
      scalar: 0.6,
      disableForReducedMotion: true,
    });

    onDelete();
  };

  return (
    <div className="contribution-graph-container">
      <div className="contribution-graph">
        <div className={`header ${isAnimating ? "animating" : ""}`}>
          <div
            className={`title-container ${
              currentContribution ? "completed" : ""
            }`}
          >
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={tempTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={handleKeyDown}
                className="title-input"
              />
            ) : (
              <h1 className="title" onClick={handleTitleClick}>
                {title}
              </h1>
            )}
            {currentContribution && (
              <div className="checkmark-container">
                <svg className="checkmark" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}
          </div>
          <button className="delete-tracker-button" onClick={handleDelete}>
            ×
          </button>
        </div>
        <div className="months-row">
          {monthData.map((month, index) => (
            <MonthGrid
              key={month.name}
              month={month.name}
              days={month.days}
              getColor={getColor}
            />
          ))}
        </div>
        <div className="bottom-row">
          <ContributionButtons
            onContribute={handleContribution}
            currentContribution={getCurrentDayContribution()}
          />
          <Legend getColor={getColor} />
        </div>
      </div>

      <style jsx>{`
        .contribution-graph-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .contribution-graph {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif;
          max-width: 900px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .header.animating {
          animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        .title-container {
          display: inline-flex;
          align-items: center;
          background-color: #f6f8fa;
          border-radius: 6px;
          padding: 6px 12px;
          transition: background-color 0.3s ease;
        }
        .title-container.completed {
          background-color: #e6ffed;
        }
        .title,
        .title-input {
          font-size: 20px;
          font-weight: 300;
          color: #24292e;
          margin: 0;
          padding: 0;
          border: none;
          background: transparent;
          width: 100%;
        }
        .title {
          cursor: pointer;
        }
        .title-input {
          outline: none;
          font-family: inherit;
          padding: 6px 0;
          margin: -6px 0;
          border-radius: 6px 0 0 6px;
        }
        .checkmark-container {
          width: 24px;
          height: 24px;
          background-color: #40c463;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 12px;
          flex-shrink: 0;
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .checkmark {
          width: 16px;
          height: 16px;
          fill: white;
        }
        .delete-tracker-button {
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
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          margin-left: 12px;
          z-index: 10; /* Ensure the button is above the confetti */
        }
        .delete-tracker-button:hover {
          background-color: #f3f4f6;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        @keyframes popIn {
          0% {
            transform: scale(0);
          }
          80% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
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
        .months-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          overflow-x: auto;
          padding-bottom: 16px;
        }
        .bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }

        @media (max-width: 768px) {
          .bottom-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContributionGraph;
