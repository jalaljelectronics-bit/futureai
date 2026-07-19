import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { useData } from '../admin/context/DataContext.tsx';
import { getCourseList } from '../data/courseHelpers.js';

const TEASER_COUNT = 2;

export default function Courses() {
  const revealRef = useScrollReveal();
  const { db } = useData();
  const courses = getCourseList(db.courses);

  return (
    <div ref={revealRef}>
      <section className="hero" style={{ paddingBottom: 20 }}>
        <div className="container">
          <div className="eyebrow">Skill Tracks</div>
          <h1 style={{ maxWidth: '16ch' }}>Courses built around what employers and clients actually pay for.</h1>
          <p className="hero-lead">Every track below is taught physically at our Shujabad campus. Tap a course to see its full module-by-module outline and duration.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="grid grid-2">
            {courses.map((c) => {
              const preview = c.curriculum.slice(0, TEASER_COUNT);
              const remaining = c.curriculum.length - preview.length;
              return (
                <div className="card course-card" id={c.slug} key={c.slug}>
                  <Link to={`/courses/${c.slug}`} className={`course-thumb ${c.tagClass}`} aria-label={c.title}>
                    {c.thumbnail
                      ? <img src={c.thumbnail} alt={c.title} loading="lazy" />
                      : <span className="course-thumb-fallback">{c.title.charAt(0)}</span>}
                  </Link>
                  <div className="course-top">
                    <span className={`course-tag ${c.tagClass}`}>{c.tagLabel}</span>
                    <span className="course-duration">{c.duration}</span>
                  </div>
                  <h3><Link to={`/courses/${c.slug}`} style={{ color: 'inherit' }}>{c.title}</Link></h3>
                  <p>{c.summary}</p>

                  {preview.length > 0 && (
                    <div className="curriculum-teaser">
                      {preview.map((mod, i) => (
                        <div className="curriculum-teaser-item" key={mod.title}>
                          <span><span className="num">{String(i + 1).padStart(2, '0')}</span>{mod.title}</span>
                          <span className="dur">{mod.dur}</span>
                        </div>
                      ))}
                      {remaining > 0 && (
                        <div className="curriculum-teaser-more">
                          + {remaining} more module{remaining > 1 ? 's' : ''} in the full curriculum
                        </div>
                      )}
                    </div>
                  )}

                  <div className="course-foot" style={{ gap: 10 }}>
                    <Link to={`/courses/${c.slug}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>View Full Details</Link>
                    <Link to="/contact" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Enroll Now</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-tight section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Still deciding which track is right for you?</h2>
          <p>Read answers to common questions about batches, fees and schedules.</p>
          <Link to="/faq" className="btn btn-primary">Read the FAQs</Link>
        </div>
      </section>
    </div>
  );
}