import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6 overflow-x-auto pb-2 scrollbar-hide">
      <Link 
        to="/" 
        className="flex items-center hover:text-primary transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        // Capitalize and replace hyphens with spaces
        const label = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-4 h-4 opacity-50 flex-shrink-0" />
            {isLast ? (
              <span className="font-medium text-text whitespace-nowrap">
                {label}
              </span>
            ) : (
              <Link 
                to={routeTo} 
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
