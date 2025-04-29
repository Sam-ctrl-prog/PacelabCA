import { Trophy, Award, Gift, Briefcase, Zap, Medal, Star } from "lucide-react";

const LeaderboardFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="header-gradient">
          <h2 className="text-2xl font-bold mb-2">Prize Pool</h2>
          <p className="text-xl font-bold text-gradient">
            Total prizes worth ₹5,00,000!
          </p>
        </div>

        <div className="prize-tiers">
          {/* Top 3 Winners */}
          <div className="tier tier-top3 highlight-top3">
            <div className="tier-header">
              <Trophy className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-bold uppercase text-yellow-300 tracking-wider">
                🥇 Top 3 Champions
              </h3>
            </div>
            <div className="prize-medals">
              <div className="medal gold">
                <div className="medal-icon">
                  <Trophy size={28} />
                  <span className="position">1st</span>
                </div>
                <span className="amount">₹25,000</span>
              </div>
              <div className="medal silver">
                <div className="medal-icon">
                  <Medal size={28} />
                  <span className="position">2nd</span>
                </div>
                <span className="amount">₹15,000</span>
              </div>
              <div className="medal bronze">
                <div className="medal-icon">
                  <Award size={28} />
                  <span className="position">3rd</span>
                </div>
                <span className="amount">₹10,000</span>
              </div>
            </div>
          </div>

          {/* Divider + Other Prize Winners */}
          <h4 className="text-lg font-semibold mt-10 mb-2 text-gray-300 border-t border-white/20 pt-6 uppercase tracking-wider">
            🎖️ Other Prize Winners
          </h4>

          {/* 4th-10th Positions */}
          <div className="tier tier-4to10">
            <div className="tier-header">
              <Star className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-bold">4th-10th Positions</h3>
            </div>
            <div className="prize-badge">
              <span className="amount">₹2,000 Each</span>
              <p className="description">
                Recognition for demonstrating exceptional skills and dedication
                throughout the program
              </p>
            </div>
          </div>

          {/* 11th-20th Positions */}
          <div className="tier tier-11to20">
            <div className="tier-header">
              <Medal className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-bold">11th-20th Positions</h3>
            </div>
            <div className="prize-badge">
              <span className="amount">₹1,000 Each</span>
              <p className="description">
                Recognition for valuable contributions and active participation
                in the program
              </p>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        <h3 className="text-xl font-bold mb-6">Perks & Benefits</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">
              <Award className="h-5 w-5" />
            </div>
            <span>Certificate of Recognition</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <Gift className="h-5 w-5" />
            </div>
            <span>Goodies, swags, and exclusive merchandise</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <Briefcase className="h-5 w-5" />
            </div>
            <span>Internship opportunities with us</span>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <Zap className="h-5 w-5" />
            </div>
            <span>Performance-based incentives</span>
          </div>
        </div>

        {/* Previous Year Winner */}
        <div className="previous-winner-section"></div>
      </div>
      <style jsx>{`
        .footer {
          background: linear-gradient(to bottom, #1a1a2e, #16213e);
          padding: 3rem 1rem;
          text-align: center;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #eaeaea;
        }
        .footer-content {
          max-width: 1000px;
          margin: 0 auto;
        }
        .header-gradient {
          margin-bottom: 2rem;
        }
        .text-gradient {
          background: linear-gradient(90deg, #ffd700, #ffa500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.8rem;
        }
        .section-divider {
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          margin: 3rem auto;
          max-width: 80%;
        }
        .prize-tiers {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin: 2rem 0;
        }
        .tier {
          width: 100%;
          max-width: 600px;
          padding: 1.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .tier:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        .highlight-top3 {
          border: 2px solid #ffd700;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 0, 0.1),
            rgba(255, 140, 0, 0.08)
          );
        }
        .tier-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .prize-medals {
          display: flex;
          justify-content: space-around;
          gap: 0.5rem;
        }
        .medal {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0.5rem;
          border-radius: 8px;
          width: 30%;
          background: rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }
        .medal:hover {
          transform: scale(1.05);
        }
        .medal-icon {
          position: relative;
          margin-bottom: 0.5rem;
        }
        .position {
          position: absolute;
          bottom: -5px;
          right: -5px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
        }
        .gold {
          background: linear-gradient(
            135deg,
            rgba(255, 215, 0, 0.2),
            rgba(255, 215, 0, 0.05)
          );
          border: 1px solid rgba(255, 215, 0, 0.3);
        }
        .silver {
          background: linear-gradient(
            135deg,
            rgba(192, 192, 192, 0.2),
            rgba(192, 192, 192, 0.05)
          );
          border: 1px solid rgba(192, 192, 192, 0.3);
        }
        .bronze {
          background: linear-gradient(
            135deg,
            rgba(205, 127, 50, 0.2),
            rgba(205, 127, 50, 0.05)
          );
          border: 1px solid rgba(205, 127, 50, 0.3);
        }
        .amount {
          font-weight: 700;
          font-size: 1.2rem;
          margin-top: 0.5rem;
        }
        .prize-badge {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .description {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.4;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin: 0 auto;
          max-width: 900px;
        }
        .benefit-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 10px;
          transition:
            transform 0.2s ease,
            background 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .benefit-item:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.08);
        }
        .benefit-icon {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #eaeaea;
        }
        .previous-winner-section {
          margin-top: 3rem;
        }
        .winner-card {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(255, 215, 0, 0.1),
            rgba(218, 165, 32, 0.05)
          );
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          max-width: 400px;
          margin: 0 auto;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .winner-crown {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #1a1a2e;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffd700;
        }
        .winner-info {
          text-align: left;
          flex: 1;
        }
        .winner-name {
          font-weight: 600;
          font-size: 1.2rem;
        }
      `}</style>
    </footer>
  );
};

export default LeaderboardFooter;
