import { 
  Award, 
  Calendar, 
  MessageCircle, 
  Share2, 
  Trophy, 
  Users, 
  Star, 
  Zap 
} from "lucide-react";
import { Achievement, AchievementType } from "@shared/schema";

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: "sm" | "md" | "lg";
}

export const getAchievementIcon = (type: string, level: number) => {
  const size = 18;
  const strokeWidth = 2;
  const color = level === 3 ? "#FFD700" : level === 2 ? "#C0C0C0" : "#CD7F32";
  
  switch (type) {
    case AchievementType.EVENTS_HOSTED:
      return <Calendar size={size} color={color} strokeWidth={strokeWidth} />;
    case AchievementType.REFERRALS:
      return <Users size={size} color={color} strokeWidth={strokeWidth} />;
    case AchievementType.SOCIAL_SHARES:
      return <Share2 size={size} color={color} strokeWidth={strokeWidth} />;
    case AchievementType.TOP_PERFORMER:
      return <Trophy size={size} color={color} strokeWidth={strokeWidth} />;
    case AchievementType.CONSISTENT:
      return <Zap size={size} color={color} strokeWidth={strokeWidth} />;
    case AchievementType.LONGTERM:
      return <Star size={size} color={color} strokeWidth={strokeWidth} />;
    case AchievementType.FIRST_EVENT:
      return <Calendar size={size} color={color} strokeWidth={strokeWidth} />;
    default:
      return <Award size={size} color={color} strokeWidth={strokeWidth} />;
  }
};

export const getAchievementLevelName = (level: number) => {
  switch (level) {
    case 1:
      return "Bronze";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "Bronze";
  }
};

export const getAchievementLevelColor = (level: number) => {
  switch (level) {
    case 1:
      return "#CD7F32"; // Bronze
    case 2:
      return "#C0C0C0"; // Silver
    case 3:
      return "#FFD700"; // Gold
    default:
      return "#CD7F32"; // Bronze
  }
};

const AchievementBadge = ({ achievement, size = "md" }: AchievementBadgeProps) => {
  const iconSize = size === "lg" ? 24 : size === "md" ? 20 : 16;
  const levelText = getAchievementLevelName(achievement.level);
  const levelColor = getAchievementLevelColor(achievement.level);
  
  return (
    <div className="achievement-badge" title={`${achievement.name} - ${achievement.description}`}>
      <div className="badge-icon">
        {getAchievementIcon(achievement.type, achievement.level)}
      </div>
      <div className="badge-details">
        <span className="badge-name">{achievement.name}</span>
        <span className="badge-level" style={{ color: levelColor }}>{levelText}</span>
      </div>
      
      <style jsx>{`
        .achievement-badge {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          padding: ${size === "lg" ? "0.75rem" : size === "md" ? "0.5rem" : "0.25rem"};
          border-radius: 8px;
          background-color: #252525;
          border: 1px solid ${levelColor};
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          margin: 0.25rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: help;
          width: ${size === "lg" ? "100px" : size === "md" ? "80px" : "60px"};
          position: relative;
          overflow: hidden;
        }
        
        .achievement-badge:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .achievement-badge:hover::after {
          opacity: 0.1;
        }
        
        .achievement-badge::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, ${levelColor}, transparent);
          opacity: 0.05;
          transition: opacity 0.3s ease;
        }
        
        .badge-icon {
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${iconSize + 16}px;
          height: ${iconSize + 16}px;
          border-radius: 50%;
          background-color: #1a1a1a;
          border: 1px solid ${levelColor};
        }
        
        .badge-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .badge-name {
          font-size: ${size === "lg" ? "0.85rem" : size === "md" ? "0.75rem" : "0.65rem"};
          font-weight: 500;
          color: #eee;
          margin-bottom: 0.15rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        
        .badge-level {
          font-size: ${size === "lg" ? "0.75rem" : size === "md" ? "0.65rem" : "0.6rem"};
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
};

export default AchievementBadge;
