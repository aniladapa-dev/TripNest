import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Button from '../ui/Button';

export default function DeleteModal({ isOpen, onClose, onConfirm, tripName, isDeleting }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isDeleting ? onClose : undefined}
          className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[24px] shadow-2xl overflow-hidden p-6"
        >
          <button 
            onClick={onClose}
            disabled={isDeleting}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-text bg-gray-50 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col items-center text-center mt-2">
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6"
            >
              <AlertTriangle size={32} />
            </motion.div>

            <h3 className="text-2xl font-heading font-bold text-text mb-2">Delete Trip?</h3>
            <p className="text-text-secondary mb-8">
              Are you sure you want to delete <strong className="text-text">"{tripName}"</strong>? This action cannot be undone and all associated plans, expenses, and documents will be permanently removed.
            </p>

            <div className="flex gap-3 w-full">
              <Button 
                variant="outline" 
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700 border-none shadow-lg shadow-red-600/20"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
