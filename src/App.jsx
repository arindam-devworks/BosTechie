import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ModalProvider } from './context/ModalContext';
import ToastContainer from './components/ui/ToastContainer';
import ConfirmationModal from './components/ui/ConfirmationModal';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Contacts from './pages/Contacts';
import EmailTemplates from './pages/EmailTemplates';
import WhatsAppTemplates from './pages/WhatsAppTemplates';
import CampaignHistory from './pages/CampaignHistory';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';
import CampaignBuilder from './pages/CampaignBuilder';
import WhatsAppTemplateBuilder from './pages/WhatsAppTemplateBuilder';
import CreateBroadcast from './pages/CreateBroadcast';

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/contacts", element: <Contacts /> },
          { path: "/broadcast", element: <CampaignBuilder /> },
          { path: "/inbox", element: <Inbox /> },
          { path: "/templates", element: <EmailTemplates /> },
          { path: "/whatsapp-templates", element: <WhatsAppTemplates /> },
          { path: "/whatsapp-templates/create", element: <WhatsAppTemplateBuilder /> },
          { path: "/history", element: <CampaignHistory /> },
          { path: "/analytics", element: <Analytics /> },
          { path: "/settings", element: <Settings /> }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <ToastProvider>
            <RouterProvider router={router} />
            <ToastContainer />
            <ConfirmationModal />
          </ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
