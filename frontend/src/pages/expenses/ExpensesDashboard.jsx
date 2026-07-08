import { Receipt } from 'lucide-react';
import PlaceholderPage from '../../components/ui/PlaceholderPage';

export default function ExpensesDashboard() {
  return (
    <PlaceholderPage
      title="Expense Tracking"
      description="Scan receipts, split bills with friends, and log every expense in real-time in your local currency."
      icon={Receipt}
      illustration="https://images.unsplash.com/photo-1580519542014-27034f13260c?q=80&w=800&auto=format&fit=crop"
      actionLabel="Return to Dashboard"
    />
  );
}
