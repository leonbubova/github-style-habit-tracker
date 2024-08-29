import React from "react";

interface Day {
  date: string;
  duration: string;
}

interface MonthGridProps {
  month: string;
  days: Day[];
  getColor: (duration: string) => string;
}

const MonthGrid: React.FC<MonthGridProps> = ({ month, days, getColor }) => {
  const firstDate = new Date(days[0].date);
  const firstDayOfMonth = firstDate.getDay();
  const lastDate = new Date(days[days.length - 1].date);
  const lastDayOfMonth = lastDate.getDay();
  const weeksInMonth = Math.ceil((days.length + firstDayOfMonth) / 7);

  return (
    <div className="month-grid">
      <h3 className="month-label">{month}</h3>
      <div className="grid">
        {Array.from({ length: weeksInMonth }).map((_, weekIndex) => (
          <div key={weekIndex} className="week">
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const dayNumber = weekIndex * 7 + dayIndex - firstDayOfMonth;
              const isValidDay = dayNumber >= 0 && dayNumber < days.length;
              const day = isValidDay ? days[dayNumber] : null;
              const isLastWeek = weekIndex === weeksInMonth - 1;
              const shouldRender =
                !isLastWeek || (isLastWeek && dayIndex <= lastDayOfMonth);

              return shouldRender ? (
                <div
                  key={dayIndex}
                  className={`day ${day ? "filled" : "empty"}`}
                  style={{
                    backgroundColor: day
                      ? getColor(day.duration)
                      : "transparent",
                  }}
                  title={day ? `${day.date}: ${day.duration} minutes` : ""}
                ></div>
              ) : null;
            })}
          </div>
        ))}
      </div>

      <style jsx>{`
        .month-grid {
          padding: 0;
          width: calc(100% / 12 - 4px); // Distribute evenly across 12 months
          min-width: 60px; // Adjust this value as needed
        }
        .month-label {
          font-size: 10px;
          font-weight: 300; // Changed from 600 to 300 for a slimmer style
          color: #8b949e; // Changed to a more gray color
          margin-bottom: 4px; // Increased from 1px to 4px for more spacing
        }
        .grid {
          display: flex;
          gap: 1px;
        }
        .week {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .day {
          width: 10px; // Slightly smaller to fit better
          height: 10px;
          border-radius: 1.5px;
        }
        .day.empty {
          background-color: transparent;
        }
        .day.filled {
          border: none;
        }
      `}</style>
    </div>
  );
};

export default MonthGrid;
