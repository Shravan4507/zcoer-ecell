import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { useAuth } from '../../context/auth';
import { events } from '../../data/siteContent';
import { firestore } from '../../lib/firebase';
import './dashboard.css';

export function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);

  useEffect(() => {
    const activeFirestore = firestore;
    if (!user || !activeFirestore) return;
    let active = true;
    Promise.all(events.map(async (event) => ({ id: event.id, snapshot: await getDoc(doc(activeFirestore, 'events', event.id, 'registrations', user.uid)) })))
      .then((results) => {
        if (active) setRegisteredEventIds(results.filter((result) => result.snapshot.exists()).map((result) => result.id));
      })
      .catch(() => {
        if (active) setRegisteredEventIds([]);
      });
    return () => { active = false; };
  }, [user]);

  if (!loading && !user) return <Navigate to="/login?next=/dashboard" replace />;
  if (loading || !user) return <div className="dashboard-loading">Loading your workspace.</div>;

  return (
    <ContentLayout eyebrow="Your E-Cell workspace" title={`Welcome, ${(profile?.fullName || user.displayName || 'builder').split(' ')[0]}`} description="Keep your profile ready, see your event RSVPs, and find the next opportunity to learn, connect, or build.">
      <div className="dashboard-grid">
        <section className="dashboard-panel dashboard-profile-panel">
          <p className="content-page__meta">Profile</p>
          <h2>{profile?.fullName || user.displayName}</h2>
          <p>{user.email}</p>
          <dl>
            <div><dt>Username</dt><dd>{profile?.username || 'Complete your profile'}</dd></div>
            <div><dt>Focus</dt><dd>{profile?.major || 'Add your field of study'}</dd></div>
          </dl>
          <Link to="/login?edit=profile" className="content-button--ghost">Update profile</Link>
        </section>
        <section className="dashboard-panel">
          <p className="content-page__meta">Event RSVPs</p>
          <h2>What you are joining</h2>
          <div className="dashboard-event-list">
            {registeredEventIds.length ? events.filter((event) => registeredEventIds.includes(event.id)).map((event) => <div key={event.id}><span>{event.date}</span><strong>{event.title}</strong></div>) : <p>You have not registered for an event yet.</p>}
          </div>
          <Link to="/events" className="content-button">Browse events</Link>
        </section>
      </div>
      <section className="dashboard-panel dashboard-next-step">
        <p className="content-page__meta">Keep moving</p>
        <h2>Turn the next conversation into progress.</h2>
        <p>Explore founder resources, meet a team that is building, or bring an early idea to an E-Cell event.</p>
        <div className="dashboard-actions"><Link to="/resources" className="content-button--ghost">Explore resources</Link><Link to="/startups" className="content-button--ghost">Meet ventures</Link><button type="button" className="content-button--ghost" onClick={() => void signOut()}>Sign out</button></div>
      </section>
    </ContentLayout>
  );
}

export default DashboardPage;
