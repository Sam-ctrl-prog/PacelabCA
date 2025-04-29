import { CampusAmbassador } from "@shared/schema";
import AchievementBadge from './AchievementBadge';
import { Trophy, Star, ArrowUp } from "lucide-react";

interface CampusAmbassadorCardProps {
  ambassador: CampusAmbassador;
  showDetails?: boolean;
}

const CampusAmbassadorCard = ({ ambassador, showDetails = false }: CampusAmbassadorCardProps) => {
  // Determine card style based on rank
  const getCardClassName = () => {
    if (!ambassador.rank) return "card";
    
    switch (ambassador.rank) {
      case 1:
        return "card gold";
      case 2:
        return "card silver";
      case 3:
        return "card bronze";
      default:
        return "card";
    }
  };

  // Calculate level color based on level
  const getLevelColor = (level: number) => {
    switch(level) {
      case 1: return '#4d9aff';
      case 2: return '#7c3aed';
      case 3: return '#f59e0b';
      case 4: return '#10b981';
      case 5: return '#ec4899';
      default: return '#4d9aff';
    }
  };

  // Get proper badge icon based on rank
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={16} />;
    if (rank === 2 || rank === 3) return <Star size={16} />;
    return <ArrowUp size={16} />;
  };

  return (
    <div className={getCardClassName()}>
      {ambassador.rank && (
        <div className="rankBadge">
          {getRankIcon(ambassador.rank)} {ambassador.rank}
        </div>
      )}
      
      <div className="cardHeader">
        <h2>{ambassador.name}</h2>
        {ambassador.level && (
          <div className="levelBadge" style={{ backgroundColor: getLevelColor(ambassador.level) }}>
            Level {ambassador.level}
          </div>
        )}
      </div>
      
      <h3>{ambassador.college}</h3>
      <p className="bio">"{ambassador.bio}"</p>
      
      {/* Achievements section */}
      {ambassador.achievements && ambassador.achievements.length > 0 && (
        <div className="achievementsContainer">
          {ambassador.achievements.slice(0, showDetails ? ambassador.achievements.length : 3).map((achievement) => (
            <AchievementBadge 
              key={achievement.id} 
              achievement={achievement} 
              size={showDetails ? "md" : "sm"}
            />
          ))}
        </div>
      )}
      
      <div className="points">
        <span>{ambassador.points}</span> points
      </div>
      
      <style jsx>{`
        .cardHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .levelBadge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
        }
        
        .achievementsContainer {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1rem 0;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default CampusAmbassadorCard;
