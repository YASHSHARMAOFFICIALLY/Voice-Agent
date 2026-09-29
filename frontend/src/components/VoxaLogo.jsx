import React from 'react';
import './VoxaLogo.css';

export default function VoxaLogo({ className = '', size = 'medium' }) {
  return (
    <div className={`voxa-logo voxa-logo--${size} ${className}`}>
      {/* Soundwave Icon Mark */}
      <div className="voxa-logo__mark">
        <span className="voxa-logo__bar voxa-logo__bar--1"></span>
        <span className="voxa-logo__bar voxa-logo__bar--2"></span>
        <span className="voxa-logo__bar voxa-logo__bar--3"></span>
        <span className="voxa-logo__bar voxa-logo__bar--4"></span>
      </div>
      {/* Brand Name */}
      <span className="voxa-logo__text">Voxa</span>
    </div>
  );
}
