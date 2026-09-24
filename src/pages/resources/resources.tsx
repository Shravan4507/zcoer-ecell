import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { resources } from '../../data/siteContent';
import './resources.css';

export function ResourcesPage() {
  return (
    <ContentLayout eyebrow="Start with a useful next step" title="Founder resources" description="A curated starting point for research, product development, cloud tools, and the practical work of taking an idea seriously.">
      <div className="resource-grid">
        {resources.map((resource) => (
          <article key={resource.title} className="content-panel resource-card">
            <div>
              <div className="resource-card__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></svg></div>
              <p className="content-page__meta">{resource.type}</p>
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
            </div>
            <a href={resource.url} target="_blank" rel="noreferrer" className="content-button--ghost">Open resource</a>
          </article>
        ))}
      </div>
    </ContentLayout>
  );
}

export default ResourcesPage;
