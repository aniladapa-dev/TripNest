import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ 
  icon: Icon = LayoutDashboard, 
  title = "No data available", 
  message = "There's nothing to show here right now.",
  actionLabel,
  onAction
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 rounded-[20px] border border-dashed border-border/70 h-full min-h-[200px]"
    >
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
        <Icon className="w-8 h-8 text-text-muted" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-heading font-bold text-text mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">{message}</p>
      
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
