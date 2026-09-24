import { useEffect } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import ToastContainer from './components/toast/Toast'
import Footer from './components/footer/Footer'
import MoltenMetal from './components/background/MoltenMetal'

// Pages
import HomePage from './pages/home/home'
import AboutPage from './pages/about/about'
import TeamPage from './pages/team/team'
import GalleryPage from './pages/gallery/gallery'
import ResourcesPage from './pages/resources/resources'
import StartupsPage from './pages/startups/startups'
import EventsPage from './pages/events/events'
import BlogsPage from './pages/blogs/blogs'
import ContactPage from './pages/contact/contact'
import LoginPage from './pages/login/login'
import PrivacyPage from './pages/privacy/privacy'
import TermsPage from './pages/terms/terms'
import NotFoundPage from './pages/notfound/notfound'
import DashboardPage from './pages/dashboard/dashboard'
import VenturePage from './pages/venture/venture'
import ArticlePage from './pages/article/article'

import './App.css'

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'ZCOER E-Cell | Where Ideas Turn Into Ventures', description: 'The Entrepreneurship Cell of Zeal College of Engineering and Research, Pune.' },
  '/about': { title: 'About | ZCOER E-Cell', description: 'Learn how ZCOER E-Cell helps students explore, build, and launch.' },
  '/team': { title: 'Team | ZCOER E-Cell', description: 'Meet the student-led E-Cell ecosystem at ZCOER.' },
  '/events': { title: 'Events | ZCOER E-Cell', description: 'Join founder conversations, workshops, and venture-building events.' },
  '/startups': { title: 'Student Ventures | ZCOER E-Cell', description: 'Explore student-led ventures supported by ZCOER E-Cell.' },
  '/blogs': { title: 'Stories | ZCOER E-Cell', description: 'Read practical founder and builder insights from the E-Cell ecosystem.' },
  '/gallery': { title: 'Gallery | ZCOER E-Cell', description: 'See ZCOER E-Cell events, workshops, and community moments.' },
  '/resources': { title: 'Resources | ZCOER E-Cell', description: 'Find useful learning, product, and startup resources.' },
  '/contact': { title: 'Contact | ZCOER E-Cell', description: 'Start a conversation with the ZCOER E-Cell team.' },
  '/login': { title: 'Sign In | ZCOER E-Cell', description: 'Sign in to the ZCOER E-Cell community.' },
  '/dashboard': { title: 'Dashboard | ZCOER E-Cell', description: 'Manage your ZCOER E-Cell profile and event RSVPs.' },
  '/privacy': { title: 'Privacy Policy | ZCOER E-Cell', description: 'Read the ZCOER E-Cell privacy policy.' },
  '/terms': { title: 'Terms of Service | ZCOER E-Cell', description: 'Read the ZCOER E-Cell terms of service.' },
};

function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? (pathname.startsWith('/startups/') ? { title: 'Venture | ZCOER E-Cell', description: 'A student venture from the ZCOER E-Cell ecosystem.' } : pathname.startsWith('/blogs/') ? { title: 'Article | ZCOER E-Cell', description: 'A practical insight from ZCOER E-Cell.' } : { title: 'Page Not Found | ZCOER E-Cell', description: 'The requested page could not be found.' });
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="app">
      <PageMetadata />
      <Navbar />
      <ToastContainer />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/startups" element={<StartupsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/startups/:startupId" element={<VenturePage />} />
          <Route path="/blogs/:articleId" element={<ArticlePage />} />
          <Route path="/programs" element={<Navigate to="/events" replace />} />
          <Route path="/join" element={<Navigate to="/login?mode=join" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <div className="background-wrapper">
        <MoltenMetal
          color1="#000000"
          color2="#ffffff"
          color3="#ffffff"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain
          grainIntensity={0.05}
          mouseInteraction={false}
          mouseStrength={0.3}
          opacity={1}
        />
      </div>
    </div>
  )
}

export default App
