import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api.js';
import TestRow from '../components/TestRow.jsx';

export default function Tests() {
  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const category = params.get('category') || '';
  const [input, setInput] = useState(search);
  const [cats, setCats] = useState([]);
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { api('/categories').then(setCats).catch(() => {}); }, []);

  // search box ko debounce karte hain taake har key par request na jaye
  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams(params);
      input ? next.set('search', input) : next.delete('search');
      setParams(next, { replace: true });
    }, 350);
    return () => clearTimeout(id);
  }, [input]);

  useEffect(() => { setPage(1); }, [search, category]);

  useEffect(() => {
    setLoading(true); setError('');
    const qs = new URLSearchParams({ search, page, limit: 12 });
    if (category) qs.set('category', category);
    api(`/tests?${qs}`)
      .then((d) => setData((prev) => (page > 1 ? { ...d, items: [...prev.items, ...d.items] } : d)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [search, category, page]);

  const setCategory = (id) => {
    const next = new URLSearchParams(params);
    id ? next.set('category', id) : next.delete('category');
    setParams(next, { replace: true });
  };

  const chip = (active) =>
    `rounded-full border px-4 py-1.5 text-sm ${active ? 'border-brand bg-brand text-white' : 'border-line bg-white hover:border-brand'}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Test list</h1>
      <p className="mt-1 text-ink/70">Search by test name and see the price, sample type and report time.</p>

      <label htmlFor="q" className="sr-only">Search tests</label>
      <input id="q" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search tests"
        className="mt-6 w-full rounded-lg border border-line bg-white px-4 py-3 sm:max-w-md" />

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setCategory('')} className={chip(!category)}>All</button>
        {cats.map((c) => (
          <button key={c.id} onClick={() => setCategory(String(c.id))} className={chip(category === String(c.id))}>{c.name}</button>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink/60">{data.total} tests found</p>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}

      <div className="mt-3 grid gap-3">
        {data.items.map((t) => <TestRow key={t.id} t={t} />)}
      </div>

      {!loading && !error && data.items.length === 0 && (
        <p className="mt-6 rounded-lg bg-mist p-6">No tests match your search. Try a shorter name, or call us and we will help you find it.</p>
      )}
      {loading && <p className="mt-6 text-ink/60">Loading tests...</p>}
      {!loading && page < data.pages && (
        <button onClick={() => setPage(page + 1)} className="mt-6 rounded-lg border border-brand px-6 py-3 font-semibold text-brand-dark hover:bg-mist">Show more tests</button>
      )}
    </div>
  );
}
