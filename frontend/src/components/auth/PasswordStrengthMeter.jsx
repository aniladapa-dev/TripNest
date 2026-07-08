import { motion } from 'framer-motion';

const getStrength = (password) => {
  let score = 0;
  if (!password) return score;
  
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  return score;
};

const getStrengthLabel = (score) => {
  switch (score) {
    case 0: return 'Very Weak';
    case 1: return 'Weak';
    case 2: return 'Fair';
    case 3: return 'Good';
    case 4: return 'Strong';
    default: return '';
  }
};

const getStrengthColor = (score) => {
  switch (score) {
    case 0: return 'bg-gray-200';
    case 1: return 'bg-red-500';
    case 2: return 'bg-orange-500';
    case 3: return 'bg-blue-500';
    case 4: return 'bg-emerald-500';
    default: return 'bg-gray-200';
  }
};

export default function PasswordStrengthMeter({ password }) {
  const strength = getStrength(password);
  
  if (!password) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-2"
    >
      <div className="flex gap-2 mb-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div key={level} className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: strength >= level ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
              className={`h-full ${getStrengthColor(strength)}`}
            />
          </div>
        ))}
      </div>
      <p className={`text-xs font-medium text-right ${
        strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-orange-500' : strength === 3 ? 'text-blue-500' : 'text-emerald-500'
      }`}>
        {getStrengthLabel(strength)}
      </p>
    </motion.div>
  );
}
