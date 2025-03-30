// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";
import express from "express";
import path from "path";
import { readFile } from "fs/promises";

// server/storage.ts
var MemStorage = class {
  users;
  projects;
  projectTechnologies;
  currentUserId;
  currentProjectId;
  currentTechnologyId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.projectTechnologies = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentTechnologyId = 1;
    this.initDemoProjects();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getAllProjects() {
    const projectsArray = Array.from(this.projects.values());
    return Promise.all(
      projectsArray.map(async (project) => {
        const technologies = await this.getTechnologiesForProject(project.id);
        return { ...project, technologies };
      })
    );
  }
  async getFeaturedProjects() {
    const projectsArray = Array.from(this.projects.values()).filter((project) => project.featured);
    return Promise.all(
      projectsArray.map(async (project) => {
        const technologies = await this.getTechnologiesForProject(project.id);
        return { ...project, technologies };
      })
    );
  }
  async getProject(id) {
    const project = this.projects.get(id);
    if (!project) return void 0;
    const technologies = await this.getTechnologiesForProject(id);
    return { ...project, technologies };
  }
  async createProject(insertProject) {
    const id = this.currentProjectId++;
    const project = {
      ...insertProject,
      id,
      updatedAt: /* @__PURE__ */ new Date(),
      stars: insertProject.stars || 0,
      forks: insertProject.forks || 0,
      views: insertProject.views || 0,
      featured: insertProject.featured || false
    };
    this.projects.set(id, project);
    return project;
  }
  async updateProject(id, projectUpdate) {
    const project = this.projects.get(id);
    if (!project) return void 0;
    const updatedProject = {
      ...project,
      ...projectUpdate,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  async deleteProject(id) {
    return this.projects.delete(id);
  }
  async addTechnologyToProject(insertTechnology) {
    const id = this.currentTechnologyId++;
    const technology = { ...insertTechnology, id };
    this.projectTechnologies.set(id, technology);
    return technology;
  }
  async getTechnologiesForProject(projectId) {
    return Array.from(this.projectTechnologies.values()).filter((tech) => tech.projectId === projectId);
  }
  async deleteTechnologyFromProject(id) {
    return this.projectTechnologies.delete(id);
  }
  async initDemoProjects() {
    const project1 = await this.createProject({
      title: "E-commerce Dashboard",
      description: "A modern dashboard for e-commerce analytics with real-time data visualization.",
      repoUrl: "https://github.com/brucemaber/ecommerce-dashboard",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      stars: 45,
      forks: 12,
      views: 156,
      featured: true
    });
    await this.addTechnologyToProject({
      projectId: project1.id,
      technology: "React",
      category: "frontend"
    });
    await this.addTechnologyToProject({
      projectId: project1.id,
      technology: "Node.js",
      category: "backend"
    });
    await this.addTechnologyToProject({
      projectId: project1.id,
      technology: "GraphQL",
      category: "backend"
    });
    const project2 = await this.createProject({
      title: "Task Manager App",
      description: "A productivity app for managing tasks with drag-and-drop interface and reminders.",
      repoUrl: "https://github.com/brucemaber/task-manager",
      imageUrl: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      stars: 32,
      forks: 8,
      views: 98,
      featured: true
    });
    await this.addTechnologyToProject({
      projectId: project2.id,
      technology: "Next.js",
      category: "frontend"
    });
    await this.addTechnologyToProject({
      projectId: project2.id,
      technology: "Firebase",
      category: "backend"
    });
    await this.addTechnologyToProject({
      projectId: project2.id,
      technology: "TypeScript",
      category: "language"
    });
    const project3 = await this.createProject({
      title: "Weather Forecast",
      description: "A beautiful weather forecast application with animated visualizations.",
      repoUrl: "https://github.com/brucemaber/weather-forecast",
      imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      stars: 27,
      forks: 5,
      views: 84,
      featured: true
    });
    await this.addTechnologyToProject({
      projectId: project3.id,
      technology: "React",
      category: "frontend"
    });
    await this.addTechnologyToProject({
      projectId: project3.id,
      technology: "JavaScript",
      category: "language"
    });
    await this.addTechnologyToProject({
      projectId: project3.id,
      technology: "SCSS",
      category: "styling"
    });
    const project4 = await this.createProject({
      title: "Blog Platform",
      description: "A full-featured blog platform with markdown support, user authentication, and commenting system.",
      repoUrl: "https://github.com/brucemaber/blog-platform",
      imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      stars: 24,
      forks: 7,
      views: 78,
      featured: false
    });
    await this.addTechnologyToProject({
      projectId: project4.id,
      technology: "Next.js",
      category: "frontend"
    });
    await this.addTechnologyToProject({
      projectId: project4.id,
      technology: "Prisma",
      category: "database"
    });
    await this.addTechnologyToProject({
      projectId: project4.id,
      technology: "TypeScript",
      category: "language"
    });
    const project5 = await this.createProject({
      title: "File Sharing App",
      description: "A secure file sharing application with end-to-end encryption and expiring links.",
      repoUrl: "https://github.com/brucemaber/file-sharing",
      imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      stars: 18,
      forks: 3,
      views: 67,
      featured: false
    });
    await this.addTechnologyToProject({
      projectId: project5.id,
      technology: "React",
      category: "frontend"
    });
    await this.addTechnologyToProject({
      projectId: project5.id,
      technology: "Node.js",
      category: "backend"
    });
    await this.addTechnologyToProject({
      projectId: project5.id,
      technology: "Express",
      category: "backend"
    });
    const project6 = await this.createProject({
      title: "Recipe App",
      description: "A recipe discovery and management app with meal planning and shopping list features.",
      repoUrl: "https://github.com/brucemaber/recipe-app",
      imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      stars: 15,
      forks: 2,
      views: 42,
      featured: false
    });
    await this.addTechnologyToProject({
      projectId: project6.id,
      technology: "React Native",
      category: "mobile"
    });
    await this.addTechnologyToProject({
      projectId: project6.id,
      technology: "Redux",
      category: "state"
    });
    await this.addTechnologyToProject({
      projectId: project6.id,
      technology: "Firebase",
      category: "backend"
    });
  }
};
var storage = new MemStorage();

// server/routes.ts
import { fileURLToPath } from "url";
import { dirname } from "path";
async function registerRoutes(app2) {
  const httpServer = createServer(app2);
  app2.use(express.static(path.join(process.cwd(), "public")));
  const apiPrefix = "/api";
  app2.get(`${apiPrefix}/home`, async (_req, res) => {
    try {
      const __filename3 = fileURLToPath(import.meta.url);
      const __dirname3 = dirname(__filename3);
      const filePath = path.join(__dirname3, "data", "home.json");
      console.log("Current working directory:", process.cwd());
      console.log("Attempting to read file from:", filePath);
      if (!fs.existsSync(filePath)) {
        console.error(`File not found at path: ${filePath}`);
        return res.status(500).json({ message: "Home data file not found" });
      }
      const homeData = await readFile(filePath, "utf-8");
      const parsedData = JSON.parse(homeData);
      console.log("Successfully loaded home data:", parsedData.featuredProjects?.length, "featured projects found");
      res.json(parsedData);
    } catch (error) {
      console.error("Error fetching home data:", error);
      console.error("Error details:", error instanceof Error ? error.stack : String(error));
      res.status(500).json({ message: "Failed to fetch home data" });
    }
  });
  app2.get(`${apiPrefix}/projects`, async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.get(`${apiPrefix}/projects/featured`, async (req, res) => {
    try {
      const featuredProjects = await storage.getFeaturedProjects();
      res.json(featuredProjects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });
  app2.get(`${apiPrefix}/projects/:id`, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error(`Error fetching project ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs2 from "fs";
import path3, { dirname as dirname3 } from "path";
import { fileURLToPath as fileURLToPath3 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path2, { dirname as dirname2 } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath as fileURLToPath2 } from "url";
var __filename = fileURLToPath2(import.meta.url);
var __dirname = dirname2(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(__dirname, "client", "src"),
      "@shared": path2.resolve(__dirname, "shared")
    }
  },
  root: path2.resolve(__dirname, "client"),
  build: {
    outDir: path2.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath3(import.meta.url);
var __dirname2 = dirname3(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(__dirname2, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  server.listen(5e3, "127.0.0.1", () => {
    log(`serving on port 5000`);
  });
})();
