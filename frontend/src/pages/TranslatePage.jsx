import './TranslatePage.css';
import NeoButton from '../components/NeoButton';

export default function TranslatePage() {
  return (
    <div className="voxa-translate">
      <div className="voxa-translate__header">
        <h2 className="voxa-translate__title">Translate Session</h2>
        <div className="voxa-translate__selector">
            <label>Target Language:</label>
            <select className="voxa-translate__select">
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
            </select>
            <NeoButton variant="primary" size="small">Translate</NeoButton>
        </div>
      </div>
      <div className="voxa-translate__content">
        <div className="voxa-translate__panel">
          <h3>Original Transcript</h3>
          <textarea className="voxa-translate__textarea" defaultValue="This is the original transcript..." readOnly />
        </div>
        <div className="voxa-translate__panel voxa-translate__panel--translated">
          <h3>Translated Output</h3>
          <textarea className="voxa-translate__textarea" defaultValue="Esta es la transcripción traducida..." readOnly />
        </div>
      </div>
      <div className="voxa-translate__controls">
        <NeoButton variant="secondary">Download Translated Audio</NeoButton>
        <NeoButton variant="primary">Save Translation</NeoButton>
      </div>
    </div>
  );
}
