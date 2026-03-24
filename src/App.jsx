import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ModalProvider } from './context/ModalContext';
import ToastContainer from './components/ui/ToastContainer';
import ConfirmationModal from './components/ui/ConfirmationModal';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES } from './constants/routes';

// Lazy Pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Contacts = lazy(() => import('./pages/Contacts'));
const EmailTemplates = lazy(() => import('./pages/EmailTemplates'));
const WhatsAppTemplates = lazy(() => import('./pages/WhatsAppTemplates'));
const CampaignHistory = lazy(() => import('./pages/CampaignHistory'));
const Inbox = lazy(() => import('./pages/Inbox'));
const Settings = lazy(() => import('./pages/Settings'));
const CampaignBuilder = lazy(() => import('./pages/CampaignBuilder'));
const WhatsAppTemplateBuilder = lazy(() => import('./pages/WhatsAppTemplateBuilder'));
const CreateBroadcast = lazy(() => import('./pages/CreateBroadcast'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.REGISTER, element: <Register /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
  {
    element: <ProtectedRoute />,
    errorElement: <div className="p-10 text-center text-red-500 font-bold">An unexpected error occurred executing this route segment. Please try refreshing.</div>,
    children: [
      {
        element: <Layout />,
        children: [
          { path: ROUTES.ROOT, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
          { path: ROUTES.DASHBOARD, element: <Dashboard /> },
          { path: ROUTES.CONTACTS, element: <Contacts /> },
          { path: ROUTES.CAMPAIGNS, element: <CampaignBuilder /> },
          { path: ROUTES.INBOX, element: <Inbox /> },
          { path: ROUTES.EMAIL_TEMPLATES, element: <EmailTemplates /> },
          { path: ROUTES.WHATSAPP_TEMPLATES, element: <WhatsAppTemplates /> },
          { path: ROUTES.WHATSAPP_TEMPLATE_CREATE, element: <WhatsAppTemplateBuilder /> },
          { path: ROUTES.WHATSAPP_TEMPLATE_EDIT, element: <ComingSoon /> },
          { path: ROUTES.CAMPAIGN_HISTORY, element: <CampaignHistory /> },
          { path: ROUTES.ANALYTICS, element: <Analytics /> },
          { path: ROUTES.SETTINGS, element: <Settings /> },
          { path: "*", element: <NotFound /> }
        ]
      }
    ]
  },
  { path: "*", element: <NotFound /> }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ModalProvider>
            <ToastProvider>
              <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900"><div className="w-8 h-8 lg:w-12 lg:h-12 border-4 border-slate-200 dark:border-slate-800 border-t-primary-500 rounded-full animate-spin"></div></div>}>
                <RouterProvider router={router} />
              </Suspense>
              <ToastContainer />
              <ConfirmationModal />
            </ToastProvider>
          </ModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;
