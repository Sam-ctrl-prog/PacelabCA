import React from 'react';

interface LevelProgressBarProps {
  level: number;
  points: number;
  nextLevelThreshold: number;
  previousLevelThreshold: number;
}

const LevelProgressBar = ({ 
  level, 
  points, 
  nextLevelThreshold, 
  previousLevelThreshold 
}: LevelProgressBarProps) => {
  // Calculate percentage progress to next level
  const currentLevelPoints = points - previousLevelThreshold;
  const pointsToNextLevel = nextLevelThreshold - previousLevelThreshold;
  const progressPercentage = Math.min(100, Math.max(0, (currentLevelPoints / pointsToNextLevel) * 100));

  // Format numbers for display
  const pointsToNext = nextLevelThreshold - points;
  const progressDisplay = Math.round(progressPercentage);

  return (
    <div className="level-progress-container">
      <div className="level-info">
        <div className="level-badge">Level {level}</div>
        <div className="points-info">
          <span>{points} points</span>
          <span>{pointsToNext > 0 ? `${pointsToNext} to level ${level + 1}` : 'Max level'}</span>
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        />
        <span className="progress-text">{progressDisplay}%</span>
      </div>
      
      <style jsx>{`
        .level-progress-container {
          background-color: #252525;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border: 1px solid #333;
        }
        
        .level-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .level-badge {
          background: linear-gradient(45deg, #4d9aff, #36f);
          color: white;
          font-weight: 600;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          box-shadow: 0 2px 8px rgba(77, 154, 255, 0.4);
        }
        
        .points-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .points-info span:first-child {
          font-weight: 600;
          color: #ddd;
          font-size: 0.95rem;
        }
        
        .points-info span:last-child {
          color: #aaa;
          font-size: 0.8rem;
          margin-top: 0.15rem;
        }
        
        .progress-bar-container {
          height: 12px;
          background-color: #333;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(to right, #4d9aff, #36f);
          border-radius: 6px;
          transition: width 0.5s ease-out;
        }
        
        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.7rem;
          font-weight: 600;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        }
        
        @media (max-width: 640px) {
          .level-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .points-info {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default LevelProgressBar;