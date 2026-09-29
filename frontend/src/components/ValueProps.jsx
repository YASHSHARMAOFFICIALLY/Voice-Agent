import React from 'react';
import { FileText, Sparkles, CheckCircle, Languages } from 'lucide-react';
import { valueProps } from '../data/mockData';
import './ValueProps.css';

const ICON_MAP = {
  FileText,
  Sparkles,
  CheckCircle,
  Languages
};

export default function ValueProps() {
  return (
    <section className="voxa-value-props" aria-label="Key features">
      <div className="voxa-value-props__grid">
        {valueProps.map((prop) => {
          const Icon = ICON_MAP[prop.iconName] || Sparkles;
          return (
            <div
              key={prop.id}
              className="voxa-value-prop-item"
              style={{backgroundColor: prop.bg, border: prop.border}}
            >
              <div className="voxa-value-prop-item__icon-box" style={{backgroundColor: prop.icon_bg, }}>
                <Icon size={20} strokeWidth={2} />
              </div>
              <div className="voxa-value-prop-item__content">
                <p className="voxa-value-prop-item__title">
                  {prop.title}
                </p>
                <p className="voxa-value-prop-item__subtitle">
                  {prop.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
