import './SettingsPage.css';
import NeoButton from '../components/NeoButton';

export default function SettingsPage() {
  return (
    <div className="voxa-settings">
      <div className="voxa-settings__header">
        <h2 className="voxa-settings__title">Settings</h2>
      </div>

      <div className="voxa-settings__section">
        <h3>Profile</h3>
        <div className="voxa-settings__control">
          <span>Name: Mehadi Hassan</span>
          <NeoButton variant="secondary" size="small">Edit</NeoButton>
        </div>
        <div className="voxa-settings__control">
          <span>Email: mehadi@example.com</span>
          <NeoButton variant="secondary" size="small">Edit</NeoButton>
        </div>
      </div>

      <div className="voxa-settings__section">
        <h3>Recording Preferences</h3>
        <div className="voxa-settings__control">
          <span>Auto-Start Recording</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="voxa-settings__control">
          <span>Default Language: English</span>
          <NeoButton variant="secondary" size="small">Change</NeoButton>
        </div>
      </div>

      <div className="voxa-settings__actions">
        <NeoButton variant="primary">Save Changes</NeoButton>
        <NeoButton variant="tertiary">Log Out</NeoButton>
      </div>
    </div>
  );
}
