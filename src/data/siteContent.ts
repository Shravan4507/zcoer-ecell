import blogMentorshipImg from '../assets/blogs/mentorship.jpg';
import blogPitchImg from '../assets/blogs/pitch.jpg';
import blogProductImg from '../assets/blogs/product.jpg';
import communityImg from '../assets/community.jpg';
import eventBootcampImg from '../assets/events/bootcamp.jpg';
import eventHackathonImg from '../assets/events/hackathon.jpg';
import eventInvestorMixerImg from '../assets/events/investormixer.jpg';
import eventMasterclassImg from '../assets/events/masterclass.jpg';
import eventPitchArenaImg from '../assets/events/pitcharena.jpg';
import campuskiteLogo from '../assets/startups/campuskite.svg';
import ecochargeLogo from '../assets/startups/ecocharge.svg';
import nexalogixLogo from '../assets/startups/nexalogix.svg';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  month: string;
  day: string;
  format: string;
  location: string;
  description: string;
  image: string;
}

export const events: EventItem[] = [
  { id: 'e-summit-hackathon', title: 'E-Summit and Hackathon', date: '28 March 2026', month: 'MAR', day: '28', format: '24 hour challenge', location: 'ZCOER Campus', description: 'Build a business model and working prototype with collaborators, mentors, and industry reviewers.', image: eventHackathonImg },
  { id: 'founders-masterclass', title: 'Founders Masterclass', date: '04 April 2026', month: 'APR', day: '04', format: 'Masterclass', location: 'Seminar Hall', description: 'A focused working session on product-market fit, early distribution, and founder decision-making.', image: eventMasterclassImg },
  { id: 'venture-pitch-arena', title: 'Venture Pitch Arena', date: '22 April 2026', month: 'APR', day: '22', format: 'Pitch competition', location: 'ZCOER Auditorium', description: 'Present your venture to a panel of operators, investors, and incubator partners for direct feedback.', image: eventPitchArenaImg },
  { id: 'investor-mixer', title: 'Investor Mixer', date: '10 May 2026', month: 'MAY', day: '10', format: 'Networking session', location: 'ZCOER Campus', description: 'Meet founders, angel investors, and ecosystem partners in a structured student-founder networking session.', image: eventInvestorMixerImg },
  { id: 'bootstrap-to-scale', title: 'Bootstrap to Scale', date: '24 May 2026', month: 'MAY', day: '24', format: 'Hands-on workshop', location: 'Innovation Lab', description: 'Work through validation, unit economics, and a practical 90-day execution plan for your venture.', image: eventBootcampImg },
];

export interface StartupItem {
  id: string;
  name: string;
  category: string;
  stage: string;
  description: string;
  story: string;
  logo: string;
}

export const startups: StartupItem[] = [
  { id: 'campuskite', name: 'CampusKite', category: 'EdTech and tools', stage: 'Idea to validation', description: 'An AI-driven peer-learning and academic resource network built for engineering students.', story: 'CampusKite is exploring how course communities can make revision, peer support, and trusted learning resources more accessible for every student.', logo: campuskiteLogo },
  { id: 'ecocharge', name: 'EcoCharge', category: 'CleanTech and IoT', stage: 'Prototype', description: 'Smart modular battery-swapping infrastructure and telemetry for electric two-wheelers.', story: 'EcoCharge is developing a practical way to reduce charging downtime with a campus-scale battery swapping system and usable fleet telemetry.', logo: ecochargeLogo },
  { id: 'nexalogix', name: 'NexaLogix', category: 'DeepTech and robotics', stage: 'Prototype', description: 'Autonomous indoor-navigation rovers for smart warehouse logistics and tracking.', story: 'NexaLogix applies approachable robotics and sensor fusion to repetitive warehouse movement, tracking, and delivery problems.', logo: nexalogixLogo },
];

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  image: string;
  body: string[];
}

