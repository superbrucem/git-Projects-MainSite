import { useState } from "react";
import { ProjectWithTechnologies } from "@shared/schema";

interface ProjectFilterProps {
  projects: ProjectWithTechnologies[];
  onFilteredProjectsChange: (filteredProjects: ProjectWithTechnologies[]) => void;
}

const ProjectFilter = ({ projects, onFilteredProjectsChange }: ProjectFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState("");
  const [sortBy, setSortBy] = useState("updated");

  // Get unique technologies from all projects
  const uniqueTechnologies = projects.reduce((acc: string[], project) => {
    project.technologies.forEach(tech => {
      if (!acc.includes(tech.technology.toLowerCase())) {
        acc.push(tech.technology.toLowerCase());
      }
    });
    return acc;
  }, []);

  // Handle filter changes
  const handleFilterChange = () => {
    let filtered = [...projects];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by technology
    if (techFilter) {
      filtered = filtered.filter(project => 
        project.technologies.some(tech => 
          tech.technology.toLowerCase() === techFilter.toLowerCase()
        )
      );
    }

    // Sort projects
    switch (sortBy) {
      case "updated":
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case "stars":
        filtered.sort((a, b) => b.stars - a.stars);
        break;
      case "forks":
        filtered.sort((a, b) => b.forks - a.forks);
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        break;
      default:
        break;
    }

    onFilteredProjectsChange(filtered);
  };

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          <i className="fas fa-search"></i>
        </div>
        <input 
          type="text" 
          className="block w-full rounded-md border bg-transparent border-gray-300 dark:border-gray-700 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
        />
      </div>
      <div className="flex gap-2">
        <select 
          className="rounded-md border bg-transparent border-gray-300 dark:border-gray-700 px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          value={techFilter}
          onChange={(e) => {
            setTechFilter(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">All Technologies</option>
          {uniqueTechnologies.map((tech, index) => (
            <option key={index} value={tech}>
              {tech.charAt(0).toUpperCase() + tech.slice(1)}
            </option>
          ))}
        </select>
        <select 
          className="rounded-md border bg-transparent border-gray-300 dark:border-gray-700 px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="updated">Recently Updated</option>
          <option value="stars">Most Stars</option>
          <option value="forks">Most Forks</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default ProjectFilter;
