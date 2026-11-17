import { Link } from 'react-router-dom';
import { rs } from '../api.js';

export default function TestRow({ t }) {
  return (
    <Link
      to={`/tests/${t.id}`}
      className="group flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md sm:p-5"
    >
      <div className="min-w-0">
        <span className="inline-flex rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">
          {t.category || 'Lab test'}
        </span>
        <p className="mt-2 truncate font-display text-lg font-bold text-brand-dark sm:text-xl">{t.name}</p>
        <p className="mt-1.5 text-sm leading-5 text-ink/60">
          Sample: {t.sample_type || 'Ask the lab'}
          <span className="mx-1.5 text-ink/30">·</span>
          Report: {t.turnaround || 'Ask the lab'}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <p className="text-right">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink/50">Price</span>
          <span className="mt-0.5 block whitespace-nowrap font-display text-lg font-bold text-brand-dark">{rs(t.price)}</span>
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
