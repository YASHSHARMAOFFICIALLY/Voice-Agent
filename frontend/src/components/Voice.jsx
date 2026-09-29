import React, { useEffect, useMemo, useRef, useState } from "react";
import { Brain, FileText, FolderOpen, Lightbulb, Mic, Paperclip, Play, Sparkles, Square, Upload, Waves, X } from "lucide-react";
import "./Voice.css";

export default function VoiceConversation({ initialTranscript = [], onConversationEnd, className = "" }) {
  const [status, setStatus] = useState("idle"); // idle | listening | thinking | speaking | ended
  const [transcript, setTranscript] = useState(initialTranscript);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const fileInputRef = useRef(null);
  const isActive = ["listening", "thinking", "speaking"].includes(status);

  const statusText = useMemo(() => ({
    idle: "Talk to Voxa",
    listening: "Listening...",
    thinking: "Thinking...",
    speaking: "Voxa is speaking...",
    ended: "Conversation ended"
  }[status]), [status]);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => setElapsed(v => v + 1), 1000);
    return () => clearInterval(timer);
  }, [isActive]);

  // DEMO voice loop. Replace this with AssemblyAI realtime + LLM + TTS.
  useEffect(() => {
    if (status !== "listening") return;
    const timer = setTimeout(() => {
      setTranscript(current => [...current, {
        id: `${Date.now()}-user`, speaker: "You",
        text: "I'm thinking about building a study app for students...",
        time: formatTime(elapsed)
      }]);
      setStatus("thinking");
    }, 2400);
    return () => clearTimeout(timer);
  }, [status]); // demo only

  useEffect(() => {
    if (status !== "thinking") return;
    const timer = setTimeout(() => {
      setTranscript(current => [...current, {
        id: `${Date.now()}-voxa`, speaker: "Voxa",
        text: "That sounds interesting. What problem do you want the app to solve first?",
        time: formatTime(elapsed)
      }]);
      setStatus("speaking");
    }, 1300);
    return () => clearTimeout(timer);
  }, [status]); // demo only

  useEffect(() => {
    if (status !== "speaking") return;
    const timer = setTimeout(() => setStatus("listening"), 2300);
    return () => clearTimeout(timer);
  }, [status]);

  function startConversation() {
    setElapsed(0);
    setStatus("listening");
  }

  function endConversation() {
    setStatus("ended");
    onConversationEnd?.({ transcript, duration: elapsed, files: attachedFiles });
  }

  function resetConversation() {
    setStatus("idle");
    setTranscript([]);
    setAttachedFiles([]);
    setElapsed(0);
  }

  function handleFileSelect(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setAttachedFiles(current => [...current, ...files.map(file => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      size: formatFileSize(file.size)
    }))]);
    event.target.value = "";
  }

  function removeFile(id) {
    setAttachedFiles(current => current.filter(file => file.id !== id));
  }

  return (
    <section className={`voxa-voice ${isActive ? "is-active" : ""} ${status === "ended" ? "is-ended" : ""} ${className}`}>
      <div className="voxa-voice__header">
        <div>
          
          <h2>Talk to Voxa</h2>
          <p>Think out loud, brainstorm ideas, ask questions, and let Voxa connect the conversation to what you have already discussed.</p>
        </div>
        {status === "ended" && (
          <button className="voxa-voice__restart" onClick={resetConversation} type="button"><Play size={15} fill="currentColor" /> Start again</button>
        )}
      </div>

      <div className="voxa-voice__workspace">
        <article className="voxa-voice-card voxa-voice-card--visual">
          <div className="voxa-voice-card__top">
            <div className="voxa-voice-card__icon voxa-voice-card__icon--mint"><Lightbulb size={20} /></div>
            <span className="voxa-voice-card__label">BRAINSTORM</span>
          </div>
          <div className="voxa-voice-card__visual">
            <div className="voxa-voice__idea-orb"><Sparkles size={22} /></div>
            <span>Ideas become clearer when you say them out loud.</span>
          </div>
          <div className="voxa-voice-card__chips"><span>Ideas</span><span>Plans</span><span>Problems</span></div>
        </article>

        <article className="voxa-voice-card voxa-voice-card--files">
          <div className="voxa-voice-card__top">
            <div className="voxa-voice-card__icon voxa-voice-card__icon--yellow"><FolderOpen size={20} /></div>
            <div><h3>Show Voxa something</h3><p>Upload notes, screenshots, PDFs or other files.</p></div>
          </div>
          <input ref={fileInputRef} type="file" hidden multiple accept=".pdf,.txt,.md,.doc,.docx,.png,.jpg,.jpeg,.webp" onChange={handleFileSelect} />
          <button className="voxa-voice__upload" onClick={() => fileInputRef.current?.click()} type="button"><Paperclip size={16} /> Add files</button>
          {attachedFiles.length > 0 && <div className="voxa-voice__file-list">
            {attachedFiles.slice(0, 2).map(file => <FileRow key={file.id} file={file} onRemove={() => removeFile(file.id)} />)}
            {attachedFiles.length > 2 && <span className="voxa-voice__more-files">+{attachedFiles.length - 2} more</span>}
          </div>}
        </article>

        <div className="voxa-voice__center">
          <div className="voxa-voice__decor voxa-voice__decor--one" />
          <div className="voxa-voice__decor voxa-voice__decor--two" />
          <div className={`voxa-voice__orb voxa-voice__orb--${status}`}>
            <div className="voxa-voice__orb-ring voxa-voice__orb-ring--one" />
            <div className="voxa-voice__orb-ring voxa-voice__orb-ring--two" />
            <button className="voxa-voice__mic" type="button" onClick={status === "idle" || status === "ended" ? startConversation : endConversation} aria-label={isActive ? "End conversation" : "Start conversation"}>
              {isActive ? <Square size={27} fill="currentColor" /> : <Mic size={38} />}
            </button>
            <div className="voxa-voice__waveform" aria-hidden="true">
              {Array.from({ length: 17 }, (_, i) => <span key={i} style={{ "--i": i }} />)}
            </div>
          </div>
          <div className="voxa-voice__status">
            <strong>{statusText}</strong>
            <span>
              {status === "idle" && "Tap to start a conversation"}
              {status === "listening" && "Speak naturally — Voxa is listening"}
              {status === "thinking" && "Voxa is thinking about what you said"}
              {status === "speaking" && "Listen, then jump back in whenever you want"}
              {status === "ended" && `Saved conversation · ${formatTime(elapsed)}`}
            </span>
          </div>
          {isActive && <div className="voxa-voice__controls">
            <button type="button" title="Mute"><Mic size={16} /></button>
            <button type="button" className="voxa-voice__end" onClick={endConversation} title="End"><Square size={14} fill="currentColor" /></button>
            <button type="button" title="Add file" onClick={() => fileInputRef.current?.click()}><Upload size={16} /></button>
          </div>}
        </div>

        <article className="voxa-voice-card voxa-voice-card--transcript">
          <div className="voxa-voice-card__top">
            <div className="voxa-voice-card__icon voxa-voice-card__icon--blue"><FileText size={20} /></div>
            <div className="voxa-voice-card__transcript-heading">
              <div><h3>Live transcript</h3><p>Your conversation appears here as you talk.</p></div>
              {isActive && <span className="voxa-voice__live"><i /> Live</span>}
            </div>
          </div>
          <div className="voxa-voice__transcript">
            {transcript.length === 0 ? <div className="voxa-voice__transcript-empty"><Waves size={25} /><span>Your conversation will appear here.</span></div> : transcript.map(item => (
              <div className={`voxa-voice__message ${item.speaker === "Voxa" ? "is-voxa" : "is-user"}`} key={item.id}>
                <div className="voxa-voice__message-meta"><span>{item.speaker}</span><time>{item.time}</time></div>
                <p>{item.text}</p>
              </div>
            ))}
            {status === "listening" && <Typing label="Listening" />}
            {status === "thinking" && <Typing label="Thinking" />}
            {status === "speaking" && <div className="voxa-voice__typing is-speaking"><Waves size={15} /><em>Voxa is speaking</em></div>}
          </div>
          <div className="voxa-voice-card__footer"><span><span className="voxa-voice__dot" /> Automatically saved</span><span>{transcript.length} turns</span></div>
        </article>
      </div>

      <div className={`voxa-voice__active-strip ${isActive ? "is-visible" : ""}`}>
        <div><Brain size={17} /><span>Voxa remembers this conversation and can connect it to your future ideas.</span></div>
        <span className="voxa-voice__memory-pill">Conversation memory</span>
      </div>

      {status === "ended" && <div className="voxa-voice__ended">
        <div><strong>Conversation saved.</strong><span>Audio, transcript, and insights are ready in your library.</span></div>
        <button type="button" onClick={resetConversation}><Mic size={16} /> Talk again</button>
      </div>}
    </section>
  );
}

function FileRow({ file, onRemove }) {
  return <div className="voxa-voice__file"><FileText size={14} /><span title={file.name}>{file.name}</span><small>{file.size}</small><button type="button" onClick={onRemove} aria-label={`Remove ${file.name}`}><X size={13} /></button></div>;
}

function Typing({ label }) {
  return <div className="voxa-voice__typing"><span /><span /><span /><em>{label}</em></div>;
}

function formatTime(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(Math.floor(safe % 60)).padStart(2, "0")}`;
}

function formatFileSize(bytes) {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, index);
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}
