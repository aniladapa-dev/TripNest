import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import Button from '../../components/ui/Button';

export default function EmailVerified() {
  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center py-8 max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/30"
        >
          <ShieldCheck size={48} strokeWidth={1.5} />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-heading font-bold text-text mb-4"
        >
          Account Verified!
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-text-secondary mb-10 text-lg"
        >
          Thank you for confirming your email. You're now ready to start planning smarter travels with TripNest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/">
            <Button 
              variant="primary" 
              className="w-full h-14 text-lg flex items-center justify-center gap-2"
              glow
            >
              Continue to Dashboard
              <ArrowRight size={20} />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}
