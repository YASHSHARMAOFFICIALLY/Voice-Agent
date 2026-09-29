import './Footer.css';

export default function Footer() {
  return (
    <footer className="voxa-footer">
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span>▥</span>
            <strong>Voxa</strong>
          </div>

          <p>
            Your audio, organised.
            <br />
            Talk it out. We'll handle the rest.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Voxa</h4>
            <a href="/">Home</a>
            <a href="/sessions">Sessions</a>
            <a href="/library">Library</a>
          </div>

          <div className="footer-column">
            <h4>Tools</h4>
            <a href="/translate">Translate</a>
            <a href="/recording">Record</a>
            <a href="/settings">Settings</a>
          </div>

          <div className="footer-column">
            <h4>Help</h4>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span>© 2026 Voxa</span>

        <div className="footer-bottom-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>

        <span className="footer-made">
          Made for ideas worth remembering ✦
        </span>
      </div>
    </footer>
  );
}