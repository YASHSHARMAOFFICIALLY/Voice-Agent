import { useState } from 'react';
import { ArrowUpRight, Send } from 'lucide-react';
import { PROJECTS, SESSION_ROWS } from '../data/sessionsData';
import './SessionsPage.css';
import ProjectOverview from '../components/ProjectOverview';
import ProjectChat from '../components/ProjectChat';

export default function SessionsPage() {
  const [filter, setFilter] = useState('Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [firstMessage, setFirstMessage] = useState('');

  const url = new URL(window.location.href);
  const projectPath = url.pathname.match(/\/sessions\/project\/([^/]+)/);
  const chatPath = url.pathname.match(/\/sessions\/project\/([^/]+)\/chat/);
  const activeProjectId = chatPath ? chatPath[1] : (projectPath ? projectPath[1] : null);

  const selectedProject = PROJECTS.find(p => p.id === (activeProjectId || selectedProjectId));

  const handleProjectClick = (id) => {
    setSelectedProjectId(id);
    window.history.pushState({}, '', `/sessions/project/${id}`);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedProjectId(null);
    setChatOpen(false);
    window.history.pushState({}, '', '/sessions');
    window.scrollTo(0, 0);
  };

  const handleAsk = (msg) => {
    if (!msg || msg.trim() === '') return;
    setFirstMessage(msg);
    setChatOpen(true);
    window.history.pushState({}, '', `/sessions/project/${selectedProject?.id || activeProjectId}/chat`);
  };

  // Project Chat state
  if (chatOpen || (chatPath && selectedProject)) {
    return <ProjectChat project={selectedProject} onBack={handleBack} initialMessage={firstMessage} />;
  }

  // Project Overview state
  if (activeProjectId && selectedProject) {
    return <ProjectOverview project={selectedProject} onBack={handleBack} onAskVoxa={handleAsk} />;
  }

  return (
    <div className="voxa-sessions-page">
      <div className="voxa-sessions-label">Sessions</div>
      <h1 className="voxa-sessions-page__title">Your Ideas, <span className="voxa-highlight">Connected</span></h1>
      <p className="voxa-sessions-page__subtitle">Every conversation, recording and file voxa has learned</p>

      <div className="voxa-sessions-page__search-wrap">
        <div className="voxa-search-bar">
          <input
            className="voxa-search-bar__input"
            type="text"
            placeholder="Ask Voxa anything about your recordings, files or ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="voxa-search-bar__btn" aria-label="Search">
            <Send size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="voxa-sessions-page__toolbar">
        <div className="voxa-sessions-page__filters">
          {['All', 'Projects', 'Conversations', 'Recordings', 'Files'].map((f) => (
            <button
              key={f}
              className={`voxa-filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="voxa-sort-control">
          <span>Sort by:</span>
          <select value="Recent" onChange={() => {}}>
            <option>Recent</option>
          </select>
        </div>
      </div>

      <section className="voxa-sessions-section">
        <h2 className="voxa-sessions-section__title">Projects</h2>
        <div className="voxa-projects-row">
          {PROJECTS.map((proj) => (
            <button
              key={proj.id}
              className="voxa-project-card"
              style={{ backgroundColor: proj.color || '#f5f5f5', borderTopColor: proj.color || '#ccc' }}
              onClick={() => handleProjectClick(proj.id)}
            >
              <h3 className="voxa-project-card__name">{proj.name}</h3>
              <div className="voxa-project-card__meta">
                <div>{proj.connections} Connections</div>
                <div>{proj.recordings} recordings</div>
                <div>{proj.files} files</div>
              </div>
              <div className="voxa-project-card__action">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="voxa-sessions-section">
        <h2 className="voxa-sessions-section__title">Recent Sessions</h2>
        <div className="voxa-recent-grid">
          {SESSION_ROWS.map((s) => (
            <button key={s.id} className="voxa-recent-card" style={{ borderLeftColor: s.accent }}>
              <div className="voxa-recent-card__main">
                <h4 className="voxa-recent-card__title">{s.title}</h4>
                <p className="voxa-recent-card__snippet">{s.snippet}</p>
                <div className="voxa-recent-card__tags">
                  {s.tags.map(t => <span key={t} className="voxa-recent-card__tag-pill">{t}</span>)}
                </div>
              </div>
              <div className="voxa-recent-card__side">
                <span className="voxa-recent-card__date">{s.time} · {s.date}</span>
                <span className="voxa-recent-card__lang">{s.language}</span>
                <span className="voxa-recent-card__dur">{s.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
