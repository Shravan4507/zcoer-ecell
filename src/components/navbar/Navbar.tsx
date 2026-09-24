import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '@google/model-viewer';
import e3DModel from '../../assets/E.glb?url';
import logoWithoutE from '../../assets/e-cell_zcoer_withoutE.png';
import StaggeredMenu from '../staggeredmenu/StaggeredMenu';
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from '../staggeredmenu/StaggeredMenu';
import { useAuth } from '../../context/auth';
import './Navbar.css';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Startups', href: '/startups' },
  { label: 'Events', href: '/events' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

const baseMobileMenuItems: StaggeredMenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about E-Cell', link: '/about' },
  { label: 'Team', ariaLabel: 'Meet the team', link: '/team' },
  { label: 'Startups', ariaLabel: 'Explore student startups', link: '/startups' },
  { label: 'Events', ariaLabel: 'Discover upcoming events', link: '/events' },
  { label: 'Blogs', ariaLabel: 'Read stories and insights', link: '/blogs' },
  { label: 'Gallery', ariaLabel: 'View campus gallery', link: '/gallery' },
  { label: 'Resources', ariaLabel: 'Access resources', link: '/resources' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const mobileSocialItems: StaggeredMenuSocialItem[] = [
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'Twitter / X', link: 'https://x.com' },
  { label: 'GitHub', link: 'https://github.com' },
];

export const Navbar: React.FC = () => {
  const eModelRef = useRef<any>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const animateOrbit = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      // Continuous gentle 3D swaying for the 'E' model in navbar
      const angle = Math.sin((elapsed * Math.PI * 2) / 5) * 22;
      const elevation = 80 + Math.sin((elapsed * Math.PI * 2) / 7) * 4;

      if (eModelRef.current) {
        eModelRef.current.cameraOrbit = `${angle}deg ${elevation}deg 100%`;
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
    <>
      <svg style={{ display: 'none', position: 'absolute', width: 0, height: 0 }}>
        <filter id="glass-displacement" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.04"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="1.5" result="blurred" />
        </filter>
      </svg>

      <nav className="navbar">
        <Link to="/" className="navbar-logo" aria-label="E-Cell ZCOER Home">
          <div className="navbar-logo-composite">
            <div className="navbar-3d-e-container">
              <model-viewer
                ref={eModelRef}
                src={e3DModel}
                alt="E-Cell 3D E Model"
                tone-mapping="aces"
                exposure="2.2"
                shadow-intensity="0.8"
                shadow-softness="0.5"
                environment-image="neutral"
                interaction-prompt="none"
                style={{ width: '100%', height: '100%', backgroundColor: 'transparent', pointerEvents: 'none' }}
              />
            </div>
            <img src={logoWithoutE} alt="Cell ZCOER Logo" className="navbar-logo-img-without-e" />
          </div>
        </Link>

        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                end={item.href === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* Dynamic Login / Profile Avatar Switch */}
          {user ? (
            <li>
              <NavLink
                to="/dashboard"
                className="navbar-avatar-btn"
                title={profile?.fullName ? `${profile.fullName}'s dashboard` : 'Dashboard'}
                aria-label="Open your dashboard"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={profile?.fullName || user.displayName || 'User profile'} className="navbar-avatar-img" />
                ) : (
                  <div className="navbar-avatar-fallback">
                    {(profile?.fullName || user.displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile Staggered Menu */}
        <div className="navbar-mobile-staggered-wrapper">
          <StaggeredMenu
            isFixed={true}
            position="right"
            items={[...baseMobileMenuItems, user ? { label: 'Dashboard', ariaLabel: 'Open your dashboard', link: '/dashboard' } : { label: 'Login', ariaLabel: 'User Login Portal', link: '/login' }]}
            socialItems={mobileSocialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#cba358"
            changeMenuColorOnOpen={true}
            colors={['#16161b', '#262013', '#cba358']}
            logoUrl={logoWithoutE}
            accentColor="#cba358"
            hideLogoWhenClosed={true}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
