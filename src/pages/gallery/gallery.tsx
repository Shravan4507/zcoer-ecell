import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { galleryItems } from '../../data/siteContent';
import './gallery.css';

export function GalleryPage() {
  return (
    <ContentLayout eyebrow="Moments in motion" title="The E-Cell in action" description="A glimpse of the conversations, build sessions, and shared momentum that bring our community together throughout the year.">
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <figure key={item.title} className="gallery-card">
            <img src={item.image} alt={item.title} loading="lazy" width="640" height="480" />
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>
    </ContentLayout>
  );
}

export default GalleryPage;
