import React, { useRef, useEffect, useState } from "react";
import "./Copilot.css";

export default function App() {
  const sections = {
    home: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    resume: useRef(null),
    contact: useRef(null),
    footer: useRef(null),
  };

  const [active, setActive] = useState("home");

  const handleScrollTo = (key) => {
    setActive(key);
    const el = sections[key]?.current;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id?.startsWith("copilot-section-")) {
          const key = visible.target.id.replace("copilot-section-", "");
          setActive(key);
        }
      },
      { threshold: [0.2, 0.5, 0.75] }
    );

    Object.values(sections).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  const handleDownloadResume = () => {
    const resumeText = `
Full-Stack Developer — Portfolio Resume
=======================================

Profile:
- Passionate full-stack developer specializing in React, Node.js, and modern UI/UX
- Focused on clean, accessible, and performant web apps

Skills:
- Frontend: React, Vite, JavaScript (ES202x), TypeScript, Tailwind, Vanilla CSS
- Backend: Node.js, Express, REST APIs, WebSockets
- Databases: MongoDB, PostgreSQL, Redis
- Tools: Git, Docker, CI/CD, Testing (Jest, Playwright)
- Cloud: Vercel, Netlify, AWS (basic)

Projects:
- Interactive SPA Portfolio (this site)
- DataViz Dashboard (React + D3)
- Real-time Chat App (WebSockets)

Experience:
- Freelance/Contract — Building responsive, animated SPAs and dashboards
- Contributions — Open-source tooling, UI components

Contact:
- Email: you@example.com
- GitHub: github.com/yourhandle
- LinkedIn: linkedin.com/in/yourhandle
    `.trim();

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Full-Stack-Developer-Resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const ProjectCard = ({ title, desc, tags, color, svg }) => (
    <div className="copilot-project-card" style={{ "--accent": color }}>
      <div className="copilot-project-visual" aria-hidden="true">
        {svg}
      </div>
      <div className="copilot-project-content">
        <h3 className="copilot-project-title">{title}</h3>
        <p className="copilot-project-desc">{desc}</p>
        <div className="copilot-project-tags">
          {tags.map((t) => (
            <span key={t} className="copilot-project-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="copilot-project-reveal">
        <div className="copilot-project-reveal-inner">
          <p className="copilot-project-reveal-text">
            Built with best practices: accessible components, semantic structure,
            responsive layouts, and delightful micro-interactions.
          </p>
          <button className="copilot-btn copilot-btn-secondary">View details</button>
        </div>
      </div>
    </div>
  );

  const Icon = {
    Spark: (
      <svg viewBox="0 0 64 64" className="copilot-icon">
        <defs>
          <linearGradient id="copilot-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path
          d="M32 6l6 12 12 6-12 6-6 12-6-12-12-6 12-6 6-12z"
          fill="url(#copilot-grad)"
        />
        <circle cx="32" cy="32" r="5" fill="#22D3EE" />
      </svg>
    ),
    Code: (
      <svg viewBox="0 0 64 64" className="copilot-icon">
        <path d="M22 14l-16 18 16 18" fill="none" stroke="#22D3EE" strokeWidth="4" />
        <path d="M42 14l16 18-16 18" fill="none" stroke="#7C3AED" strokeWidth="4" />
        <path d="M28 60l8-56" fill="none" stroke="#94A3B8" strokeWidth="3" />
      </svg>
    ),
    Data: (
      <svg viewBox="0 0 64 64" className="copilot-icon">
        <ellipse cx="32" cy="16" rx="20" ry="8" fill="#0EA5E9" opacity="0.25" />
        <ellipse cx="32" cy="32" rx="20" ry="8" fill="#7C3AED" opacity="0.25" />
        <ellipse cx="32" cy="48" rx="20" ry="8" fill="#22D3EE" opacity="0.25" />
        <path d="M12 16v32M52 16v32" stroke="#64748B" strokeWidth="2" />
      </svg>
    ),
    Badge: (
      <svg viewBox="0 0 64 64" className="copilot-icon">
        <circle cx="32" cy="32" r="26" fill="#111827" stroke="#22D3EE" strokeWidth="3" />
        <path d="M20 36h24l-12 10z" fill="#7C3AED" />
        <path d="M20 28h24l-12-10z" fill="#06B6D4" />
      </svg>
    ),
    GitHub: (
      <svg viewBox="0 0 24 24" className="copilot-icon-inline" aria-hidden="true">
        <path
          d="M12 .5C5.73.5.99 5.24.99 11.52c0 4.86 3.15 8.98 7.52 10.43.55.1.76-.24.76-.54 0-.26-.01-1.15-.02-2.08-3.06.67-3.71-1.32-3.71-1.32-.5-1.26-1.21-1.6-1.21-1.6-.99-.68.08-.66.08-.66 1.1.08 1.67 1.13 1.67 1.13.98 1.67 2.57 1.19 3.2.91.1-.71.38-1.19.69-1.47-2.44-.28-5-1.22-5-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.42.11-2.96 0 0 .93-.3 3.05 1.13a10.5 10.5 0 0 1 5.55 0c2.12-1.44 3.05-1.13 3.05-1.13.61 1.54.23 2.68.12 2.96.7.77 1.12 1.75 1.12 2.95 0 4.22-2.57 5.15-5.02 5.43.39.34.74 1.01.74 2.04 0 1.47-.01 2.65-.01 3.01 0 .3.2.65.77.54A10.97 10.97 0 0 0 23.03 11.5C23.03 5.23 18.28.5 12 .5Z"
          fill="currentColor"
        />
      </svg>
    ),
    LinkedIn: (
      <svg viewBox="0 0 24 24" className="copilot-icon-inline" aria-hidden="true">
        <path
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 8.98h4v12H3v-12Zm6.49 0H13v1.64c.61-1.17 2.16-2.02 3.98-2.02 3.67 0 4.35 2.14 4.35 4.92v7.46h-4v-6.61c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.53 1.72-2.53 3.5v6.72h-4v-12Z"
          fill="currentColor"
        />
      </svg>
    ),
    Mail: (
      <svg viewBox="0 0 24 24" className="copilot-icon-inline" aria-hidden="true">
        <path
          d="M2 5h20v14H2V5Zm2 2 8 6 8-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  };

  const projects = [
    {
      title: "Interactive SPA Portfolio",
      desc:
        "A sleek single-page portfolio with animated sections, smooth scrolling, and responsive layout. Built for clarity and delight.",
      tags: ["React", "Vanilla CSS", "SPA", "Accessibility"],
      color: "#7C3AED",
      svg: Icon.Spark,
    },
    {
      title: "Realtime Chat App",
      desc:
        "Socket-driven messaging with presence, typing indicators, and optimistic UI. Minimal, fast, and production-ready patterns.",
      tags: ["WebSockets", "Node.js", "React", "UX"],
      color: "#06B6D4",
      svg: Icon.Code,
    },
    {
      title: "DataViz Dashboard",
      desc:
        "Clean, responsive dashboard with modular cards, transitions, and data-friendly color ramps. Focused on scanability.",
      tags: ["React", "D3", "Design Systems", "Perf"],
      color: "#22D3EE",
      svg: Icon.Data,
    },
    {
      title: "API Toolkit",
      desc:
        "Typed APIs, robust error handling, and Progressive Enhancement for resilient client integrations.",
      tags: ["TypeScript", "REST", "Testing", "DX"],
      color: "#0EA5E9",
      svg: Icon.Badge,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };
    // Simulate success with a subtle toast
    const toast = document.getElementById("copilot-toast");
    if (toast) {
      toast.textContent = `Message sent. Thanks, ${payload.name || "there"}!`;
      toast.classList.add("copilot-toast-show");
      setTimeout(() => toast.classList.remove("copilot-toast-show"), 2500);
    }
    e.currentTarget.reset();
  };

  return (
    <div className="copilot-app">
      {/* Header / Hero */}
      <header className="copilot-header" id="copilot-section-home" ref={sections.home}>
        <nav className="copilot-nav">
          <div className="copilot-brand">
            <div className="copilot-logo">
              <span className="copilot-logo-pulse" />
              <span className="copilot-logo-text">FS Dev</span>
            </div>
          </div>
          <ul className="copilot-nav-list">
            {["home", "about", "projects", "resume", "contact"].map((key) => (
              <li key={key}>
                <button
                  className={`copilot-nav-link ${active === key ? "copilot-nav-active" : ""}`}
                  onClick={() => handleScrollTo(key)}
                >
                  <span className="copilot-nav-bullet" />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <div className="copilot-nav-cta">
            <button
              className="copilot-btn copilot-btn-primary"
              onClick={() => handleScrollTo("contact")}
            >
              Let’s talk
            </button>
          </div>
        </nav>

        <div className="copilot-hero">
          <div className="copilot-hero-text">
            <h1 className="copilot-hero-title">
              Shahid — <span className="copilot-hero-gradient">Full-Stack Developer</span>
            </h1>
            <p className="copilot-hero-tagline">
              Building crisp UIs, resilient APIs, and ✨ delightful interactions.
              <span className="copilot-hero-cursor" aria-hidden="true" />
            </p>
            <div className="copilot-hero-actions">
              <button
                className="copilot-btn copilot-btn-secondary"
                onClick={() => handleScrollTo("projects")}
              >
                View projects
              </button>
              <button
                className="copilot-btn copilot-btn-ghost"
                onClick={() => handleScrollTo("resume")}
              >
                Skills & resume
              </button>
            </div>
          </div>
          <div className="copilot-hero-orb" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="copilot-hero-orb-svg">
              <defs>
                <radialGradient id="copilot-orb" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </radialGradient>
              </defs>
              <circle cx="60" cy="60" r="45" fill="url(#copilot-orb)" />
            </svg>
          </div>
        </div>
      </header>

      {/* About */}
      <section
        className="copilot-section copilot-about"
        id="copilot-section-about"
        ref={sections.about}
      >
        <div className="copilot-section-head">
          <h2 className="copilot-section-title">About me</h2>
          <p className="copilot-section-subtitle">
            I craft performant, accessible web apps with thoughtful design and a focus on
            developer experience.
          </p>
        </div>

        <div className="copilot-about-grid">
          <div className="copilot-about-card">
            <p className="copilot-about-text">
              I blend clean architecture with modern UI patterns. Rapid prototyping, sharp
              visuals, and maintainable code are my essentials. I enjoy shipping features that
              feel intuitive, look polished, and scale calmly.
            </p>
            <ul className="copilot-about-bullets">
              <li><strong>**Focus:**</strong> UX, performance, and reliability</li>
              <li><strong>**Stack:**</strong> React, Node.js, TypeScript, CSS</li>
              <li><strong>**Values:**</strong> clarity, accessibility, testing</li>
            </ul>
          </div>

          <div className="copilot-profile">
            <div className="copilot-profile-frame">
              <div className="copilot-profile-shimmer" />
              <div className="copilot-profile-avatar" aria-hidden="true">
                <svg viewBox="0 0 120 120" className="copilot-profile-svg">
                  <circle cx="60" cy="60" r="58" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
                  <circle cx="60" cy="54" r="22" fill="#1F2937" />
                  <rect x="30" y="82" width="60" height="24" rx="12" fill="#1F2937" />
                </svg>
              </div>
            </div>
            <p className="copilot-profile-caption">Hover to animate • No external image needed</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        className="copilot-section copilot-projects"
        id="copilot-section-projects"
        ref={sections.projects}
      >
        <div className="copilot-section-head">
          <h2 className="copilot-section-title">Projects</h2>
          <p className="copilot-section-subtitle">
            Click or hover the cards to reveal more. Designed for clarity and fun.
          </p>
        </div>

        <div className="copilot-projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* Resume / Skills */}
      <section
        className="copilot-section copilot-resume"
        id="copilot-section-resume"
        ref={sections.resume}
      >
        <div className="copilot-section-head">
          <h2 className="copilot-section-title">Skills & resume</h2>
          <p className="copilot-section-subtitle">
            Visual skills matrix with animated badges and progress bars.
          </p>
        </div>

        <div className="copilot-skills-grid">
          <div className="copilot-skill-card">
            <h3 className="copilot-skill-title">Frontend</h3>
            <div className="copilot-progress">
              <span className="copilot-progress-label">React</span>
              <div className="copilot-progress-bar"><span style={{ width: "92%" }} /></div>
            </div>
            <div className="copilot-progress">
              <span className="copilot-progress-label">TypeScript</span>
              <div className="copilot-progress-bar"><span style={{ width: "85%" }} /></div>
            </div>
            <div className="copilot-progress">
              <span className="copilot-progress-label">CSS Architecture</span>
              <div className="copilot-progress-bar"><span style={{ width: "88%" }} /></div>
            </div>
          </div>

          <div className="copilot-skill-card">
            <h3 className="copilot-skill-title">Backend</h3>
            <div className="copilot-progress">
              <span className="copilot-progress-label">Node.js</span>
              <div className="copilot-progress-bar"><span style={{ width: "90%" }} /></div>
            </div>
            <div className="copilot-progress">
              <span className="copilot-progress-label">Express</span>
              <div className="copilot-progress-bar"><span style={{ width: "82%" }} /></div>
            </div>
            <div className="copilot-progress">
              <span className="copilot-progress-label">REST APIs</span>
              <div className="copilot-progress-bar"><span style={{ width: "88%" }} /></div>
            </div>
          </div>

          <div className="copilot-skill-card">
            <h3 className="copilot-skill-title">Databases & cloud</h3>
            <div className="copilot-progress">
              <span className="copilot-progress-label">MongoDB</span>
              <div className="copilot-progress-bar"><span style={{ width: "78%" }} /></div>
            </div>
            <div className="copilot-progress">
              <span className="copilot-progress-label">PostgreSQL</span>
              <div className="copilot-progress-bar"><span style={{ width: "74%" }} /></div>
            </div>
            <div className="copilot-progress">
              <span className="copilot-progress-label">AWS</span>
              <div className="copilot-progress-bar"><span style={{ width: "60%" }} /></div>
            </div>
          </div>

          <div className="copilot-skill-card">
            <h3 className="copilot-skill-title">Tooling</h3>
            <div className="copilot-badges">
              <span className="copilot-badge">Git</span>
              <span className="copilot-badge">Docker</span>
              <span className="copilot-badge">CI/CD</span>
              <span className="copilot-badge">Testing</span>
              <span className="copilot-badge">Vite</span>
            </div>
          </div>
        </div>

        <div className="copilot-resume-actions">
          <button className="copilot-btn copilot-btn-primary" onClick={handleDownloadResume}>
            Download resume
          </button>
          <button className="copilot-btn copilot-btn-ghost" onClick={() => handleScrollTo("contact")}>
            Contact me
          </button>
        </div>
      </section>

      {/* Contact */}
      <section
        className="copilot-section copilot-contact"
        id="copilot-section-contact"
        ref={sections.contact}
      >
        <div className="copilot-section-head">
          <h2 className="copilot-section-title">Contact</h2>
          <p className="copilot-section-subtitle">
            Drop a message—let’s build something crisp and impactful.
          </p>
        </div>

        <div className="copilot-contact-grid">
          <form className="copilot-form" onSubmit={handleSubmit}>
            <div className="copilot-form-row">
              <label htmlFor="copilot-input-name" className="copilot-label">
                Name
              </label>
              <input
                id="copilot-input-name"
                name="name"
                type="text"
                className="copilot-input"
                placeholder="Your name"
                required
              />
            </div>
            <div className="copilot-form-row">
              <label htmlFor="copilot-input-email" className="copilot-label">
                Email
              </label>
              <input
                id="copilot-input-email"
                name="email"
                type="email"
                className="copilot-input"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="copilot-form-row">
              <label htmlFor="copilot-input-message" className="copilot-label">
                Message
              </label>
              <textarea
                id="copilot-input-message"
                name="message"
                className="copilot-input copilot-textarea"
                placeholder="Tell me about your idea..."
                rows={5}
                required
              />
            </div>
            <div className="copilot-form-actions">
              <button type="submit" className="copilot-btn copilot-btn-primary">
                Send message
              </button>
              <button
                type="button"
                className="copilot-btn copilot-btn-secondary"
                onClick={() => handleScrollTo("projects")}
              >
                See work
              </button>
            </div>
          </form>

          <div className="copilot-contact-info">
            <div className="copilot-contact-item">
              <span className="copilot-contact-icon">{Icon.Mail}</span>
              <a href="mailto:you@example.com" className="copilot-contact-link">you@example.com</a>
            </div>
            <div className="copilot-contact-item">
              <span className="copilot-contact-icon">{Icon.GitHub}</span>
              <a href="https://github.com/yourhandle" className="copilot-contact-link">github.com/yourhandle</a>
            </div>
            <div className="copilot-contact-item">
              <span className="copilot-contact-icon">{Icon.LinkedIn}</span>
              <a href="https://linkedin.com/in/yourhandle" className="copilot-contact-link">
                linkedin.com/in/yourhandle
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="copilot-footer"
        id="copilot-section-footer"
        ref={sections.footer}
      >
        <div className="copilot-footer-content">
          <p className="copilot-footer-copy">© {new Date().getFullYear()} Shahid • Full-Stack Developer</p>
          <ul className="copilot-footer-links">
            <li>
              <button className="copilot-footer-link" onClick={() => handleScrollTo("home")}>
                Home
              </button>
            </li>
            <li>
              <button className="copilot-footer-link" onClick={() => handleScrollTo("projects")}>
                Projects
              </button>
            </li>
            <li>
              <button className="copilot-footer-link" onClick={() => handleScrollTo("contact")}>
                Contact
              </button>
            </li>
          </ul>
        </div>
      </footer>

      {/* Toast */}
      <div id="copilot-toast" className="copilot-toast" role="status" aria-live="polite" />

      {/* Decorative background */}
      <div className="copilot-bg">
        <div className="copilot-bg-grid" />
        <div className="copilot-bg-blur copilot-bg-blur-a" />
        <div className="copilot-bg-blur copilot-bg-blur-b" />
      </div>
    </div>
  );
}
