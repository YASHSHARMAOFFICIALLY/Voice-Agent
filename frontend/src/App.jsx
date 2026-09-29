import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import RecordingPage from './pages/RecordingPage';
import SummaryPage from './pages/SummaryPage';
import SessionsPage from './pages/SessionsPage';
import TranslatePage from './pages/TranslatePage';
import LibraryPage from './pages/LibraryPage';
import SettingsPage from './pages/SettingsPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UploadModal from './components/UploadModal';
import Footer from './components/Footer';
import './App.css';
import { authService } from './services/authService';

function AppLayout({ user, handleLogout }) {
  const navigate = useNavigate();
  // We need to pass the activeTab to Sidebar based on route.
  // We can use useLocation to work that out.
  const [toast, setToast] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  return (
    <div className="voxa-app">
  {toast && <div className="voxa-toast">{toast}</div>}

  <Sidebar user={user} />

  <div className="voxa-content">

    <main className="voxa-main">
      <Header
        user={user}
        onLogout={handleLogout}
      />

      <div className="voxa-canvas">
        <Routes>

          <Route
            path="/"
            element={
              <LandingPage
                onStartRecord={() => {
                  showToast('🎙 Starting... (Phase 2)');
                  navigate('/recording');
                }}
                onUploadAudio={() => setIsUploadOpen(true)}
                onViewAllSessions={() =>
                  showToast('📁 All sessions — Phase 2')
                }
                onSelectSession={() =>
                  showToast('▶ Playing — Phase 2')
                }
              />
            }
          />

          <Route
            path="/recording"
            element={
              <RecordingPage
                onStop={() => navigate('/summary')}
              />
            }
          />

          <Route
            path="/summary"
            element={
              <SummaryPage
                onBack={() => navigate('/')}
              />
            }
          />

          <Route
            path="/sessions"
            element={<SessionsPage />}
          />

          <Route
            path="/translate"
            element={<TranslatePage />}
          />

          <Route
            path="/library"
            element={<LibraryPage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />

        </Routes>
      </div>
    </main>

    <Footer />

  </div>

  <UploadModal
    isOpen={isUploadOpen}
    onClose={() => setIsUploadOpen(false)}
  />
</div>
  );
}

export default function App() {
  const [user, setUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleAuth = (u) => setUser(u);
  const handleLogout = async () => { await authService.logout(); setUser(null); };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthPage onAuth={handleAuth} />} />
        <Route path="/signup" element={<AuthPage onAuth={handleAuth} />} />
        <Route path="/forgot-password" element={<AuthPage onAuth={handleAuth} />} />

        {/* Protected Routes */}
        <Route path="/*" element={
            user
            ? <AppLayout user={user} handleLogout={handleLogout} />
            : <Navigate to="/login" replace />
        } />
      </Routes>
    </BrowserRouter>
  );
}
