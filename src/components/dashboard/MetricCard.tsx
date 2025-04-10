
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  className,
}) => {
  return (
    <div className={cn("metric-card", className)}>
      <div className="flex justify-between items-start">
        <span className="text-muted-foreground text-sm">{title}</span>
        <span className="text-muted-foreground/70">{icon}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">{value}</span>
        {trend && trendValue && (
          <div className="flex items-center mt-1">
            {trend === 'up' && (
              <span className="text-green-500 text-xs flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 15L12 9L6 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {trendValue}
              </span>
            )}
            {trend === 'down' && (
              <span className="text-red-500 text-xs flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {trendValue}
              </span>
            )}
            {trend === 'neutral' && (
              <span className="text-gray-500 text-xs flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {trendValue}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
