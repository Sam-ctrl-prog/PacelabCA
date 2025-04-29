import { users, type User, type InsertUser, campusAmbassadors, type CampusAmbassador, type InsertCampusAmbassador, type Achievement } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Campus Ambassador methods
  getAllCampusAmbassadors(): Promise<CampusAmbassador[]>;
  getCampusAmbassador(id: number): Promise<CampusAmbassador | undefined>;
  createCampusAmbassador(ca: InsertCampusAmbassador): Promise<CampusAmbassador>;
  updateCampusAmbassadorPoints(id: number, points: number): Promise<CampusAmbassador | undefined>;
  
  // Achievement methods
  addAchievement(caId: number, achievement: Achievement): Promise<CampusAmbassador | undefined>;
  updateCampusAmbassadorStats(
    id: number, 
    stats: { 
      eventsHosted?: number; 
      referrals?: number; 
      socialShares?: number; 
      streak?: number;
      level?: number;
    }
  ): Promise<CampusAmbassador | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private ambassadors: Map<number, CampusAmbassador>;
  currentUserId: number;
  currentAmbassadorId: number;

  constructor() {
    this.users = new Map();
    this.ambassadors = new Map();
    this.currentUserId = 1;
    this.currentAmbassadorId = 1;
    
    // Initialize with some mock campus ambassador data
    this.seedCampusAmbassadors();
  }

  private seedCampusAmbassadors() {
    const mockAmbassadors: InsertCampusAmbassador[] = [
      {
        name: "Aisha Patel",
        college: "Indian Institute of Technology, Bombay",
        bio: "Passionate about technology and innovation!",
        points: 1250
      },
      {
        name: "Raj Sharma",
        college: "Delhi Technological University",
        bio: "Dedicated to connecting students with opportunities",
        points: 980
      },
      {
        name: "Priya Singh",
        college: "National Institute of Technology, Trichy",
        bio: "Aspiring entrepreneur and community builder",
        points: 1120
      },
      {
        name: "Arjun Mehta",
        college: "BITS Pilani",
        bio: "Tech enthusiast and coding ninja!",
        points: 850
      },
      {
        name: "Neha Gupta",
        college: "VIT Vellore",
        bio: "Creating impact through education and outreach",
        points: 920
      },
      {
        name: "Vikram Krishnan",
        college: "IIT Madras",
        bio: "Bringing innovation to every campus corner",
        points: 1450
      },
      {
        name: "Meera Joshi",
        college: "IIIT Hyderabad",
        bio: "Building bridges between academia and industry",
        points: 780
      },
      {
        name: "Karthik Reddy",
        college: "Manipal Institute of Technology",
        bio: "Passionate about entrepreneurship and leadership",
        points: 890
      },
      {
        name: "Ananya Desai",
        college: "SRM University",
        bio: "Transforming ideas into impact",
        points: 680
      },
      {
        name: "Ravi Kumar",
        college: "Thapar Institute of Engineering",
        bio: "Connecting communities through tech events",
        points: 1050
      },
      {
        name: "Shreya Malhotra",
        college: "Punjab Engineering College",
        bio: "Empowering students to reach their potential",
        points: 760
      },
      {
        name: "Akash Verma",
        college: "NIT Surathkal",
        bio: "Bridging the gap between theory and practice",
        points: 830
      }
    ];

    mockAmbassadors.forEach(ambassador => {
      this.createCampusAmbassador(ambassador);
    });
    
    // Add some achievement examples to top ambassadors
    const vikramAmbassador = Array.from(this.ambassadors.values()).find(a => a.name === "Vikram Krishnan");
    if (vikramAmbassador) {
      this.addAchievement(vikramAmbassador.id, {
        id: "top-performer-1",
        type: "top_performer",
        name: "Top Performer",
        description: "Ranked #1 on the leaderboard",
        icon: "trophy",
        level: 3,
        dateAwarded: new Date().toISOString()
      });
      
      this.addAchievement(vikramAmbassador.id, {
        id: "events-gold",
        type: "events_hosted",
        name: "Event Master",
        description: "Hosted 10+ campus events",
        icon: "calendar",
        level: 3,
        dateAwarded: new Date().toISOString()
      });
      
      this.updateCampusAmbassadorStats(vikramAmbassador.id, {
        level: 5,
        eventsHosted: 12,
        referrals: 25,
        socialShares: 40,
        streak: 30
      });
    }
    
    const aishaAmbassador = Array.from(this.ambassadors.values()).find(a => a.name === "Aisha Patel");
    if (aishaAmbassador) {
      this.addAchievement(aishaAmbassador.id, {
        id: "referrals-silver",
        type: "referrals",
        name: "Referral Pro",
        description: "Referred 15+ students to Pacelab",
        icon: "users",
        level: 2,
        dateAwarded: new Date().toISOString()
      });
      
      this.updateCampusAmbassadorStats(aishaAmbassador.id, {
        level: 4,
        eventsHosted: 6,
        referrals: 15,
        socialShares: 22,
        streak: 14
      });
    }
    
    const priyaAmbassador = Array.from(this.ambassadors.values()).find(a => a.name === "Priya Singh");
    if (priyaAmbassador) {
      this.addAchievement(priyaAmbassador.id, {
        id: "social-bronze",
        type: "social_shares",
        name: "Social Butterfly",
        description: "Shared content on 10+ platforms",
        icon: "share",
        level: 1,
        dateAwarded: new Date().toISOString()
      });
      
      this.updateCampusAmbassadorStats(priyaAmbassador.id, {
        level: 3,
        eventsHosted: 3,
        referrals: 8,
        socialShares: 10,
        streak: 8
      });
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCampusAmbassadors(): Promise<CampusAmbassador[]> {
    // Return sorted by points in descending order and assign ranks
    const ambassadors = Array.from(this.ambassadors.values())
      .sort((a, b) => b.points - a.points)
      .map((ambassador, index) => {
        return { ...ambassador, rank: index + 1 };
      });
    
    return ambassadors;
  }

  async getCampusAmbassador(id: number): Promise<CampusAmbassador | undefined> {
    return this.ambassadors.get(id);
  }

  async createCampusAmbassador(insertCampusAmbassador: InsertCampusAmbassador): Promise<CampusAmbassador> {
    const id = this.currentAmbassadorId++;
    const campusAmbassador: CampusAmbassador = { 
      ...insertCampusAmbassador, 
      // Ensure points is always set
      points: insertCampusAmbassador.points ?? 0,
      id,
      rank: null, // Rank will be calculated when retrieving all ambassadors
      level: 1,
      achievements: [],
      eventsHosted: 0,
      referrals: 0,
      socialShares: 0,
      streak: 0
    };
    this.ambassadors.set(id, campusAmbassador);
    return campusAmbassador;
  }

  async updateCampusAmbassadorPoints(id: number, points: number): Promise<CampusAmbassador | undefined> {
    const ambassador = this.ambassadors.get(id);
    if (!ambassador) return undefined;
    
    const updatedAmbassador: CampusAmbassador = {
      ...ambassador,
      points
    };
    
    this.ambassadors.set(id, updatedAmbassador);
    return updatedAmbassador;
  }
  
  async addAchievement(caId: number, achievement: Achievement): Promise<CampusAmbassador | undefined> {
    const ambassador = this.ambassadors.get(caId);
    if (!ambassador) return undefined;
    
    // Add the new achievement
    const achievements = [...(ambassador.achievements || []), achievement];
    
    const updatedAmbassador: CampusAmbassador = {
      ...ambassador,
      achievements
    };
    
    this.ambassadors.set(caId, updatedAmbassador);
    return updatedAmbassador;
  }
  
  async updateCampusAmbassadorStats(
    id: number, 
    stats: { 
      eventsHosted?: number; 
      referrals?: number; 
      socialShares?: number; 
      streak?: number;
      level?: number;
    }
  ): Promise<CampusAmbassador | undefined> {
    const ambassador = this.ambassadors.get(id);
    if (!ambassador) return undefined;
    
    const updatedAmbassador: CampusAmbassador = {
      ...ambassador,
      eventsHosted: stats.eventsHosted !== undefined ? stats.eventsHosted : ambassador.eventsHosted,
      referrals: stats.referrals !== undefined ? stats.referrals : ambassador.referrals,
      socialShares: stats.socialShares !== undefined ? stats.socialShares : ambassador.socialShares,
      streak: stats.streak !== undefined ? stats.streak : ambassador.streak,
      level: stats.level !== undefined ? stats.level : ambassador.level
    };
    
    this.ambassadors.set(id, updatedAmbassador);
    return updatedAmbassador;
  }
}

export const storage = new MemStorage();
