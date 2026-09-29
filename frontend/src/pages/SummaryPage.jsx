import './SummaryPage.css';
import NeoButton from '../components/NeoButton';

import { useNavigate } from 'react-router-dom';

export default function SummaryPage({ onBack }) {
  const navigate = useNavigate();

  return (
    <div className="voxa-summary-page">
      <div className="voxa-summary-header">
         <div className="voxa-status-indicator">
             <div className="voxa-status-dot"></div>
             <h2 className="voxa-summary-title">Recording Stopped</h2>
         </div>
         <div className="voxa-controls">
           <NeoButton variant="tertiary">Play</NeoButton>
           <NeoButton variant="primary" onClick={() => navigate('/')}>Finish</NeoButton>
         </div>
      </div>
      <div className="voxa-summary-columns">
        <div className="voxa-summary-column voxa-summary-column--transcription">
          <h3>Transcription</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam necessitatibus impedit explicabo omnis veniam perferendis assumenda amet? Ad, hic deserunt aspernatur consequatur velit fuga totam alias quidem dolores recusandae repellendus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, dolore! Odio earum iusto officia molestiae quos, dignissimos distinctio eius commodi, eveniet ad et atque quaerat architecto rem numquam asperiores nostrum.</p>
          <div className="voxa-actions">
            <NeoButton variant="secondary" size="small">Copy</NeoButton>
            <NeoButton variant="secondary" size="small">Download</NeoButton>
            <NeoButton variant="secondary" size="small">Edit</NeoButton>
          </div>
        </div>
        <div className="voxa-summary-column voxa-summary-column--summary">
          <h3>AI Summary</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non maiores laborum quod quidem quisquam vitae, atque quam voluptas, laboriosam dolorum, obcaecati animi? Natus voluptas ratione dolor quo, libero atque nisi? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum reiciendis nostrum facilis omnis consequatur aut doloribus nobis eos! Eaque nesciunt ullam aspernatur sequi rerum tempora nihil illum soluta deleniti similique!</p>
          <div className="voxa-actions">
            <NeoButton variant="secondary" size="small">Copy</NeoButton>
            <NeoButton variant="secondary" size="small">Regenerate</NeoButton>
            <NeoButton variant="secondary" size="small">Save</NeoButton>
          </div>
        </div>
      </div>
      <div className="voxa-next-steps">
        <h3>Next Steps</h3>
        <div className="voxa-actions">
            <NeoButton variant="secondary">友 Translate</NeoButton>
            <NeoButton variant="secondary">Create Notes</NeoButton>
            <NeoButton variant="secondary">Add to Library</NeoButton>
            <NeoButton variant="secondary">Share</NeoButton>
        </div>
      </div>
    </div>
  );
}
