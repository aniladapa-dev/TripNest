import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for casual travelers planning a quick getaway.',
    features: [
      'Basic trip planning',
      'Up to 3 collaborators',
      'Standard itinerary builder',
      'Community support',
    ],
    popular: false,
    buttonText: 'Get Started',
  },
  {
    name: 'Pro',
    price: '₹499/mo',
    description: 'For frequent travelers who want to plan smarter.',
    features: [
      'AI-powered recommendations',
      'Unlimited collaborators',
      'Advanced budget tracking',
      'Real-time weather updates',
      'Priority email support',
    ],
    popular: true,
    buttonText: 'Start Free Trial',
  },
  {
    name: 'Agency',
    price: '₹1,999/mo',
    description: 'Ideal for travel agents and large tour groups.',
    features: [
      'Everything in Pro',
      'White-label itineraries',
      'Custom branding',
      'Analytics dashboard',
      '24/7 dedicated support',
    ],
    popular: false,
    buttonText: 'Contact Sales',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <SectionHeading
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that best fits your travel needs. No hidden fees."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 mt-16 items-center">
        {plans.map((plan, index) => (
          <ScrollReveal key={plan.name} delay={index * 0.15}>
            <motion.div
              whileHover={{ y: -8 }}
              className={`relative rounded-[24px] p-8 bg-white border-2 transition-all duration-300 shadow-lg ${
                plan.popular ? 'border-primary shadow-xl shadow-primary/20 scale-105 z-10' : 'border-transparent'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-md whitespace-nowrap">
                  <Star className="w-4 h-4 fill-white text-white" />
                  Most Popular
                </div>
              )}

              <h3 className="font-heading font-semibold text-2xl text-text">
                {plan.name}
              </h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold text-text">{plan.price}</span>
              </div>
              <p className="text-sm text-text-secondary mb-6 h-10">
                {plan.description}
              </p>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-colors duration-300 mb-8 cursor-pointer ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/30'
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {plan.buttonText}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 shrink-0">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    </div>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
