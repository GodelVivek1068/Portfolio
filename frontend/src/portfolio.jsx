import { useState, useEffect, useRef, useCallback } from "react";

// ─── THEME & DATA ─────────────────────────────────────────────────────────────

const GITHUB_USER = "GodelVivek1068";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20`;

const SKILLS = {
  "Programming Languages": [
    { name: "Python", icon: "🐍", level: 92 },
    { name: "Java", icon: "☕", level: 85 },
    { name: "JavaScript", icon: "⚡", level: 88 },
    { name: "Scala", icon: "🔷", level: 75 },
    { name: "SQL", icon: "🗃️", level: 90 },
  ],
  "Web Development": [
    { name: "React.js", icon: "⚛️", level: 85 },
    { name: "Node.js", icon: "🟢", level: 82 },
    { name: "Express.js", icon: "🚂", level: 80 },
    { name: "REST APIs", icon: "🔗", level: 88 },
    { name: "HTML/CSS", icon: "🎨", level: 87 },
  ],
  "Big Data & Cloud": [
    { name: "Apache Spark", icon: "✨", level: 88 },
    { name: "Hadoop", icon: "🐘", level: 82 },
    { name: "Kafka", icon: "📨", level: 78 },
    { name: "AWS", icon: "☁️", level: 80 },
    { name: "GCP", icon: "🌐", level: 75 },
  ],
  "AI/ML": [
    { name: "TensorFlow", icon: "🧠", level: 78 },
    { name: "PyTorch", icon: "🔥", level: 75 },
    { name: "Scikit-learn", icon: "📊", level: 85 },
    { name: "NLP", icon: "💬", level: 72 },
    { name: "MLOps", icon: "🔄", level: 70 },
  ],
  "Tools & Platforms": [
    { name: "Docker", icon: "🐳", level: 83 },
    { name: "Kubernetes", icon: "⚙️", level: 72 },
    { name: "Git", icon: "📦", level: 92 },
    { name: "Airflow", icon: "🌊", level: 76 },
    { name: "PostgreSQL", icon: "🐘", level: 85 },
  ],
};

const EXPERIENCE = [
  {
    role: "Big Data Engineer",
    company: "Tech Solutions Inc.",
    period: "2022 – Present",
    points: [
      "Built scalable ETL pipelines processing 10TB+ daily using Apache Spark & Kafka",
      "Reduced data processing latency by 40% via distributed stream optimization",
      "Architected real-time analytics dashboards serving 500K+ daily active users",
    ],
  },
  {
    role: "Software Developer",
    company: "DataFlow Systems",
    period: "2020 – 2022",
    points: [
      "Developed RESTful microservices with Node.js handling 1M+ requests/day",
      "Implemented ML pipelines for predictive analytics with 94% accuracy",
      "Led migration of legacy monolith to cloud-native architecture on AWS",
    ],
  },
];

const TECH_COLORS = {
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  Java: "#ED8B00",
  Spark: "#E25A1C",
  React: "#61DAFB",
  Node: "#339933",
  AWS: "#FF9900",
  Docker: "#2496ED",
  Kafka: "#231F20",
  SQL: "#4479A1",
  Scala: "#DC322F",
  TypeScript: "#3178C6",
  "C++": "#00599C",
};

function getTechColor(tech) {
  const key = Object.keys(TECH_COLORS).find((k) =>
    tech.toLowerCase().includes(k.toLowerCase())
  );
  return key ? TECH_COLORS[key] : "#6366f1";
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useTheme() {
  const [dark, setDark] = useState(true);
  return { dark, toggle: () => setDark((d) => !d) };
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useAnimateOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Navbar({ dark, toggle, active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["hero", "about", "skills", "projects", "experience", "contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 1.5rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? dark ? "rgba(8,8,20,0.92)" : "rgba(248,250,252,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)"}`
          : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <div
        onClick={() => scrollTo("hero")}
        style={{
          cursor: "pointer",
          fontFamily: "'Courier New', monospace",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#6366f1",
          letterSpacing: "-0.02em",
        }}
      >
        &lt;VJ /&gt;
      </div>

      {/* Desktop Links */}
      <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
        {links.map((l) => (
          <button
            key={l}
            onClick={() => scrollTo(l)}
            style={{
              background: active === l ? "rgba(99,102,241,0.15)" : "transparent",
              border: "none",
              padding: "0.4rem 0.9rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: active === l ? 600 : 400,
              color: active === l ? "#6366f1" : dark ? "#94a3b8" : "#64748b",
              textTransform: "capitalize",
              letterSpacing: "0.03em",
              transition: "all 0.2s",
            }}
          >
            {l === "hero" ? "Home" : l.charAt(0).toUpperCase() + l.slice(1)}
          </button>
        ))}
        <button
          onClick={toggle}
          style={{
            marginLeft: "0.5rem",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: `1px solid ${dark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)"}`,
            background: "transparent",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

function Hero({ dark }) {
  const [typed, setTyped] = useState("");
  const titles = ["Software Developer", "Big Data Engineer", "ML Enthusiast", "Cloud Architect"];
  const [ti, setTi] = useState(0);
  const [charI, setCharI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = titles[ti];
    const timeout = setTimeout(() => {
      if (!deleting && charI < cur.length) {
        setTyped(cur.slice(0, charI + 1));
        setCharI(charI + 1);
      } else if (!deleting && charI === cur.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && charI > 0) {
        setTyped(cur.slice(0, charI - 1));
        setCharI(charI - 1);
      } else if (deleting && charI === 0) {
        setDeleting(false);
        setTi((ti + 1) % titles.length);
      }
    }, deleting ? 50 : 80);
    return () => clearTimeout(timeout);
  }, [charI, deleting, ti]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.5rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${dark ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.04)"} 1px, transparent 1px),
            linear-gradient(90deg, ${dark ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.04)"} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: "20%", left: "10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
        animation: "float 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
        filter: "blur(40px)",
        animation: "float 10s ease-in-out infinite reverse",
      }} />

      <div style={{ maxWidth: "900px", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Avatar */}
        <div style={{
          width: "130px", height: "130px", borderRadius: "50%",
          margin: "0 auto 2rem",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
          padding: "3px",
          boxShadow: "0 0 40px rgba(99,102,241,0.4)",
          animation: "pulse-ring 3s ease-in-out infinite",
        }}>
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            overflow: "hidden",
            background: dark ? "#0d0d1a" : "#f8fafc",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src="/profile.jpg"
              alt="Vivek Jadhav"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: "50%",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML = '<span style="font-size:3.5rem">👨‍💻</span>';
              }}
            />
          </div>
        </div>

        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1.5rem",
          background: dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.3)",
          fontSize: "0.8rem", color: "#818cf8",
          fontFamily: "'Courier New', monospace",
        }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 6px #22c55e",
            animation: "blink 1.5s ease-in-out infinite",
          }} />
          Available for opportunities
        </div>

        <h1 style={{
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          fontWeight: 800,
          margin: "0 0 0.5rem",
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          background: dark
            ? "linear-gradient(135deg, #e2e8f0 30%, #6366f1 70%, #8b5cf6)"
            : "linear-gradient(135deg, #1e293b 30%, #6366f1 70%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Vivek Jadhav
        </h1>

        <div style={{
          fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
          fontFamily: "'Courier New', monospace",
          color: "#6366f1",
          marginBottom: "1.5rem",
          minHeight: "2.2rem",
          fontWeight: 500,
        }}>
          {typed}<span style={{ animation: "blink 1s step-end infinite", color: "#8b5cf6" }}>|</span>
        </div>

        <p style={{
          fontSize: "1.05rem",
          lineHeight: 1.75,
          color: dark ? "#94a3b8" : "#64748b",
          maxWidth: "560px",
          margin: "0 auto 2.5rem",
        }}>
          Turning raw data into actionable insights. I build scalable data pipelines,
          intelligent systems, and modern web applications that make a difference.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          <a
            href="#"
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.4)"; }}
          >
            📄 Download Resume
          </a>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              border: "1px solid rgba(99,102,241,0.4)",
              background: "transparent",
              color: dark ? "#e2e8f0" : "#1e293b",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.1)"; e.currentTarget.style.borderColor = "#6366f1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; }}
          >
            🐙 GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vivek-jadhav-337a3824b/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              border: "1px solid rgba(99,102,241,0.4)",
              background: "transparent",
              color: dark ? "#e2e8f0" : "#1e293b",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.1)"; e.currentTarget.style.borderColor = "#6366f1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; }}
          >
            💼 LinkedIn
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
          color: dark ? "#475569" : "#94a3b8", fontSize: "0.75rem",
          animation: "bounce 2s ease-in-out infinite",
        }}>
          <span>Scroll to explore</span>
          <span style={{ fontSize: "1.2rem" }}>↓</span>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes pulse-ring { 0%,100%{box-shadow:0 0 40px rgba(99,102,241,0.4)} 50%{box-shadow:0 0 60px rgba(99,102,241,0.6)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes barGrow { from{width:0} to{width:var(--w)} }
      `}</style>
    </section>
  );
}

function SectionTitle({ title, sub, dark }) {
  const { ref, visible } = useAnimateOnScroll();
  return (
    <div ref={ref} style={{
      textAlign: "center", marginBottom: "3rem",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s ease",
    }}>
      <p style={{
        fontFamily: "'Courier New', monospace",
        color: "#6366f1", fontSize: "0.82rem",
        letterSpacing: "0.2em", textTransform: "uppercase",
        marginBottom: "0.75rem",
      }}>
        — {sub} —
      </p>
      <h2 style={{
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        fontWeight: 800, letterSpacing: "-0.03em",
        color: dark ? "#e2e8f0" : "#1e293b",
        margin: 0,
      }}>
        {title}
      </h2>
      <div style={{
        width: "60px", height: "3px",
        background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
        margin: "1.25rem auto 0", borderRadius: "999px",
      }} />
    </div>
  );
}

function About({ dark }) {
  const { ref, visible } = useAnimateOnScroll();
  const stats = [
    { n: "5+", l: "Years Experience" },
    { n: "30+", l: "Projects Built" },
    { n: "10TB+", l: "Data Processed/Day" },
    { n: "15+", l: "Technologies" },
  ];

  return (
    <section id="about" style={{ padding: "6rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <SectionTitle title="About Me" sub="Who I Am" dark={dark} />
      <div ref={ref} style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "3rem", alignItems: "start",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease 0.1s",
      }}>
        <div>
          <p style={{ color: dark ? "#94a3b8" : "#64748b", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.97rem" }}>
            Hi! I'm <strong style={{ color: "#6366f1" }}>Vivek Jadhav</strong>, a passionate Software Developer
            and Big Data Engineer with a strong foundation in building scalable, data-driven solutions.
            I thrive at the intersection of software engineering and data science.
          </p>
          <p style={{ color: dark ? "#94a3b8" : "#64748b", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.97rem" }}>
            My expertise spans designing distributed data pipelines, crafting intelligent ML models,
            and building full-stack web applications. I love turning complex problems into elegant,
            performant solutions.
          </p>
          <p style={{ color: dark ? "#94a3b8" : "#64748b", lineHeight: 1.8, fontSize: "0.97rem" }}>
            🎯 <strong style={{ color: dark ? "#e2e8f0" : "#1e293b" }}>Goal:</strong> To architect next-generation
            data platforms that democratize AI insights for enterprises at scale, while contributing
            to open-source communities.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
            {["Apache Spark", "React", "Python", "AWS", "Kubernetes", "ML/AI"].map(t => (
              <span key={t} style={{
                padding: "0.35rem 0.9rem", borderRadius: "999px",
                background: dark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.25)",
                fontSize: "0.8rem", color: "#818cf8", fontFamily: "'Courier New', monospace",
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "1.75rem 1.25rem",
              background: dark ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.04)",
              border: `1px solid ${dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)"}`,
              borderRadius: "12px", textAlign: "center",
              transition: "transform 0.2s, border-color 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)"; }}
            >
              <div style={{
                fontSize: "2rem", fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: "0.4rem",
              }}>{s.n}</div>
              <div style={{ fontSize: "0.78rem", color: dark ? "#64748b" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, icon, level, dark, delay }) {
  const { ref, visible } = useAnimateOnScroll();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-20px)",
      transition: `all 0.5s ease ${delay}s`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.88rem", color: dark ? "#e2e8f0" : "#1e293b", fontWeight: 500 }}>
          <span>{icon}</span>{name}
        </span>
        <span style={{ fontSize: "0.75rem", color: "#6366f1", fontFamily: "'Courier New', monospace", fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{
        height: "5px", borderRadius: "999px",
        background: dark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: visible ? `${level}%` : "0%",
          background: `linear-gradient(90deg, #6366f1, #8b5cf6)`,
          borderRadius: "999px",
          transition: `width 1s ease ${delay + 0.2}s`,
          boxShadow: "0 0 8px rgba(99,102,241,0.5)",
        }} />
      </div>
    </div>
  );
}

