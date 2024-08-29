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

  return (
    <div className="contribution-graph-container">
      <div className="contribution-graph">
        <div className="header">
          <h1
            className={`title ${isEditing ? "editing" : ""}`}
            onClick={handleTitleClick}
          >
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={tempTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={handleKeyDown}
              />
            ) : (
              title
            )}
          </h1>
          <button className="delete-tracker-button" onClick={onDelete}>
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
          <ContributionButtons onContribute={handleContribution} />
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
        .title {
          font-size: 20px;
          font-weight: 300;
          color: #57606a;
          cursor: pointer;
          border-radius: 6px;
          padding: 6px 12px;
          transition: all 0.2s ease;
          background-color: #f6f8fa;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          margin: 0;
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
          font-weight: 300;
          color: #57606a;
          background: none;
          border: none;
          outline: none;
          width: 100%;
          font-family: inherit;
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
        }
        .delete-tracker-button:hover {
          background-color: #f3f4f6;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      `}</style>
    </div>
  );
};

export default ContributionGraph;
