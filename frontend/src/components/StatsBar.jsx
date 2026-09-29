import React from 'react';
import { Activity, Mic, Clock, Sparkles, Globe } from 'lucide-react';
import { weeklyStats } from '../data/mockData';
import './StatsBar.css';

const STAT_ICONS = [Mic, Clock, Sparkles, Globe];

export default function StatsBar() {
  return (
    <section className="voxa-stats-bar" aria-label="Workspace activity statistics">
      <div className="voxa-stats-bar__header">
        <div className="voxa-stats-bar__title-group">
          <Activity size={16} strokeWidth={2.5} className="voxa-stats-bar__activity-icon" />
          <span className="voxa-stats-bar__title">This Week's Activity</span>
        </div>
        <span className="voxa-stats-bar__badge">Live Metrics</span>
      </div>

      <div className="voxa-stats-bar__content">
        {weeklyStats.map((stat, idx) => {
          const Icon = STAT_ICONS[idx] || Activity;
          return (
            <React.Fragment key={stat.label}>
              <div className="voxa-stats-item">
                <div className="voxa-stats-item__icon-box">
                  <Icon size={16} strokeWidth={2.2} />
                </div>
                <div className="voxa-stats-item__info">
                  <span className="voxa-stats-item__label">{stat.label}</span>
                  <p className="voxa-stats-item__value">{stat.value}</p>
                  <span className="voxa-stats-item__change">{stat.change}</span>
                </div>
              </div>
              {idx < weeklyStats.length - 1 && <div className="voxa-stats-divider"></div>}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
