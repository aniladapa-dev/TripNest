import { BarChart3 } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function ReportsAnalytics() {
  return (
    <PlaceholderPage
      title="Reports & Analytics"
      description="Gain deep insights into your travel patterns, spending habits, and carbon footprint across all your trips."
      icon={BarChart3}
      illustration="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
      actionLabel="Return to Dashboard"
    />
  );
}
