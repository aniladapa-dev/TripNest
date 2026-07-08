import { Settings } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Account Settings"
      description="Configure your preferences, notification settings, privacy options, and security settings."
      icon={Settings}
      illustration="https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=800&auto=format&fit=crop"
      actionLabel="Return to Dashboard"
    />
  );
}
