import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { useAuth } from '../../context/auth';
import { events } from '../../data/siteContent';
import { firestore } from '../../lib/firebase';
import { notify } from '../../lib/notify';
import './events.css';

const filters = ['All', ...new Set(events.map((event) => event.format))];

export function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const visibleEvents = activeFilter === 'All' ? events : events.filter((event) => event.format === activeFilter);

  const registerForEvent = async (eventId: string) => {
    if (!user) {
      navigate('/login?next=/events');
      return;
    }
    if (!firestore) {
      notify('Add Firebase configuration to enable event registration.', 'warning');
      return;
    }

    setRegisteringId(eventId);
    try {
      await setDoc(doc(firestore, 'events', eventId, 'registrations', user.uid), {
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        status: 'registered',
        createdAt: serverTimestamp(),
      }, { merge: true });
      notify('Your RSVP is confirmed. Watch your inbox for event updates.', 'success');
    } catch {
      notify('We could not save your RSVP. Please try again.', 'error');
    } finally {
      setRegisteringId(null);
    }
  };

  return (
    <ContentLayout
      eyebrow="Learn by building"
      title="Events and workshops"
      description="Practical rooms for curious students: founder conversations, pitch practice, intense build sessions, and the people who make the next step possible."
    >
      <div className="filter-row" aria-label="Filter events">
        {filters.map((filter) => (
          <button key={filter} type="button" className="filter-button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
            {filter}
          </button>
        ))}
      </div>
      <div className="catalog-grid">
        {visibleEvents.map((event) => (
          <article key={event.id} className="catalog-card event-card">
            <div className="catalog-card__media">
              <img src={event.image} alt="" loading="lazy" width="640" height="400" />
            </div>
            <div className="catalog-card__body">
              <div className="event-card__heading-row">
                <p className="catalog-card__meta">{event.format}</p>
                <time className="event-card__date" dateTime={`2026-${event.month === 'MAR' ? '03' : event.month === 'APR' ? '04' : '05'}-${event.day}`}>{event.month} {event.day}</time>
              </div>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <div className="catalog-card__footer">
                <span className="event-card__location">{event.location}</span>
                <button type="button" className="content-button" disabled={registeringId === event.id} onClick={() => registerForEvent(event.id)}>
                  {registeringId === event.id ? 'Saving' : 'RSVP'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ContentLayout>
  );
}

export default EventsPage;
