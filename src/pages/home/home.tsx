import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '@google/model-viewer';
import hero3DModel from '../../assets/zcoer-ecell.glb?url';
import eventHackathonImg from '../../assets/events/hackathon.jpg';
import eventMasterclassImg from '../../assets/events/masterclass.jpg';
import eventPitchArenaImg from '../../assets/events/pitcharena.jpg';
import eventInvestorMixerImg from '../../assets/events/investormixer.jpg';
import eventBootcampImg from '../../assets/events/bootcamp.jpg';
import campuskiteLogo from '../../assets/startups/campuskite.svg';
import ecochargeLogo from '../../assets/startups/ecocharge.svg';
import nexalogixLogo from '../../assets/startups/nexalogix.svg';
import communityImg from '../../assets/community.jpg';
import blogPitchImg from '../../assets/blogs/pitch.jpg';
import blogProductImg from '../../assets/blogs/product.jpg';
import blogMentorshipImg from '../../assets/blogs/mentorship.jpg';
import { AccordionGallery, type AccordionGalleryItem } from '../../components/accordion-gallery/AccordionGallery';
import './home.css';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface StatItem {
  value: string;
  label: string;
}

const statsData: StatItem[] = [
  { value: '1000+', label: 'Students' },
  { value: '20+', label: 'Events & Workshops' },
  { value: '50+', label: 'Ideas & Projects' },
  { value: '10+', label: 'Mentors & Speakers' },
];

interface WhatWeDoItem {
  number: string;
  title: string;
  description: string;
}

const whatWeDoData: WhatWeDoItem[] = [
  {
    number: '01',
    title: 'WORKSHOPS',
    description: 'Learn practical entrepreneurship, business, and startup skills.',
  },
  {
    number: '02',
    title: 'COMPETITIONS',
    description: 'Turn ideas into action through business challenges, pitches, and competitions.',
  },
  {
    number: '03',
    title: 'MENTORSHIP',
    description: 'Get guidance, feedback, and insights from founders and industry professionals.',
  },
  {
    number: '04',
    title: 'STARTUP SUPPORT',
    description: 'Develop your idea with resources, networking, incubation, and pitching opportunities.',
  },
];

const upcomingEventsData: AccordionGalleryItem[] = [
  {
    id: 'e-summit-hackathon',
    image: eventHackathonImg,
    title: 'E-SUMMIT & HACKATHON',
    label: 'E-Summit & Hackathon',
    description: 'A 24-hour innovation challenge building scalable business models and tech prototypes.',
    date: 'MARCH 28, 2026',
    link: '/events',
  },
  {
    id: 'founders-masterclass',
    image: eventMasterclassImg,
    title: 'FOUNDERS MASTERCLASS',
    label: 'Founders Masterclass',
    description: 'Scaling strategies and venture insights shared directly by experienced startup founders.',
    date: 'APRIL 04, 2026',
    link: '/events',
  },
  {
    id: 'venture-pitch-arena',
    image: eventPitchArenaImg,
    title: 'VENTURE PITCH ARENA',
    label: 'Venture Pitch Arena',
    description: 'Present your pitch deck to a curated panel of active angel investors and incubators.',
    date: 'APRIL 22, 2026',
    link: '/events',
  },
  {
    id: 'angel-investor-mixer',
    image: eventInvestorMixerImg,
    title: 'ANGEL INVESTOR MIXER',
    label: 'Investor Mixer',
    description: 'Exclusive networking session connecting student ventures with leading early-stage angel investors.',
    date: 'MAY 10, 2026',
    link: '/events',
  },
  {
    id: 'bootstrap-to-scale',
    image: eventBootcampImg,
    title: 'BOOTSTRAP TO SCALE BOOTCAMP',
    label: 'Scaling Bootcamp',
    description: 'Intensive hands-on workshop on product-market fit, unit economics, and rapid growth hacking.',
    date: 'MAY 24, 2026',
    link: '/events',
  },
];

