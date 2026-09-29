import React from 'react';
import {
  Home,
  FolderClosed,
  Globe,
  ClipboardList,
  Settings,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import VoxaLogo from './VoxaLogo';
import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname === '/' ? 'home' : location.pathname.substring(1);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'sessions', label: 'Sessions', path: '/sessions' },
    { id: 'translate', label: 'Translate', path: '/translate' },
    { id: 'library', label: 'Library', path: '/library' },
  ];

  return (
    <aside className="voxa-sidebar">
      {/* Sidebar Header & Brand Logo */}
      <div className="voxa-sidebar__brand">
        <VoxaLogo />
      </div>
{/* ... */}
      {/* Main Navigation Stack */}
      <nav className="voxa-sidebar__nav">
        <ul className="voxa-sidebar__menu">
          {navItems.map((item) => {
            const Icon = item.icon || Home; // Fallback icon if missing in item definition
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className="voxa-sidebar__item">
                <button
                  className={`voxa-sidebar__link ${isActive ? 'voxa-sidebar__link--active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="voxa-sidebar__icon-box">
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </span>
                  <span className="voxa-sidebar__label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Hairline Divider */}
        <div className="voxa-sidebar__divider" />
{/* ... */}
        {/* Settings Navigation */}
        <div className="voxa-sidebar__settings">
          <button
            className={`voxa-sidebar__link ${activeTab === 'settings' ? 'voxa-sidebar__link--active' : ''}`}
            onClick={() => navigate('/settings')}
          >
            <span className="voxa-sidebar__icon-box">
              <Settings size={20} strokeWidth={2} />
            </span>
            <span className="voxa-sidebar__label">Settings</span>
          </button>
        </div>
      </nav>
{/* ... */}

      {/* Inspirational Quote Card Widget (Figma Rectangle 40) */}
      <div className="voxa-sidebar__quote-card">
        <div className="voxa-sidebar__quote-doodle voxa-sidebar__quote-doodle--top">
          <Sparkles size={16} className="doodle-sparkle" />
        </div>
        <p className="voxa-sidebar__quote-text">
          Good ideas sound better here
        </p>
        <div className="voxa-sidebar__quote-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 19L19 5M19 5H9M19 5V15" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="voxa-sidebar__notification">
        <div className="voxa-sidebar__avatar2">
          <img src='src/assets/icons/bell.svg'/>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="voxa-sidebar__profile">
        <div className="voxa-sidebar__avatar">
          <span className="voxa-sidebar__initials">MH</span>
        </div>
        <div className="voxa-sidebar__user-info">
          <span className="voxa-sidebar__username">Mehadi</span>
          <span className="voxa-sidebar__plan-badge">Free Plan</span>
        </div>
        <button className="voxa-sidebar__profile-trigger" aria-label="Account menu">
          <ChevronDown size={16} strokeWidth={2.5} />
        </button>
      </div>
    </aside>
  );
}
