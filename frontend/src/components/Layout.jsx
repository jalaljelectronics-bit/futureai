import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NotifyBar from './NotifyBar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on every route change, like a normal multi-page site
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <NotifyBar />
      <Header />
      <main key={pathname} className="page-transition">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
