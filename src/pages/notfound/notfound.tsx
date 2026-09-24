import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="notfound-page-container">
      <div className="notfound-glass-card">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', margin: 0 }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="content-button">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
