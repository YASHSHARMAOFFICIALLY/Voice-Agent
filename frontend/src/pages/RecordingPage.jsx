import { useState, useEffect } from 'react';
import './RecordingPage.css';
import NeoButton from '../components/NeoButton';

export default function RecordingPage({ onStop }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div className="voxa-recording">
      <header className="voxa-recording__header">
        <div className="voxa-recording__status">
          <div className="voxa-recording__indicator"></div>
          <h2 className="voxa-recording__title">Recording</h2>
          <span className="voxa-recording__timer">{formatTime(timer)}</span>
        </div>
        <div className="voxa-recording__controls">
          <NeoButton variant="primary" onClick={onStop}>Stop</NeoButton>
          <NeoButton variant="secondary" >Pause</NeoButton>
        </div>
      </header>

      <main className="voxa-recording__content">
        <section className="voxa-transcription">
          <h3>Live Transcription</h3>
          <div className="voxa-transcription__list">
            <div className='voxa-trans'><p>00:00 </p><span>So today we’re going to discuss the battery optimization for the ESP32...</span></div> 
            <div className='voxa-trans'><p>00:00 </p><span>So today we’re going to discuss the battery optimization for the ESP32...</span></div> 
            <div className='voxa-trans'><p>00:00 </p><span>So today we’re going to discuss the battery optimization for the ESP32...</span></div>
          </div>
          <div className="voxa-transcription__status">
            <span className="voxa-transcription__indicator"></span>
            Transcribing in real-time...
          </div>
        </section>

        <section className="voxa-summary">
          <h3>AI Summary (Live)</h3>
          <div className="voxa-summary__list">
            <span>Generating Summary...</span>
            <ul>
              <li>Discussing ESP32 battery optimization</li>
              <li>Discussing ESP32 battery optimization</li>
            </ul>
          </div>
          <div className="voxa-summary__status">
            Summary updates as you speak...
          </div>
        </section>
      </main>
    </div>
  );
}
