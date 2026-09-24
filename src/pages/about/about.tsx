import React from 'react';
import { Link } from 'react-router-dom';
import '@google/model-viewer';
import ecell3DModel from '../../assets/zcoer-ecell.glb?url';
import './about.css';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface MissionPillar {
  number: string;
  title: string;
  description: string;
}

const missionPillars: MissionPillar[] = [
  {
    number: '01',
    title: 'LEARN',
    description: 'Develop practical entrepreneurial and business skills.',
  },
  {
    number: '02',
    title: 'CONNECT',
    description: 'Build relationships with founders, mentors, professionals, and peers.',
  },
  {
    number: '03',
    title: 'BUILD',
    description: 'Turn ideas into projects, ventures, and real-world experiences.',
  },
];

interface BeliefPrinciple {
  number: string;
  title: string;
  description: string;
}

const beliefPrinciples: BeliefPrinciple[] = [
  {
    number: '01',
    title: 'IDEAS NEED ACTION',
    description: 'A good idea becomes valuable when someone builds it.',
  },
  {
    number: '02',
    title: 'FAILURE IS FEEDBACK',
    description: 'Experimentation and setbacks are part of learning.',
  },
  {
    number: '03',
    title: 'PEOPLE CREATE OPPORTUNITIES',
    description: 'The right connections can change the direction of an idea.',
  },
  {
    number: '04',
    title: 'START SMALL. THINK BIG.',
    description: 'Every venture begins with a first step.',
  },
];

interface EcosystemNode {
  id: string;
  number: string;
  title: string;
  description: string;
}

const ecosystemNodes: EcosystemNode[] = [
  {
    id: 'students',
    number: '01',
    title: 'STUDENTS',
    description: 'Curiosity, ideas, and ambition.',
  },
  {
    id: 'mentors',
    number: '02',
    title: 'MENTORS',
    description: 'Experience, guidance, and feedback.',
  },
  {
    id: 'founders',
    number: '03',
    title: 'FOUNDERS',
    description: 'Real-world knowledge and entrepreneurial journeys.',
  },
  {
    id: 'industry',
    number: '04',
    title: 'INDUSTRY',
    description: 'Connections, opportunities, and collaboration.',
  },
];

interface FeatureBlock {
  number: string;
  title: string;
  description: string;
}

const whatWeDoFeatures: FeatureBlock[] = [
  {
    number: '01',
    title: 'WORKSHOPS',
    description: 'Practical sessions designed to build entrepreneurial and business skills.',
  },
  {
    number: '02',
    title: 'COMPETITIONS',
    description: 'Challenges that encourage students to test ideas and think commercially.',
  },
  {
    number: '03',
    title: 'MENTORSHIP',
    description: 'Access to guidance from experienced entrepreneurs and professionals.',
  },
  {
    number: '04',
    title: 'INCUBATION',
    description: 'Support for students working on promising startup ideas.',
  },
  {
    number: '05',
    title: 'PITCHING',
    description: 'Opportunities to present ideas, receive feedback, and build confidence.',
  },
  {
    number: '06',
    title: 'NETWORKING',
    description: 'Connect with people across the startup and business ecosystem.',
  },
];

interface TimelineStep {
  step: string;
  phase: string;
  title: string;
  description: string;
}

const journeyTimeline: TimelineStep[] = [
  {
    step: '01',
    phase: 'START',
    title: 'The Inception',
    description: 'The vision begins at ZCOER.',
  },
  {
    step: '02',
    phase: 'GROW',
    title: 'Community Formation',
    description: 'Students, initiatives, and collaborations begin to come together.',
  },
  {
    step: '03',
    phase: 'BUILD',
    title: 'Programs & Action',
    description: 'The E-Cell develops programs, events, and opportunities for aspiring entrepreneurs.',
  },
  {
    step: '04',
    phase: 'CONNECT',
    title: 'Network Expansion',
    description: 'The ecosystem expands through mentors, founders, industry, and the Pune startup community.',
  },
  {
    step: '05',
    phase: 'NEXT',
    title: 'Future Horizons',
    description: 'Build a stronger and more connected entrepreneurship ecosystem for the future.',
  },
];

