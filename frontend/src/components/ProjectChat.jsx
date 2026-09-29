import { useState, useEffect } from 'react';
import { ArrowLeft, Mic, Square, Pause, Send } from 'lucide-react';


import './ProjectChat.css';

export default function ProjectChat({ project, onBack, initialMessage = '' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTalking, setIsTalking] = useState(false);
  const [isPoppedOut, setIsPoppedOut] = useState(false);
  const [timer] = useState('00:42');

  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      setMessages([{ from: 'user', text: initialMessage, time: '00:00' }]);
    } else {
      setMessages([
        { from: 'voxa', text: 'Welcome to the ESP32 Object Recognition project. I can help you explore sensor configurations, review recordings, and summarize your recent conversations.', time: '00:00' },
      ]);
    }
  }, [initialMessage, project?.id]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input, time: '00:12' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'voxa',
        text: 'That sounds interesting. Would you like to review the recent recording about battery optimization or explore the sensor data files?',
        time: '00:15',
      }]);
    }, 900);
  };

  const handleStartTalking = () => setIsTalking(true);
  const handleEndCall = () => setIsTalking(false);
  const handlePopOut = () => setIsPoppedOut(!isPoppedOut);

  return (
    <div className="voxa-project-chat">
      {/* Header */}
      <div className="voxa-chat-header">
        <button className="voxa-chat-header__back" onClick={onBack}>
          <ArrowLeft size={16} strokeWidth={2.5} /> <span>All Sessions</span>
        </button>
        <div className="voxa-chat-header__project">
          <h1 className="voxa-chat-header__title">{project?.name || 'Project'}</h1>
          <button className="voxa-chat-header__edit" aria-label="Edit"><span>Edit</span></button>
        </div>
        <p className="voxa-chat-header__subtitle">{project?.description || 'Project overview'}</p>
      </div>

      <div className="voxa-chat-layout">
        {/* Chat Area */}
        <div className="voxa-chat-main">
          <div className="voxa-chat-conversation">
            {messages.map((m, i) => (
              <div key={i} className={`voxa-chat-message voxa-chat-message--${m.from}`}>
                <div className="voxa-chat-message__bubble">
                  <div className="voxa-chat-message__label">{m.from === 'user' ? 'You' : 'Voxa'}</div>
                  <p className="voxa-chat-message__text">{m.text}</p>
                  <span className="voxa-chat-message__time">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="voxa-chat-input-area">
            <input
              type="text"
              placeholder="Ask a follow Up or continue the conversation"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="voxa-chat-input"
            />
            <button className="voxa-chat-send-btn" onClick={handleSend} aria-label="Send"><Send size={14} /></button>
            <button className="voxa-chat-talk-btn" onClick={handleStartTalking} aria-label="Start Talking">
              <Mic size={14} /> Start Talking
            </button>
          </div>
        </div>

        {/* Right Panels */}
        <aside className="voxa-chat-side">
          {/* Talking to Voxa */}
          <div className={`voxa-voice-panel ${isTalking ? 'voxa-voice-panel--active' : ''}`}>
            <button className="voxa-voice-panel__popout" onClick={handlePopOut} aria-label="Pop out" title="Pop out">
              ⊡
            </button>
            {isTalking ? (
              <>
                <div className="voxa-voice-panel__waveform">●●●●●●</div>
                <h3 className="voxa-voice-panel__status">Talking to Voxa...</h3>
                <div className="voxa-voice-panel__timer">{timer}</div>
                <div className="voxa-voice-panel__controls">
                  <button aria-label="Mic"><Mic size={18} /></button>
                  <button className="voxa-voice-panel__end-btn" onClick={handleEndCall} aria-label="End call"><Square size={18} /></button>
                  <button aria-label="Pause"><Pause size={18} /></button>
                </div>
              </>
            ) : (
              <div className="voxa-voice-panel__idle">
                <h3 className="voxa-voice-panel__status">Ready to talk</h3>
                <p>Click Start Talking to begin</p>
                <button className="voxa-voice-panel__start-btn" onClick={handleStartTalking}>
                  <Mic size={16} /> Start Talking
                </button>
              </div>
            )}
          </div>

          {/* Context */}
          <div className="voxa-context-panel">
            <h3 className="voxa-context-panel__title">Context</h3>
            <div className="voxa-context-drop">
              <span>Drag files here</span>
            </div>
            <div className="voxa-context-filters">
              {['Files', 'Recordings', 'Notes'].map(t => (
                <button key={t} className="voxa-context-filter">{t}</button>
              ))}
            </div>
            <div className="voxa-context-files">
              <div className="voxa-context-file">
                <span className="voxa-context-file__icon">📄</span>
                <div>
                  <div className="voxa-context-file__name">sensor_data.ipynb</div>
                  <div className="voxa-context-file__meta">Oct 10, 2024</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
