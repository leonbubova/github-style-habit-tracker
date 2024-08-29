import React from "react";

interface ContributionButtonsProps {
  onContribute: (duration: string) => void;
  currentContribution: string;
}

const ContributionButtons: React.FC<ContributionButtonsProps> = ({
  onContribute,
  currentContribution,
}) => {
  const durations = ["15", "60", "120+"];

  return (
    <div className="button-container">
      {durations.map((duration) => (
        <button
          key={duration}
          className={`graph-button ${currentContribution === duration ? 'active' : ''}`}
          onClick={() => onContribute(duration)}
        >
          {duration === "120+" ? "2+ hours" : `${duration} minutes`}
        </button>
      ))}

      <style jsx>{`
        .button-container {
          display: flex;
          gap: 8px;
        }

        .graph-button {
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
          background-color: #f6f8fa;
          color: #57606a;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif;
        }

        .graph-button:hover {
          background-color: #40c463;
          color: #ffffff;
        }

        .graph-button.active {
          background-color: #40c463;
          color: #ffffff;
        }

        .graph-button:active {
          background-color: #2ea44f;
        }

        .graph-button:focus {
          outline: none;
        }

        @media (max-width: 768px) {
          .button-container {
            gap: 4px;
          }

          .graph-button {
            padding: 4px 8px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContributionButtons;
