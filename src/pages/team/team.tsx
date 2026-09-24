import { Link } from 'react-router-dom';
import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { teamRoles } from '../../data/siteContent';
import './team.css';

export function TeamPage() {
  return (
    <ContentLayout eyebrow="Student led, mentor supported" title="The people behind the work" description="E-Cell is a team sport. Students lead programs and build the culture, with faculty, founders, and alumni contributing experience at the moments it matters most." action={<Link to="/contact" className="content-button">Collaborate with us</Link>}>
      <div className="team-grid">
        {teamRoles.map((teamRole, index) => (
          <article key={teamRole.role} className="team-card">
            <span className="team-card__index">{String(index + 1).padStart(2, '0')}</span>
            <h2>{teamRole.role}</h2>
            <p>{teamRole.description}</p>
          </article>
        ))}
      </div>
    </ContentLayout>
  );
}

export default TeamPage;
