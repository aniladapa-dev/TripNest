import { Wallet } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function BudgetDashboard() {
  return (
    <PlaceholderPage
      title="Budget Planning"
      description="Set, track, and manage your travel budget. Never overspend on a trip again with our smart AI budget tracking."
      icon={Wallet}
      illustration="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop"
      actionLabel="Return to Dashboard"
    />
  );
}
