import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/blogs', label: 'Blogs' },
  ];

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav">
      
<Link to="/" className="brand" onClick={close}>
  <img
    src="https://res.cloudinary.com/r2fk1fws/image/upload/v1784105100/logo_qz81cj.png"
    alt="Future AI Skills logo"
    className="brand-logo"
  />
</Link>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={close}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <Link to="/faq" className="btn btn-outline" style={{ padding: '10px 18px' }}>FAQs</Link>
          <Link to="/contact" className="btn btn-accent">Enroll Now</Link>
        </div>

        <button
          className={`nav-toggle${open ? ' open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`nav-backdrop${open ? ' open' : ''}`} onClick={close} />
    </header>
  );
}
