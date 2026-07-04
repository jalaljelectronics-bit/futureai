import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CurriculumAccordion from '../components/CurriculumAccordion.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { getCourseBySlug, getCourses } from '../api/courseApi';

function getTagClass(category) {
  const map = {
    "YouTube": "tag-content",
    "Marketing": "tag-marketing",
    "Design": "tag-design",
    "Freelancing": "tag-freelancing",
    "E-Commerce": "tag-ecommerce",
    "Content": "tag-content",
  };
  return map[category] || "tag-content";
}

export default function CourseDetail() {
  const { slug } = useParams();
  const revealRef = useScrollReveal([slug]);

  const [data, setData] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setNotFound(false);
      try {
        const course = await getCourseBySlug(slug);
        if (cancelled) return;
        setData(course);

        const all = await getCourses();
        if (cancelled) return;
        setRelated(all.filter((c) => c.slug !== slug).slice(0, 3));
      } catch (err) {
        console.error(err);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="section" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container">Loading course...</div>
      </div>
    );
  }

  if (notFound || !data) {
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

  const outline = data.courseOutline || {};
  const hasOutcomes = Array.isArray(outline.outcomes) && outline.outcomes.length > 0;
  const hasTools = Array.isArray(outline.tools) && outline.tools.length > 0;
  const hasCurriculum = Array.isArray(outline.curriculum) && outline.curriculum.length > 0;
  const hasInstructor = outline.instructor && (outline.instructor.name || outline.instructor.role || outline.instructor.bio);

  return (
    <div ref={revealRef}>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <Link to="/courses" className="link-arrow" style={{ color: 'var(--accent)', marginBottom: 18, display: 'inline-flex' }}>
            ← All courses
          </Link>
          <div className="course-top" style={{ marginBottom: 10 }}>
            <span className={`course-tag ${getTagClass(data.category)}`}>{data.category}</span>
            <span className="course-duration" style={{ color: '#ADA79F' }}>{data.duration}</span>
          </div>
          <h1 style={{ maxWidth: '22ch' }}>{data.title}</h1>
          <p className="hero-lead">{data.description}</p>
          <div className="course-rating" style={{ color: '#C7C2BB', marginBottom: 22 }}>
            ⭐ <b>{data.rating}</b> ({data.reviewCount} reviews)
          </div>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-accent">Enroll in this course</Link>
            <Link to="/faq" className="btn btn-outline">Read the FAQs</Link>
          </div>
        </div>
      </section>

      {(outline.intro || hasOutcomes) && (
        <section className="section" style={{ paddingTop: 56 }}>
          <div className="container">
            <div className="director" style={{ gridTemplateColumns: '1.4fr .9fr', alignItems: 'start', padding: 44 }}>
              <div>
                {outline.intro && (
                  <>
                    <div className="eyebrow">Overview</div>
                    <p style={{ fontSize: '1.02rem' }}>{outline.intro}</p>
                  </>
                )}

                {hasOutcomes && (
                  <>
                    <div className="eyebrow" style={{ marginTop: 36 }}>What You'll Learn</div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
                      {outline.outcomes.map((item) => (
                        <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--secondary)' }}>
                          <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                          <span>{item}</span>
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
                  <div className="contact-info-item" style={{ borderBottom: '1px solid var(--card-border)' }}>
                    <div className="ic">🎯</div>
                    <div><h4>Format</h4><p>100% in-person, Shujabad campus</p></div>
                  </div>
                  {hasTools && (
                    <div className="contact-info-item" style={{ borderBottom: 'none' }}>
                      <div className="ic">🧰</div>
                      <div><h4>Tools Covered</h4><p>{outline.tools.join(', ')}</p></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {hasCurriculum && (
        <section className="section section-tight">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Curriculum</div>
              <h2 style={{ fontSize: '1.5rem' }}>What's covered, module by module</h2>
            </div>
            <CurriculumAccordion modules={outline.curriculum} />
          </div>
        </section>
      )}

      {outline.whoFor && (
        <section className="coursedetials-section">
          <div className="coursedetails-container">
            <div className="coursesection-head">
              <div className="eyebrow">Who This Course Is For</div>
              <h2>Is this the right track for you?</h2>
            </div>
            <p style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', fontSize: '1.02rem' }}>{outline.whoFor}</p>
          </div>
        </section>
      )}

      {hasInstructor && (
        <section className="section section-tight">
          <div className="container">
            <div className="director" style={{ gridTemplateColumns: '.5fr 1.5fr' }}>
              <img
                src="https://placehold.co/500x625/1C1917/F59E0B?text=Instructor"
                alt="Instructor portrait"
                className="director-photo"
              />
              <div>
                <div className="eyebrow">Your Instructor</div>
                <div className="director-name" style={{ fontSize: '1.3rem' }}>{outline.instructor.name}</div>
                <div className="director-role">{outline.instructor.role}</div>
                <p style={{ marginTop: 14 }}>{outline.instructor.bio}</p>
              </div>
            </div>
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
                    <span className={`course-tag ${getTagClass(c.category)}`}>{c.category}</span>
                    <span className="course-duration">{c.duration}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <div className="course-rating">⭐ <b>{c.rating}</b> ({c.reviewCount} reviews)</div>
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