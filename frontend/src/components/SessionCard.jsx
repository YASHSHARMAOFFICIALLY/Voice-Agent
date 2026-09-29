import React from 'react';
import { Play, Clock } from 'lucide-react';
import './SessionCard.css';

export default function SessionCard({ session, onPlay }) {
  if (!session) return null;

  return (
    <div className={`voxa-session-card`} style={{ backgroundColor: session.accentColor }}>
      
      <div className="voxa-session-card__header">
        {/* Category Pill Tag */}
        

        {/* Duration / Audio Length */}
        <div className="voxa-session-card__duration">
          <Clock size={12} strokeWidth={2} />
          <span>{session.duration}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="voxa-session-card__body">
        <h3 className="voxa-session-card__title">{session.title}</h3>
        {/* Short Summary Snippet / Insight */}
        <p className="voxa-session-card__snippet">{session.snippet}</p>
      </div>

      {/* Footer Meta: Date & Play Action Button */}
      <div className="voxa-session-card__footer">
        <span className="voxa-session-card__date">{session.date}</span>

        <button
          className="voxa-session-card__play-btn"
          aria-label={`Play session: ${session.title}`}
          onClick={() => onPlay && onPlay(session)}
        >
          <Play size={14} fill="#111111" strokeWidth={0} />
        </button>
      </div>
    </div>
  );
}
