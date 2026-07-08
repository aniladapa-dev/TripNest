import { Bell } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function NotificationsPage() {
  return (
    <PlaceholderPage
      title="Notifications"
      description="Stay updated with real-time flight changes, group activity mentions, and important travel reminders."
      icon={Bell}
      illustration="https://images.unsplash.com/photo-1577563908411-50cb98976fea?q=80&w=800&auto=format&fit=crop"
      actionLabel="Return to Dashboard"
    />
  );
}
