import './LibraryPage.css';
import NeoButton from '../components/NeoButton';

const MOCK_ITEMS = [
  { id: 1, title: 'Meeting Notes 01', date: '2026-09-21' },
  { id: 2, title: 'Project Voxa Sync', date: '2026-09-20' },
  { id: 3, title: 'Brainstorm Session', date: '2026-09-15' },
];

export default function LibraryPage() {
  return (
    <div className="voxa-library">
      <div className="voxa-library__header">
        <h2 className="voxa-library__title">Library</h2>
      </div>
      <div className="voxa-library__grid">
        {MOCK_ITEMS.map(item => (
          <div key={item.id} className="voxa-library-card">
            <h4 className="voxa-library-card__title">{item.title}</h4>
            <p>{item.date}</p>
            <NeoButton variant="tertiary" size="small">View</NeoButton>
          </div>
        ))}
      </div>
    </div>
  );
}
