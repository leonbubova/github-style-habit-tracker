import React from 'react';

interface ContributionButtonsProps {
  onContribute: (duration: string) => void;
}

const ContributionButtons: React.FC<ContributionButtonsProps> = ({ onContribute }) => {
  return (
    <div className="button-container">
      <button className="graph-button" onClick={() => onContribute("15")}>
        15 minutes
      </button>
      <button className="graph-button" onClick={() => onContribute("60")}>
        1 hour
      </button>
      <button className="graph-button" onClick={() => onContribute("120+")}>
        2+ hours
      </button>

      <style jsx>{`
        .button-container {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 40px;
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
  );
};

export default ContributionButtons;