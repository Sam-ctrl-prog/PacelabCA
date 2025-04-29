import { Crown } from "lucide-react";

const LeaderboardHeader = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="icon-container">
          <Crown size={36} color="#FFD700" strokeWidth={2} />
        </div>
        <h1>Campus Ambassador Leaderboard</h1>
        <p>Recognizing our top performers driving campus engagement</p>

        {/* Winner Image Section */}
        <div className="winner-showcase">
          <div className="winner-image-container">
            <img
              src="/src/lib/sree.jpg"
              alt="Sreehari"
              className="winner-image responsive-img"
            />
          </div>
          <div className="winner-info">
            <h3 className="winner-name">Sreehari</h3>
            <p className="winner-details">Worth 30k Price</p>
            <div className="winner-badge">Previous Year Winner</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          background-color: #1a1a1a;
          padding: 1.5rem 1rem 2.5rem;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          border-bottom: 2px solid #333;
        }

        .header-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0.5rem 1rem;
          position: relative;
        }

        .header-content h1 {
          font-size: 2.2rem;
          background: linear-gradient(45deg, #ffd700, #f5f5f5, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }
        .responsive-img {
          width: 100%;
          max-width: 120px;
          height: auto;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }

        @media (max-width: 640px) {
          .responsive-img {
            max-width: 80px;
          }
        }

        .header-content p {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
          color: #bbb;
          margin-bottom: 2rem;
        }

        .icon-container {
          margin-bottom: 0.5rem;
        }

        /* Winner Showcase Styles */
        .winner-showcase {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 2rem;
          padding: 1.5rem;
          background: linear-gradient(
            135deg,
            rgba(25, 25, 35, 0.9),
            rgba(40, 40, 60, 0.8)
          );
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 215, 0, 0.3);
          position: relative;
        }

        .winner-crown-badge {
          position: absolute;
          top: -20px;
          background: #1a1a2e;
          border-radius: 20px;
          padding: 5px 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 2px solid #ffd700;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
        }

        .winner-crown-badge span {
          color: #ffd700;
          font-weight: bold;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .winner-image-container {
          margin: 1rem 0 1.5rem;
        }

        .winner-image-placeholder {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2a2a3a, #1a1a2e);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 5px solid rgba(255, 215, 0, 0.5);
          box-shadow: 0 0 25px rgba(255, 215, 0, 0.3);
          overflow: hidden;
        }

        .winner-initials {
          font-size: 3.5rem;
          font-weight: bold;
          color: #ffd700;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        }

        .winner-info {
          text-align: center;
        }

        .winner-name {
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 0.3rem;
          color: #f5f5f5;
        }

        .winner-details {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
        }

        .winner-badge {
          display: inline-block;
          background: linear-gradient(90deg, #ffd700, #ffa500);
          color: #000;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .header-content h1 {
            font-size: 1.8rem;
          }

          .header-content p {
            font-size: 1rem;
          }

          .winner-image-placeholder {
            width: 140px;
            height: 140px;
          }

          .winner-initials {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .header-content h1 {
            font-size: 1.5rem;
          }

          .winner-image-placeholder {
            width: 120px;
            height: 120px;
          }

          .winner-initials {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </header>
  );
};

export default LeaderboardHeader;
