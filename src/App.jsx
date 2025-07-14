import React, { useState, useEffect } from 'react';
import ScrollRestoration from './ScrollRestoration';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import Navbar from './components/layout/Navbar/Navbar';
import BottomNavbar from './components/layout/BottomNavbar/BottomNavbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Stats from './pages/Stats/Stats';
import Settings from './pages/Settings/Settings';
import ProfileDetails from './components/Settings/Profile/ProfileDetails';
import ShopDetails from './components/Settings/Shop/ShopDetails';
import PaymentModes from './components/Settings/Payments/PaymentModes';
import WalletDetails from './components/Settings/Wallet/WalletDetails';
import Logout from './pages/Logout/Logout.jsx';
import HelpSupport from './components/Settings/Helpsupport/HelpSupport';
import Faqs from './components/Settings/Faqs/Faqs';
import About from './components/Settings/About/About';
import GuideToAranyu from './components/Settings/Helpsupport/GuideToAranyu';
import ReportIssue from './components/Settings/Helpsupport/ReportIssue';
import ManageServices from './components/Settings/ManageServices/ManageServices';
import ManageCategory from './components/Settings/ManageCategory/ManageCategory';
import Packages from './components/Settings/Packages/Packages';
import PackageForm from './components/Settings/Packages/PackageForm';
import NotFound from './pages/NotFound/NotFound';
import MyOrders from './pages/Orders/MyOrders.jsx';
import OrderDetails from './pages/Orders/OrderDetails.jsx';
import OffersManager from './pages/Offers/OffersManager';
import AddDiscount from './pages/Offers/AddDiscount';
import Payments from './pages/Payments/Payments.jsx';
import CustomerRatings from './pages/CustomerRatings/CustomerRatings.jsx';
import Notifications from './pages/Notifications/Notifications.jsx';
import OnboardingPage from './pages/Onboarding/OnboardingPage.jsx';
import BusinessRegistrationForm from './pages/Onboarding/BusinessRegistrationForm.jsx';
import RoomsDashboard from './components/Settings/Rooms/RoomsDashboard';
import AddRoom from './components/Settings/Rooms/AddRoom';
import EditRoom from './components/Settings/Rooms/EditRoom';
import AvailabilityCalendar from './components/Settings/Rooms/AvailabilityCalendar';
import PreviewRoom from './components/Settings/Rooms/PreviewRoom';
import MyRooms from './components/Settings/Rooms/MyRooms/MyRooms.jsx';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Toast notification functions
export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 2500,
    position: window.innerWidth < 768 ? 'top-center' : 'bottom-right',
    style: {
      background: '#e0f2fe',
      color: '#0c4a6e',
      border: '1px solid rgb(255, 255, 255)',
      borderRadius: '8px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
    },
  });
};

export const showInfoToast = (message) => {
  toast(message, {
    duration: 3000,
    position: window.innerWidth < 768 ? 'top-center' : 'bottom-right',
    style: {
      background: '#f0f9ff',
      color: '#1e40af',
      border: '1px solid #60a5fa',
      borderRadius: '8px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 3000,
    position: window.innerWidth < 768 ? 'top-center' : 'bottom-right',
    style: {
      background: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #dc3545',
      borderRadius: '8px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
    },
  });
};

const AppContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [editPackageId, setEditPackageId] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Only redirect to /login if not authenticated and not on allowed public routes
  useEffect(() => {
    const publicRoutes = ['/login', '/logout', '/onboarding', '/business-registration'];
    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      navigate('/login', { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const isLoginPage = location.pathname === '/login';
  const isSettingsPage = location.pathname.startsWith('/settings');
  const isLogoutPage = location.pathname === '/logout';
  const isOnboardingPage = location.pathname === '/onboarding';
  const isBusinessRegistrationPage = location.pathname === '/business-registration';

  const showNavigation = !isLoginPage && !isLogoutPage && !isOnboardingPage && !isBusinessRegistrationPage;

  return (
    <div className="d-flex flex-column min-vh-100">
      {showNavigation && !isSettingsPage && <Navbar />}
      <main className={showNavigation && !isSettingsPage ? 'main-content' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/business-registration" element={<BusinessRegistrationForm />} />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout showModal={location.pathname === '/logout'} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myratings"
            element={
              <ProtectedRoute>
                <CustomerRatings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/order-details/:orderId" 
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileDetails />} />
            <Route path="profile" element={<ProfileDetails />} />
            <Route path="shop" element={<ShopDetails />} />
            <Route path="payment" element={<PaymentModes />} />
            <Route path="wallet" element={<WalletDetails />} />
            <Route path="service" element={<ManageServices />} />
            <Route path="category" element={<ManageCategory />} />
            {/* Rooms */}
            <Route path="rooms" element={<RoomsDashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="edit-room/:id" element={<EditRoom />} />
            <Route path="availability-calendar" element={<AvailabilityCalendar />} />
            <Route path="preview-room/:id" element={<PreviewRoom />} />
            <Route path="my-rooms" element={<MyRooms />} />
            {/* End of Rooms */}

            <Route
              path="packages"
              element={
                showForm ? (
                  <PackageForm
                    setShowForm={setShowForm}
                    editPackageId={editPackageId}
                    setEditPackageId={setEditPackageId}
                  />
                ) : (
                  <Packages
                    setShowForm={setShowForm}
                    setEditPackageId={setEditPackageId}
                  />
                )
              }
            />
            <Route path="faqs" element={<Faqs />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<HelpSupport />} />
            <Route path="guide" element={<GuideToAranyu />} />
            <Route path="report" element={<ReportIssue />} />
          </Route>
          <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <OffersManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offers/add"
            element={
              <ProtectedRoute>
                <AddDiscount />
              </ProtectedRoute>
            }
          />
          <Route path="/offers/edit/:id" element={<AddDiscount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showNavigation && <BottomNavbar />}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollRestoration />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;