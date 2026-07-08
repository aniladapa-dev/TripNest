import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Luggage, Globe, ChevronDown, Phone, AlertTriangle } from 'lucide-react';

const GuideSection = ({ title, icon: Icon, children, isOpen, onClick }) => {
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-background mb-3 transition-shadow hover:shadow-sm">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-background hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Icon size={20} />
          </div>
          <span className="font-heading font-bold text-text text-lg">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} className="text-text-secondary" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/50 text-text-secondary text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TravelGuideWidget = ({ guide }) => {
  const [openSection, setOpenSection] = useState('culture');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-heading font-bold text-text mb-2">Essential Travel Guide</h3>
        <p className="text-text-secondary text-sm">Everything you need to know before you travel.</p>
      </div>

      <div className="flex flex-col">
        {/* Culture & Etiquette */}
        <GuideSection 
          title="Culture & Etiquette" 
          icon={Globe}
          isOpen={openSection === 'culture'}
          onClick={() => toggleSection('culture')}
        >
          <div className="space-y-3">
            <p>{guide?.culture?.overview || 'India is a diverse country with deep-rooted traditions. Dress modestly, especially when visiting religious sites. Always remove your shoes before entering temples or local homes.'}</p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-text">
              <li>{guide?.culture?.tip1 || 'Use your right hand for eating and giving/receiving items.'}</li>
              <li>{guide?.culture?.tip2 || 'A slight bow with hands pressed together (Namaste) is a respectful greeting.'}</li>
            </ul>
          </div>
        </GuideSection>

        {/* Packing Checklist */}
        <GuideSection 
          title="Packing Checklist" 
          icon={Luggage}
          isOpen={openSection === 'packing'}
          onClick={() => toggleSection('packing')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {(guide?.packing || ['Comfortable walking shoes', 'Modest clothing for temples', 'Universal power adapter', 'Mosquito repellent', 'Sunscreen & Sunglasses', 'Basic first-aid kit']).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                <span className="text-text">{item}</span>
              </div>
            ))}
          </div>
        </GuideSection>

        {/* Safety & Emergency */}
        <GuideSection 
          title="Safety & Emergency" 
          icon={Shield}
          isOpen={openSection === 'safety'}
          onClick={() => toggleSection('safety')}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
              <AlertTriangle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-text">{guide?.safety?.advice || 'Keep your valuables secure in crowded areas. Drink only bottled or filtered water to avoid stomach issues.'}</p>
            </div>
            
            <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20">
              <h5 className="font-bold text-text mb-3 flex items-center gap-2">
                <Phone size={16} className="text-secondary" />
                Emergency Contacts
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Police</div>
                  <div className="font-semibold text-text text-lg">{guide?.emergency?.police || '112'}</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Ambulance</div>
                  <div className="font-semibold text-text text-lg">{guide?.emergency?.ambulance || '108'}</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Tourist Helpline</div>
                  <div className="font-semibold text-text text-lg">{guide?.emergency?.tourist || '1363'}</div>
                </div>
              </div>
            </div>
          </div>
        </GuideSection>
      </div>
    </div>
  );
};

export default TravelGuideWidget;
