import { LAB, waLink } from '../config.js';

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LAB.address)}`;
const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(LAB.address)}&output=embed`;

export default function Branches() {
  return (
    <div className="bg-paper">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-[#0f5fb8] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-mint/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/90">
            <span className="size-2 rounded-full bg-mint" aria-hidden="true" />
            Our location · Awan Town, Lahore
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Visit Med One Lab.
                <span className="block text-white/75">We’re here to help.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Find our healthcare centre in Awan Town, Lahore. Get directions, call ahead, or send a WhatsApp booking request.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-mist"
              >
                Get directions
              </a>
              <a
                href={waLink('Hello Med One Lab, I would like to book a visit at your Awan Town centre. Please share available times.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-mint px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-brand-dark"
              >
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <section aria-labelledby="centre-heading" className="flex flex-col rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Our healthcare centre</p>
            <h2 id="centre-heading" className="mt-2 font-display text-3xl font-bold text-brand-dark">Med One Lab</h2>
            <p className="mt-3 leading-relaxed text-ink/65">
              Visit us for lab tests, specialist consultations and healthcare services.
            </p>

            <div className="mt-6 space-y-5 border-t border-line pt-5">
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mist text-brand" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Address</p>
                  <address className="mt-1 not-italic font-semibold leading-relaxed text-ink">{LAB.address}</address>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mist text-brand" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.75A2.75 2.75 0 0 1 5.75 3h1.6c.7 0 1.3.48 1.45 1.16l.65 2.94a1.5 1.5 0 0 1-.75 1.65l-1.1.63a14.1 14.1 0 0 0 5.02 5.02l.63-1.1a1.5 1.5 0 0 1 1.65-.75l2.94.65c.68.15 1.16.75 1.16 1.45v1.6A2.75 2.75 0 0 1 16.25 19H15C8.37 19 3 13.63 3 7V5.75Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Phone</p>
                  <a href={`tel:+${LAB.whatsapp}`} className="mt-1 inline-block font-semibold text-brand-dark hover:underline">{LAB.phone}</a>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mist text-brand" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Hours</p>
                  <p className="mt-1 font-semibold text-ink">{LAB.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-7">
              <a href={directionsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
                Open in Maps
              </a>
              <a href={`tel:+${LAB.whatsapp}`} className="inline-flex items-center justify-center rounded-full border border-line px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-mist">
                Call the lab
              </a>
            </div>
          </section>

          <section aria-label="Map to Med One Lab" className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Find us</p>
                <h2 className="mt-1 font-display text-lg font-bold text-brand-dark">Awan Town, Lahore</h2>
              </div>
              <a href={directionsUrl} target="_blank" rel="noreferrer" className="shrink-0 text-sm font-bold text-brand hover:underline">
                Directions <span aria-hidden="true">↗</span>
              </a>
            </div>
            <iframe
              title="Map to Med One Lab in Awan Town, Lahore"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-80 w-full sm:h-[430px]"
            />
          </section>
        </div>

        <section className="mt-6 flex flex-col gap-4 rounded-3xl bg-mist p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Plan your visit</p>
            <h2 className="mt-1 font-display text-xl font-bold text-brand-dark sm:text-2xl">Want to book before you come?</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink/65">Message us on WhatsApp and our team will confirm the available times.</p>
          </div>
          <a
            href={waLink('Hello Med One Lab, I would like to book a visit at your Awan Town centre. Please share available times.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Request a booking
          </a>
        </section>
      </div>
    </div>
  );
}
