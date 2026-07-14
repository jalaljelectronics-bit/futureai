import { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   HOME PAGE BANNER SLIDER (top of the hero area)

   Shows the banner artwork from src/assets, one after another —
   each banner is on screen for 3 seconds, then it slides to the next.

   HOW TO ADD BANNERS
   ------------------
   Just drop the image into  src/assets/  with a name that starts
   with "banner" — e.g.  banner-master-ai.jpg,  banner-2.jpg ...
   They are picked up automatically, in filename order. No code change.

   OPTIONAL MOBILE ARTWORK
   -----------------------
   Wide banners (1600x500) get very short on a phone. If you have a
   taller/cropped version for mobile, name it with a "-mobile" suffix:
       banner-2.jpg          -> used on tablet + desktop
       banner-2-mobile.jpg   -> used on phones (<=640px)
   If no -mobile file exists, the desktop one is used everywhere.
   ------------------------------------------------------------------ */

const FILES = import.meta.glob('../assets/banner*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const BANNERS = (() => {
  const desktop = new Map();
  const mobile = new Map();

  Object.entries(FILES).forEach(([path, url]) => {
    const name = path.split('/').pop().replace(/\.[^.]+$/, ''); // "banner-2" | "banner-2-mobile"
    if (name.endsWith('-mobile')) mobile.set(name.replace(/-mobile$/, ''), url);
    else desktop.set(name, url);
  });

  return [...desktop.keys()]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((key, i) => ({
      key,
      src: desktop.get(key),
      mobileSrc: mobile.get(key) || null,
      alt: `Future AI Skills banner ${i + 1}`,
    }));
})();

const INTERVAL = 3000; // 3 seconds per banner
const SWIPE = 50;      // px before a swipe counts

export default function HeroBanners() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const touchX = useRef(null);

  const total = BANNERS.length;

  useEffect(() => {
    if (total < 2 || paused) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, INTERVAL);
    return () => clearInterval(timer.current);
  }, [paused, total]);

  if (!total) return null; // nothing in assets yet — render nothing

  const go = (i) => setIndex((i + total) % total);

  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > SWIPE) go(delta < 0 ? index + 1 : index - 1);
    touchX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="banner-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Academy banners"
    >
      <div className="banner-viewport">
        <div
          className="banner-track"
          style={{ width: `${total * 100}%`, transform: `translateX(-${index * (100 / total)}%)` }}
        >
          {BANNERS.map((b, i) => (
            <div
              className="banner-slide"
              key={b.key}
              style={{ width: `${100 / total}%` }}
              aria-hidden={i !== index}
              role="group"
              aria-label={`Banner ${i + 1} of ${total}`}
            >
              <picture>
                {b.mobileSrc && <source media="(max-width: 640px)" srcSet={b.mobileSrc} />}
                <img
                  src={b.src}
                  alt={b.alt}
                  className="banner-img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchpriority={i === 0 ? 'high' : 'low'}
                  decoding="async"
                  draggable="false"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button className="banner-arrow banner-prev" aria-label="Previous banner" onClick={() => go(index - 1)}>‹</button>
          <button className="banner-arrow banner-next" aria-label="Next banner" onClick={() => go(index + 1)}>›</button>

          <div className="banner-dots" role="tablist" aria-label="Choose banner">
            {BANNERS.map((b, i) => (
              <button
                key={b.key}
                className={`banner-dot${i === index ? ' is-active' : ''}`}
                aria-label={`Go to banner ${i + 1}`}
                aria-selected={i === index}
                role="tab"
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
