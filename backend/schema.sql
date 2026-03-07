-- ============================================================
-- Portfolio Database Schema
-- PostgreSQL
-- ============================================================

-- Drop tables if exist (for clean setup)
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- ── Admins ───────────────────────────────────────────────────
CREATE TABLE admins (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- ── Projects ─────────────────────────────────────────────────
CREATE TABLE projects (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(200) NOT NULL,
  description  TEXT,
  tech_stack   TEXT[],
  github_url   VARCHAR(500),
  live_url     VARCHAR(500),
  image_url    VARCHAR(500),
  featured     BOOLEAN DEFAULT FALSE,
  stars        INTEGER DEFAULT 0,
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP DEFAULT NOW()
);

-- ── Skills ───────────────────────────────────────────────────
CREATE TABLE skills (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  category     VARCHAR(100) NOT NULL,
  level        INTEGER CHECK (level BETWEEN 0 AND 100),
  icon         VARCHAR(20),
  created_at   TIMESTAMP DEFAULT NOW()
);

-- ── Contact Messages ─────────────────────────────────────────
CREATE TABLE contacts (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(255) NOT NULL,
  message      TEXT NOT NULL,
  read         BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Admin user (password: admin123 - change in production!)
-- bcrypt hash of "admin123"
INSERT INTO admins (name, email, password_hash) VALUES (
  'Vivek Jadhav',
  'vivek@admin.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
);

-- Sample Projects
INSERT INTO projects (title, description, tech_stack, github_url, live_url, featured, stars) VALUES
(
  'Real-Time Data Pipeline',
  'Scalable ETL pipeline processing 10TB+ daily using Apache Spark, Kafka, and AWS S3 with real-time monitoring dashboards.',
  ARRAY['Apache Spark', 'Kafka', 'Python', 'AWS', 'PostgreSQL'],
  'https://github.com/GodelVivek1068/data-pipeline',
  NULL,
  TRUE,
  42
),
(
  'ML Analytics Platform',
  'End-to-end machine learning platform with automated feature engineering, model training, and REST API deployment.',
  ARRAY['Python', 'FastAPI', 'TensorFlow', 'Docker', 'Kubernetes'],
  'https://github.com/GodelVivek1068/ml-platform',
  'https://ml-platform.demo.com',
  TRUE,
  28
),
(
  'Portfolio API',
  'RESTful API with JWT authentication, PostgreSQL, and Express.js for managing portfolio content.',
  ARRAY['Node.js', 'Express', 'PostgreSQL', 'JWT'],
  'https://github.com/GodelVivek1068/portfolio-api',
  NULL,
  FALSE,
  15
);

-- Skills
INSERT INTO skills (name, category, level, icon) VALUES
-- Programming Languages
('Python',     'Programming Languages', 92, '🐍'),
('Java',       'Programming Languages', 85, '☕'),
('JavaScript', 'Programming Languages', 88, '⚡'),
('Scala',      'Programming Languages', 75, '🔷'),
('SQL',        'Programming Languages', 90, '🗃️'),
-- Web
('React.js',   'Web Development', 85, '⚛️'),
('Node.js',    'Web Development', 82, '🟢'),
('Express.js', 'Web Development', 80, '🚂'),
('REST APIs',  'Web Development', 88, '🔗'),
-- Big Data
('Apache Spark','Big Data & Cloud', 88, '✨'),
('Hadoop',     'Big Data & Cloud', 82, '🐘'),
('Kafka',      'Big Data & Cloud', 78, '📨'),
('AWS',        'Big Data & Cloud', 80, '☁️'),
-- AI/ML
('TensorFlow', 'AI/ML', 78, '🧠'),
('PyTorch',    'AI/ML', 75, '🔥'),
('Scikit-learn','AI/ML', 85, '📊'),
-- Tools
('Docker',     'Tools & Platforms', 83, '🐳'),
('Kubernetes', 'Tools & Platforms', 72, '⚙️'),
('Git',        'Tools & Platforms', 92, '📦'),
('PostgreSQL', 'Tools & Platforms', 85, '🐘');

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_contacts_read ON contacts(read);
CREATE INDEX idx_contacts_created ON contacts(created_at DESC);