export const articles: ArticleItem[] = [
  { id: 'aurora-pitch-story', title: 'From Campus Pitch to Seed Funding', category: 'Founder journey', readTime: '5 min read', description: 'How student teams can turn early feedback into a clearer story, stronger proof, and the next useful conversation.', image: blogPitchImg, body: ['A good student pitch begins with a problem close enough to observe. The strongest early teams keep their first claim narrow, speak with users often, and record what changes their assumptions.', 'Momentum comes from small evidence: a prototype people return to, a pilot that solves one painful workflow, or a partner willing to introduce the team to the next customer.', 'The goal of a campus pitch is not to perform certainty. It is to show that the team can learn quickly, make disciplined choices, and move from insight to a useful experiment.'] },
  { id: 'student-production-systems', title: 'Building Production Systems as a Student Developer', category: 'Tech and product', readTime: '6 min read', description: 'A practical way to grow a project from a weekend prototype into a product that people can rely on.', image: blogProductImg, body: ['The shift from a prototype to a product starts with choosing what must stay dependable. Authentication, data ownership, error states, and clear feedback are usually more important than the next visual flourish.', 'Build small vertical slices. Give one user a complete path from intent to outcome, learn where it breaks, and improve that flow before expanding scope.', 'Production thinking is not about using the most tools. It is about making intentional trade-offs, documenting constraints, and respecting the people who rely on the system.'] },
  { id: 'what-investors-look-for', title: 'What Investors Look For in First-Time Student Founders', category: 'Venture insights', readTime: '4 min read', description: 'The questions behind market sizing, early traction, and why a team is particularly suited to a problem.', image: blogMentorshipImg, body: ['Early conversations are often about clarity, not polish. Can the team explain a specific user problem, why it matters now, and what they have learned that others might miss?', 'Investors look for evidence of speed and honesty. A team that names its risks, tests its assumptions, and changes direction with good reason is easier to support than one that claims every answer is settled.', 'For student founders, the advantage is proximity to emerging behavior. Use that access to interview users, run small pilots, and build a learning loop that compounds.'] },
];

export const resources = [
  { title: 'Startup India learning portal', type: 'Government resource', description: 'Explore startup guides, policy information, and the national entrepreneurship ecosystem.', url: 'https://www.startupindia.gov.in/' },
  { title: 'Y Combinator startup library', type: 'Founder playbook', description: 'Straightforward essays and talks on ideation, product, fundraising, and company building.', url: 'https://www.ycombinator.com/library' },
  { title: 'Google for Startups', type: 'Product and growth', description: 'Programs, training, and resources for founders building technology products.', url: 'https://startup.google.com/' },
  { title: 'GitHub Student Developer Pack', type: 'Developer tools', description: 'Access tools and learning resources available to verified students.', url: 'https://education.github.com/pack' },
  { title: 'AWS Activate', type: 'Cloud credits', description: 'Discover startup support, cloud training, and infrastructure resources.', url: 'https://aws.amazon.com/startups/credits' },
];

export const teamRoles = [
  { role: 'Strategy and operations', description: 'Shapes the yearly roadmap, partner relationships, and the systems behind every E-Cell initiative.' },
  { role: 'Events and community', description: 'Designs welcoming, useful experiences that bring student builders, mentors, and founders together.' },
  { role: 'Startup support', description: 'Helps early teams turn a rough idea into customer conversations, prototypes, and pitch-ready ventures.' },
  { role: 'Content and design', description: 'Documents learning, shares founder stories, and keeps the E-Cell experience clear and consistent.' },
  { role: 'Technology', description: 'Builds the digital tools and workflows that make programs and opportunities easier to access.' },
  { role: 'Faculty and mentors', description: 'Offers context, connections, and grounded guidance while students lead the work.' },
];

export const galleryItems = [
  { image: eventHackathonImg, title: 'E-Summit build floor' },
  { image: eventMasterclassImg, title: 'Founder-led learning session' },
  { image: eventPitchArenaImg, title: 'Student pitch arena' },
  { image: eventInvestorMixerImg, title: 'Community and investor mixer' },
  { image: eventBootcampImg, title: 'Venture-building bootcamp' },
  { image: communityImg, title: 'The student builder community' },
];
