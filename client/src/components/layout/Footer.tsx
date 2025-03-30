import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">Bruce Maber</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">/dev</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Versatile Software Developer: Web, Windows, and Networking
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:brucemaber@hotmail.com" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <i className="fas fa-envelope mr-1"></i> brucemaber@hotmail.com
            </a>
            <a href="https://github.com/superbrucem" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <i className="fab fa-github mr-1"></i> GitHub
            </a>
            <a href="https://twitter.com/BruceM33976060" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <i className="fab fa-twitter mr-1"></i> Twitter
            </a>
            <a href="https://www.linkedin.com/in/bruce-maber-40b75445" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <i className="fab fa-linkedin-in mr-1"></i> LinkedIn
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Bruce Maber. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
