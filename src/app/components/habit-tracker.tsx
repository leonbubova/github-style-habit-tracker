"use client";
import React from "react";
import confetti from "canvas-confetti";
import Navbar from "./Navbar";

// File: components/ContributionGraph.tsx

interface Contribution {
  date: string; // Format: YYYY-MM-DD
  count: number;
}

interface ContributionGraphProps {
  contributions: Contribution[];
  onAddContribution: (duration: string) => void;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({
  contributions,
  onAddContribution,
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const totalWeeks = 53;

  const getColor = (count: number) => {
    if (count === 0) return "#ebedf0";
    if (count === 1) return "#9be9a8"; // 15 minutes
    if (count === 4) return "#40c463"; // 1 hour
    if (count === 8) return "#30a14e"; // 2+ hours
    return "#216e39"; // More than 2+ hours (shouldn't happen with current logic)
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

  return (
    <>
      <Navbar />
      <div className="contribution-graph-container">
        <div className="contribution-graph">
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
                const count = contribution ? contribution.count : 0;

                return (
                  <div
                    key={dateString}
                    className="day"
                    style={{
                      backgroundColor: getColor(count),
                      gridColumn: Math.floor(index / 7) + 1,
                      gridRow: (index % 7) + 1,
                    }}
                    title={`${dateString}: ${count} contributions`}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="legend">
            <span className="legend-label">Less</span>
            {[0, 1, 4, 8].map((level) => (
              <div
                key={level}
                className="legend-item"
                style={{ backgroundColor: getColor(level) }}
              ></div>
            ))}
            <span className="legend-label">More</span>
          </div>

          <div className="button-container">
            <button
              className="graph-button"
              onClick={() => handleContribution("15min")}
            >
              15 minutes
            </button>
            <button
              className="graph-button"
              onClick={() => handleContribution("1hour")}
            >
              1 hour
            </button>
            <button
              className="graph-button"
              onClick={() => handleContribution("2hours+")}
            >
              2+ hours
            </button>
          </div>
        </div>

        <style jsx>{`
          .contribution-graph-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            padding-top: 80px; // Add padding to account for the fixed navbar
            background-color: #ffffff; // Changed from red to white
            position: relative; // Add this line
          }
          .contribution-graph {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
              Helvetica, Arial, sans-serif;
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
          .legend {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 16px;
            font-size: 12px;
            color: #767676;
          }
          .legend-item {
            width: 12px;
            height: 12px;
            margin: 0 2px;
            border-radius: 2px;
          }

          .button-container {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 24px;
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
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
              Helvetica, Arial, sans-serif;
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
        `}</style>
      </div>
    </>
  );
};

export default ContributionGraph;
