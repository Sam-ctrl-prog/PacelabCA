// pages/dashboard.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, you would fetch this from an API
    const mockData = [
      {
        id: 1,
        name: "Aditya Singh",
        college: "IIT Bombay",
        bio: "Passionate about tech and innovation!",
        points: 2150
      },
      {
        id: 2,
        name: "Priya Sharma",
        college: "NIT Trichy",
        bio: "Helping students connect with opportunities",
        points: 1890
      },
      {
        id: 3,
        name: "Mohammed Imran",
        college: "BITS Pilani",
        bio: "Tech enthusiast and community builder",
        points: 1780
      },
      {
        id: 4,
        name: "Anjali Gupta",
        college: "Delhi University",
        bio: "Turning ideas into reality",
        points: 1520
      },
      {
        id: 5,
        name: "Rahul Verma",
        college: "VIT Vellore",
        bio: "Code, coffee, and community",
        points: 1350
      },
      {
        id: 6,
        name: "Sneha Patel",
        college: "IIIT Hyderabad",
        bio: "Empowering students one event at a time",
        points: 1240
      },
      {
        id: 7,
        name: "Karthik Reddy",
        college: "IISC Bangalore",
        bio: "Creating impact through technology",
        points: 1150
      },
      {
        id: 8,
        name: "Nikhil Joshi",
        college: "MNIT Jaipur",
        bio: "Building bridges between campus and industry",
        points: 980
      },
      {
        id: 9,
        name: "Tanvi Mehta",
        college: "SRM University",
        bio: "Bringing innovation to campus",
        points: 920
      },
      {
        id: 10,
        name: "Arjun Nair",
        college: "Manipal Institute of Technology",
        bio: "Passionate about democratizing education",
        points: 870
      },
      {
        id: 11,
        name: "Divya Krishnan",
        college: "PSG Tech",
        bio: "Helping peers discover their potential",
        points: 790
      },
      {
        id: 12,
        name: "Vikram Singh",
        college: "KIIT University",
        bio: "Bridging the gap between theory and practice",
        points: 730
      }
    ];

    // Sort by points in descending order
    const sortedData = mockData.sort((a, b) => b.points - a.points);
    
    // Simulate a network delay
    setTimeout(() => {
      setAmbassadors(sortedData);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Campus Ambassador Leaderboard</title>
        <meta name="description" content="Leaderboard of top Campus Ambassadors" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Campus Ambassador Leaderboard</h1>
      </header>

      <main className={styles.main}>
        {loading ? (
          <div className={styles.loading}>Loading leaderboard...</div>
        ) : (
          <div className={styles.grid}>
            {ambassadors.map((ambassador, index) => (
              <div 
                key={ambassador.id} 
                className={`${styles.card} ${index === 0 ? styles.gold : index === 1 ? styles.silver : index === 2 ? styles.bronze : ''}`}
              >
                <div className={styles.rankBadge}>#{index + 1}</div>
                <h2>{ambassador.name}</h2>
                <h3>{ambassador.college}</h3>
                <p className={styles.bio}>"{ambassador.bio}"</p>
                <div className={styles.points}>
                  <span>{ambassador.points}</span> points
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Top 3 CAs get Hoodies, Accommodation, Certificates</p>
      </footer>
    </div>
  );
}