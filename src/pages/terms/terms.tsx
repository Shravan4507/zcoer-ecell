import { ContentLayout } from '../../components/content-layout/ContentLayout';
import './terms.css';

export function TermsPage() {
  return (
    <ContentLayout eyebrow="Last updated September 2026" title="Terms of service" description="These terms set out the basic expectations for using the ZCOER E-Cell website and participating in its programs.">
      <div className="legal-stack">
        <section className="legal-section"><h2>Using the platform</h2><p>Use the platform lawfully, provide accurate account information, and keep access to your account private. You are responsible for activity completed through your account.</p></section>
        <section className="legal-section"><h2>Programs and registrations</h2><p>An RSVP records your interest in an event and may be subject to capacity, eligibility, or event-specific requirements. The E-Cell team may update event details when necessary.</p></section>
        <section className="legal-section"><h2>Community standards</h2><p>We expect respectful, professional conduct in digital and in-person E-Cell spaces. Harassment, misuse of another person’s information, and disruption of events are not permitted.</p></section>
        <section className="legal-section"><h2>Content and links</h2><p>Website content is provided for educational and community purposes. External resources are owned by their respective providers, and their terms apply when you leave this website.</p></section>
        <section className="legal-section"><h2>Questions</h2><p>If you have a question about these terms or an E-Cell program, contact the team before registering or participating.</p></section>
      </div>
    </ContentLayout>
  );
}

export default TermsPage;
