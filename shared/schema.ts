import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  repoUrl: text("repo_url").notNull(),
  imageUrl: text("image_url"),
  stars: integer("stars").default(0),
  forks: integer("forks").default(0),
  views: integer("views").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
  featured: boolean("featured").default(false),
});

export const projectTechnologies = pgTable("project_technologies", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  technology: text("technology").notNull(),
  category: text("category").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  updatedAt: true,
});

export const insertProjectTechnologySchema = createInsertSchema(projectTechnologies).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertProjectTechnology = z.infer<typeof insertProjectTechnologySchema>;
export type ProjectTechnology = typeof projectTechnologies.$inferSelect;

export type ProjectWithTechnologies = Project & {
  technologies: ProjectTechnology[];
};
