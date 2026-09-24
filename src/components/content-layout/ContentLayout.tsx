import type { PropsWithChildren, ReactNode } from 'react';
import './ContentLayout.css';

interface ContentLayoutProps extends PropsWithChildren {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function ContentLayout({ eyebrow, title, description, action, children }: ContentLayoutProps) {
  return (
    <section className="content-page">
      <div className="content-page__intro">
        <p className="content-page__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="content-page__description">{description}</p>
        {action && <div className="content-page__action">{action}</div>}
      </div>
      {children}
    </section>
  );
}