interface StartupItem {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  link: string;
}

const featuredStartupsData: StartupItem[] = [
  {
    id: 'campuskite',
    name: 'CampusKite',
    category: 'EdTech & Tools',
    description: 'AI-driven peer learning and academic resource network tailored for engineering students.',
    logo: campuskiteLogo,
    link: '/startups/campuskite',
  },
  {
    id: 'ecocharge',
    name: 'EcoCharge',
    category: 'CleanTech & IoT',
    description: 'Smart modular battery swapping infrastructure and telemetry for electric two-wheelers.',
    logo: ecochargeLogo,
    link: '/startups/ecocharge',
  },
  {
    id: 'nexalogix',
    name: 'NexaLogix',
    category: 'DeepTech & Robotics',
    description: 'Autonomous indoor navigation rovers designed for smart warehouse logistics and tracking.',
    logo: nexalogixLogo,
    link: '/startups/nexalogix',
  },
];

interface WhyInvolvedItem {
  step: string;
  title: string;
  description: string;
}

const whyInvolvedData: WhyInvolvedItem[] = [
  {
    step: '01',
    title: 'LEARN',
    description: 'Gain practical knowledge through workshops, resources, and real-world experiences.',
  },
  {
    step: '02',
    title: 'CONNECT',
    description: 'Meet founders, mentors, professionals, and like-minded students.',
  },
  {
    step: '03',
    title: 'BUILD',
    description: 'Turn ideas into projects, ventures, and opportunities.',
  },
];

interface CommunityPillar {
  title: string;
  description: string;
}

const communityPillarsData: CommunityPillar[] = [
  {
    title: 'Student Community',
    description: 'A thriving network of innovators, developers, and thinkers across all engineering disciplines.',
  },
  {
    title: 'Core Team',
    description: 'Dedicated student leaders organizing flagship summits, pitch competitions, and hands-on bootcamps.',
  },
  {
    title: 'Founders & Mentors',
    description: 'Direct access to experienced alumni and venture founders who provide practical guidance and feedback.',
  },
  {
    title: 'Industry Connections',
    description: 'Institutional partnerships with leading startup incubators, angel networks, and venture funds.',
  },
];

interface VentureStep {
  step: string;
  title: string;
  description: string;
}

const fromIdeaToVentureData: VentureStep[] = [
  {
    step: '01',
    title: 'IDEATE',
    description: 'Explore and shape your idea.',
  },
  {
    step: '02',
    title: 'VALIDATE',
    description: 'Test the problem, market, and potential.',
  },
  {
    step: '03',
    title: 'BUILD',
    description: 'Develop your product, team, and business.',
  },
  {
    step: '04',
    title: 'LAUNCH',
    description: 'Pitch, connect, and take it forward.',
  },
];

interface EcosystemCategory {
  id: string;
  title: string;
  description: string;
  nodeNumber: string;
}

const ecosystemData: EcosystemCategory[] = [
  {
    id: 'students',
    title: 'STUDENTS',
    description: 'Ideas, talent, and ambition.',
    nodeNumber: '01',
  },
  {
    id: 'mentors',
    title: 'MENTORS',
    description: 'Experience, guidance, and feedback.',
    nodeNumber: '02',
  },
  {
    id: 'founders',
    title: 'FOUNDERS',
    description: 'Real-world stories, lessons, and inspiration.',
    nodeNumber: '03',
  },
  {
    id: 'industry',
    title: 'INDUSTRY',
    description: 'Connections, opportunities, and collaboration.',
    nodeNumber: '04',
  },
];

interface BlogArticleItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

