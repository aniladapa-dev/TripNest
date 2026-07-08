import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  PlusSquare, 
  ListTodo, 
  MapPin, 
  Wallet, 
  Receipt, 
  FileBox, 
  Users, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plane,
  BarChart3,
  LifeBuoy
} from 'lucide-react';

const menuItems = [
  { group: 'Overview', items: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'My Trips', path: '/dashboard/trips' },
    { icon: PlusSquare, label: 'Create Trip', path: '/dashboard/trips/create' },
  ]},
  { group: 'Planning', items: [
    { icon: ListTodo, label: 'Itinerary', path: '/dashboard/itinerary' },
    { icon: MapPin, label: 'Destinations', path: '/dashboard/destinations' },
    { icon: Wallet, label: 'Budget', path: '/dashboard/budget' },
    { icon: Receipt, label: 'Expenses', path: '/dashboard/expenses' },
  ]},
  { group: 'Manage', items: [
    { icon: FileBox, label: 'Documents', path: '/dashboard/documents' },
    { icon: Users, label: 'Travel Groups', path: '/dashboard/groups' },
    { icon: BarChart3, label: 'Reports & Analytics', path: '/dashboard/reports' },
  ]},
  { group: 'Account', items: [
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications', badge: 3 },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: LifeBuoy, label: 'Help & Support', path: '/dashboard/help' },
  ]}
];

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  // Mobile overlay click handler
  const handleOverlayClick = () => setIsMobileOpen(false);

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-between border-b border-border/50">
        <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-8' : 'w-full'}`}>
          <motion.div whileHover={{ rotate: 15 }} className="shrink-0">
            <Plane className="w-8 h-8 text-primary" />
          </motion.div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold font-heading gradient-text whitespace-nowrap"
            >
              TripNest
            </motion.span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar">
        {menuItems.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            {!isCollapsed && (
              <p className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                {group.group}
              </p>
            )}
            
            {group.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  end={item.path === '/dashboard' || item.path === '/dashboard/trips'}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) => `
                    relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer
                    ${isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-text-secondary hover:bg-primary/5 hover:text-primary'}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active Indicator Line */}
                      {isActive && !isCollapsed && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                        />
                      )}
                      
                      <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                      
                      {!isCollapsed && (
                        <span className="font-medium whitespace-nowrap flex-1">{item.label}</span>
                      )}

                      {/* Badge */}
                      {!isCollapsed && item.badge && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-primary' : 'bg-accent text-white'}`}>
                          {item.badge}
                        </span>
                      )}

                      {/* Floating Tooltip for Collapsed State */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-4 px-2 py-1 bg-dark text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none shadow-xl">
                          {item.label}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border/50">
        <NavLink
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors group cursor-pointer"
          title={isCollapsed ? 'Log out' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span className="font-medium whitespace-nowrap">Log out</span>}
        </NavLink>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        animate={{ width: isCollapsed ? '88px' : '280px' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="hidden lg:flex flex-col h-screen fixed left-0 top-0 bg-white/80 backdrop-blur-xl border-r border-border/50 z-40 shadow-sm"
      >
        <SidebarContent />
      </motion.aside>

      {/* ── Mobile Sidebar Drawer ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={handleOverlayClick}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white flex flex-col z-50 shadow-2xl lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
