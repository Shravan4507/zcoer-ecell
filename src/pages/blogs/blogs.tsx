import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { articles } from '../../data/siteContent';
import './blogs.css';

const filters = ['All', ...new Set(articles.map((article) => article.category))];

export function BlogsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const visibleArticles = activeFilter === 'All' ? articles : articles.filter((article) => article.category === activeFilter);

  return (
    <ContentLayout eyebrow="Ideas worth sharing" title="Stories from the ecosystem" description="Field notes, founder lessons, and practical perspectives for students who want to understand how ideas become durable ventures.">
      <div className="filter-row" aria-label="Filter articles">
        {filters.map((filter) => (
          <button key={filter} type="button" className="filter-button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>
        ))}
      </div>
      <div className="catalog-grid">
        {visibleArticles.map((article) => (
          <article key={article.id} className="catalog-card">
            <div className="catalog-card__media"><img src={article.image} alt="" loading="lazy" width="640" height="400" /></div>
            <div className="catalog-card__body">
              <p className="catalog-card__meta">{article.category}</p>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <div className="catalog-card__footer">
                <span className="article-read-time">{article.readTime}</span>
                <Link to={`/blogs/${article.id}`} className="content-button--ghost">Read article</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ContentLayout>
  );
}

export default BlogsPage;
