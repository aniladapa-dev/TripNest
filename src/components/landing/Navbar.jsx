import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-in-out
          ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-lg shadow-md py-3'
              : 'bg-transparent py-6'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ── Logo ── */}
            <a
              href="#home"
              className="flex items-center gap-2 group"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Plane className="w-7 h-7 text-primary" />
              </motion.div>
              <span className="text-2xl font-bold font-heading gradient-text">
                TripNest
              </span>
            </a>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-text-secondary hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  {link.label}
                  <span
                    className="
                      absolute -bottom-1 left-0 w-full h-0.5 bg-primary
                      origin-left scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 ease-out
                    "
                  />
                </a>
              ))}
            </div>

            {/* ── Desktop Actions ── */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" glow>
                  Get Started
                </Button>
              </Link>
            </div>

            {/* ── Mobile Menu Toggle ── */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="
                fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw]
                bg-white/98 backdrop-blur-xl shadow-2xl
                flex flex-col lg:hidden
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <a
                  href="#home"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plane className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold font-heading gradient-text">
                    TripNest
                  </span>
                </a>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-6">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="
                        block py-3 px-4 rounded-lg text-base font-medium
                        text-text-secondary hover:text-primary hover:bg-primary/5
                        transition-colors duration-200
                      "
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </nav>

              {/* Footer Buttons */}
              <div className="p-6 border-t border-border space-y-3">
                <Link to="/login" className="block w-full">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="block w-full">
                  <Button
                    variant="primary"
                    size="md"
                    glow
                    className="w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
