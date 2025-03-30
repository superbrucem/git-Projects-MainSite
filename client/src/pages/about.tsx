import { motion } from "framer-motion";

const SKILLS = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Tailwind CSS",
    "Redux"
  ],
  backend: [
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "REST APIs",
    "Firebase"
  ],
  tools: [
    "Git",
    "Docker",
    "AWS",
    "Vercel",
    "CI/CD",
    "Jest",
    "Figma"
  ]
} as const;

const SkillSection = ({ title, skills, colorClass }: { 
  title: string; 
  skills: string[];
  colorClass: string;
}) => (
  <div className="mb-8">
    <h3 className="text-lg font-medium mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span 
          key={skill}
          className={`px-3 py-1.5 rounded-full ${colorClass}`}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const About = () => {
  return (
    <motion.section 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8">About Me</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="aspect-square w-2/3 mx-auto overflow-hidden rounded-lg mb-6">
              <img 
                src="/images/bruce-profile.png" 
                alt="Bruce Maber" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <a href="https://github.com/superbrucem" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://twitter.com/BruceM33976060" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/in/bruce-maber-40b7544" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="mailto:brucemaber@hotmail.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
            
            <a 
              href="https://docs.google.com/document/d/11hMlzQJy4SEK87YyUfTNGT9mDsH0jGyZ/edit?usp=sharing&ouid=101015884027473602779&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-primary/90 hover:text-black transition-colors"
            >
              <i className="fas fa-download mr-2"></i> Download Resume
            </a>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Hi there! I'm Bruce Maber, a developer with 20+ years of experience building web applications and others. 
              I specialize in Node.js, .net, PHP and modern JavaScript frameworks.
            </p>
            
            <p className="mb-6">
            My journey in software development began during my Physics studies at Carleton University, where I discovered my passion for creating intuitive and efficient web experiences. Since then, I've worked with startups, government and established companies to deliver high-quality software solutions.
            </p>
            
            <p className="mb-6">
            I'm passionate about open source, and learning new things. When I'm not coding, you can find me jogging, eskate and reading tech blogs, or experimenting with new technologies.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Skills</h2>

            <SkillSection 
              title="Frontend" 
              skills={[...SKILLS.frontend]}
              colorClass="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
            />

            <SkillSection 
              title="Backend" 
              skills={[...SKILLS.backend]}
              colorClass="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
            />

            <SkillSection 
              title="Tools & Other" 
              skills={[...SKILLS.tools]}
              colorClass="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
            />

            <h2 className="text-2xl font-bold mt-8 mb-4">Experience</h2>
            
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">For the most current information, please refer to the attached resume.</h3>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Education</h2>
            
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <h3 className="text-lg font-medium">BSc in Physics</h3>
              </div>
              <p className="text-primary">Carleton University</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;





