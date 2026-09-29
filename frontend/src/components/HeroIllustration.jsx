import React from 'react';
import './HeroIllustration.css';
import heroIllustration from '../assets/hero-illustration.png';

export default function HeroIllustration() {
  return (
    <div className="voxa-hero-illustration">
      <img src={heroIllustration} alt="Retro Recorder" className="voxa-hero-illustration__image" />
    </div>
  );
}
