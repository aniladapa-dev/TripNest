import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy, useEffect } from 'react';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load route components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const OTPVerification = lazy(() => import('./pages/auth/OTPVerification'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const EmailVerified = lazy(() => import('./pages/auth/EmailVerified'));

const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const MyTrips = lazy(() => import('./pages/trips/MyTrips'));
const CreateTrip = lazy(() => import('./pages/trips/CreateTrip'));
const TripDetails = lazy(() => import('./pages/trips/TripDetails'));
const EditTrip = lazy(() => import('./pages/trips/EditTrip'));

// Itinerary
const ItineraryDashboard = lazy(() => import('./pages/itinerary/ItineraryDashboard'));
const ActivityDetails = lazy(() => import('./pages/itinerary/ActivityDetails'));

// Destinations
const DestinationExplorer = lazy(() => import('./pages/destinations/DestinationExplorer'));
const DestinationDetails = lazy(() => import('./pages/destinations/DestinationDetails'));

// New Dashboard Modules
const BudgetDashboard = lazy(() => import('./pages/budget/BudgetDashboard'));
const ExpensesDashboard = lazy(() => import('./pages/expenses/ExpensesDashboard'));
const DocumentsDashboard = lazy(() => import('./pages/documents/DocumentsDashboard'));
const GroupsDashboard = lazy(() => import('./pages/groups/GroupsDashboard'));
const ReportsAnalytics = lazy(() => import('./pages/reports/ReportsAnalytics'));

// Account Modules
const NotificationsPage = lazy(() => import('./pages/account/NotificationsPage'));
const ProfilePage = lazy(() => import('./pages/account/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/account/SettingsPage'));
const HelpSupportPage = lazy(() => import('./pages/account/HelpSupportPage'));

// Global Components
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ToastProvider } from './components/ui/ToastProvider';
import ScrollProgress from './components/ui/ScrollProgress';

// Fallback loader for Suspense
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background">
    <LoadingSpinner size="lg" className="text-primary" />
  </div>
);

// Simple Scroll to Top component for BrowserRouter
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <ErrorBoundary>
          <ToastProvider>
            <ScrollProgress />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-otp" element={<OTPVerification />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/email-verified" element={<EmailVerified />} />

                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  
                  {/* Trip Management */}
                  <Route path="trips" element={<MyTrips />} />
                  <Route path="trips/create" element={<CreateTrip />} />
                  <Route path="trips/:id" element={<TripDetails />} />
                  <Route path="trips/:id/edit" element={<EditTrip />} />
                  
                  {/* Itinerary Planning */}
                  <Route path="itinerary" element={<ItineraryDashboard />} />
                  <Route path="itinerary/activity/:activityId" element={<ActivityDetails />} />

                  {/* Destinations */}
                  <Route path="destinations" element={<DestinationExplorer />} />
                  <Route path="destinations/:id" element={<DestinationDetails />} />

                  {/* Planning & Management */}
                  <Route path="budget" element={<BudgetDashboard />} />
                  <Route path="expenses" element={<ExpensesDashboard />} />
                  <Route path="documents" element={<DocumentsDashboard />} />
                  <Route path="groups" element={<GroupsDashboard />} />
                  <Route path="reports" element={<ReportsAnalytics />} />

                  {/* Account */}
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="help" element={<HelpSupportPage />} />
                </Route>

                {/* Future routes - mapped to Landing for now */}
                <Route path="/features" element={<LandingPage />} />
                <Route path="/pricing" element={<LandingPage />} />
                <Route path="/about" element={<LandingPage />} />
                <Route path="/contact" element={<LandingPage />} />
              </Routes>
            </AnimatePresence>
          </ToastProvider>
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
}

export default App;
