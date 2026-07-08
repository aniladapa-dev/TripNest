import { motion } from 'framer-motion';

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  gradient = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={centered ? 'text-center flex flex-col items-center' : ''}
    >
      <h2
        className={`text-4xl md:text-5xl font-bold font-heading ${
          gradient ? 'gradient-text' : 'text-text'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary mt-4 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
