import React from "react";

interface LegendProps {
  getColor: (duration: string) => string;
}

const Legend: React.FC<LegendProps> = ({ getColor }) => {
  return (
    <div className="legend">
      <span className="legend-label">Less</span>
      {['', '15', '60', '120+'].map((duration) => (
        <div
          key={duration}
          className="legend-item"
          style={{ backgroundColor: getColor(duration) }}
        ></div>
      ))}
      <span className="legend-label">More</span>

      <style jsx>{`
        .legend {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #767676;
        }
        .legend-item {
          width: 12px;
          height: 12px;
          margin: 0 2px;
          border-radius: 2px;
        }
        .legend-label {
          margin: 0 4px;
        }
      `}</style>
    </div>
  );
};

export default Legend;
