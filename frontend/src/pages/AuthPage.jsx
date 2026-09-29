import { useState } from 'react';
import { ArrowRight, Mic, Sparkles, Lock, Mail, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './AuthPage.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function modeFromPath(pathname) {
  if (pathname === '/signup') return 'signup';
  if (pathname === '/forgot-password') return 'forgot';
  return 'login';
}

export default function AuthPage({ onAuth }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(() => modeFromPath(location.pathname));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const clear = () => { setError(null); setSuccess(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clear();
    setLoading(true);
    try {
      if (mode === 'login') {
        const { user } = await authService.login({ email, password });
        setSuccess('Welcome back.');
        setTimeout(() => { onAuth && onAuth(user); navigate('/'); }, 400);
      } else if (mode === 'signup') {
        const { user } = await authService.signup({ name, email, password, confirmPassword });
        setSuccess('Account created.');
        setTimeout(() => { onAuth && onAuth(user); navigate('/'); }, 400);
      } else if (mode === 'forgot') {
        await authService.requestPasswordReset({ email });
        setSuccess('Check your inbox for reset instructions.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';

  return (
    <div className="auth-page">
      {/* Left decorative illustration area */}
      <div className="auth-page__illustration" aria-hidden="true">
        <div className="auth-illustration__blob">
          <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" className="auth-blob-svg">
            <circle cx="160" cy="160" r="110" fill="#EBDDFF" stroke="#111" strokeWidth="2.5" />
            <circle cx="160" cy="160" r="78" fill="#AEEDB8" stroke="#111" strokeWidth="2" />
            <rect x="90" y="110" width="140" height="100" rx="10" fill="#FDEDB8" stroke="#111" strokeWidth="2" />
            <circle cx="140" cy="150" r="14" fill="#111" />
            <rect x="168" y="142" width="36" height="16" rx="3" fill="#111" />
            <text x="110" y="210" fontSize="9" fontWeight="700" fill="#111">VOXA</text>
            <path d="M110 240 Q160 220 210 240" fill="none" stroke="#111" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="auth-illustration__note">
          <p>"Good ideas sound better here."</p>
        </div>
      </div>

      {/* Form area */}
      <div className="auth-page__form-area">
        <div className="auth-card">
          <div className="auth-card__header">
            <div className="auth-brand">
              <div className="auth-brand__mark" aria-hidden="true">
                <Mic size={22} strokeWidth={2.5} />
              </div>
              <span className="auth-brand__wordmark">Voxa</span>
            </div>
            <h1 className="auth-card__title">
              {isLogin ? 'Welcome back' : isSignup ? 'Create account' : 'Reset password'}
            </h1>
            <p className="auth-card__subtitle">
              {isLogin
                ? 'Sign in to continue where you left off.'
                : isSignup
                ? 'Start organizing your audio.'
                : 'We will send instructions to your inbox.'}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {isSignup && (
              <div className="auth-form__group">
                <label htmlFor="auth-name" className="auth-form__label">Name</label>
                <div className="auth-form__input-wrap">
                  <User size={17} strokeWidth={2} className="auth-form__icon" aria-hidden="true" />
                  <input
                    id="auth-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Mehadi"
                    value={name}
                    onChange={e => { setName(e.target.value); clear(); }}
                    className="auth-form__input"
                  />
                </div>
              </div>
            )}

            <div className="auth-form__group">
              <label htmlFor="auth-email" className="auth-form__label">Email</label>
              <div className="auth-form__input-wrap">
                <Mail size={17} strokeWidth={2} className="auth-form__icon" aria-hidden="true" />
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  placeholder="hello@voxa.app"
                  value={email}
                  onChange={e => { setEmail(e.target.value); clear(); }}
                  className="auth-form__input"
                />
              </div>
            </div>

            {!isForgot && (
              <div className="auth-form__group">
                <label htmlFor="auth-password" className="auth-form__label">Password</label>
                <div className="auth-form__input-wrap">
                  <Lock size={17} strokeWidth={2} className="auth-form__icon" aria-hidden="true" />
                  <input
                    id="auth-password"
                    type="password"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    placeholder={isLogin ? 'Your password' : 'At least 6 characters'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); clear(); }}
                    className="auth-form__input"
                  />
                </div>
              </div>
            )}

            {isSignup && (
              <div className="auth-form__group">
                <label htmlFor="auth-confirm" className="auth-form__label">Confirm password</label>
                <div className="auth-form__input-wrap">
                  <Lock size={17} strokeWidth={2} className="auth-form__icon" aria-hidden="true" />
                  <input
                    id="auth-confirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); clear(); }}
                    className="auth-form__input"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`auth-form__submit ${loading ? 'auth-form__submit--loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Working...' : isLogin ? 'Sign in' : isSignup ? 'Create account' : 'Send instructions'}
            </button>
          </form>

          {error && <p className="auth-form__message auth-form__message--error" role="alert">{error}</p>}
          {success && <p className="auth-form__message auth-form__message--success" role="status">{success}</p>}

          <div className="auth-form__actions">
            {isLogin && (
              <>
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => { setMode('forgot'); clear(); navigate('/forgot-password'); }}
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  className="auth-link auth-link--primary"
                  onClick={() => { setMode('signup'); clear(); setName(''); setEmail(''); setPassword(''); setConfirmPassword(''); navigate('/signup'); }}
                >
                  Create account <ArrowRight size={14} />
                </button>
              </>
            )}
            {isSignup && (
              <button
                type="button"
                className="auth-link auth-link--primary"
                onClick={() => { setMode('login'); clear(); setName(''); setConfirmPassword(''); navigate('/login'); }}
              >
                Already have an account? <ArrowRight size={14} />
              </button>
            )}
            {isForgot && (
              <button
                type="button"
                className="auth-link auth-link--primary"
                onClick={() => { setMode('login'); clear(); setEmail(''); navigate('/login'); }}
              >
                Back to sign in <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
