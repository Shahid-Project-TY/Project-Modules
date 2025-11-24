import React, { useState } from "react";
import "./Meta.css";

const App = () => {
  const [showProject, setShowProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Meta‑Ecommerce",
      desc: "Full‑stack store with payment integration and admin dashboard.",
      tech: "React, Node.js, MongoDB",
      img: `<svg viewBox="0 0 200 120" width="100%" height="120"><rect width="200" height="120" fill="#1e3a8a" /><text x="10" y="30" fill="#fff" font-size="14">Ecommerce UI</text></svg>`,
    },
    {
      id: 2,
      title: "Meta‑Chat",
      desc: "Real‑time messaging app with typing indicators and file upload.",
      tech: "React, Socket.io, Express",
      img: `<svg viewBox="0 0 200 120" width="100%" height="120"><rect width="200" height="120" fill="#10b981" /><text x="10" y="30" fill="#fff" font-size="14">Chat UI</text></svg>`,
    },
    {
      id: 3,
      title: "Meta‑Blog",
      desc: "Markdown blog with server‑side rendering and comment system.",
      tech: "Next.js, Prisma, PostgreSQL",
      img: `<svg viewBox="0 0 200 120" width="100%" height="120"><rect width="200" height="120" fill="#f59e0b" /><text x="10" y="30" fill="#fff" font-size="14">Blog UI</text></svg>`,
    },
  ];

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "CSS", level: 88 },
    { name: "MongoDB", level: 75 },
    { name: "Express", level: 78 },
  ];

  const handleShowDetail = (id) => setShowProject(id);
  const handleClose = () => setShowProject(null);

  return (
    <div className="meta-portfolio">
      {/* Header */}
      <header id="home" className="meta-header">
        <nav className="meta-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="meta-hero">
          <h1 className="meta-name">Alex Meta</h1>
          <p className="meta-role">Full‑Stack Developer</p>
          <p className="meta-tagline">
            Crafting seamless user experiences with modern tech stacks.
          </p>
          <a href="#contact" className="meta-btn meta-btn-primary">
            Hire Me
          </a>
        </div>
      </header>

      {/* About */}
      <section id="about" className="meta-section meta-about">
        <h2>About Me</h2>
        <div className="meta-about-content">
          <div className="meta-avatar">
            <svg
              viewBox="0 0 120 120"
              width="120"
              height="120"
              className="meta-avatar-img"
            >
              <circle cx="60" cy="60" r="60" fill="#3b82f6" />
              <circle cx="60" cy="45" r="20" fill="#fff" />
              <path
                d="M60 80 C55 90, 65 90, 60 80"
                stroke="#fff"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>
          <p>
            Hi, I'm Alex – a passionate full‑stack developer with 4+ years of
            experience building web applications that balance technical
            elegance with intuitive design. I love turning complex problems into
            simple, elegant solutions.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="meta-section meta-projects">
        <h2>Projects</h2>
        <div className="meta-project-grid">
          {projects.map((p) => (
            <div key={p.id} className="meta-card">
              <div
                className="meta-card-img"
                dangerouslySetInnerHTML={{ __html: p.img }}
              />
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <button
                className="meta-btn meta-btn-secondary"
                onClick={() => handleShowDetail(p.id)}
              >
                Details
              </button>

              {showProject === p.id && (
                <div className="meta-modal">
                  <div className="meta-modal-content">
                    <button className="meta-close" onClick={handleClose}>
                      ×
                    </button>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <p>
                      <strong>Technologies:</strong> {p.tech}
                    </p>
                    <a
                      href="#"
                      className="meta-btn meta-btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Resume / Skills */}
      <section id="resume" className="meta-section meta-resume">
        <h2>Skills</h2>
        <div className="meta-skills">
          {skills.map((s) => (
            <div key={s.name} className="meta-skill">
              <div className="meta-skill-header">
                <span>{s.name}</span>
                <span>{s.level}%</span>
              </div>
              <div className="meta-progress">
                <div
                  className="meta-progress-bar"
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <a
          href="https://example.com/resume.pdf"
          download="AlexMeta_Resume.pdf"
          className="meta-btn meta-btn-primary meta-download-btn"
        >
          Download Resume
        </a>
      </section>

      {/* Contact */}
      <section id="contact" className="meta-section meta-contact">
        <h2>Contact</h2>
        <form className="meta-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required />
          <button type="submit" className="meta-btn meta-btn-primary">
            Send Message
          </button>
        </form>
        <div className="meta-social">
          <a
            href="https://linkedin.com/in/alexmeta"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-social-link"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://github.com/alexmeta"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-social-link"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="meta-footer">
        <p>© {new Date().getFullYear()} Alex Meta. All rights reserved.</p>
        <div className="meta-footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default App;