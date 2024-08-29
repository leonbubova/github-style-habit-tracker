"use client";
import React from "react";
import confetti from "canvas-confetti";
import Legend from "./Legend";
import ContributionButtons from "./ContributionButtons";
import { useState } from "react";

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
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({
  contributions,
  onAddContribution,
  title = "",  // Provide a default value
  onTitleChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const totalWeeks = 53;

  const getColor = (duration: string) => {
    if (duration === '') return "#ebedf0";
    if (duration === '15') return "#9be9a8";
    if (duration === '60') return "#40c463";
    if (duration === '120+') return "#30a14e";
    return "#ebedf0";
  };

  const generateDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 365); // Start from 51 weeks ago
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Adjust to start on Sunday

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
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      disableForReducedMotion: true,
    });
    onAddContribution(duration);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
    setTempTitle(title);
  };

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

  return (
    <div className="contribution-graph-container">
      <div className="contribution-graph">
        <h1
          className={`title ${isEditing ? "editing" : ""}`}
          onClick={handleTitleClick}
        >
          {isEditing ? (
            <input
              type="text"
              value={tempTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            title
          )}
        </h1>
        <div className="months">
          {months.map(
            (month) =>
              monthPositions[month] !== undefined && (
                <div
                  key={month}
                  className="month-label"
                  style={{ gridColumn: monthPositions[month] + 2 }}
                >
                  {month}
                </div>
              )
          )}
        </div>
        <div className="graph-container">
          <div className="weekdays">
            <div className="weekday-label">Mon</div>
            <div className="weekday-label">Wed</div>
            <div className="weekday-label">Fri</div>
          </div>
          <div className="grid">
            {allDates.map((date, index) => {
              const dateString = date.toISOString().slice(0, 10);
              const contribution = contributions.find(
                (c) => c.date === dateString
              );
              const duration = contribution ? contribution.duration : '';

              return (
                <div
                  key={dateString}
                  className="day"
                  style={{
                    backgroundColor: getColor(duration),
                    gridColumn: Math.floor(index / 7) + 1,
                    gridRow: (index % 7) + 1,
                  }}
                  title={`${dateString}: ${duration} minutes`}
                ></div>
              );
            })}
          </div>
        </div>
        <Legend getColor={getColor} />
        <ContributionButtons onContribute={handleContribution} />
      </div>

      <style jsx>{`
        .contribution-graph-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
        }
        .contribution-graph {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif;
          max-width: 900px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .months {
          display: grid;
          grid-template-columns: repeat(52, 0.6fr);
          margin-bottom: 10px;
          margin-left: 4px;
        }
        .month-label {
          font-size: 12px;
          color: #767676;
          grid-row: 1;
          text-align: left;
        }
        .graph-container {
          display: flex;
        }
        .weekdays {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 15px;
          padding-bottom: 15px;
        }
        .weekday-label {
          font-size: 12px;
          color: #767676;
          text-align: right;
          padding-right: 4px;
          margin-right: 8px;
          height: 15px;
          line-height: 15px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(53, 1fr);
          grid-template-rows: repeat(7, 1fr);
          gap: 3px;
        }
        .day {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 40px; // Increased from 24px
        }

        .graph-button {
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          background-color: #40c463;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif;
        }

        .graph-button:hover {
          background-color: #2ea44f;
        }

        .graph-button:active {
          background-color: #22863a;
        }

        .graph-button:focus {
          outline: none;
        }

        .title {
          font-size: 20px;
          font-weight: 300; // Changed from 400 to 300 for a slimmer font
          color: #57606a;
          margin-bottom: 24px;
          margin-left: 70px;
          cursor: pointer;
          border-radius: 6px;
          padding: 6px 12px;
          transition: all 0.2s ease;
          align-self: flex-start;
          width: auto;
          background-color: #f6f8fa;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .title:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background-color: #f3f4f6;
        }

        .title.editing {
          background-color: #ffffff;
          box-shadow: 0 0 0 1px rgb(235, 237, 240), 0 2px 4px rgba(0, 0, 0, 0.1);
          border: none;
        }

        .title input {
          font-size: 20px;
          font-weight: 300; // Changed from 400 to 300 for a slimmer font
          color: #57606a;
          background: none;
          border: none;
          outline: none;
          width: 100%;
          font-family: inherit;
        }

        .title input:focus {
          outline: none; // Remove focus outline
        }
      `}</style>
    </div>
  );
};

export default ContributionGraph;
