import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* Auto-advancing course carousel — used ONLY on the home page.
   The row of course cards slides one card at a time every 3 seconds and
   loops seamlessly (the first few cards are cloned at the end so the jump
   back to the start is invisible). Pauses on hover. Reuses the existing
   .course-card styling so the cards look exactly as before. */

const INTERVAL = 1000; // 3 seconds

function useVisibleCount() {
  const get = () => {
    if (typeof window === 'undefined') return 3;
    if (window.matchMedia('(max-width: 640px)').matches) return 1;
    if (window.matchMedia('(max-width: 960px)').matches) return 2;
    return 3;
  };
  const [visible, setVisible] = useState(get);
  useEffect(() => {
    const onResize = () => setVisible(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return visible;
}

export default function CourseCarousel({ courses }) {
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const canLoop = courses.length > visible;

  // Clone the first `visible` cards onto the end for a seamless loop.
  const slides = canLoop ? courses.concat(courses.slice(0, visible)) : courses;
  const n = slides.length;

  // Reset the index if the breakpoint changes so we never point past the end.
  useEffect(() => {
    setIndex(0);
    setAnimate(true);
  }, [visible]);

  // Auto-advance.
  useEffect(() => {
    if (!canLoop || paused) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    timer.current = setInterval(() => setIndex((i) => i + 1), INTERVAL);
    return () => clearInterval(timer.current);
  }, [canLoop, paused, visible]);

  // When we land on the cloned cards, snap back to the real start with no animation.
  const handleTransitionEnd = () => {
    if (canLoop && index >= courses.length) {
      setAnimate(false);
      setIndex(0);
    }
  };

  // Re-enable animation on the next frame after a silent reset.
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
    return undefined;
  }, [animate]);

  const trackStyle = {
    '--n': n,
    '--visible': visible,
    '--i': index,
    transition: animate ? undefined : 'none',
  };

  return (
    <div
      className="course-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="cc-viewport">
        <div className="cc-track" style={trackStyle} onTransitionEnd={handleTransitionEnd}>
          {slides.map((c, i) => (
            <div className="cc-slide" key={`${c.slug}-${i}`}>
              <div className="card course-card">
                <Link to={`/courses/${c.slug}`} className={`course-thumb ${c.tagClass}`} aria-label={c.title}>
                  {c.thumbnail
                    ? <img src={c.thumbnail} alt={c.title} loading="lazy" />
                    : <span className="course-thumb-fallback">{c.title.charAt(0)}</span>}
                </Link>
                <div className="course-top">
                  <span className={`course-tag ${c.tagClass}`}>{c.tagLabel}</span>
                  <span className="course-duration">{c.duration}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
        
                <div className="course-foot">
                  <Link to={`/courses/${c.slug}`} className="link-arrow">View full details →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
