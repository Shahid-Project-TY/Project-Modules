import React, { useEffect, useRef, useState } from "react";
import "./GPT.css";

export default function App() {
  // data
  const developer = {
    name: "Aarav Mehta",
    role: "Full-Stack Developer",
    tagline: "Building delightful web experiences — fast, reliable, beautiful.",
    bio:
      "I’m a pragmatic full-stack developer specializing in performant React apps and robust Node backends. I love turning ideas into clean, maintainable code and delightful user experiences. Outside of code I tinker with UI animations, open-source tools, and coffee.",
  };

  const projects = [
    {
      id: 1,
      title: "PhotonDesk",
      short: "Collaborative note-taking with real-time sync and markdown power.",
      details:
        "A real-time collaborative editor using WebSockets, CRDT conflict resolution, live cursors and a plugin system for markdown rendering. Features offline-synchronization and granular permissions.",
      stack: ["React", "WebSocket", "CRDT", "Node.js", "Express", "MongoDB"],
    },
    {
      id: 2,
      title: "ShopSwift",
      short: "A headless e-commerce demo with blazing search & checkout flow.",
      details:
        "Headless storefront built with a GraphQL API, client-side caching, server-side rendering for SEO, and an extensible checkout flow. Demo product seed data and payment simulation included.",
      stack: ["React", "GraphQL", "SSR", "Stripe (simulated)", "Redis"],
    },
    {
      id: 3,
      title: "Vizly",
      short: "Data visualization platform with custom dashboards and sharing.",
      details:
        "Dashboarding platform with chart templates, data connectors, and exportable reports. Focused on accessibility and performance with canvas-based rendering for big datasets.",
      stack: ["React", "Canvas", "D3-inspired", "Node.js", "Postgres"],
    },
    {
      id: 4,
      title: "AuthFlow",
      short: "Secure, modular authentication microservice.",
      details:
        "A microservice handling JWT refresh flow, social logins, passwordless email links, and role-based access control. Designed to be dropped into an existing infra.",
      stack: ["Node.js", "JWT", "OAuth2", "TypeScript", "Postgres"],
    },
  ];

  const skills = [
    { name: "JavaScript / TypeScript", level: 90 },
    { name: "React / Frontend", level: 92 },
    { name: "Node.js / Backend", level: 85 },
    { name: "Databases (SQL/NoSQL)", level: 80 },
    { name: "Testing & CI/CD", level: 75 },
    { name: "Design / Accessibility", level: 70 },
  ];

  // UI state
  const [activeProject, setActiveProject] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Refs for smooth scrolling
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // create resume download blob on mount
    const resumeText = generateResumeText();
    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);

    // cleanup
    return () => URL.revokeObjectURL(url);
  }, []);

  useEffect(() => {
    // reveal on scroll for elements with .GPT-reveal using IntersectionObserver
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("GPT-revealed");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".GPT-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // handlers
  function handleNav(ref) {
    if (!ref || !ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openProject(p) {
    setActiveProject(p);
    document.body.style.overflow = "hidden";
  }

  function closeProject() {
    setActiveProject(null);
    document.body.style.overflow = "";
  }

  function handleInput(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function submitForm(e) {
    e.preventDefault();
    // simple client-side validation
    if (!form.name.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email) || !form.message.trim()) {
      setFormStatus("Please provide a valid name, email, and message.");
      setTimeout(() => setFormStatus(""), 3000);
      return;
    }
    // Demo: show success and reset
    setFormStatus("Message sent! (demo — no backend configured)");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setFormStatus(""), 3500);
  }

  function downloadResume() {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${developer.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function generateResumeText() {
    return `
${developer.name}
${developer.role}
----------------------------------------
Bio:
${developer.bio}

Skills:
${skills.map((s) => `${s.name} — ${s.level}%`).join("\n")}

Selected Projects:
${projects
      .map(
        (p, i) =>
          `${i + 1}. ${p.title}
   - ${p.short}
   - Stack: ${p.stack.join(", ")}
   - Details: ${p.details}
`
      )
      .join("\n")}

Contact:
Email: youremail@example.com
LinkedIn: https://linkedin.com/in/your-profile
GitHub: https://github.com/your-username

Available for: Full-time / Contract / Remote work
----------------------------------------
Generated: ${new Date().toLocaleString()}
`;
  }

  // Icons (inline SVG)
  const Icon = {
    GitHub: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M12 0.5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.45-3.88-1.45-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.17a11.1 11.1 0 012.9-.39c.98.01 1.98.13 2.9.39 2.2-1.48 3.17-1.17 3.17-1.17.64 1.6.24 2.78.12 3.07.74.8 1.19 1.82 1.19 3.07 0 4.41-2.7 5.39-5.27 5.67.42.36.79 1.08.79 2.18 0 1.58-.01 2.86-.01 3.25 0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
    LinkedIn: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M4.98 3.5A2.5 2.5 0 004.99 8a2.5 2.5 0 000-4.5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.7-1.8 3.5-1.8 3.7 0 4.4 2.4 4.4 5.6V21H19v-5.4c0-1.3 0-3-1.8-3-1.8 0-2.1 1.4-2.1 2.9V21H9z" />
      </svg>
    ),
    Mail: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M2 5.5C2 4.12 3.12 3 4.5 3h15C20.88 3 22 4.12 22 5.5v13c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 21 2 19.88 2 18.5v-13zm2 1.07v11.94L12 13 4 6.57zM20 6.57L12 13l8 6.01V6.57z" />
      </svg>
    ),
    Download: (props) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M5 20h14v-2H5v2zm7-18L5.33 9h3.84v4h6.66V9h3.84L12 2z" />
      </svg>
    ),
    Arrow: (props) => (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
        <path d="M12 2L3 21h18L12 2z" />
      </svg>
    ),
  };

  function ProjectScreenshotSVG({ title }) {
    return (
      <svg viewBox="0 0 400 250" className="GPT-screenshot-svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label={title}>
        <defs>
          <linearGradient id="GPT-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--GPT-accent)" />
            <stop offset="1" stopColor="rgba(0,0,0,0.08)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" rx="12" fill="url(#GPT-g)"></rect>
        <g transform="translate(20,28)" fill="rgba(255,255,255,0.95)">
          <rect width="360" height="28" rx="6" fill="rgba(255,255,255,0.12)"></rect>
          <rect y="46" width="150" height="14" rx="4" fill="rgba(255,255,255,0.08)"></rect>
          <rect y="70" width="300" height="12" rx="4" fill="rgba(255,255,255,0.06)"></rect>
          <rect y="92" width="190" height="12" rx="4" fill="rgba(255,255,255,0.06)"></rect>
          <rect x="260" y="46" width="80" height="80" rx="6" fill="rgba(255,255,255,0.12)"></rect>
        </g>
        <text x="20" y="230" fontSize="12" fill="rgba(0,0,0,0.35)" fontFamily="monospace">{title}</text>
      </svg>
    );
  }

  return (
    <div className="GPT-root">
      <header className="GPT-hero">
        <nav className="GPT-nav GPT-container">
          <div className="GPT-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} role="button" tabIndex={0}>
            <div className="GPT-logo" aria-hidden="true">
              <svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true">
                <rect x="4" y="4" width="40" height="40" rx="10" fill="var(--GPT-accent)" />
                <text x="24" y="30" fontSize="18" textAnchor="middle" fill="white" fontFamily="sans-serif">AM</text>
              </svg>
            </div>
            <div className="GPT-brand-text">
              <strong className="GPT-brand-name">{developer.name}</strong>
              <small className="GPT-brand-role">{developer.role}</small>
            </div>
          </div>

          <ul className="GPT-nav-links" aria-label="Main navigation">
            <li><button className="GPT-btn-link" onClick={() => handleNav(aboutRef)}>About</button></li>
            <li><button className="GPT-btn-link" onClick={() => handleNav(projectsRef)}>Projects</button></li>
            <li><button className="GPT-btn-link" onClick={() => handleNav(resumeRef)}>Resume</button></li>
            <li><button className="GPT-btn-link" onClick={() => handleNav(contactRef)}>Contact</button></li>
          </ul>
        </nav>

        <div className="GPT-hero-inner GPT-container">
          <div className="GPT-hero-content GPT-reveal">
            <h1 className="GPT-animated-title">
              <span className="GPT-title-hi">Hi, I’m</span>
              <span className="GPT-title-name">{developer.name}.</span>
            </h1>
            <p className="GPT-role-text">{developer.role} — <span className="GPT-tagline">{developer.tagline}</span></p>

            <div className="GPT-hero-ctas">
              <button className="GPT-btn GPT-btn-primary" onClick={() => handleNav(contactRef)}>
                Hire me
                <span className="GPT-btn-ico"><Icon.Arrow width="14" height="14" /></span>
              </button>
              <button className="GPT-btn GPT-btn-ghost" onClick={() => handleNav(projectsRef)}>See projects</button>
              <button className="GPT-btn GPT-btn-subtle" onClick={downloadResume}><Icon.Download width="16" height="16" /> Resume</button>
            </div>

            <div className="GPT-hero-badges">
              <div className="GPT-badge">Open to work</div>
              <div className="GPT-badge">Remote / Contract</div>
              <div className="GPT-badge">Available: Immediate</div>
            </div>
          </div>

          <div className="GPT-hero-art GPT-reveal" aria-hidden="true">
            <div className="GPT-profile-card">
              <div className="GPT-profile-photo" title="Profile">
                <svg viewBox="0 0 200 200" className="GPT-profile-svg" role="img" aria-label="Profile illustration">
                  <defs>
                    <linearGradient id="GPT-pgrad" x1="0" x2="1">
                      <stop offset="0" stopColor="#ffffff" />
                      <stop offset="1" stopColor="rgba(255,255,255,0.3)" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" rx="20" fill="var(--card-bg)" />
                  <g transform="translate(30,30)" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.2">
                    <circle cx="70" cy="50" r="34" fill="url(#GPT-pgrad)" stroke="rgba(0,0,0,0.06)" />
                    <rect x="4" y="102" width="132" height="16" rx="6" fill="rgba(255,255,255,0.06)" />
                    <rect x="4" y="124" width="90" height="10" rx="4" fill="rgba(255,255,255,0.04)" />
                  </g>
                </svg>
              </div>
              <div className="GPT-profile-info">
                <h3 className="GPT-profile-name">{developer.name}</h3>
                <p className="GPT-profile-role">{developer.role}</p>
                <div className="GPT-socials">
                  <a className="GPT-social-link" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon.GitHub /></a>
                  <a className="GPT-social-link" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon.LinkedIn /></a>
                  <a className="GPT-social-link" href="mailto:youremail@example.com" aria-label="Email"><Icon.Mail /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="GPT-container GPT-main">
        <section ref={aboutRef} id="GPT-about" className="GPT-section GPT-reveal">
          <div className="GPT-section-header">
            <h2 className="GPT-section-title">About Me</h2>
            <p className="GPT-muted">Learn a little about my background and approach.</p>
          </div>

          <div className="GPT-about-grid">
            <div className="GPT-about-text">
              <p className="GPT-paragraph">{developer.bio}</p>
              <p className="GPT-paragraph">
                I enjoy building dependable systems and polished frontends. My development philosophy: ship small, iterate fast,
                and keep interfaces accessible and intuitive.
              </p>
              <div className="GPT-cta-row">
                <button className="GPT-btn GPT-btn-primary" onClick={() => handleNav(projectsRef)}>View Projects</button>
                <button className="GPT-btn GPT-btn-ghost" onClick={downloadResume}><Icon.Download width="14" height="14" /> Download Resume</button>
              </div>
            </div>

            <div className="GPT-about-art">
              <svg viewBox="0 0 240 220" className="GPT-about-svg" role="img" aria-label="Decorative illustration">
                <rect width="100%" height="100%" rx="12" fill="var(--card-bg)" />
                <g transform="translate(16,20)" fill="none">
                  <circle cx="80" cy="58" r="36" fill="url(#GPT-pgrad)"></circle>
                  <rect y="110" width="180" height="12" rx="6" fill="rgba(255,255,255,0.04)"></rect>
                </g>
              </svg>
            </div>
          </div>
        </section>

        <section ref={projectsRef} id="GPT-projects" className="GPT-section GPT-reveal">
          <div className="GPT-section-header">
            <h2 className="GPT-section-title">Projects</h2>
            <p className="GPT-muted">Selected demos showcasing architecture, frontend polish, and backend integrations.</p>
          </div>

          <div className="GPT-projects-grid">
            {projects.map((p) => (
              <article key={p.id} className="GPT-project-card" tabIndex={0} aria-labelledby={`GPT-proj-${p.id}`}>
                <div className="GPT-project-screenshot" onClick={() => openProject(p)} role="button" tabIndex={-1}>
                  <ProjectScreenshotSVG title={p.title} />
                </div>
                <div className="GPT-project-body">
                  <h3 id={`GPT-proj-${p.id}`} className="GPT-project-title">{p.title}</h3>
                  <p className="GPT-project-short">{p.short}</p>
                  <div className="GPT-project-meta">
                    <div className="GPT-stack">
                      {p.stack.slice(0, 3).map((s, i) => (
                        <span key={i} className="GPT-pill">{s}</span>
                      ))}
                      {p.stack.length > 3 && <span className="GPT-pill">+{p.stack.length - 3}</span>}
                    </div>
                    <div className="GPT-project-actions">
                      <button className="GPT-btn GPT-btn-tiny" onClick={() => openProject(p)}>Details</button>
                      <button className="GPT-btn GPT-btn-tiny GPT-btn-ghost" onClick={() => alert("Live demo (demo only) — integrate your link!")}>Live</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section ref={resumeRef} id="GPT-resume" className="GPT-section GPT-reveal">
          <div className="GPT-section-header">
            <h2 className="GPT-section-title">Resume & Skills</h2>
          </div>

          <div className="GPT-resume-grid">
            <div className="GPT-skills-card">
              <h3 className="GPT-card-title">Skills & Tools</h3>
              <p className="GPT-muted">A snapshot of primary skills (visualized).</p>
              <ul className="GPT-skills-list">
                {skills.map((s, idx) => (
                  <li key={idx} className="GPT-skill-item">
                    <div className="GPT-skill-row">
                      <div className="GPT-skill-name">{s.name}</div>
                      <div className="GPT-skill-level" aria-hidden="true" style={{ width: `${s.level}%` }}></div>
                      <div className="GPT-skill-badge">{s.level}%</div>
                    </div>
                    <div className="GPT-progress" aria-hidden="true">
                      <div className="GPT-progress-bar" style={{ width: `${s.level}%` }}></div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="GPT-cta-row">
                <button className="GPT-btn GPT-btn-primary" onClick={downloadResume}><Icon.Download width="14" height="14" /> Download Resume</button>
                <button className="GPT-btn GPT-btn-ghost" onClick={() => alert("Resume viewed (demo) — link to your PDF or route here.")}>View PDF</button>
              </div>
            </div>

            <div className="GPT-resume-card">
              <h3 className="GPT-card-title">Experience Snapshot</h3>
              <div className="GPT-timeline">
                <div className="GPT-timeline-item">
                  <div className="GPT-meta">2022 — Present</div>
                  <div className="GPT-content">Senior Full-Stack Developer — Built scalable microservices and performant SPAs for B2B customers.</div>
                </div>
                <div className="GPT-timeline-item">
                  <div className="GPT-meta">2019 — 2022</div>
                  <div className="GPT-content">Frontend Engineer — Focused on UI architecture, component libraries, and design systems.</div>
                </div>
                <div className="GPT-timeline-item">
                  <div className="GPT-meta">2016 — 2019</div>
                  <div className="GPT-content">Backend & DevOps — API design, CI/CD pipelines, containerization, and cloud infra optimizations.</div>
                </div>
              </div>
              <p className="GPT-muted">Want the full resume? Click download or request a PDF and I’ll send one.</p>
            </div>
          </div>
        </section>

        <section ref={contactRef} id="GPT-contact" className="GPT-section GPT-reveal">
          <div className="GPT-section-header">
            <h2 className="GPT-section-title">Contact</h2>
            <p className="GPT-muted">Interested in working together? Send a message or connect on GitHub / LinkedIn.</p>
          </div>

          <div className="GPT-contact-grid">
            <form className="GPT-contact-form" onSubmit={submitForm} noValidate>
              <div className="GPT-form-row">
                <label className="GPT-label">
                  <span className="GPT-label-text">Name</span>
                  <input className="GPT-input" name="name" value={form.name} onChange={handleInput} placeholder="Your full name" required />
                </label>
                <label className="GPT-label">
                  <span className="GPT-label-text">Email</span>
                  <input className="GPT-input" name="email" value={form.email} onChange={handleInput} placeholder="you@example.com" required />
                </label>
              </div>
              <label className="GPT-label">
                <span className="GPT-label-text">Message</span>
                <textarea className="GPT-textarea" name="message" value={form.message} onChange={handleInput} placeholder="Tell me about your project..." rows="6" required />
              </label>
              <div className="GPT-form-actions">
                <button type="submit" className="GPT-btn GPT-btn-primary">Send Message</button>
                <button type="button" className="GPT-btn GPT-btn-ghost" onClick={() => { setForm({ name: "", email: "", message: "" }); setFormStatus(""); }}>Reset</button>
              </div>
              {formStatus && <div className="GPT-form-status">{formStatus}</div>}
            </form>

            <aside className="GPT-contact-aside">
              <div className="GPT-contact-card">
                <h4 className="GPT-card-title">Contact Info</h4>
                <p className="GPT-paragraph"><strong>Email:</strong> <a className="GPT-link" href="mailto:youremail@example.com">youremail@example.com</a></p>
                <p className="GPT-paragraph"><strong>Location:</strong> Remote (based in India)</p>
                <div className="GPT-social-row">
                  <a className="GPT-social-link" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon.GitHub /></a>
                  <a className="GPT-social-link" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon.LinkedIn /></a>
                  <a className="GPT-social-link" href="mailto:youremail@example.com" aria-label="Email"><Icon.Mail /></a>
                </div>
              </div>

              <div className="GPT-mini-cta">
                <h5 className="GPT-card-title">Availability</h5>
                <p className="GPT-muted">Open to freelance or full-time roles. Let's chat — I adapt quickly to teams and tech.</p>
                <button className="GPT-btn GPT-btn-primary" onClick={() => handleNav(contactRef)}>Message me</button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="GPT-footer GPT-container">
        <div className="GPT-footer-inner">
          <div className="GPT-footer-left">
            <small className="GPT-copyright">© {new Date().getFullYear()} {developer.name}. All rights reserved.</small>
          </div>
          <div className="GPT-footer-right">
            <nav className="GPT-footer-links">
              <button className="GPT-btn-link" onClick={() => handleNav(aboutRef)}>About</button>
              <button className="GPT-btn-link" onClick={() => handleNav(projectsRef)}>Projects</button>
              <button className="GPT-btn-link" onClick={() => handleNav(contactRef)}>Contact</button>
            </nav>
          </div>
        </div>
      </footer>

      {activeProject && (
        <div className="GPT-modal-overlay" role="dialog" aria-modal="true">
          <div className="GPT-modal">
            <button className="GPT-close" onClick={closeProject} aria-label="Close">✕</button>
            <div className="GPT-modal-grid">
              <div className="GPT-modal-screenshot">
                <ProjectScreenshotSVG title={activeProject.title} />
              </div>
              <div className="GPT-modal-body">
                <h3 className="GPT-modal-title">{activeProject.title}</h3>
                <p className="GPT-muted">{activeProject.short}</p>
                <p className="GPT-paragraph">{activeProject.details}</p>
                <div className="GPT-tags">
                  {activeProject.stack.map((s, i) => <span key={i} className="GPT-pill">{s}</span>)}
                </div>
                <div className="GPT-modal-actions">
                  <button className="GPT-btn GPT-btn-primary" onClick={() => alert("Open project repo (demo)")}>View Code</button>
                  <button className="GPT-btn GPT-btn-ghost" onClick={() => alert("Open live demo (demo)")}>Live Demo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <a className="GPT-skip" href="#GPT-main">Skip to main</a>
    </div>
  );
}
