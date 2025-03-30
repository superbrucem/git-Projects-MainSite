import { ProjectWithTechnologies } from "@shared/schema";

interface ProjectCardProps {
  project: ProjectWithTechnologies;
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  const lastUpdated = () => {
    const updatedDate = new Date(project.updatedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - updatedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      return `Updated ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Updated ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Updated ${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `Updated ${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  if (featured) {
    return (
      <div className="group rounded-lg border border-gray-200 dark:border-gray-800 bg-card overflow-hidden hover:shadow-md transition-all duration-200">
        <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
          {project.imageUrl && (
            <img 
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <span className="flex items-center"><i className="fas fa-star mr-1"></i> {project.stars}</span>
              <span className="flex items-center"><i className="fas fa-code-branch mr-1"></i> {project.forks}</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => {
              // Map categories to color classes
              const colorClass = 
                tech.category === "frontend" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" :
                tech.category === "backend" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" :
                tech.category === "database" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" :
                tech.category === "language" ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" :
                tech.category === "mobile" ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300" :
                tech.category === "state" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300" :
                tech.category === "styling" ? "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300" :
                "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
                
              return (
                <span key={tech.id} className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
                  {tech.technology}
                </span>
              );
            })}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">{lastUpdated()}</span>
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <i className="fab fa-github mr-1"></i> View Repo
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Non-featured card (compact version for Projects page)
  return (
    <div className="group rounded-lg border border-gray-200 dark:border-gray-800 bg-card overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <a 
            href={project.repoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <i className="fab fa-github text-lg"></i>
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => {
            // Map categories to color classes
            const colorClass = 
              tech.category === "frontend" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" :
              tech.category === "backend" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" :
              tech.category === "database" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" :
              tech.category === "language" ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" :
              tech.category === "mobile" ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300" :
              tech.category === "state" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300" :
              tech.category === "styling" ? "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300" :
              "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
              
            return (
              <span key={tech.id} className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
                {tech.technology}
              </span>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <span className="flex items-center"><i className="fas fa-star mr-1"></i> {project.stars}</span>
            <span className="flex items-center"><i className="fas fa-code-branch mr-1"></i> {project.forks}</span>
            <span className="flex items-center"><i className="fas fa-eye mr-1"></i> {project.views}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{lastUpdated()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