export const AboutPage: React.FC = () => {
  const scrollToInitiatives = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('what-we-do');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-page">
      {/* =====================================================================
          SECTION 1 — HERO
          ===================================================================== */}
      <section className="about-hero-section" aria-label="About ZCOER E-Cell Hero">
        <div className="about-hero-glow" aria-hidden="true" />
        <div className="about-hero-container">
          <span className="about-hero-badge">DISCOVER OUR STORY</span>

          <h1 className="about-hero-heading">
            <span className="heading-line heading-white">ABOUT ZCOER</span>
            <span className="heading-line heading-gold">E-CELL</span>
          </h1>

          <h2 className="about-hero-subheading">
            Building an entrepreneurial mindset beyond the classroom.
          </h2>

          <p className="about-hero-text">
            ZCOER E-Cell is a student-driven entrepreneurship ecosystem at Zeal College of Engineering and Research, Pune, created to help students explore ideas, develop skills, connect with the right people, and take meaningful steps toward building ventures.
          </p>

          <div className="about-hero-actions">
            <a
              href="#what-we-do"
              onClick={scrollToInitiatives}
              className="btn-gold-solid"
              aria-label="Explore our initiatives"
            >
              <span>EXPLORE OUR INITIATIVES</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2 — WHO WE ARE
          ===================================================================== */}
      <section className="who-we-are-section" aria-label="Who We Are">
        <div className="who-we-are-container">
          <div className="who-we-are-grid">
            {/* Left Content Column */}
            <div className="who-we-are-content">
              <span className="section-label">COMMUNITY &amp; IDENTITY</span>
              <h2 className="section-heading">WHO WE ARE</h2>
              <div className="heading-accent-line" aria-hidden="true" />

              <p className="who-we-are-paragraph highlight-lead">
                We are a community of students, entrepreneurs, mentors, founders, and industry professionals working together to make entrepreneurship more accessible and actionable for students.
              </p>

              <p className="who-we-are-paragraph">
                E-Cell provides a platform where ideas can be explored, knowledge can be shared, connections can be built, and ambitious students can take their first steps toward entrepreneurship.
              </p>

              <div className="who-we-are-highlights">
                <div className="highlight-item">
                  <span className="highlight-indicator" aria-hidden="true" />
                  <span className="highlight-text">Student-led, innovation-focused ecosystem</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-indicator" aria-hidden="true" />
                  <span className="highlight-text">Direct founder and mentor access</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-indicator" aria-hidden="true" />
                  <span className="highlight-text">Actionable venture-building programs</span>
                </div>
              </div>
            </div>

            {/* Right 3D Visual Column */}
            <div className="who-we-are-visual-wrap">
              <div className="visual-frame-glow" aria-hidden="true" />
              <div className="visual-model-card">
                <div className="model-header-tag">
                  <span className="tag-dot" aria-hidden="true" />
                  <span>3D EMBLEM &bull; ZCOER E-CELL</span>
                </div>
                <div className="model-canvas-box">
                  <model-viewer
                    src={ecell3DModel}
                    alt="ZCOER E-Cell 3D Emblem"
                    tone-mapping="aces"
                    shadow-intensity="0.85"
                    shadow-softness="0.5"
                    exposure="2.2"
                    environment-image="neutral"
                    interaction-prompt="none"
                    auto-rotate
                    rotation-per-second="18deg"
                    camera-orbit="0deg 78deg 105%"
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent', pointerEvents: 'none' }}
                  />
                </div>
                <div className="model-footer-caption">
                  <span>ZEAL INNOVATION &amp; INCUBATION HUB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 — OUR MISSION
          ===================================================================== */}
      <section className="our-mission-section" aria-label="Our Mission">
        <div className="our-mission-container">
          <div className="section-header-center">
            <span className="section-label">CORE PURPOSE</span>
            <h2 className="section-heading">OUR MISSION</h2>
            <div className="heading-accent-line line-center" aria-hidden="true" />
            <p className="mission-statement-lead">
              To create an environment where students can discover entrepreneurship, develop practical skills, access the right people and resources, and transform ideas into meaningful opportunities.
            </p>
          </div>

          <div className="mission-pillars-grid">
            {missionPillars.map((pillar) => (
              <div key={pillar.number} className="mission-card">
                <div className="card-top-row">
                  <span className="card-index-pill">{pillar.number}</span>
                  <span className="card-corner-marker" aria-hidden="true">&bull;</span>
                </div>
                <h3 className="mission-card-title">{pillar.title}</h3>
                <p className="mission-card-desc">{pillar.description}</p>
                <div className="card-bottom-bar" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 — OUR VISION
          ===================================================================== */}
      <section className="our-vision-section" aria-label="Our Vision">
        <div className="vision-ambient-glow" aria-hidden="true" />
        <div className="our-vision-container">
          <div className="vision-glass-container">
            <span className="section-label">ASPIRATION &amp; FUTURE</span>
            <h2 className="section-heading">OUR VISION</h2>
            <div className="heading-accent-line line-center" aria-hidden="true" />

            <blockquote className="vision-statement">
              &ldquo;To build a strong student entrepreneurship ecosystem that starts at <span className="gold-text">ZCOER</span>, grows across <span className="gold-text">Pune</span>, and connects ambitious young minds with the wider startup ecosystem.&rdquo;
            </blockquote>

            <div className="vision-meta-track">
              <span className="meta-tag">CAMPUS FOUNDATION</span>
              <span className="meta-separator" aria-hidden="true">&bull;</span>
              <span className="meta-tag">REGIONAL IMPACT</span>
              <span className="meta-separator" aria-hidden="true">&bull;</span>
              <span className="meta-tag">GLOBAL MINDSET</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5 — WHAT WE BELIEVE
          ===================================================================== */}
      <section className="what-we-believe-section" aria-label="What We Believe">
        <div className="what-we-believe-container">
          <div className="section-header-center">
            <span className="section-label">GUIDING PRINCIPLES</span>
            <h2 className="section-heading">WHAT WE BELIEVE</h2>
            <div className="heading-accent-line line-center" aria-hidden="true" />
            <p className="section-subtext">
              The foundational convictions that shape how we think, experiment, and build together.
            </p>
          </div>

          <div className="principles-grid">
            {beliefPrinciples.map((item) => (
              <div key={item.number} className="principle-card">
                <div className="principle-card-header">
                  <span className="principle-number">{item.number}</span>
                  <span className="principle-bracket">[ PRINCIPLE ]</span>
                </div>
                <h3 className="principle-title">{item.title}</h3>
                <p className="principle-desc">{item.description}</p>
                <div className="principle-accent-border" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6 — OUR ECOSYSTEM
          ===================================================================== */}
      <section className="about-ecosystem-section" aria-label="Our Ecosystem">
        <div className="about-ecosystem-container">
          <div className="section-header-center">
            <span className="section-label">COLLABORATIVE NETWORK</span>
            <h2 className="section-heading">AN ECOSYSTEM, NOT JUST A CLUB</h2>
            <div className="heading-accent-line line-center" aria-hidden="true" />
            <p className="ecosystem-subheading">
              Different people. Different perspectives. One shared goal.
            </p>
          </div>

          <div className="ecosystem-orbit-layout">
            <div className="ecosystem-orbit-grid">
              {/* Top-Left: STUDENTS */}
              <div className="ecosystem-quad-card card-students">
                <span className="quad-index">{ecosystemNodes[0].number}</span>
                <h3 className="quad-title">{ecosystemNodes[0].title}</h3>
                <p className="quad-desc">{ecosystemNodes[0].description}</p>
              </div>

              {/* Top-Right: MENTORS */}
              <div className="ecosystem-quad-card card-mentors">
                <span className="quad-index">{ecosystemNodes[1].number}</span>
                <h3 className="quad-title">{ecosystemNodes[1].title}</h3>
                <p className="quad-desc">{ecosystemNodes[1].description}</p>
              </div>

              {/* Central Hub Element */}
              <div className="ecosystem-center-hub">
                <div className="hub-glow-ring" aria-hidden="true" />
                <div className="hub-pulse-ring" aria-hidden="true" />
                <div className="hub-inner-core">
                  <span className="hub-badge">CENTRAL HUB</span>
                  <h4 className="hub-title">ZCOER E-CELL</h4>
                  <span className="hub-tagline">ENTREPRENEURSHIP NEXUS</span>
                </div>
              </div>

              {/* Bottom-Left: FOUNDERS */}
              <div className="ecosystem-quad-card card-founders">
                <span className="quad-index">{ecosystemNodes[2].number}</span>
                <h3 className="quad-title">{ecosystemNodes[2].title}</h3>
                <p className="quad-desc">{ecosystemNodes[2].description}</p>
              </div>

              {/* Bottom-Right: INDUSTRY */}
              <div className="ecosystem-quad-card card-industry">
                <span className="quad-index">{ecosystemNodes[3].number}</span>
                <h3 className="quad-title">{ecosystemNodes[3].title}</h3>
                <p className="quad-desc">{ecosystemNodes[3].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7 — WHAT WE DO
          ===================================================================== */}
      <section id="what-we-do" className="what-we-do-block-section" aria-label="What We Do">
        <div className="what-we-do-block-container">
          <div className="section-header-center">
            <span className="section-label">PROGRAMS &amp; INITIATIVES</span>
            <h2 className="section-heading">TURNING OPPORTUNITIES INTO ACTION</h2>
            <div className="heading-accent-line line-center" aria-hidden="true" />
            <p className="section-subtext">
              Comprehensive frameworks designed to transform nascent concepts into verified products and viable ventures.
            </p>
          </div>

          <div className="features-block-grid">
            {whatWeDoFeatures.map((block) => (
              <div key={block.number} className="feature-block-card">
                <div className="feature-block-header">
                  <span className="feature-block-number">{block.number}</span>
                  <div className="feature-block-dot" aria-hidden="true" />
                </div>
                <h3 className="feature-block-title">{block.title}</h3>
                <p className="feature-block-desc">{block.description}</p>
                <div className="feature-hover-line" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8 — OUR JOURNEY
          ===================================================================== */}
      <section className="our-journey-section" aria-label="Our Journey">
        <div className="our-journey-container">
          <div className="section-header-center">
            <span className="section-label">EVOLUTION</span>
            <h2 className="section-heading">FROM AN IDEA TO AN ECOSYSTEM</h2>
            <div className="heading-accent-line line-center" aria-hidden="true" />
            <p className="section-subtext">
              A continuous path of building, iterating, and empowering the next generation of founders.
            </p>
          </div>

          {/* Desktop & Mobile Responsive Timeline */}
          <div className="journey-timeline-wrapper">
            <div className="journey-connecting-line" aria-hidden="true" />
            <div className="journey-steps-track">
              {journeyTimeline.map((step) => (
                <div key={step.step} className="journey-step-item">
                  <div className="journey-node-wrap">
                    <span className="journey-step-number">{step.step}</span>
                    <div className="journey-node-indicator" aria-hidden="true" />
                  </div>
                  <div className="journey-card-content">
                    <span className="journey-phase-tag">{step.phase}</span>
                    <h3 className="journey-step-title">{step.title}</h3>
                    <p className="journey-step-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9 — BE PART OF IT
          ===================================================================== */}
      <section className="be-part-of-it-section" aria-label="Be Part of It">
        <div className="be-part-of-it-container">
          <div className="be-part-glow-backdrop" aria-hidden="true" />
          <div className="be-part-card">
            <span className="be-part-badge">TAKE THE FIRST STEP</span>
            <h2 className="be-part-heading">THERE&apos;S ROOM FOR YOUR IDEA HERE.</h2>
            <div className="heading-accent-line line-center" aria-hidden="true" />

            <p className="be-part-text">
              You don&apos;t need to have a startup to become an entrepreneur. You just need curiosity, initiative, and the willingness to start.
            </p>

            <div className="be-part-actions">
              <Link
                to="/login?mode=join"
                className="btn-gold-solid"
                aria-label="Get involved with ZCOER E-Cell"
              >
                <span>GET INVOLVED</span>
                <span className="cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                to="/events"
                className="btn-gold-outline"
                aria-label="Explore upcoming events"
              >
                <span>EXPLORE EVENTS</span>
                <span className="cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
