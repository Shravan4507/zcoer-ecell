import { Link, Navigate, useParams } from 'react-router-dom';
import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { startups } from '../../data/siteContent';
import './venture.css';

export function VenturePage() {
  const { startupId } = useParams();
  const startup = startups.find((item) => item.id === startupId);
  if (!startup) return <Navigate to="/startups" replace />;

  return (
    <ContentLayout eyebrow={startup.category} title={startup.name} description={startup.description} action={<Link to="/startups" className="content-button--ghost">All ventures</Link>}>
      <article className="content-panel venture-detail">
        <img src={startup.logo} alt={`${startup.name} logo`} width="128" height="128" />
        <div><p className="content-page__meta">Current stage: {startup.stage}</p><h2>What they are working on</h2><p>{startup.story}</p></div>
      </article>
    </ContentLayout>
  );
}

export default VenturePage;
