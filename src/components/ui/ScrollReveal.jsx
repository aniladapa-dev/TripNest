import { motion } from 'framer-motion';

const offsets = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) {
  const { x, y } = offsets[direction] || offsets.up;

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
