import { motion } from 'framer-motion';
import { Calendar, LayoutList, Columns, Clock } from 'lucide-react';
import Button from '../ui/Button';
import { formatINR } from '../../utils/currency';

export default function ItineraryHeader({ trip, trips = [], activities = [], viewMode, setViewMode, onAddActivity }) {
  if (!trip) return null;

  // Calculate dynamic stats
  const totalActivities = activities.length;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const completed = activities.filter(a => {
    if (!a.date) return false;
    return a.date < todayStr || a.status === 'Completed';
  }).length;

  const estCost = activities.reduce((sum, a) => {
    const val = parseFloat(String(a.cost || '0').replace(/[^\d.]/g, ''));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const calculateTotalHours = (acts) => {
    let totalMin = 0;
    acts.forEach(a => {
      const dur = String(a.duration || '').toLowerCase();
      const hMatch = dur.match(/(\d+)\s*h/);
      const mMatch = dur.match(/(\d+)\s*m/);
      if (hMatch) totalMin += parseInt(hMatch[1], 10) * 60;
      if (mMatch) totalMin += parseInt(mMatch[1], 10);
      if (!hMatch && !mMatch) {
        const num = parseInt(dur, 10);
        if (!isNaN(num)) totalMin += num * 60;
      }
    });
    return Math.round(totalMin / 60);
  };

  const totalHours = calculateTotalHours(activities);

  return (
    <div className="bg-white rounded-[24px] p-6 border border-border/50 shadow-sm relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Left: Trip Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
              {trip.status || 'Planning'}
            </span>
            <span className="text-sm font-semibold text-text-secondary flex items-center gap-1">
              <Calendar size={14} />
              {trip.duration || 0} Days
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1">
            <h1 className="text-3xl font-heading font-bold text-text">{trip.name}</h1>
            {trips.length > 1 && (
              <select
                value={trip.id}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  window.location.search = `?tripId=${selectedId}`;
                }}
                className="bg-gray-50 border border-border rounded-xl px-3 py-1.5 text-sm font-semibold text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm hover:border-text-muted transition-all"
              >
                {trips.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            )}
          </div>
          <p className="text-text-secondary font-medium">Destination: {trip.destination}</p>
        </div>

        {/* Right: Actions & View Toggles */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          
          {/* View Toggles */}
          <div className="flex bg-gray-100 p-1.5 rounded-xl w-full sm:w-auto justify-center">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold ${viewMode === 'timeline' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text'}`}
            >
              <LayoutList size={16} /> <span className="hidden sm:inline">Timeline</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold ${viewMode === 'calendar' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text'}`}
            >
              <Calendar size={16} /> <span className="hidden sm:inline">Calendar</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold ${viewMode === 'kanban' ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-text'}`}
            >
              <Columns size={16} /> <span className="hidden sm:inline">Board</span>
            </button>
          </div>

          <Button variant="primary" glow onClick={onAddActivity} className="w-full sm:w-auto shadow-primary/20">
            Add Activity
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/50">
        <div>
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Total Activities</p>
          <p className="text-text font-bold text-xl">{totalActivities}</p>
        </div>
        <div>
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Completed</p>
          <p className="text-text font-bold text-xl text-emerald-600">{completed}</p>
        </div>
        <div>
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Est. Cost</p>
          <p className="text-text font-bold text-xl">{formatINR(estCost)}</p>
        </div>
        <div>
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Total Time</p>
          <p className="text-text font-bold text-xl flex items-center gap-2"><Clock size={18} className="text-primary"/> {totalHours}h</p>
        </div>
      </div>
    </div>
  );
}
