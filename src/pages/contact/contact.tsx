import { useState, type FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ContentLayout } from '../../components/content-layout/ContentLayout';
import { useAuth } from '../../context/auth';
import { firestore } from '../../lib/firebase';
import { notify } from '../../lib/notify';
import './contact.css';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = { name: '', email: '', subject: '', message: '' };

export function ContactPage() {
  const { user, profile } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const message = {
      ...form,
      name: form.name || profile?.fullName || user?.displayName || '',
      email: form.email || user?.email || '',
    };
    try {
      if (!firestore) {
        const pendingMessages = JSON.parse(localStorage.getItem('zcoer-contact-messages') ?? '[]') as ContactForm[];
        localStorage.setItem('zcoer-contact-messages', JSON.stringify([...pendingMessages, message]));
        notify('Your message is saved locally. Add Firebase settings to deliver it to the team.', 'warning');
      } else {
        await addDoc(collection(firestore, 'contactMessages'), { ...message, createdAt: serverTimestamp() });
        notify('Thanks. The E-Cell team will get back to you soon.', 'success');
      }
      setForm((current) => ({ ...initialForm, name: current.name, email: current.email }));
    } catch {
      notify('We could not send your message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContentLayout eyebrow="Start a conversation" title="Build with us" description="Reach out for partnerships, speaker opportunities, sponsorship, student initiatives, or a question about the E-Cell community.">
      <div className="contact-layout">
        <div className="content-panel contact-details">
          <p className="content-page__meta">ZCOER E-Cell</p>
          <h2>Bring the right people into the room.</h2>
          <p>We are building a more connected startup ecosystem at Zeal College of Engineering and Research, Narhe, Pune.</p>
          <dl>
            <div><dt>For</dt><dd>Partnerships, speakers, student ventures, and campus programs</dd></div>
            <div><dt>Response</dt><dd>We aim to respond within two working days.</dd></div>
          </dl>
        </div>
        <form className="content-panel contact-form" onSubmit={submit}>
          <div className="contact-form__grid">
            <label><span>Name</span><input required autoComplete="name" value={form.name || profile?.fullName || user?.displayName || ''} onChange={(event) => updateField('name', event.target.value)} /></label>
            <label><span>Email</span><input required type="email" autoComplete="email" value={form.email || user?.email || ''} onChange={(event) => updateField('email', event.target.value)} /></label>
          </div>
          <label><span>What can we help with?</span><select required value={form.subject} onChange={(event) => updateField('subject', event.target.value)}><option value="">Choose a topic</option><option>Partnership or sponsorship</option><option>Speaker or mentor opportunity</option><option>Startup support</option><option>Student community</option><option>General inquiry</option></select></label>
          <label><span>Message</span><textarea required minLength={20} rows={6} value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Tell us a little about what you have in mind." /></label>
          <button type="submit" className="content-button" disabled={isSubmitting}>{isSubmitting ? 'Sending' : 'Send message'}</button>
        </form>
      </div>
    </ContentLayout>
  );
}

export default ContactPage;
