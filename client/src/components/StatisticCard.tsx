import React from 'react';
import { Calendar, Users, Share2, Zap } from 'lucide-react';

type StatType = 'events' | 'referrals' | 'shares' | 'streak';

interface StatisticCardProps {
  type: StatType;
  value: number;
  label: string;
}

const StatisticCard = ({ type, value, label }: StatisticCardProps) => {
  // Get correct icon based on stat type
  const renderIcon = () => {
    switch (type) {
      case 'events':
        return <Calendar size={22} />;
      case 'referrals':
        return <Users size={22} />;
      case 'shares':
        return <Share2 size={22} />;
      case 'streak':
        return <Zap size={22} />;
      default:
        return <Calendar size={22} />;
    }
  };
  
  // Get background gradient based on stat type
  const getGradient = () => {
    switch (type) {
      case 'events':
        return 'linear-gradient(135deg, #4d9aff20, #4d9aff05)';
      case 'referrals':
        return 'linear-gradient(135deg, #7c3aed20, #7c3aed05)';
      case 'shares':
        return 'linear-gradient(135deg, #10b98120, #10b98105)';
      case 'streak':
        return 'linear-gradient(135deg, #f59e0b20, #f59e0b05)';
      default:
        return 'linear-gradient(135deg, #4d9aff20, #4d9aff05)';
    }
  };
  
  // Get icon color based on stat type
  const getIconColor = () => {
    switch (type) {
      case 'events':
        return '#4d9aff';
      case 'referrals':
        return '#7c3aed';
      case 'shares':
        return '#10b981';
      case 'streak':
        return '#f59e0b';
      default:
        return '#4d9aff';
    }
  };
  
  // Get border color based on stat type
  const getBorderColor = () => {
    switch (type) {
      case 'events':
        return '#4d9aff40';
      case 'referrals':
        return '#7c3aed40';
      case 'shares':
        return '#10b98140';
      case 'streak':
        return '#f59e0b40';
      default:
        return '#4d9aff40';
    }
  };

  return (
    <div className="stat-card">
      <div className="icon-container" style={{ color: getIconColor() }}>
        {renderIcon()}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      
      <style jsx>{`
        .stat-card {
          background: ${getGradient()};
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 90px;
          border: 1px solid ${getBorderColor()};
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }
        
        .icon-container {
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #eee;
          margin-bottom: 0.25rem;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #aaa;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default StatisticCard;