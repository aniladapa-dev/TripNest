import { FileBox } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function DocumentsDashboard() {
  return (
    <PlaceholderPage
      title="Travel Documents"
      description="Securely store your passports, visas, tickets, and booking confirmations all in one safe, accessible place."
      icon={FileBox}
      illustration="https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop"
      actionLabel="Return to Dashboard"
    />
  );
}
