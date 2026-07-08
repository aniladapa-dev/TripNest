import { LifeBuoy } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function HelpSupportPage() {
  return (
    <PlaceholderPage
      title="Help & Support"
      description="Get instant help from our support team, browse FAQs, or view guided tutorials on using TripNest."
      icon={LifeBuoy}
      illustration="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
      actionLabel="Return to Dashboard"
    />
  );
}
