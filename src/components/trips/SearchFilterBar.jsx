import { Search, Filter, SortDesc, LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function SearchFilterBar({ 
  searchQuery, setSearchQuery, 
  statusFilter, setStatusFilter, 
  sortOrder, setSortOrder,
  viewMode, setViewMode 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[20px] border border-border/50 p-4 shadow-sm flex flex-col md:flex-row items-center gap-4 z-10 relative"
    >
      {/* Search */}
      <div className="relative flex-1 w-full group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search trips, destinations, or countries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-border rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar shrink-0">
        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-10 pr-8 py-3 bg-white border border-border rounded-xl text-sm font-medium text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer min-w-[140px]"
          >
            <option value="All">All Statuses</option>
            <option value="Planning">Planning</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>
          <Filter className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none pl-10 pr-8 py-3 bg-white border border-border rounded-xl text-sm font-medium text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer min-w-[150px]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="budget-high">Budget (High - Low)</option>
            <option value="budget-low">Budget (Low - High)</option>
            <option value="alphabetical">A - Z</option>
          </select>
          <SortDesc className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:text-text'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-text-muted hover:text-text'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
