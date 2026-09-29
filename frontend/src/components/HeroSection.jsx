import { Mic, Upload, Sparkles } from 'lucide-react';
import NeoButton from './NeoButton';
import HeroIllustration from './HeroIllustration';
import './HeroSection.css';

export default function HeroSection({ onStartRecord, onUploadAudio }) {
  return (
    <section className="voxa-hero">
      {/* Left Content Column */}
      <div className="voxa-hero__content">
        {/* Top Tagline Badge with Sparkle */}
        <div className="voxa-hero__badge">
          <Sparkles size={14} className="voxa-hero__badge-icon" />
          <span className="voxa-hero__badge-text">YOUR AUDIO, ORGANISED ✦</span>
        </div>

        {/* Main Headline Stack with Brutalist Highlight */}
        <h1 className="voxa-hero__title">
          <span className="voxa-hero__title-line">Talk it out.</span>
          <span className="voxa-hero__highlight-wrapper">
            <span className="voxa-hero__highlight-box">We’ll handle the rest</span>
          </span>
        </h1>

        {/* Descriptive Subtitle */}
        <p className="voxa-hero__subtitle">
          Record meetings, lectures, and quick thoughts. Voxa transcribes with pinpoint accuracy, generates structured summaries, and unlocks instant multilingual translations.
        </p>
      </div>

      {/* Right Visual Scene Column */}
      <div className="voxa-hero__visual">
        <HeroIllustration />
      </div>
    </section>
  );
}
