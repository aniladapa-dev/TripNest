import { motion } from 'framer-motion';

const variantStyles = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  outline: 'border-2 border-primary text-primary hover:bg-primary/5',
  ghost: 'text-primary hover:bg-primary/10',
};

const sizeStyles = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  glow = false,
  children,
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        rounded-full font-medium cursor-pointer
        transition-colors duration-300 ease-in-out
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${glow ? 'animate-glow-pulse' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}
