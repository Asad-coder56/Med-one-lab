import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, rs } from '../api.js';
import { LAB, waLink } from '../config.js';

export default function TestDetail() {
  const { id } = useParams();
  const [t, setT] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setT(null); setError('');
    api(`/tests/${id}`).then(setT).catch((e) => setError(e.message));
  }, [id]);

  if (error) return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p role="alert">{error}</p>
      <Link to="/tests" className="mt-4 inline-block font-semibold text-brand-dark">Back to test list</Link>
    </div>
  );
  if (!t) return <p className="mx-auto max-w-3xl px-4 py-16 text-ink/60">Loading...</p>;

  const facts = [
    ['Sample', t.sample_type],
    ['Report time', t.turnaround],
    ['Preparation', t.preparation],
    ['Category', t.category],
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/tests" className="text-sm font-semibold text-brand-dark hover:underline">Back to test list</Link>
      <h1 className="mt-3 text-3xl font-bold">{t.name}</h1>
      <p className="mt-2 font-display text-3xl font-bold text-brand-dark">{rs(t.price)}</p>

      <p className="mt-6 text-lg leading-relaxed text-ink/80">{t.description}</p>

      <dl className="mt-8 divide-y divide-line rounded-lg border border-line bg-white">
        {facts.map(([k, v]) => v && (
          <div key={k} className="flex justify-between gap-4 px-5 py-3">
            <dt className="text-ink/60">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={waLink(`Hi ${LAB.name}, I want to book: ${t.name} (${rs(t.price)}).`)} target="_blank" rel="noreferrer"
          className="rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark">Book on WhatsApp</a>
        <a href={`tel:+${LAB.whatsapp}`} className="rounded-lg border border-brand px-6 py-3 font-semibold text-brand-dark hover:bg-mist">Call {LAB.phone}</a>
      </div>
    </div>
  );
}
