import React, { useState, useEffect, useRef } from 'react';
import NeoButton from './NeoButton';
import './UploadModal.css';

export default function UploadModal({ isOpen, onClose }) {
  const [step, setStep] = useState('upload'); // upload | audio-selected | choose-output | processing | complete
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [fileDuration, setFileDuration] = useState(0);
  const [spokenLanguage, setSpokenLanguage] = useState("Auto Detect");
  const [action, setAction] = useState("transcribe");
  const [outputLanguage, setOutputLanguage] = useState("English");

  const [receiveType, setReceiveType] = useState("text");
  const [textFormat, setTextFormat] = useState("TXT");
  const [voiceStyle, setVoiceStyle] = useState("Natural");

  const [resultTab, setResultTab] = useState("audio");

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Reset state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('upload');
      setFile(null);
      setProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setStep('audio-selected');
    }
  };

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStep('audio-selected');

      const audio = new
      Audio(URL.createObjectURL(selectedFile));

      audio.onloadedmetadata = () => {
        setFileDuration(audio.duration);
      };

    }
  };

  const startProcessing = () => {
    setStep('processing');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep('complete');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="voxa-upload-modal__backdrop" onClick={onClose}>
      <div className="voxa-upload-modal" onClick={(e) => e.stopPropagation()}>
        {step === 'upload' && (
          <>
            <img className='upload-logo' src="src/assets/icons/upload.svg" alt="Logo" />
            <h2 className="voxa-upload-modal__title">Upload Audio</h2>
            <p className='upload-details'>Upload an existing recording to get a transcription, translation and more</p>
            <div
              className="voxa-upload-dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              <img className='drop-logo' src="src/assets/icons/file-analytics.svg" alt="Logo" />
              <p>Drop your audio here</p>
              <p>or</p>
              <NeoButton variant="secondary" onClick={handleBrowse}>Browse Files</NeoButton>
              <input type="file" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} accept=".mp3,.wav,.m4a,.flac" />
              <p className="voxa-upload-modal__formats">Accepted formats: MP3 / WAV / M4A / FLAC</p>
            </div>
            <div className="audio-cancel" style={{top: "15%", right: "27%"}}><button onClick={onClose}><img src="src/assets/icons/x.svg" alt="Cancel" /></button></div>
          </>
        )}

        {step === 'audio-selected' && (
          <>
            <img className='upload-logo' src="src/assets/icons/upload.svg" alt="Logo" />
            <h2 className="voxa-upload-modal__title">Audio Selected</h2>
            <div className="voxa-upload-file-details">
              <div style={{display:"flex"}}>
                <div className="voxa-upload-file-icon">
                  <img src="src/assets/icons/music.svg" alt="File Icon" />
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{file.name}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <p style={{ margin: 0, fontSize: '12px' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p style={{ margin: 0, fontSize: '12px' }}>{formatDuration(fileDuration)} seconds</p>
                  </div>
                </div>
              </div>
              <button style={{ fontSize: '18px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => { setFile(null); setStep('upload'); }}>X</button>
            </div>
            <div className="upload-field">
              <label>Spoken Language</label>

              <select
                value={spokenLanguage}
                onChange={(e) => setSpokenLanguage(e.target.value)}
              >
                <option value="Auto Detect">Auto Detect</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>

            <div className="upload-field">
              <label>What would you like to do?</label>

              <div className="action-options">

                <label
                  className={`action-option ${
                    action === "transcribe" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="audioAction"
                    value="transcribe"
                    checked={action === "transcribe"}
                    onChange={(e) => setAction(e.target.value)}
                  />

                  <div className="action-icon">
                    📄
                  </div>

                  <div className="action-text">
                    <strong>Transcribe</strong>
                    <span>(Original language)</span>
                  </div>
                </label>


                <label
                  className={`action-option ${
                    action === "translate" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="audioAction"
                    value="translate"
                    checked={action === "translate"}
                    onChange={(e) => setAction(e.target.value)}
                  />

                  <div className="action-icon">
                    📄
                  </div>

                  <div className="action-text">
                    <strong>Translate Audio</strong>
                    <span>(Transcribe + Translate)</span>
                  </div>
                </label>

              </div>
            </div>

            <div className="upload-field">
              <label>Output Language</label>

              <select
                value={outputLanguage}
                onChange={(e) => setOutputLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>
            <NeoButton variant="primary" onClick={() => setStep('choose-output')}>Next: Choose Output →</NeoButton>
            <div className="audio-cancel" style={{top: "9%", right: "27%"}}><button onClick={onClose}><img src="src/assets/icons/x.svg" alt="Cancel" /></button></div>
          </>
        )}

        {step === 'choose-output' && (
          <>
            <img className='upload-logo' src="src/assets/icons/upload.svg" alt="Logo"/>
            <h2 className="voxa-upload-modal__title">Choose Output</h2>
            <div className="upload-field">
              <label>What would you like to receive?</label>

              <div className="receive-options">

                {/* Translated Text */}
                <label
                  className={`receive-option ${
                    receiveType === "text" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="receiveType"
                    value="text"
                    checked={receiveType === "text"}
                    onChange={(e) => setReceiveType(e.target.value)}
                  />

                  <span className="radio-circle"></span>

                  <div className="receive-icon">
                    📄
                  </div>

                  <div className="receive-text">
                    <strong>Translated Text</strong>
                    <span>TXT, SRT or VTT (with timestamps)</span>
                  </div>
                </label>


                {/* Translated Audio */}
                <label
                  className={`receive-option ${
                    receiveType === "audio" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="receiveType"
                    value="audio"
                    checked={receiveType === "audio"}
                    onChange={(e) => setReceiveType(e.target.value)}
                  />

                  <span className="radio-circle"></span>

                  <div className="receive-icon">
                    🔊
                  </div>

                  <div className="receive-text">
                    <strong>Translated Audio</strong>
                    <span>MP3</span>
                  </div>
                </label>


                {/* Both */}
                <label
                  className={`receive-option ${
                    receiveType === "both" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="receiveType"
                    value="both"
                    checked={receiveType === "both"}
                    onChange={(e) => setReceiveType(e.target.value)}
                  />

                  <span className="radio-circle"></span>

                  <div className="receive-icon">
                    📄 🔊
                  </div>

                  <div className="receive-text">
                    <strong>Both</strong>
                    <span>Audio (mp3) + Text (txt)</span>
                  </div>
                </label>

              </div>
            </div>
            <div className="upload-field">
              <label>Text Format</label>

              <select
                value={textFormat}
                onChange={(e) => setTextFormat(e.target.value)}
              >
                <option value="TXT">TXT (Simple text)</option>
                <option value="SRT">SRT (Subtitles)</option>
                <option value="VTT">VTT (Web subtitles)</option>
              </select>
            </div>
            <div className="upload-field">
              <label>Voice style</label>

              <select
                value={voiceStyle}
                onChange={(e) => setVoiceStyle(e.target.value)}
              >
                <option value="Natural">Natural (Default)</option>
                <option value="Professional">Professional</option>
                <option value="Friendly">Friendly</option>
                <option value="Calm">Calm</option>
                <option value="Energetic">Energetic</option>
              </select>
            </div>
            <NeoButton variant="primary" onClick={startProcessing}>Start Processing</NeoButton>
            <div className="audio-cancel" style={{top: "5%", right: "27%"}}><button onClick={onClose}><img src="src/assets/icons/x.svg" alt="Cancel" /></button></div>
          </>
        )}

        {step === 'processing' && (
          <>
            <h2 className="voxa-upload-modal__title">Processing Audio...</h2>
            <div className="voxa-upload-progress">
              <div className="voxa-upload-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="voxa-upload-helper">Please do not close this window while processing.</p>
          </>
        )}

        {step === 'complete' && (
          <>
            <div className='complete-logo'><img src='src/assets/icons/check.svg'></img></div>
            <h2 className="voxa-upload-modal__title">Translation Complete!</h2>
            <p className="translation-success">
              Your audio has been translated successfully
            </p>

            {/* File information */}
            <div className="translation-file">
              <div className="translation-file-icon">
                🎵
              </div>

              <div className="translation-file-info">
                <strong>Lecture 1 - Cell Structure</strong>

                <span>
                  Hindi → English
                </span>

                <span>
                  42:18 · 38.4 MB
                </span>
              </div>
            </div>

            {/* Result tabs */}
            <div className="translation-tabs">

              <button
                className={`translation-tab ${
                  resultTab === "audio" ? "active" : ""
                }`}
                onClick={() => setResultTab("audio")}
              >
                Translated Audio
              </button>

              <button
                className={`translation-tab ${
                  resultTab === "text" ? "active" : ""
                }`}
                onClick={() => setResultTab("text")}
              >
                Translated Text
              </button>

            </div>

            {/* Result content */}
            <div className="translation-result">

              {resultTab === "audio" ? (

                /* ---------------- AUDIO ---------------- */
                <div className="translated-audio">

                  <div className="audio-player">

                    <button className="audio-play-button">
                      ▶
                    </button>

                    <div className="audio-progress">
                      <div className="audio-progress-bar"></div>
                    </div>

                    <span className="audio-time">
                      00:00 / 42:18
                    </span>

                    <button className="audio-speed">
                      1x
                    </button>

                  </div>

                </div>

              ) : (

                /* ---------------- TEXT ---------------- */
                <div className="translated-text">

                  <div className="transcript-line">
                    <span className="timestamp">00:00</span>
                    <span>
                      So today we're going to discuss the battery
                      optimization for the ESP32...
                    </span>
                  </div>

                  <div className="transcript-line">
                    <span className="timestamp">00:08</span>
                    <span>
                      So today we're going to discuss the battery
                      optimization for the ESP32...
                    </span>
                  </div>

                  <div className="transcript-line">
                    <span className="timestamp">00:14</span>
                    <span>
                      So today we're going to discuss the battery
                      optimization for the ESP32...
                    </span>
                  </div>

                  <div className="transcript-line">
                    <span className="timestamp">00:21</span>
                    <span>
                      So today we're going to discuss the battery
                      optimization for the ESP32...
                    </span>
                  </div>

                  <div className="transcript-line">
                    <span className="timestamp">00:30</span>
                    <span>
                      So today we're going to discuss the battery
                      optimization for the ESP32...
                    </span>
                  </div>

                </div>

              )}

            </div>

            {/* Download button */}
            <button className="translation-download">
              ↓ Download {resultTab === "audio" ? "MP3" : "TXT"}
            </button>
            <NeoButton variant="primary" onClick={onClose}>Done</NeoButton>
          </>
        )}
      </div>
    </div>
  );
}
