import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import CampaignBuilder from './pages/CampaignBuilder';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';
import EmailTemplates from './pages/EmailTemplates';
import WhatsAppTemplates from './pages/WhatsAppTemplates';
import CampaignHistory from './pages/CampaignHistory';
import Analytics from './pages/Analytics';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/broadcast" element={<CampaignBuilder />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/templates" element={<EmailTemplates />} />
                <Route path="/whatsapp-templates" element={<WhatsAppTemplates />} />
                <Route path="/history" element={<CampaignHistory />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
