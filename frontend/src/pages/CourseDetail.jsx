import { Link, useParams } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { useData } from '../admin/context/DataContext.tsx';
import { getCourseBySlug, getCourseList } from '../data/courseHelpers.js';

export default function CourseDetail() {
  const { slug } = useParams();
  const { db } = useData();
  const data = getCourseBySlug(db.courses, slug);
  const revealRef = useScrollReveal([slug]);

  if (!data) {
    return (
      <div className="section" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="eyebrow">Course Not Found</div>
          <h1 style={{ maxWidth: '20ch', margin: '0 auto 16px' }}>We couldn't find that course.</h1>
          <p style={{ maxWidth: '44ch', margin: '0 auto 26px' }}>
            It may have been renamed or the link is out of date. Take a look at everything we currently teach.
          </p>
          <Link to="/courses" className="btn btn-accent">See all courses</Link>
        </div>
      </div>
    );
  }

  const related = getCourseList(db.courses).filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <div ref={revealRef}>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <Link to="/courses" className="link-arrow" style={{ color: 'var(--accent)', marginBottom: 18, display: 'inline-flex' }}>
            ← All courses
          </Link>
          <div className="course-top" style={{ marginBottom: 10 }}>
            <span className={`course-tag ${data.tagClass}`}>{data.tagLabel}</span>
            <span className="course-duration" style={{ color: '#ADA79F' }}>{data.duration}</span>
          </div>
          <h1 style={{ maxWidth: '22ch' }}>{data.title}</h1>
          <p className="hero-lead">{data.summary}</p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-accent">Enroll in this course</Link>
            <Link to="/faq" className="btn btn-outline">Read the FAQs</Link>
          </div>
        </div>
      </section>

      {data.thumbnail && (
        <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="container">
            <div className={`course-detail-banner ${data.tagClass}`}>
              <img src={data.thumbnail} alt={data.title} />
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="director" style={{ gridTemplateColumns: '1.4fr .9fr', alignItems: 'start', padding: 44 }}>
            <div>
              <div className="eyebrow">Overview</div>
              <p style={{ fontSize: '1.02rem' }}>{data.intro}</p>

              {data.outcomes && (
                <>
                  <div className="eyebrow" style={{ marginTop: 36 }}>What You'll Learn</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
                    {data.outcomes.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--secondary)' }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {data.curriculum.length > 0 && (
                <>
                  <div className="eyebrow" style={{ marginTop: 36 }}>Course Outline</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
                    {data.curriculum.map((mod) => (
                      <li key={mod.title} style={{ color: 'var(--secondary)' }}>
                        <strong style={{ color: 'var(--primary)' }}>{mod.title}</strong>{mod.dur ? ` — ${mod.dur}` : ''}
                        {mod.body ? <div>{mod.body}</div> : null}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div>
              <div className="eyebrow">Course Snapshot</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="contact-info-item" style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <div className="ic">⏱️</div>
                  <div><h4>Duration</h4><p>{data.duration}, physical campus batches</p></div>
                </div>
                <div className="contact-info-item" style={{ borderBottom: data.tools ? '1px solid var(--card-border)' : 'none' }}>
                  <div className="ic">🎯</div>
                  <div><h4>Format</h4><p>100% in-person, Shujabad campus</p></div>
                </div>
                {data.tools && (
                  <div className="contact-info-item" style={{ borderBottom: 'none' }}>
                    <div className="ic">🧰</div>
                    <div><h4>Tools Covered</h4><p>{data.tools.join(', ')}</p></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {data.whoFor && (
        <section className="coursedetials-section">
          <div className="coursedetails-container">
            <div className="coursesection-head">
              <div className="eyebrow">Who This Course Is For</div>
              <h2>Is this the right track for you?</h2>
            </div>
            <p style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', fontSize: '1.02rem' }}>{data.whoFor}</p>
          </div>
        </section>
      )}

      <section className="section-tight">
        <div className="container">
          <div className="branch-callout">
            <div>
              <h3>Ready to start this track?</h3>
              <p>Seats are limited per batch — reserve yours and we'll confirm your schedule and fees.</p>
            </div>
            <Link to="/contact" className="btn btn-accent">Enroll Now</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-tight">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Explore More</div>
              <h2 style={{ fontSize: '1.5rem' }}>Other skill tracks at the academy</h2>
            </div>
            <div className="grid grid-3">
              {related.map((c) => (
                <Link to={`/courses/${c.slug}`} className="card course-card" style={{ textDecoration: 'none' }} key={c.slug}>
                  <div className="course-top">
                    <span className={`course-tag ${c.tagClass}`}>{c.tagLabel}</span>
                    <span className="course-duration">{c.duration}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.summary}</p>
                  <div className="course-foot"><span className="link-arrow">View full details →</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}