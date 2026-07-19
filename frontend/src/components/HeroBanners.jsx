import { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   HOME PAGE BANNER SLIDER (top of the hero area)

   Shows banners from Cloudinary, one after another — each banner is
   on screen for 3 seconds, then it slides to the next.

   HOW TO ADD / CHANGE BANNERS
   ----------------------------
   Just edit the BANNERS array below. Each entry needs:
     - src        : the Cloudinary image URL (required)
     - mobileSrc  : a Cloudinary URL for a taller/cropped mobile
                    version (optional — leave null to reuse `src`)
     - alt        : alt text for accessibility

   Order in the array = order in the slider. Add or remove entries
   as needed, no other code changes required.
   ------------------------------------------------------------------ */

const BANNERS = [
  {
    src: 'https://res.cloudinary.com/r2fk1fws/image/upload/v1784458100/WhatsApp_Image_2026-07-19_at_3.24.35_PM_1_fc5j3r.jpg',
    mobileSrc: null,
    alt: 'Future AI Skills banner 1',
  },
  {
    src: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/future-ai-skills/banners/banner-2.jpg',
    mobileSrc: null,
    alt: 'Future AI Skills banner 2',
  },
];

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

  if (!total) return null; // nothing in the array yet — render nothing

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
              key={b.src}
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
                key={b.src}
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