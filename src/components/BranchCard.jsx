export default function BranchCard({ b }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <p className="text-sm font-medium text-brand">{b.city}</p>
      <h3 className="mt-1 text-lg font-bold">{b.name}</h3>
      <p className="mt-2 text-sm text-ink/70">{b.address}</p>
      <p className="mt-1 text-sm text-ink/70">{b.timings}</p>
      {b.phone && <a href={`tel:${b.phone}`} className="mt-3 inline-block text-sm font-semibold text-brand-dark hover:underline">{b.phone}</a>}
    </div>
  );
}
