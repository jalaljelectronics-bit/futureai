import { useState } from 'react';
import useStudentCount from '../hooks/useStudentCount.js';
import { useData } from '../admin/context/DataContext.tsx';
import { getCourseList } from '../data/courseHelpers.js';

const EMPTY_FORM = { name: '', phone: '', email: '', course: '', message: '' };

export default function Contact() {
  const { count, increment } = useStudentCount();
  const { db } = useData();
  const courses = getCourseList(db.courses);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Client-side only — would POST to /api/contact-submissions in production
    setSubmitted(true);
    setForm(EMPTY_FORM);
    increment(); // student has registered — bump the live count
  };

  return (
    <div>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow">Get In Touch</div>
          <h1 style={{ maxWidth: '18ch' }}>Questions about a batch? Talk to us directly.</h1>
          <p className="hero-lead">
            Visit the campus, call, or send a message — our team will get back to you within one working day
            with fees, schedules and seat availability.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.82rem', color: 'var(--accent)' }}>
            Join {count.toLocaleString()}+ students who've already registered.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="eyebrow">Contact Details</div>
              <h2 style={{ fontSize: '1.6rem' }}>We're on campus</h2>

              <div className="contact-info-item">
                <div className="ic">📍</div>
                <div><h4>Campus Address</h4><p>Near Muhammadia Masjid, Noble Grammar School, Housing Colony, Shujabad, Punjab, Pakistan</p></div>
              </div>
              <div className="contact-info-item">
                <div className="ic">📞</div>
                <div><h4>Phone / WhatsApp</h4><p>+92 300 8739555</p></div>
              </div>
              <div className="contact-info-item">
                <div className="ic">✉️</div>
                <div><h4>Email</h4><p>futureaiskills.007@gmail.com</p></div>
              </div>
              <div className="contact-info-item">
                <div className="ic">🕐</div>
                <div><h4>Campus Hours</h4><p>Mon – Fri, 5:30 – 9:00 PM</p></div>
              </div>

              <div className="map-frame">
                <iframe
                  src="https://www.google.com/maps?q=Noble+Grammar+School+Near+Muhammadia+Masjid+Housing+Colony+Shujabad+Punjab+Pakistan&output=embed"
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Future AI Skills campus location"
                />
              </div>
            </div>

            <div>
              <form className="form" onSubmit={handleSubmit}>
                {submitted && (
                  <div className="form-success show">
                    Thanks — your message has been sent. We'll reply in a short while.
                  </div>
                )}
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="cf-name">Full name</label>
                    <input type="text" id="cf-name" name="name" placeholder="Your name" required value={form.name} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-phone">Phone</label>
                    <input type="tel" id="cf-phone" name="phone" placeholder="03XX XXXXXXX" required value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="cf-email">Email</label>
                  <input type="email" id="cf-email" name="email" placeholder="you@email.com" required value={form.email} onChange={handleChange} />
                </div>
                <div className="field">
                  <label htmlFor="cf-course">Course you're interested in</label>
                  <select id="cf-course" name="course" value={form.course} onChange={handleChange}>
                    <option value="">Not sure yet — general enquiry</option>
                    {courses.map((c) => (
                      <option value={c.title} key={c.slug}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" name="message" placeholder="Tell us what you'd like to know" required value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
                <p className="form-note">By submitting, you agree to be contacted by Future AI Skills about your enquiry.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