function Skills({ dark }) {
  const [active, setActive] = useState("Programming Languages");
  const cats = Object.keys(SKILLS);

  return (
    <section id="skills" style={{
      padding: "6rem 1.5rem",
      background: dark ? "rgba(99,102,241,0.03)" : "rgba(99,102,241,0.02)",
      borderTop: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)"}`,
      borderBottom: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)"}`,
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionTitle title="Skills & Expertise" sub="What I Do" dark={dark} />

        {/* Category Tabs */}
        <div style={{
          display: "flex", gap: "0.5rem", flexWrap: "wrap",
          justifyContent: "center", marginBottom: "2.5rem",
        }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding: "0.5rem 1.25rem", borderRadius: "999px",
              border: `1px solid ${active === c ? "#6366f1" : dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.15)"}`,
              background: active === c ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
              color: active === c ? "#fff" : dark ? "#94a3b8" : "#64748b",
              fontSize: "0.82rem", fontWeight: active === c ? 600 : 400,
              cursor: "pointer", transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}>
              {c}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
          {(SKILLS[active] || []).map((s, i) => (
            <div key={s.name} style={{
              padding: "1.5rem",
              background: dark ? "rgba(15,15,30,0.8)" : "#fff",
              border: `1px solid ${dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)"}`,
              borderRadius: "12px",
              boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.04)",
            }}>
              <SkillBar {...s} dark={dark} delay={i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ repo, dark, idx }) {
  const { ref, visible } = useAnimateOnScroll();
  const [hovered, setHovered] = useState(false);

  // Generate gradient cover based on repo name
  const hue = (repo.name.charCodeAt(0) * 37 + repo.name.charCodeAt(1 % repo.name.length) * 13) % 360;
  const langs = repo.language ? [repo.language] : [];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s ease ${(idx % 3) * 0.1}s`,
        background: dark ? "rgba(15,15,30,0.9)" : "#fff",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.5)" : dark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)"}`,
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: hovered
          ? `0 12px 40px rgba(99,102,241,0.2)`
          : dark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.05)",
        transition: `all 0.3s ease`,
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Project image / gradient banner */}
      <div style={{
        height: "140px",
        background: `linear-gradient(135deg, hsl(${hue},70%,35%), hsl(${(hue + 60) % 360},70%,45%))`,
        position: "relative",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }} />
        <span style={{ fontSize: "3rem", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}>
          {repo.name.includes("data") || repo.name.includes("Data") ? "📊" :
            repo.name.includes("ml") || repo.name.includes("ML") ? "🤖" :
              repo.name.includes("web") || repo.name.includes("Web") ? "🌐" :
                repo.name.includes("api") || repo.name.includes("API") ? "🔗" :
                  repo.name.includes("spark") ? "✨" : "💻"}
        </span>
        {repo.stargazers_count > 0 && (
          <div style={{
            position: "absolute", top: "10px", right: "10px",
            background: "rgba(0,0,0,0.5)", borderRadius: "999px",
            padding: "0.2rem 0.6rem", fontSize: "0.75rem", color: "#fbbf24",
          }}>
            ⭐ {repo.stargazers_count}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h3 style={{
          margin: 0, fontSize: "1rem", fontWeight: 700,
          color: dark ? "#e2e8f0" : "#1e293b",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
        </h3>

        <p style={{
          margin: 0, fontSize: "0.82rem",
          color: dark ? "#64748b" : "#94a3b8",
          lineHeight: 1.6, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {repo.description || "A software project showcasing engineering skills and best practices."}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {langs.map(l => (
            <span key={l} style={{
              padding: "0.2rem 0.6rem", borderRadius: "4px",
              background: `${getTechColor(l)}20`,
              border: `1px solid ${getTechColor(l)}40`,
              fontSize: "0.72rem", color: getTechColor(l), fontFamily: "'Courier New', monospace",
              fontWeight: 600,
            }}>{l}</span>
          ))}
          {repo.topics?.slice(0, 3).map(t => (
            <span key={t} style={{
              padding: "0.2rem 0.6rem", borderRadius: "4px",
              background: dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)",
              border: "1px solid rgba(99,102,241,0.2)",
              fontSize: "0.72rem", color: "#818cf8",
            }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "0.75rem", borderTop: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)"}`, paddingTop: "0.75rem" }}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, textAlign: "center", padding: "0.45rem",
            borderRadius: "6px", border: "1px solid rgba(99,102,241,0.3)",
            color: "#6366f1", textDecoration: "none", fontSize: "0.8rem",
            fontWeight: 600, transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            🐙 Code
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, textAlign: "center", padding: "0.45rem",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", textDecoration: "none", fontSize: "0.8rem",
              fontWeight: 600,
            }}>
              🚀 Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects({ dark }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch(GITHUB_API)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.filter(r => !r.fork).slice(0, 12));
        } else {
          setError("Could not load repositories");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch from GitHub");
        setLoading(false);
      });
  }, []);

  const langs = ["All", ...new Set(repos.map(r => r.language).filter(Boolean))];
  const filtered = filter === "All" ? repos : repos.filter(r => r.language === filter);

  return (
    <section id="projects" style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <SectionTitle title="Featured Projects" sub="My Work" dark={dark} />

      {/* Language filter */}
      {!loading && !error && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
          {langs.map(l => (
            <button key={l} onClick={() => setFilter(l)} style={{
              padding: "0.4rem 1rem", borderRadius: "999px",
              border: `1px solid ${filter === l ? "#6366f1" : dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)"}`,
              background: filter === l ? "rgba(99,102,241,0.15)" : "transparent",
              color: filter === l ? "#6366f1" : dark ? "#94a3b8" : "#64748b",
              fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s",
              fontFamily: l !== "All" ? "'Courier New', monospace" : "inherit",
            }}>
              {l}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: "4rem", color: dark ? "#64748b" : "#94a3b8" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            border: "3px solid rgba(99,102,241,0.2)",
            borderTop: "3px solid #6366f1",
            margin: "0 auto 1rem",
            animation: "spin 1s linear infinite",
          }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          Fetching repositories from GitHub...
        </div>
      )}

      {error && (
        <div style={{
          textAlign: "center", padding: "3rem",
          background: dark ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.03)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "12px", color: dark ? "#94a3b8" : "#64748b",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⚠️</div>
          <p style={{ margin: "0 0 0.5rem" }}>{error}</p>
          <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noopener noreferrer"
            style={{ color: "#6366f1", textDecoration: "none", fontSize: "0.88rem" }}>
            View repositories on GitHub →
          </a>
        </div>
      )}

      {!loading && !error && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {filtered.map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} dark={dark} idx={i} />
          ))}
        </div>
      )}
    </section>
  );
}

function Experience({ dark }) {
  return (
    <section id="experience" style={{
      padding: "6rem 1.5rem",
      background: dark ? "rgba(99,102,241,0.03)" : "rgba(99,102,241,0.02)",
      borderTop: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)"}`,
      borderBottom: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)"}`,
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <SectionTitle title="Experience" sub="Career Journey" dark={dark} />
        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{
            position: "absolute", left: "20px", top: 0, bottom: 0,
            width: "2px",
            background: "linear-gradient(180deg, #6366f1, #8b5cf6, transparent)",
          }} />

          {EXPERIENCE.map((exp, i) => {
            const { ref, visible } = useAnimateOnScroll();
            return (
              <div key={i} ref={ref} style={{
                paddingLeft: "55px", marginBottom: "2.5rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: `all 0.6s ease ${i * 0.2}s`,
              }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: "12px",
                  width: "18px", height: "18px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 0 12px rgba(99,102,241,0.5)",
                }} />

                <div style={{
                  padding: "1.5rem",
                  background: dark ? "rgba(15,15,30,0.9)" : "#fff",
                  border: `1px solid ${dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)"}`,
                  borderRadius: "12px",
                  boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <div>
                      <h3 style={{ margin: "0 0 0.2rem", fontSize: "1.05rem", fontWeight: 700, color: dark ? "#e2e8f0" : "#1e293b" }}>{exp.role}</h3>
                      <span style={{ fontSize: "0.85rem", color: "#6366f1", fontWeight: 600 }}>{exp.company}</span>
                    </div>
                    <span style={{
                      padding: "0.25rem 0.75rem", borderRadius: "999px",
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.2)",
                      fontSize: "0.75rem", color: "#818cf8",
                      fontFamily: "'Courier New', monospace",
                      height: "fit-content",
                    }}>{exp.period}</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                    {exp.points.map((p, j) => (
                      <li key={j} style={{ color: dark ? "#94a3b8" : "#64748b", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "0.35rem" }}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact({ dark }) {
  const { ref, visible } = useAnimateOnScroll();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" style={{ padding: "6rem 1.5rem", maxWidth: "700px", margin: "0 auto" }}>
      <SectionTitle title="Get In Touch" sub="Contact Me" dark={dark} />
      <div ref={ref} style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease",
      }}>
        <p style={{ textAlign: "center", color: dark ? "#94a3b8" : "#64748b", marginBottom: "2.5rem", lineHeight: 1.7 }}>
          Open to new opportunities, collaborations, or just a great tech conversation.
          Drop me a message and I'll get back to you within 24 hours!
        </p>

        <div style={{
          padding: "2rem",
          background: dark ? "rgba(15,15,30,0.9)" : "#fff",
          border: `1px solid ${dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)"}`,
          borderRadius: "16px",
          boxShadow: dark ? "0 8px 40px rgba(0,0,0,0.3)" : "0 8px 40px rgba(0,0,0,0.06)",
        }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ color: "#22c55e", margin: "0 0 0.5rem" }}>Message Sent!</h3>
              <p style={{ color: dark ? "#64748b" : "#94a3b8", margin: 0 }}>Thanks! I'll get back to you soon.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { key: "name", placeholder: "Your Name", type: "text" },
                { key: "email", placeholder: "your@email.com", type: "email" },
              ].map(({ key, placeholder, type }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{
                    width: "100%", padding: "0.85rem 1rem",
                    background: dark ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.04)",
                    border: `1px solid ${dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)"}`,
                    borderRadius: "8px",
                    color: dark ? "#e2e8f0" : "#1e293b",
                    fontSize: "0.9rem",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              ))}
              <textarea
                placeholder="Your message..."
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{
                  width: "100%", padding: "0.85rem 1rem",
                  background: dark ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.04)",
                  border: `1px solid ${dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)"}`,
                  borderRadius: "8px",
                  color: dark ? "#e2e8f0" : "#1e293b",
                  fontSize: "0.9rem", resize: "vertical",
                  outline: "none", fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              <button onClick={handleSubmit} style={{
                padding: "0.9rem 2rem",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", borderRadius: "8px",
                color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.4)"; }}
              >
                Send Message 🚀
              </button>
            </div>
          )}
        </div>

        {/* Social links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {[
            { icon: "🐙", label: "GitHub", url: `https://github.com/${GITHUB_USER}` },
            { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/vivek-jadhav-337a3824b/" },
            { icon: "📧", label: "Email", url: "mailto:vivek.jadhav@email.com" },
          ].map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 1.25rem", borderRadius: "8px",
              border: `1px solid ${dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)"}`,
              color: dark ? "#94a3b8" : "#64748b",
              textDecoration: "none", fontSize: "0.85rem",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.color = "#6366f1"; e.currentTarget.style.background = "rgba(99,102,241,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)"; e.currentTarget.style.color = dark ? "#94a3b8" : "#64748b"; e.currentTarget.style.background = "transparent"; }}
            >
              {s.icon} {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ dark }) {
  return (
    <footer style={{
      textAlign: "center", padding: "2rem 1.5rem",
      borderTop: `1px solid ${dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)"}`,
      color: dark ? "#475569" : "#94a3b8", fontSize: "0.82rem",
    }}>
      <p style={{ margin: "0 0 0.35rem" }}>
        <span style={{ color: "#6366f1", fontFamily: "'Courier New', monospace" }}>{"<"}</span>
        Built with React & ❤️ by Vivek Jadhav
        <span style={{ color: "#6366f1", fontFamily: "'Courier New', monospace" }}>{" />"}</span>
      </p>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} · All rights reserved</p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { dark, toggle } = useTheme();
  const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
  const active = useScrollSpy(sections);

  const bg = dark
    ? "linear-gradient(135deg, #08080f 0%, #0d0d1a 50%, #080812 100%)"
    : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)";

  return (
    <div style={{
      background: bg,
      color: dark ? "#e2e8f0" : "#1e293b",
      minHeight: "100vh",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      overflowX: "hidden",
    }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Navbar dark={dark} toggle={toggle} active={active} />
      <Hero dark={dark} />
      <About dark={dark} />
      <Skills dark={dark} />
      <Projects dark={dark} />
      <Experience dark={dark} />
      <Contact dark={dark} />
      <Footer dark={dark} />
    </div>
  );
}
