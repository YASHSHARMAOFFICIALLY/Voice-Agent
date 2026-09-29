import React from 'react';
import { ArrowRight, FolderClosed } from 'lucide-react';
import { recentSessions } from '../data/mockData';
import SessionCard from './SessionCard';
import './RecentSessions.css';

export default function RecentSessions({ onViewAll, onSelectSession }) {
  return (
    <section className="voxa-recent-sessions" aria-label="Recent audio sessions">
      {/* Section Header with View All Action */}
      <div className="voxa-recent-sessions__header">
        <div className="voxa-recent-sessions__title-group">
          <div className="voxa-recent-sessions__icon-badge">
            <FolderClosed size={18} strokeWidth={2.2} />
          </div>
          <h2 className="voxa-recent-sessions__title">Recent Sessions</h2>
        </div>

        <button
          className="voxa-recent-sessions__view-all-btn"
          onClick={onViewAll}
        >
          <span>View all</span>
          <ArrowRight size={16} strokeWidth={2.2} />
        </button>
      </div>

      {/* Grid of Sessions */}
      <div className="voxa-recent-sessions__grid">
        {recentSessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onPlay={onSelectSession}
          />
        ))}
      </div>
    </section>
  );
}
