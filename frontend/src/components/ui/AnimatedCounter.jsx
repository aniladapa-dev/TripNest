import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({
  target,
  suffix = '',
  duration = 2,
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOut(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl font-bold font-heading gradient-text"
    >
      {count}
      {suffix}
    </span>
  );
}
