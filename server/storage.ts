import { 
  users, 
  projects, 
  projectTechnologies, 
  type User, 
  type InsertUser, 
  type Project, 
  type InsertProject,
  type ProjectTechnology,
  type InsertProjectTechnology,
  type ProjectWithTechnologies
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project CRUD operations
  getAllProjects(): Promise<ProjectWithTechnologies[]>;
  getFeaturedProjects(): Promise<ProjectWithTechnologies[]>;
  getProject(id: number): Promise<ProjectWithTechnologies | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Project Technology operations
  addTechnologyToProject(technology: InsertProjectTechnology): Promise<ProjectTechnology>;
  getTechnologiesForProject(projectId: number): Promise<ProjectTechnology[]>;
  deleteTechnologyFromProject(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private projectTechnologies: Map<number, ProjectTechnology>;
  currentUserId: number;
  currentProjectId: number;
  currentTechnologyId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.projectTechnologies = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentTechnologyId = 1;
    
    // Initialize with some demo projects
    this.initDemoProjects();
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

  async getAllProjects(): Promise<ProjectWithTechnologies[]> {
    const projectsArray = Array.from(this.projects.values());
    return Promise.all(
      projectsArray.map(async (project) => {
        const technologies = await this.getTechnologiesForProject(project.id);
        return { ...project, technologies };
      })
    );
  }

  async getFeaturedProjects(): Promise<ProjectWithTechnologies[]> {
    const projectsArray = Array.from(this.projects.values()).filter(project => project.featured);
    return Promise.all(
      projectsArray.map(async (project) => {
        const technologies = await this.getTechnologiesForProject(project.id);
        return { ...project, technologies };
      })
    );
  }

  async getProject(id: number): Promise<ProjectWithTechnologies | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const technologies = await this.getTechnologiesForProject(id);
    return { ...project, technologies };
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id, 
      updatedAt: new Date(),
      stars: insertProject.stars || 0,
      forks: insertProject.forks || 0,
      views: insertProject.views || 0,
      featured: insertProject.featured || false
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject: Project = { 
      ...project, 
      ...projectUpdate, 
      updatedAt: new Date() 
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async addTechnologyToProject(insertTechnology: InsertProjectTechnology): Promise<ProjectTechnology> {
    const id = this.currentTechnologyId++;
    const technology: ProjectTechnology = { ...insertTechnology, id };
    this.projectTechnologies.set(id, technology);
    return technology;
  }

  async getTechnologiesForProject(projectId: number): Promise<ProjectTechnology[]> {
    return Array.from(this.projectTechnologies.values())
      .filter(tech => tech.projectId === projectId);
  }

  async deleteTechnologyFromProject(id: number): Promise<boolean> {
    return this.projectTechnologies.delete(id);
  }

  private async initDemoProjects() {
    // Create ecommerce dashboard project
    const project1 = await this.createProject({
      title: "This Website",
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

    // Create task manager project
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

    // Create weather forecast project
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

    // Create blog platform project
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

    // Create file sharing project
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

    // Create recipe app project
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
}

export const storage = new MemStorage();
