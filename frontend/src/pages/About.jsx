import useScrollReveal from '../hooks/useScrollReveal.js';
import { useData } from '../admin/context/DataContext.tsx';

export default function About() {
  const revealRef = useScrollReveal();
  const { db } = useData();

  const team = (db.team_members || [])
    .filter((m) => m.isActive)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  const stories = (db.success_stories || [])
    .filter((s) => s.isActive)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  return (
    <div ref={revealRef}>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow">About The Institute</div>
          <h1 style={{ maxWidth: '20ch' }}>A physical campus for a digital economy.</h1>
          <p className="hero-lead">
            Future AI Skills was founded in Shujabad to close the gap between what schools teach and what the
            internet pays for. We're not an online course library — we're a real classroom, with real instructors,
            where students practise the exact skills that YouTube channels, marketing agencies, design studios and
            global marketplaces are hiring for today. Small batches, hands-on projects, and a curriculum that's
            updated every batch to match what's actually working in the market.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="director">
            <img src="https://res.cloudinary.com/r2fk1fws/image/upload/v1784374657/WhatsApp_Image_2026-07-16_at_5.13.14_PM_mzyxtt.jpg" alt="Portrait of the Director" className="director-photo" />
            <div>
              <div className="eyebrow">Director's Message</div>
              <p className="director-quote">
                We didn't build Future AI Skills to hand out certificates. We built it so a student from Shujabad
                could compete for the same clients as anyone in Karachi, Dubai, or New York — and win, because
                their skill is real.
              </p>
              <div className="director-name">Hassan Ishtiaq Bukhari</div>
              <div className="director-role">Founder &amp; Director, Future AI Skills</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Our Team</div>
            <h2>Instructors who work in the industry they teach</h2>
          </div>
          <div className="grid grid-2">
            {team.map((person) => (
              <div className="card person-card" key={person.id}>
                <img
                  className="person-photo"
                  src={person.photo || 'https://placehold.co/300x300/F2EFEC/1C1917?text=Instructor'}
                  alt={`Photo of ${person.name}`}
                />
                <h3>{person.name}</h3>
                <div className="person-role">{person.designation}</div>
                <p>{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="branch-callout">
            <div>
              <h3>Our second branch — Vision Giants</h3>
              <p>As students asked to go deeper into tech, we opened Vision Giants: second campus focused on web development, app development and software careers.</p>
            </div>
            <a href="https://vgiants.com/" target="_blank" rel="noopener noreferrer" className="btn btn-accent">Visit https://vgiants.com/ ↗</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Success Stories</div>
            <h2>What our students have gone on to do</h2>
          </div>
          <div className="grid grid-3">
            {stories.map((s) => (
              <div className="card testimonial-card" key={s.id}>
                {s.achievementHighlight && <span className="badge-achievement">{s.achievementHighlight}</span>}
                <p className="testimonial-quote">{s.testimonial}</p>
                <div className="testimonial-who">
                  <div className="testimonial-photo">
                    {s.studentPhoto && <img src={s.studentPhoto} alt={s.studentName} />}
                  </div>
                  <div>
                    <div className="testimonial-name">{s.studentName}</div>
                    {s.course?.title && <div className="testimonial-course">{s.course.title}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}