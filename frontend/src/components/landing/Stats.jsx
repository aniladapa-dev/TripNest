import { MapPin, Globe, Users, ThumbsUp } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import ScrollReveal from '../ui/ScrollReveal';

const stats = [
  { icon: MapPin, value: 10, suffix: 'K+', label: 'Trips Planned' },
  { icon: Globe, value: 150, suffix: '+', label: 'Countries' },
  { icon: Users, value: 50, suffix: 'K+', label: 'Happy Travelers' },
  { icon: ThumbsUp, value: 95, suffix: '%', label: 'Satisfaction' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <ScrollReveal key={stat.label} delay={index * 0.15}>
              <div className="text-center">
                <div className="rounded-xl bg-primary/10 p-3 w-fit mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-text-secondary font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
