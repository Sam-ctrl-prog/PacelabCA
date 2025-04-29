import { pgTable, text, serial, integer, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Achievement Badge Types
export const AchievementType = {
  EVENTS_HOSTED: "events_hosted",
  REFERRALS: "referrals",
  SOCIAL_SHARES: "social_shares",
  TOP_PERFORMER: "top_performer",
  CONSISTENT: "consistent",
  LONGTERM: "longterm",
  FIRST_EVENT: "first_event"
} as const;

// Achievement Badge Schema
export const achievementSchema = z.object({
  id: z.string(),
  type: z.enum([
    AchievementType.EVENTS_HOSTED,
    AchievementType.REFERRALS,
    AchievementType.SOCIAL_SHARES,
    AchievementType.TOP_PERFORMER,
    AchievementType.CONSISTENT,
    AchievementType.LONGTERM,
    AchievementType.FIRST_EVENT
  ]),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  level: z.number().min(1).max(3),
  dateAwarded: z.string().datetime(),
});

export type Achievement = z.infer<typeof achievementSchema>;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const campusAmbassadors = pgTable("campus_ambassadors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  college: varchar("college", { length: 200 }).notNull(),
  bio: text("bio").notNull(),
  points: integer("points").notNull().default(0),
  rank: integer("rank"),
  level: integer("level").notNull().default(1),
  achievements: jsonb("achievements").$type<Achievement[]>().default([]),
  eventsHosted: integer("events_hosted").notNull().default(0),
  referrals: integer("referrals").notNull().default(0),
  socialShares: integer("social_shares").notNull().default(0),
  streak: integer("streak").notNull().default(0),
});

export const insertCampusAmbassadorSchema = createInsertSchema(campusAmbassadors).omit({
  id: true,
  rank: true,
  achievements: true,
  level: true,
  eventsHosted: true,
  referrals: true,
  socialShares: true,
  streak: true
});

export type InsertCampusAmbassador = z.infer<typeof insertCampusAmbassadorSchema>;
export type CampusAmbassador = typeof campusAmbassadors.$inferSelect;
