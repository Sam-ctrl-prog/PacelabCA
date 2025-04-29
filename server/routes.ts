import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCampusAmbassadorSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all campus ambassadors
  app.get("/api/campus-ambassadors", async (req, res) => {
    try {
      const ambassadors = await storage.getAllCampusAmbassadors();
      res.json(ambassadors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campus ambassadors" });
    }
  });

  // API route to get a specific campus ambassador by ID
  app.get("/api/campus-ambassadors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const ambassador = await storage.getCampusAmbassador(id);
      if (!ambassador) {
        return res.status(404).json({ message: "Campus ambassador not found" });
      }

      res.json(ambassador);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campus ambassador" });
    }
  });

  // API route to create a new campus ambassador
  app.post("/api/campus-ambassadors", async (req, res) => {
    try {
      const validatedData = insertCampusAmbassadorSchema.parse(req.body);
      const newAmbassador = await storage.createCampusAmbassador(validatedData);
      res.status(201).json(newAmbassador);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create campus ambassador" });
    }
  });

  // API route to update a campus ambassador's points
  app.patch("/api/campus-ambassadors/:id/points", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const pointsSchema = z.object({ points: z.number().int().positive() });
      const { points } = pointsSchema.parse(req.body);

      const updatedAmbassador = await storage.updateCampusAmbassadorPoints(id, points);
      if (!updatedAmbassador) {
        return res.status(404).json({ message: "Campus ambassador not found" });
      }

      res.json(updatedAmbassador);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update campus ambassador points" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
