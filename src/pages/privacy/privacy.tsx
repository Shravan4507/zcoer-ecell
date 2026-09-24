import { ContentLayout } from '../../components/content-layout/ContentLayout';
import './privacy.css';

export function PrivacyPage() {
  return (
    <ContentLayout eyebrow="Last updated September 2026" title="Privacy policy" description="This policy explains the information the E-Cell website collects, why it is used, and the choices available to you.">
      <div className="legal-stack">
        <section className="legal-section"><h2>Information we collect</h2><p>We collect the account and profile information you choose to provide, including contact details, student details, and event registrations. We also receive basic account information from Google when you choose to sign in with Google.</p></section>
        <section className="legal-section"><h2>How we use information</h2><p>We use this information to operate the E-Cell platform, manage event RSVPs, respond to inquiries, and share relevant program updates. We do not sell personal information.</p></section>
        <section className="legal-section"><h2>How information is stored</h2><p>Account, profile, registration, and contact information is stored in Firebase services configured for ZCOER E-Cell. Access is restricted through authentication and Firebase security rules.</p></section>
        <section className="legal-section"><h2>Your choices</h2><p>You can update your profile from your dashboard or ask the E-Cell team to correct or remove personal information that is no longer required for an active program or registration.</p></section>
        <section className="legal-section"><h2>Contact</h2><p>For privacy questions, use the contact form and select General inquiry. We will route your request to the appropriate E-Cell team member.</p></section>
      </div>
    </ContentLayout>
  );
}

export default PrivacyPage;
