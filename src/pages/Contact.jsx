import { useState } from 'react';
import { api } from '../api.js';
import { LAB } from '../config.js';

const field = 'mt-1 w-full rounded-lg border border-line bg-white px-4 py-3';
const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(LAB.address)}&output=embed`;
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LAB.address)}`;

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending'); setError('');
    try {
      await api('/contact', { method: 'POST', body: JSON.stringify(form) });
      setStatus('sent');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setError(err.message); setStatus('error');
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold">Contact us</h1>
        <p className="mt-2 text-ink/70">Ask about a test, a price or a report. We reply during working hours.</p>
        <dl className="mt-6 space-y-3">
          <div><dt className="text-sm text-ink/60">Address</dt><dd className="font-semibold">{LAB.address}</dd></div>
          <div><dt className="text-sm text-ink/60">Phone</dt><dd className="font-semibold"><a href={`tel:+${LAB.whatsapp}`} className="hover:text-brand">{LAB.phone}</a></dd></div>
          <div><dt className="text-sm text-ink/60">Email</dt><dd className="font-semibold">{LAB.email}</dd></div>
          <div><dt className="text-sm text-ink/60">Hours</dt><dd className="font-semibold">{LAB.hours}</dd></div>
        </dl>
        <div className="mt-6 overflow-hidden rounded-xl border border-line bg-white shadow-sm">
          <iframe
            title="Map to Med One Lab, Awan Town, Lahore"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-64 w-full sm:h-72"
          />
        </div>
        <a href={directionsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:underline">
          Get directions
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <form onSubmit={submit} className="flex flex-col rounded-lg border border-line bg-white p-6">
        {status === 'sent' && <p role="status" className="mb-4 rounded-lg bg-mist p-4">Message sent. We will contact you soon.</p>}
        {status === 'error' && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
        <div className="mt-4 flex flex-1 flex-col justify-between gap-4">
          <label className="block">Name<input required value={form.name} onChange={set('name')} className={field} /></label>
          <label className="block">Phone<input required value={form.phone} onChange={set('phone')} inputMode="tel" className={field} /></label>
          <label className="block">Email (optional)<input type="email" value={form.email} onChange={set('email')} className={field} /></label>
          <label className="block">Message<textarea required rows="4" value={form.message} onChange={set('message')} className={field} /></label>
        </div>
        <button disabled={status === 'sending'} className="mt-5 w-fit rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
      </form>
    </div>
  );
}
