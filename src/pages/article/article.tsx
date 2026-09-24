import { Link, Navigate, useParams } from 'react-router-dom';
import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { articles } from '../../data/siteContent';
import './article.css';

export function ArticlePage() {
  const { articleId } = useParams();
  const article = articles.find((item) => item.id === articleId);
  if (!article) return <Navigate to="/blogs" replace />;

  return (
    <ContentLayout eyebrow={`${article.category} | ${article.readTime}`} title={article.title} description={article.description} action={<Link to="/blogs" className="content-button--ghost">All articles</Link>}>
      <article className="article-detail content-panel">
        <img src={article.image} alt="" width="960" height="600" />
        <div className="article-detail__body">{article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </article>
    </ContentLayout>
  );
}

export default ArticlePage;
