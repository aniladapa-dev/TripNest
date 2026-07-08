import { Users } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function GroupsDashboard() {
  return (
    <PlaceholderPage
      title="Travel Groups"
      description="Invite friends, collaborate on itineraries, and vote on activities in real-time with your travel buddies."
      icon={Users}
      illustration="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"
      actionLabel="Return to Dashboard"
    />
  );
}
