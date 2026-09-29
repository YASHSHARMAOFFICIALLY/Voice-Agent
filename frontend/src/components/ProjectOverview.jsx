import { useState } from 'react';
import { ArrowLeft, Edit3, Send, Play } from 'lucide-react';

import './ProjectOverview.css';

export default function ProjectOverview({ project, onBack, onAskVoxa }) {
  const [memoryQuery, setMemoryQuery] = useState('');

  if (!project) {
    return <div className="voxa-project-overview">No project selected</div>;
  }

  const handleAskVoxa = () => {
    if (onAskVoxa && memoryQuery.trim()) {
      onAskVoxa(memoryQuery.trim());
    }
  };

  const conversations = [
    {
      id: 'c1',
      title: 'Object Recognition Ideas',
      date: 'Oct 12, 2024',
      time: '14:30',
      type: 'technical',
      duration: '24:15',
    },
  ];

  const files = [
    {
      id: 'f1',
      name: 'sensor_data_analysis.ipynb',
      type: 'Jupyter Notebook',
      size: '2.4 MB',
      date: 'Oct 10, 2024',
    },
  ];

  return (
    <div className="voxa-project-overview">
      {/* Back to All Sessions */}
      <button
        className="voxa-project-overview__back-btn"
        onClick={onBack}
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        <span>Back to All Sessions</span>
      </button>

      {/* Project Header */}
      <div className="voxa-project-overview__header" style={{ borderTopColor: project.color }}>
        <div className="voxa-project-overview__title-row">
          <div className="voxa-project-overview__title-wrap">
            <h1 className="voxa-project-overview__title">{project.name}</h1>
            <span className="voxa-project-overview__tag">{project.tag}</span>
          </div>
          <button className="voxa-project-overview__edit-btn" aria-label="Edit project">
            <Edit3 size={16} strokeWidth={2} />
          </button>
        </div>
        <p className="voxa-project-overview__description">
          This project contains {project.connections} connections, {project.recordings} recordings, and {project.files} files. Perfect for collaborative work and learning.
        </p>
      </div>

      {/* Voxa Input */}
      <div className="voxa-project-overview__voxa-input">
        <input
          type="text"
          placeholder="Ask Voxa about this project..."
          value={memoryQuery}
          onChange={(e) => setMemoryQuery(e.target.value)}
          className="voxa-project-overview__input"
        />
        <button
          className="voxa-project-overview__voxa-btn"
          onClick={handleAskVoxa}
        >
          <Send size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* Main Layout: Memory card + Conversations / Files side-by-side */}
      <div className="voxa-project-overview__body">
        {/* Project Memory */}
        <section className="voxa-project-overview__memory-section">
          <div className="voxa-project-overview__memory-card">
            <div className="voxa-project-overview__memory-header">
              <h2 className="voxa-project-overview__memory-title">Project Memory</h2>
              <button className="voxa-project-overview__memory-link" aria-label="View full memory">
                View Full Memory
              </button>
            </div>
            <div className="voxa-project-overview__memory-meta">
              <span className="voxa-project-overview__memory-type">Session</span>
              <span className="voxa-project-overview__memory-date">Oct 15, 2024</span>
            </div>
            <p className="voxa-project-overview__memory-content">
              Discussed battery optimization strategies for IoT sensor deployment and potential firmware improvements. Key takeaways include optimizing sleep cycles between sensor reads, reducing WiFi transmission frequency, and updating the ESP32 firmware to version 2.0.
            </p>
          </div>
        </section>

        {/* Right Column: Conversations + Files */}
        <div className="voxa-project-overview__sidebar">
          {/* Recent Conversations */}
          <div className="voxa-project-overview__panel">
            <h2 className="voxa-project-overview__panel-title">Recent Conversations</h2>
            <div className="voxa-project-overview__conv-list">
              {conversations.map((conv) => (
                <button key={conv.id} className="voxa-project-overview__conv-item">
                  <div className="voxa-project-overview__conv-info">
                    <div className="voxa-project-overview__conv-icon">
                      <Play size={12} strokeWidth={2.5} />
                    </div>
                    <div className="voxa-project-overview__conv-text">
                      <h3 className="voxa-project-overview__conv-title">{conv.title}</h3>
                      <span className="voxa-project-overview__conv-meta">{conv.date} • {conv.time}</span>
                    </div>
                  </div>
                  <span className="voxa-project-overview__conv-tag">{conv.type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div className="voxa-project-overview__panel">
            <h2 className="voxa-project-overview__panel-title">Recent Files</h2>
            <div className="voxa-project-overview__file-list">
              {files.map((file) => (
                <div key={file.id} className="voxa-project-overview__file-item">
                  <div className="voxa-project-overview__file-icon-placeholder" />
                  <div className="voxa-project-overview__file-info">
                    <span className="voxa-project-overview__file-name">{file.name}</span>
                    <span className="voxa-project-overview__file-meta">{file.type} • {file.size} • {file.date}</span>
                  </div>
                  <button className="voxa-project-overview__file-add" aria-label={`Add ${file.name}`}>＋</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}