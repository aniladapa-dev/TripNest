import { motion } from 'framer-motion';
import { Search, Bell, MessageSquare, Sun, ChevronDown, Menu } from 'lucide-react';

import Breadcrumbs from '../ui/Breadcrumbs';

export default function DashboardNavbar({ isCollapsed, setIsCollapsed, setIsMobileOpen }) {
  return (
    <header 
      className="sticky top-0 z-40 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border/50 w-full"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Left: Mobile Menu & Breadcrumbs */}
        <div className="flex items-center gap-4">
          {/* Desktop Toggle */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 -ml-2 text-text-secondary hover:text-primary rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-primary rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu size={24} />
          </button>

          <div className="hidden sm:block mt-6">
            <Breadcrumbs />
          </div>
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          {/* Global Search */}
          <div className="hidden md:flex relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search destinations, trips..."
              className="w-64 pl-10 pr-4 py-2 bg-white/50 border border-border rounded-full text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all focus:w-80"
              aria-label="Search destinations and trips"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-full transition-colors relative" aria-label="Notifications">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
            </button>
            <button className="hidden sm:block p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-full transition-colors" aria-label="Messages">
              <MessageSquare size={20} />
            </button>
            <button 
              className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-full transition-colors" 
              aria-label="Toggle Theme"
              onClick={() => document.documentElement.classList.toggle('dark')}
            >
              <Sun size={20} />
            </button>
          </div>

          <div className="h-8 w-px bg-border mx-1"></div>

          {/* Profile Dropdown (UI Only) */}
          {(() => {
            const userStr = localStorage.getItem('tripnest_user');
            const user = userStr ? JSON.parse(userStr) : null;
            const username = user ? (user.username || user.email) : 'Sarah Jenkins';
            return (
              <button className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer" aria-label="User Profile Menu">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                    alt="User Avatar" 
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-text leading-tight">{username}</p>
                  <p className="text-xs text-text-secondary">{user ? 'Traveler' : 'Pro Member'}</p>
                </div>
                <ChevronDown size={16} className="text-text-muted hidden sm:block" />
              </button>
            );
          })()}

        </div>
      </div>
    </header>
  );
}
