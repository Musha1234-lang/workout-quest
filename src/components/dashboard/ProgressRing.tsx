
import React from 'react';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  textClassName?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  textClassName = "text-2xl font-semibold"
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg className="progress-ring" width={size} height={size}>
        <circle
          className="text-muted/20"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring-circle text-accent"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className={`progress-ring-text ${textClassName}`}>
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default ProgressRing;
