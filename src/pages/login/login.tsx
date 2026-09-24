import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '@google/model-viewer';
import eCell3DModel from '../../assets/e-cell.glb?url';
import { type MemberProfile, useAuth } from '../../context/auth';
import { notify } from '../../lib/notify';
import './login.css';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const emptyProfile: MemberProfile = {
  fullName: '', username: '', dateOfBirth: '', phone: '', gender: '', isStudent: true, collegeName: 'Zeal College of Engineering and Research', major: '', currentYear: '', graduationYear: '',
};

export function LoginPage() {
  const modelViewerRef = useRef<any>(null);
  const { user, profile, loading, configured, signInWithGoogle, signOut, saveProfile } = useAuth();
  const [form, setForm] = useState<MemberProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isEditingProfile = Boolean(user && (!profile || new URLSearchParams(location.search).get('edit') === 'profile'));
  const profileForm = form ?? profile ?? { ...emptyProfile, fullName: user?.displayName || '' };

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const animateOrbit = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      // Continuous gentle 3D sway loop
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

  const updateField = <Key extends keyof MemberProfile>(field: Key, value: MemberProfile[Key]) => {
    setForm((current) => ({ ...(current ?? profileForm), [field]: value }));
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      notify('Google sign-in completed.', 'success');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Google sign-in could not be completed.', 'error');
    }
  };

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      await saveProfile(profileForm);
      notify('Your profile is ready.', 'success');
      navigate(new URLSearchParams(location.search).get('next') || '/dashboard');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'We could not save your profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="login-page"><p className="login-status">Checking your account.</p></div>;
  }

  return (
    <div className="login-page">
      <div className={`login-card${isEditingProfile ? ' login-card--profile' : ''}`}>
        <div className="login-header">
          <div className="login-3d-logo-container">
            <model-viewer
              ref={modelViewerRef}
              src={eCell3DModel}
              alt="E-Cell ZCOER 3D Logo"
              tone-mapping="aces"
              shadow-intensity="0.8"
              shadow-softness="0.6"
              exposure="2.2"
              environment-image="neutral"
              interaction-prompt="none"
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent', pointerEvents: 'none' }}
            />
          </div>
          <h1 className="login-title">{isEditingProfile ? 'Complete your profile' : 'Sign in to E-Cell ZCOER'}</h1>
          <p className="login-subtitle">
            {isEditingProfile ? 'A few details help us make opportunities and event updates relevant to you.' : 'Access your startup portal, event registrations, and entrepreneur community.'}
          </p>
        </div>

        {!user && <div className="login-action-area">
          <button
            type="button"
            className="btn-google-login"
            onClick={handleGoogleLogin}
            aria-label="Continue with Google"
            disabled={!configured}
          >
            <svg className="google-svg-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
          {!configured && <p className="login-setup-note">Firebase settings are required before sign-in is available.</p>}
        </div>}

        {user && isEditingProfile && <form className="profile-form" onSubmit={handleProfileSubmit}>
          <div className="profile-form__grid">
            <label><span>Full name</span><input required autoComplete="name" value={profileForm.fullName} onChange={(event) => updateField('fullName', event.target.value)} /></label>
            <label><span>Username</span><input required minLength={3} autoComplete="username" value={profileForm.username} onChange={(event) => updateField('username', event.target.value)} /></label>
            <label><span>Email</span><input readOnly value={user.email ?? ''} /></label>
            <label><span>Date of birth</span><input required type="date" value={profileForm.dateOfBirth} onChange={(event) => updateField('dateOfBirth', event.target.value)} /></label>
            <label><span>WhatsApp number</span><input required type="tel" autoComplete="tel" value={profileForm.phone} onChange={(event) => updateField('phone', event.target.value)} /></label>
            <label><span>Gender</span><select required value={profileForm.gender} onChange={(event) => updateField('gender', event.target.value)}><option value="">Select</option><option>Woman</option><option>Man</option><option>Non-binary</option><option>Prefer not to say</option></select></label>
          </div>
          <label className="profile-form__checkbox"><input type="checkbox" checked={profileForm.isStudent} onChange={(event) => updateField('isStudent', event.target.checked)} /><span>I am currently a student.</span></label>
          {profileForm.isStudent && <div className="profile-form__grid">
            <label><span>College name</span><input required value={profileForm.collegeName} onChange={(event) => updateField('collegeName', event.target.value)} /></label>
            <label><span>Major</span><input required value={profileForm.major} onChange={(event) => updateField('major', event.target.value)} /></label>
            <label><span>Current year</span><select required value={profileForm.currentYear} onChange={(event) => updateField('currentYear', event.target.value)}><option value="">Select</option><option>First year</option><option>Second year</option><option>Third year</option><option>Final year</option></select></label>
            <label><span>Year of passing</span><input required type="number" min="2026" max="2040" value={profileForm.graduationYear} onChange={(event) => updateField('graduationYear', event.target.value)} /></label>
          </div>}
          <button type="submit" className="content-button" disabled={isSaving}>{isSaving ? 'Saving' : 'Save profile'}</button>
        </form>}

        {user && profile && !isEditingProfile && <div className="login-action-area">
          <button type="button" className="content-button" onClick={() => navigate('/dashboard')}>Open dashboard</button>
          <button type="button" className="content-button--ghost" onClick={() => void signOut()}>Sign out</button>
        </div>}

        <p className="login-disclaimer">
          By continuing, you agree to E-Cell ZCOER&apos;s{' '}
          <Link to="/terms" className="login-legal-link">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="login-legal-link">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
