import { User } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function ProfilePage() {
  return (
    <PlaceholderPage
      title="User Profile"
      description="Manage your personal information, travel preferences, and view your digital passport stamps."
      icon={User}
      illustration="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop"
      actionLabel="Return to Dashboard"
    />
  );
}
