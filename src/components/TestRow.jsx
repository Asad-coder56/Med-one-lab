import { Link } from 'react-router-dom';
import { rs } from '../api.js';

export default function TestRow({ t }) {
  return (
    <Link to={`/tests/${t.id}`} className="flex items-center justify-between gap-4 rounded-lg border border-line bg-white p-4 hover:border-brand">
      <div className="min-w-0">
        <p className="font-semibold">{t.name}</p>
        <p className="mt-0.5 text-sm text-ink/60">
          {t.category} · {t.sample_type} · Report: {t.turnaround}
        </p>
      </div>
      <p className="shrink-0 font-display text-lg font-bold text-brand-dark">{rs(t.price)}</p>
    </Link>
  );
}
