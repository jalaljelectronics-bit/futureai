import { Link } from 'react-router-dom';
import useStudentCount from '../hooks/useStudentCount.js';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { useData } from '../admin/context/DataContext.tsx';
import { getCourseList } from '../data/courseHelpers.js';
import CountUp from '../components/CountUp.jsx';
import HeroBanners from '../components/HeroBanners.jsx';
import TeamWheel from '../components/TeamWheel.jsx';
import CourseCarousel from '../components/CourseCarousel.jsx';

const WHY_US = [
  { icon: '🏫', title: 'A real, physical campus', text: 'Not another video library. You learn in-person, in small batches, with an instructor in the room.' },
  { icon: '🛠️', title: 'Project-based, not theory', text: 'Every module ends in real work — a portfolio piece, a live gig, a client-ready deliverable.' },
  { icon: '💼', title: 'Built to earn, not just certify', text: 'We teach freelancing, pricing and client-winning alongside the skill, so you can actually get paid.' },
  { icon: '👥', title: 'Mentors from the industry', text: 'Your trainers run channels, manage ad accounts and sell online for a living — they teach what works now.' },
  { icon: '🔄', title: 'Curriculum updated every batch', text: 'The internet moves fast. Our syllabus is refreshed each batch to match what the market is paying for.' },
  { icon: '🌍', title: 'Global clients, from Shujabad', text: 'Students land clients across the Gulf, Europe and North America — without ever leaving home.' },
];

export default function Home() {
  const { count } = useStudentCount();
  const revealRef = useScrollReveal();
  const { db } = useData();
  const allCourses = getCourseList(db.courses);
  const featured = (allCourses.some((c) => c.isFeatured) ? allCourses.filter((c) => c.isFeatured) : allCourses).slice(0, 3);
  const totalCourses = allCourses.length;

  // Course names for the moving marquee line — duplicated so the loop is seamless.
  const marqueeCourses = allCourses.length ? allCourses : featured;
  const marqueeItems = marqueeCourses.concat(marqueeCourses);

  return (
    <div ref={revealRef}>
      {/* MOVING BANNER SLIDER — sits right below the navbar */}
      <HeroBanners />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Shujabad's Digital Skills Academy</div>
            <h1>Why <em>skills</em> matter more than degrees now.</h1>
            <p className="hero-lead">
              A degree gets you a queue. A skill gets you a client — in dollars, from anywhere. Future AI Skills
              is a physical academy where beginners in Shujabad learn the exact skills the internet is hiring
              for, taught in-person, module by module, until they can earn on their own.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-accent">Explore Courses</Link>
              <Link to="/about" className="btn btn-outline">Meet the Academy</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><b><CountUp end={count} suffix="+" /></b><span>Students trained · live count</span></div>
              <div className="hero-stat"><b><CountUp end={totalCourses} /></b><span>Skill tracks taught</span></div>
              <div className="hero-stat"><b><CountUp end={100} suffix="%" /></b><span>In-person, hands-on</span></div>
              <div className="hero-stat"><b><CountUp end={2} /></b><span>Campuses in Punjab</span></div>
            </div>
          </div>
          <div className="hero-panel">
            <h4>This week at the academy</h4>
            <div className="hero-panel-list">
              <div className="hero-panel-item"><span className="dot"></span> YouTube Automation — Batch 4 · seats open</div>
              <div className="hero-panel-item"><span className="dot"></span> Graphic Designing — evening class · Mon–Thu</div>
              <div className="hero-panel-item"><span className="dot"></span> Freelancing Mastery — Upwork &amp; Fiverr profile clinic</div>
              <div className="hero-panel-item"><span className="dot"></span> Video Editing — new batch starts July 20</div>
            </div>
          </div>
        </div>
      </section>

      {/* MOVING COURSE MARQUEE — course names scroll past, one by one */}
      <div className="marquee-wrap" aria-label="Courses offered">
        <div className="marquee-track">
          {marqueeItems.map((c, i) => (
            <Link to={`/courses/${c.slug}`} className="marquee-item" key={`${c.slug}-${i}`}>
              {c.title}
            </Link>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <section className="section why-us">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Why Choose Us</div>
            <h2>Why students pick Future AI Skills</h2>
            <p>We're built around one thing: getting a beginner from zero to their first paid client.</p>
          </div>
          <div className="grid grid-3 why-grid">
            {WHY_US.map((f) => (
              <div className="card why-card" key={f.title}>
                <div className="why-icon" aria-hidden="true">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Skill Tracks</div>
            <h2>Real skills. One campus. Real income.</h2>
            <p>Every course is taught physically at our Shujabad campus, in small batches, with a project-based curriculum.</p>
          </div>
          <CourseCarousel courses={allCourses} />
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/courses" className="btn btn-outline">See all {totalCourses} courses</Link>
          </div>
        </div>
      </section>

      {/* ABOUT US (home summary) */}
      <section className="section home-about">
        <div className="container">
          <div className="home-about-inner">
            <div className="home-about-copy">
              <div className="eyebrow">About Us</div>
              <h2>A physical campus for a digital economy</h2>
              <p>
                Future AI Skills was founded in Shujabad to close the gap between what schools teach and what
                the internet pays for. We're not an online course library — we're a real classroom, with real
                instructors, where students practise the exact skills that YouTube channels, marketing agencies,
                design studios and global marketplaces are hiring for today.
              </p>
              <p>
                Small batches. Hands-on projects. A curriculum updated every batch to match what's actually
                working in the market. Our mission is simple: help a student from Shujabad compete for — and win —
                the same clients as anyone in Karachi, Dubai or New York.
              </p>
              <div className="hero-actions" style={{ marginTop: 8 }}>
                <Link to="/about" className="btn btn-accent">More about the academy</Link>
                <Link to="/contact" className="btn btn-outline">Visit / enroll</Link>
              </div>
            </div>
            <div className="home-about-facts">
              <div className="about-fact"><b><CountUp end={totalCourses} /></b><span>Skill tracks taught in-person</span></div>
              <div className="about-fact"><b><CountUp end={2} /></b><span>Campuses across Punjab</span></div>
              <div className="about-fact"><b><CountUp end={100} suffix="%" /></b><span>Project-based, hands-on learning</span></div>
              <div className="about-fact"><b><CountUp end={12} /></b><span>Weeks, on average, to a first client</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM WHEEL */}
      <TeamWheel />

      {/* WHY / STATS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Why It Matters</div>
            <h2>The jobs market changed. We built the academy for it.</h2>
          </div>
          <div className="stats-strip">
            <div className="stat-box"><b>60%</b><span>Youth underemployment in traditional job markets</span></div>
            <div className="stat-box"><b>T+</b><span>Global freelance economy, growing every year</span></div>
            <div className="stat-box"><b>0</b><span>Degree required to start earning online</span></div>
            <div className="stat-box"><b className="countup-force-color">12</b><span>Weeks, on average, to a first paid client</span></div>
          </div>
        </div>
      </section>

      {/* BRANCH CALLOUT */}
      <section className="section-tight">
        <div className="container">
          <div className="branch-callout">
            <div>
              <h3>Expanding into software with Vision Giants</h3>
              <p>Our second campus focuses on web &amp; app development — for students who want to go further into tech.</p>
            </div>
            <a href="https://vgiants.com/" target="_blank" rel="noopener noreferrer" className="btn btn-accent">Visit Vision Giants ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}