const blogArticlesData: BlogArticleItem[] = [
  {
    id: 'aurora-pitch',
    title: 'From Campus Pitch to Seed Funding: The Aurora Tech Story',
    category: 'FOUNDER JOURNEY',
    description: 'How three 3rd-year engineering students validated their IoT health wearable and secured early angel backing.',
    image: blogPitchImg,
    link: '/blogs/aurora-pitch-story',
  },
  {
    id: 'student-dev-systems',
    title: 'Building Production Systems as a Student Developer',
    category: 'TECH & PRODUCT',
    description: 'Key architectural lessons learned transitioning from hackathon prototypes to resilient scalable software.',
    image: blogProductImg,
    link: '/blogs/student-production-systems',
  },
  {
    id: 'investor-expectations',
    title: 'What Investors Look For in First-Time Student Founders',
    category: 'VENTURE INSIGHTS',
    description: 'Actionable takeaways from our mentor roundtable on unit economics, market sizing, and storytelling.',
    image: blogMentorshipImg,
    link: '/blogs/what-investors-look-for',
  },
];

interface PartnerItem {
  name: string;
  type: string;
}

const partnersData: PartnerItem[] = [
  { name: 'AWS Activate', type: 'Cloud Infrastructure Partner' },
  { name: 'GitHub for Startups', type: 'Developer Ecosystem Partner' },
  { name: 'TiE Pune', type: 'Entrepreneurial Network' },
  { name: 'Campus Fund', type: 'Student Venture Capital' },
  { name: 'Startup India', type: 'National Innovation Initiative' },
  { name: 'Pune Angel Network', type: 'Angel Investor Consortium' },
];

