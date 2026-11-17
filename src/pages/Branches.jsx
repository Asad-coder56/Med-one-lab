import { useEffect, useState } from 'react';
import { api } from '../api.js';
import BranchCard from '../components/BranchCard.jsx';
import { LAB } from '../config.js';

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/branches')
      .then(setBranches)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const cities = [...new Set(branches.map((b) => b.city))];
  const shown = city ? branches.filter((b) => b.city === city) : branches;
  const chip = (a) => `rounded-full border px-4 py-1.5 text-sm ${a ? 'border-brand bg-brand text-white' : 'border-line bg-white hover:border-brand'}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Branches</h1>
      <p className="mt-1 text-ink/70">Visit the collection center closest to you.</p>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-4 text-red-800">Branch list unavailable: {error}. Showing our main centre below.</p>}
      <div className="mt-5 flex flex-wrap gap-2">
        <button onClick={() => setCity('')} className={chip(!city)}>All cities</button>
        {cities.map((c) => <button key={c} onClick={() => setCity(c)} className={chip(city === c)}>{c}</button>)}
      </div>
      {loading && <p className="mt-6 text-ink/60">Loading branches...</p>}
      {!loading && branches.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((b) => <BranchCard key={b.id} b={b} />)}
        </div>
      )}
      {!loading && branches.length === 0 && (
        <article className="mt-6 rounded-3xl bg-brand p-6 text-white shadow-lg shadow-brand/10 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">Main healthcare centre</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">Med One Lab</h2>
          <address className="mt-3 max-w-xl not-italic leading-relaxed text-white/80">{LAB.address}</address>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LAB.address)}`} target="_blank" rel="noreferrer" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-brand-dark hover:bg-mist">Get directions</a>
            <a href={`tel:+${LAB.whatsapp}`} className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">Call {LAB.phone}</a>
          </div>
        </article>
      )}
    </div>
  );
}
