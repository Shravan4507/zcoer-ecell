import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { startups } from '../../data/siteContent';
import './startups.css';

const filters = ['All', ...new Set(startups.map((startup) => startup.category))];

export function StartupsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const visibleStartups = activeFilter === 'All' ? startups : startups.filter((startup) => startup.category === activeFilter);

  return (
    <ContentLayout eyebrow="Built on campus" title="Student ventures" description="Meet ventures shaped by ambitious students who are asking better questions, testing early, and building useful things with support from the E-Cell ecosystem.">
      <div className="filter-row" aria-label="Filter startups">
        {filters.map((filter) => (
          <button key={filter} type="button" className="filter-button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>
        ))}
      </div>
      <div className="catalog-grid">
        {visibleStartups.map((startup) => (
          <article key={startup.id} className="catalog-card startup-catalog-card">
            <div className="startup-catalog-card__identity">
              <img src={startup.logo} alt={`${startup.name} logo`} width="72" height="72" loading="lazy" />
              <div><p className="catalog-card__meta">{startup.category}</p><h2>{startup.name}</h2></div>
            </div>
            <div className="catalog-card__body">
              <p>{startup.description}</p>
              <div className="catalog-card__footer">
                <span className="startup-catalog-card__stage">{startup.stage}</span>
                <Link to={`/startups/${startup.id}`} className="content-button--ghost">View venture</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ContentLayout>
  );
}

export default StartupsPage;