export const HomePage: React.FC = () => {
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const animateOrbit = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      // Unified continuous function:
      // Exponential decay opening spin + continuous harmonic sine sway
      const decaySpin = Math.exp(-1.8 * elapsed) * -360;
      const idleSway = Math.sin((elapsed * Math.PI * 2) / 6.5) * 18;

      const angle = decaySpin + idleSway;
      const elevation = 80 + Math.sin((elapsed * Math.PI * 2) / 8) * 3;

      if (modelViewerRef.current) {
        modelViewerRef.current.cameraOrbit = `${angle}deg ${elevation}deg 100%`;
      }

      animationFrameId = requestAnimationFrame(animateOrbit);
    };

    animationFrameId = requestAnimationFrame(animateOrbit);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="home-hero-container">
        <section className="hero-section" aria-label="Hero Introduction">
          <div className="hero-content-left">
            <h1 className="hero-headline">
              <span className="headline-row headline-white">ZCOER</span>
              <span className="headline-row headline-gold">E-CELL</span>
            </h1>

            <h2 className="hero-subheadline">
              Where <span className="gold-text">Ideas</span> Turn Into <span className="gold-text">Ventures</span>.
            </h2>

            <p className="hero-description">
              The Entrepreneurship Cell of Zeal College of Engineering and Research, Pune, empowering students to think beyond the classroom, transform ideas into real-world ventures, and build the mindset to create what comes next.
            </p>

            <div className="hero-actions">
              <Link to="/about" className="btn-gold-outline" aria-label="Explore E-Cell">
                <span>EXPLORE E-CELL</span>
                <span className="cta-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="hero-3d-right">
            <model-viewer
              ref={modelViewerRef}
              src={hero3DModel}
              alt="ZCOER E-Cell 3D Logo Asset"
              tone-mapping="aces"
              shadow-intensity="0.8"
              shadow-softness="0.6"
              exposure="2.2"
              environment-image="neutral"
              interaction-prompt="none"
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent', pointerEvents: 'none' }}
            />
          </div>
        </section>
      </div>

      {/* What is E-Cell Section */}
      <section className="what-is-ecell-section" aria-label="What is E-Cell">
        <div className="ecell-summary-container">
          <h2 className="ecell-summary-title">WHAT IS E-CELL?</h2>

          <p className="ecell-summary-tagline">
            A place where ideas are not just discussed. <span className="gold-text">They are built.</span>
          </p>

          <p className="ecell-summary-description">
            ZCOER E-Cell is a student-driven ecosystem built to turn entrepreneurial ideas into action. We bring together students, mentors, founders, and industry professionals to create an environment where ideas can be explored, tested, and built. Through workshops, competitions, networking, mentorship, and startup-focused initiatives, we help students move beyond simply having an idea to understanding how to make it real.
          </p>

          <div className="ecell-summary-closing">
            <span className="closing-step">Think.</span>
            <span className="closing-dot">&bull;</span>
            <span className="closing-step">Experiment.</span>
            <span className="closing-dot">&bull;</span>
            <span className="closing-step">Build.</span>
            <span className="closing-dot">&bull;</span>
            <span className="closing-step gold-text">Launch.</span>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="home-stats-section" aria-label="E-Cell Impact Statistics">
        <div className="home-stats-container">
          <div className="stats-grid">
            {statsData.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section" aria-label="What We Do">
        <div className="what-we-do-container">
          <div className="what-we-do-header">
            <h2 className="what-we-do-title">WHAT WE DO</h2>
            <p className="what-we-do-subheading">
              From ideas to action, we create opportunities to explore, build, and grow.
            </p>
          </div>

          <div className="what-we-do-grid">
            {whatWeDoData.map((item, idx) => (
              <div key={idx} className="wwd-card">
                <span className="wwd-card-number">{item.number}</span>
                <h3 className="wwd-card-title">{item.title}</h3>
                <p className="wwd-card-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="upcoming-events-section" aria-label="Upcoming Events">
        <div className="upcoming-events-container">
          <div className="upcoming-events-header">
            <h2 className="upcoming-events-title">UPCOMING EVENTS</h2>
            <p className="upcoming-events-subheading">
              Discover what’s happening next and get involved.
            </p>
          </div>

          <div className="events-accordion-wrap">
            <AccordionGallery
              items={upcomingEventsData}
              defaultIndex={0}
              visibleCount={3}
              expandRatio={0.54}
              trigger="hover"
              accentColor="var(--accent-gold, #cba358)"
              overlayColor="#000000"
              textColor="#ffffff"
              grayscale={false}
              showLabels={true}
              duration={0.55}
              ease="power3.out"
              parallax={0.35}
              tilt={5}
              height={440}
              gap={14}
              radius={4}
              orientation="horizontal"
              showNavigation={true}
            />
          </div>

          <div className="events-all-cta-wrap">
            <Link
              to="/events"
              className="btn-gold-outline"
              aria-label="View All Upcoming and Past Events"
            >
              <span>VIEW ALL EVENTS</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Startups & Ventures Section */}
      <section className="startups-section" aria-label="Startups and Ventures">
        <div className="startups-container">
          <div className="startups-header">
            <h2 className="startups-title">STARTUPS &amp; VENTURES</h2>
            <p className="startups-subheading">
              Ideas built by students, supported by the E-Cell.
            </p>
          </div>

          <div className="startups-grid">
            {featuredStartupsData.map((startup) => (
              <div key={startup.id} className="startup-card">
                <div className="startup-card-top">
                  <div className="startup-logo-frame">
                    <img
                      src={startup.logo}
                      alt={`${startup.name} logo`}
                      className="startup-logo-img"
                      loading="lazy"
                      width={48}
                      height={48}
                    />
                  </div>
                  <span className="startup-category-badge">{startup.category}</span>
                </div>

                <div className="startup-card-body">
                  <h3 className="startup-name">{startup.name}</h3>
                  <p className="startup-description">{startup.description}</p>
                </div>

                <div className="startup-card-footer">
                  <Link
                    to={startup.link}
                    className="startup-explore-link"
                    aria-label={`Explore ${startup.name} startup`}
                  >
                    <span>EXPLORE STARTUP</span>
                    <span className="cta-arrow" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="startups-all-cta-wrap">
            <Link
              to="/startups"
              className="btn-gold-outline"
              aria-label="View All Student Startups and Ventures"
            >
              <span>VIEW ALL STARTUPS</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY GET INVOLVED? */}
      <section className="why-involved-section" aria-label="Why Get Involved">
        <div className="why-involved-container">
          <div className="why-involved-header">
            <h2 className="why-involved-title">WHY GET INVOLVED?</h2>
            <p className="why-involved-subheading">
              More than a club. A place to learn, connect, and build.
            </p>
          </div>

          <div className="why-involved-grid">
            {whyInvolvedData.map((item) => (
              <div key={item.step} className="why-involved-card">
                <span className="why-involved-step">{item.step}</span>
                <h3 className="why-involved-card-title">{item.title}</h3>
                <p className="why-involved-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: OUR COMMUNITY */}
      <section className="our-community-section" aria-label="Our Community">
        <div className="our-community-container">
          <div className="community-content-grid">
            {/* Left: Community Image */}
            <div className="community-image-wrap">
              <img
                src={communityImg}
                alt="ZCOER E-Cell Student Innovators Collaborating"
                className="community-image"
                loading="lazy"
                width={620}
                height={400}
              />
              <div className="community-image-overlay" aria-hidden="true" />
            </div>

            {/* Right: Supporting Content */}
            <div className="community-info-wrap">
              <div className="community-header">
                <h2 className="community-title">BUILT BY STUDENTS. CONNECTED BY IDEAS.</h2>
                <p className="community-subheading">
                  A growing community of students driven to explore entrepreneurship and create something meaningful.
                </p>
              </div>

              <div className="community-pillars-list">
                {communityPillarsData.map((pillar, idx) => (
                  <div key={idx} className="community-pillar-item">
                    <span className="pillar-bullet" aria-hidden="true">&bull;</span>
                    <div className="pillar-text-wrap">
                      <h3 className="pillar-title">{pillar.title}</h3>
                      <p className="pillar-desc">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="community-cta-wrap">
                <Link
                  to="/login?mode=join"
                  className="btn-gold-outline"
                  aria-label="Join the E-Cell Student Community"
                >
                  <span>JOIN THE COMMUNITY</span>
                  <span className="cta-arrow" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FROM IDEA TO VENTURE */}
      <section className="idea-to-venture-section" aria-label="From Idea to Venture">
        <div className="idea-to-venture-container">
          <div className="idea-to-venture-header">
            <h2 className="idea-to-venture-title">FROM IDEA TO VENTURE</h2>
            <p className="idea-to-venture-subheading">
              Have an idea? Start here.
            </p>
          </div>

          <div className="timeline-horizontal-wrapper">
            <div className="timeline-connecting-line" aria-hidden="true" />
            <div className="timeline-steps-grid">
              {fromIdeaToVentureData.map((step) => (
                <div key={step.step} className="timeline-step-card">
                  <div className="timeline-step-indicator">
                    <span className="timeline-step-num">{step.step}</span>
                    <span className="timeline-node" aria-hidden="true" />
                  </div>
                  <h3 className="timeline-step-title">{step.title}</h3>
                  <p className="timeline-step-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="venture-cta-wrap">
            <Link
              to="/events"
              className="btn-gold-outline"
              aria-label="Start Your Venture Journey with E-Cell"
            >
              <span>START YOUR JOURNEY</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10: OUR ECOSYSTEM */}
      <section className="our-ecosystem-section" aria-label="Meet The Ecosystem">
        <div className="our-ecosystem-container">
          <div className="our-ecosystem-header">
            <h2 className="our-ecosystem-title">MEET THE ECOSYSTEM</h2>
            <p className="our-ecosystem-subheading">
              Entrepreneurship grows faster when the right people come together.
            </p>
          </div>

          <div className="ecosystem-layout">
            <div className="ecosystem-cards-grid">
              {/* Top Left: Students */}
              <div className="ecosystem-node-card ecosystem-card-students">
                <span className="node-marker">{ecosystemData[0].nodeNumber}</span>
                <h3 className="node-title">{ecosystemData[0].title}</h3>
                <p className="node-desc">{ecosystemData[0].description}</p>
              </div>

              {/* Top Right: Mentors */}
              <div className="ecosystem-node-card ecosystem-card-mentors">
                <span className="node-marker">{ecosystemData[1].nodeNumber}</span>
                <h3 className="node-title">{ecosystemData[1].title}</h3>
                <p className="node-desc">{ecosystemData[1].description}</p>
              </div>

              {/* Central Core Element */}
              <div className="ecosystem-central-hub" aria-hidden="true">
                <div className="central-hub-ring" />
                <div className="central-hub-core">
                  <span className="hub-core-sub">FOUNDATION</span>
                  <span className="hub-core-title">ZCOER E-CELL</span>
                  <span className="hub-core-desc">VENTURE HUB</span>
                </div>
              </div>

              {/* Bottom Left: Founders */}
              <div className="ecosystem-node-card ecosystem-card-founders">
                <span className="node-marker">{ecosystemData[2].nodeNumber}</span>
                <h3 className="node-title">{ecosystemData[2].title}</h3>
                <p className="node-desc">{ecosystemData[2].description}</p>
              </div>

              {/* Bottom Right: Industry */}
              <div className="ecosystem-node-card ecosystem-card-industry">
                <span className="node-marker">{ecosystemData[3].nodeNumber}</span>
                <h3 className="node-title">{ecosystemData[3].title}</h3>
                <p className="node-desc">{ecosystemData[3].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: STORIES & INSIGHTS */}
      <section className="stories-insights-section" aria-label="Stories and Insights">
        <div className="stories-insights-container">
          <div className="stories-insights-header">
            <h2 className="stories-insights-title">FROM THE COMMUNITY</h2>
            <p className="stories-insights-subheading">
              Ideas, experiences, and insights from the people building with us.
            </p>
          </div>

          <div className="articles-grid">
            {blogArticlesData.map((article) => (
              <article key={article.id} className="article-card">
                <div className="article-image-wrap">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="article-image"
                    loading="lazy"
                    width={400}
                    height={225}
                  />
                  <span className="article-category-badge">{article.category}</span>
                </div>

                <div className="article-body">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                </div>

                <div className="article-footer">
                  <Link
                    to={article.link}
                    className="article-read-link"
                    aria-label={`Read more about ${article.title}`}
                  >
                    <span>READ MORE</span>
                    <span className="cta-arrow" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="articles-all-cta-wrap">
            <Link
              to="/blogs"
              className="btn-gold-outline"
              aria-label="View All Community Blogs and Articles"
            >
              <span>VIEW ALL BLOGS</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 12: PARTNERS & COLLABORATORS */}
      <section className="partners-section" aria-label="Partners and Collaborators">
        <div className="partners-container">
          <div className="partners-header">
            <h2 className="partners-title">POWERED BY COLLABORATION</h2>
            <p className="partners-subheading">
              Building opportunities through meaningful connections across the startup ecosystem.
            </p>
          </div>

          <div className="partners-grid">
            {partnersData.map((partner, idx) => (
              <div key={idx} className="partner-item-card">
                <span className="partner-name">{partner.name}</span>
                <span className="partner-type">{partner.type}</span>
              </div>
            ))}
          </div>

          <div className="partners-cta-wrap">
            <Link
              to="/contact"
              className="btn-gold-outline"
              aria-label="Partner with ZCOER E-Cell"
            >
              <span>PARTNER WITH US</span>
              <span className="cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 13: FINAL CTA */}
      <section className="final-cta-section" aria-label="Ready to Build Something">
        <div className="final-cta-container">
          <div className="final-cta-glow-backdrop" aria-hidden="true" />
          <div className="final-cta-content">
            <h2 className="final-cta-title">READY TO BUILD SOMETHING?</h2>
            <p className="final-cta-subheading">
              Your next idea could start here.
            </p>
            <p className="final-cta-lead">
              Explore the E-Cell, find your opportunity, and take the first step toward building something real.
            </p>

            <div className="final-cta-buttons-wrap">
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
                aria-label="Explore upcoming E-Cell events"
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

export default HomePage;
