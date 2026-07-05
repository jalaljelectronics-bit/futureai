import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

/* Social links shown in the footer. Replace the `href` values with the
   academy's real profile URLs. The WhatsApp link uses the same number as
   the floating button (international format, no + or spaces). */
const SOCIALS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/923008739555',
    path: 'M16 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.56-1.68A12.74 12.74 0 0 0 16 28.74c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.71 12.71 0 0 0 16 3.2zm0 2.13c2.85 0 5.53 1.11 7.54 3.13a10.62 10.62 0 0 1 3.13 7.54c0 5.88-4.79 10.67-10.67 10.67a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-4.03 1.03 1.08-3.93-.25-.4a10.58 10.58 0 0 1-1.62-5.66c0-5.88 4.79-10.67 10.67-10.67zm-4.57 5.7c-.22 0-.57.08-.86.4-.3.33-1.13 1.11-1.13 2.7 0 1.6 1.16 3.13 1.32 3.35.16.22 2.28 3.49 5.53 4.89 1.55.67 2.16.83 2.9.71.62-.09 1.91-.78 2.18-1.54.27-.75.27-1.4.19-1.54-.08-.13-.3-.22-.62-.38s-1.91-.94-2.21-1.05c-.3-.11-.51-.16-.73.16-.22.32-.84 1.05-1.02 1.27-.19.22-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.5.14-.66.15-.15.32-.38.49-.57.16-.19.22-.32.32-.54.11-.22.05-.4-.03-.57s-.71-1.76-1-2.41c-.25-.55-.51-.54-.73-.55h-.62z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1PQXEBaWK4/',
    path: 'M17.5 28V17.5h3.5l.5-4h-4v-2.6c0-1.16.32-1.95 2-1.95H22V5.28C21.65 5.23 20.4 5.12 18.95 5.12c-3.03 0-5.1 1.85-5.1 5.25v2.93H10.3v4h3.55V28z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M16 4.8c3.68 0 4.11.02 5.56.08 1.34.06 2.07.28 2.56.47.64.25 1.1.55 1.58 1.03s.78.94 1.03 1.58c.19.49.41 1.22.47 2.56.06 1.45.08 1.88.08 5.56s-.02 4.11-.08 5.56c-.06 1.34-.28 2.07-.47 2.56-.25.64-.55 1.1-1.03 1.58s-.94.78-1.58 1.03c-.49.19-1.22.41-2.56.47-1.45.06-1.88.08-5.56.08s-4.11-.02-5.56-.08c-1.34-.06-2.07-.28-2.56-.47a4.26 4.26 0 0 1-1.58-1.03 4.26 4.26 0 0 1-1.03-1.58c-.19-.49-.41-1.22-.47-2.56C4.82 20.11 4.8 19.68 4.8 16s.02-4.11.08-5.56c.06-1.34.28-2.07.47-2.56.25-.64.55-1.1 1.03-1.58s.94-.78 1.58-1.03c.49-.19 1.22-.41 2.56-.47C11.89 4.82 12.32 4.8 16 4.8zm0 2.16c-3.62 0-4.05.01-5.48.08-1.32.06-2.04.28-2.51.46-.63.25-1.08.54-1.55 1.01s-.76.92-1.01 1.55c-.18.47-.4 1.19-.46 2.51-.07 1.43-.08 1.86-.08 5.48s.01 4.05.08 5.48c.06 1.32.28 2.04.46 2.51.25.63.54 1.08 1.01 1.55s.92.76 1.55 1.01c.47.18 1.19.4 2.51.46 1.43.07 1.86.08 5.48.08s4.05-.01 5.48-.08c1.32-.06 2.04-.28 2.51-.46.63-.25 1.08-.54 1.55-1.01s.76-.92 1.01-1.55c.18-.47.4-1.19.46-2.51.07-1.43.08-1.86.08-5.48s-.01-4.05-.08-5.48c-.06-1.32-.28-2.04-.46-2.51-.25-.63-.54-1.08-1.01-1.55s-.92-.76-1.55-1.01c-.47-.18-1.19-.4-2.51-.46-1.43-.07-1.86-.08-5.48-.08zm0 3.68a5.36 5.36 0 1 1 0 10.72 5.36 5.36 0 0 1 0-10.72zm0 8.84a3.48 3.48 0 1 0 0-6.96 3.48 3.48 0 0 0 0 6.96zm6.83-9.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M27.4 10.6a3.02 3.02 0 0 0-2.12-2.13C23.4 8 16 8 16 8s-7.4 0-9.28.47A3.02 3.02 0 0 0 4.6 10.6C4.13 12.5 4.13 16 4.13 16s0 3.5.47 5.4a3.02 3.02 0 0 0 2.12 2.13C8.6 24 16 24 16 24s7.4 0 9.28-.47a3.02 3.02 0 0 0 2.12-2.13C27.87 19.5 27.87 16 27.87 16s0-3.5-.47-5.4zM13.6 19.6v-7.2l6.24 3.6z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M9.4 26H5.3V12.66h4.1zM7.35 10.86a2.38 2.38 0 1 1 0-4.76 2.38 2.38 0 0 1 0 4.76zM26.7 26h-4.1v-6.49c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V26h-4.1V12.66h3.93v1.82h.06c.55-1.04 1.89-2.14 3.88-2.14 4.15 0 4.92 2.73 4.92 6.28z',
  },
  {
    label: 'TikTok',
    href: '#',
    path: 'M21.5 4c.3 2.5 1.7 4.2 4.1 4.4v2.8c-1.4.14-2.63-.32-4.06-1.18v5.4c0 6.86-7.48 9-10.46 4.06-1.92-3.18-.73-8.76 5.5-8.98v2.95c-.47.08-.98.2-1.45.36-1.4.48-2.2 1.37-1.98 2.94.43 3 5.94 3.9 5.48-1.97V4z',
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand"><img src={logo} alt="Future AI Skills" className="footer-logo" /> Future AI Skills</div>
            <p style={{ color: '#B8B3AC', fontSize: '.9rem', maxWidth: '32ch' }}>
              A physical training academy in Shujabad, Punjab — building careers in digital skills and the global freelance economy.
            </p>
            <div className="footer-social">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social-link"
                  aria-label={s.label}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li>Shujabad, Punjab, Punjab</li>
              <li>+92 300 8739555</li>
              <li><a href="https://mail.google.com/mail/?view=cm&to=futureaiskills.007@gmail.com" target="_blank" rel="noopener noreferrer">futureaiskills.007@gmail.com</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Our Network</h5>
            <ul>
              <li><a href="https://vgiants.com" target="_blank" rel="noopener noreferrer">Vision Giants ↗</a></li>
              <li>Sister campus — web &amp; app dev</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Future AI Skills. All rights reserved.</span>
          <span>Shujabad, Punjab, Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
