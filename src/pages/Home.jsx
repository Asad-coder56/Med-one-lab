import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { LAB, waLink } from '../config.js';
import TestRow from '../components/TestRow.jsx';
import BranchCard from '../components/BranchCard.jsx';

const labServices = [
  ['Complete blood tests', 'Accurate, timely reports'],
  ['Ultrasound', 'With a specialist'],
  ['Operation facilities', 'Safe and well equipped'],
  ['Home sample collection', 'We come to you'],
  ['Home injection service', 'By trained staff'],
  ['Home delivery', 'Reports and medicines'],
];

const specialists = [
  ['Child Specialist', 'Dr. M. Usman Sharif, MBBS, FCPS (Pediatric Medicine)', '7 PM–9 PM, Monday to Saturday'],
  ['Medical Specialist', 'General and internal medicine consultation'],
  ['Liver and Stomach Specialist', 'Digestive and liver care'],
  ['Skin Specialist', 'Skin, hair and allergy consultation'],
];

const digitalServices = [
  ['Web development', 'Business and clinic websites, web apps in React and Node.js'],
  ['Facebook and Instagram ads', 'Reach people in your area and drive calls and WhatsApp messages'],
  ['Social media management', 'Posts, content and page setup'],
  ['SEO and Google Business profile', 'Be found when people search nearby'],
  ['Graphic design and branding', 'Logos, posts and banners'],
  ['IT support and solutions', 'Setup, fixes and advice'],
];

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LAB.address)}`;
const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(LAB.address)}&output=embed`;

export default function Home() {
  const [tests, setTests] = useState([]);
  const [testsLoading, setTestsLoading] = useState(true);
  const [testsError, setTestsError] = useState('');
  const [branches, setBranches] = useState([]);
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [branchesError, setBranchesError] = useState('');

  useEffect(() => {
    api('/tests?limit=6')
      .then((d) => setTests(d.items))
      .catch((error) => setTestsError(error.message))
      .finally(() => setTestsLoading(false));
    api('/branches')
      .then((d) => setBranches(d.slice(0, 3)))
      .catch((error) => setBranchesError(error.message))
      .finally(() => setBranchesLoading(false));
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const sections = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    document.documentElement.classList.add('has-scroll-reveal');
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('has-scroll-reveal');
    };
  }, []);

  return (
    <>
      <section data-reveal className="relative isolate overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-[#0f5fb8] text-white lg:flex lg:min-h-[calc(100svh_-_118px)] lg:items-stretch">
        <span className="pointer-events-none absolute -right-20 -top-28 size-96 rounded-full bg-mint/20 blur-3xl" aria-hidden="true" />
        <span className="pointer-events-none absolute -bottom-40 left-1/3 size-80 rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-8 sm:py-12 lg:min-h-[calc(100svh_-_118px)] lg:justify-between lg:px-10 lg:py-6">
          <div className="relative grid gap-8 lg:flex-1 lg:grid-cols-[1.3fr_.7fr] lg:items-center lg:gap-10">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/15">
                <span className="size-2 rounded-full bg-mint" aria-hidden="true" />
                Awan Town, Lahore
              </p>
              <h1 className="max-w-[14ch] text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:max-w-none xl:text-6xl">
                Healthcare and digital services, under one roof.
              </h1>
              <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-white/80 sm:text-lg">
                Med One Lab offers blood tests, specialist doctors and home sampling. Med One Digital builds websites and runs marketing for businesses.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#lab" className="inline-flex items-center justify-center rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-brand-dark hover:shadow-md">
                  Lab tests and doctors
                </a>
                <a href="#digital" className="inline-flex items-center justify-center rounded-full border-2 border-white/55 bg-transparent px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10">
                  Websites and marketing
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block" aria-hidden="true">
              <svg viewBox="0 0 340 300" className="block h-auto w-full">
                <rect x="8" y="8" width="324" height="284" rx="30" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
                <g transform="translate(105,155) rotate(28)">
                  <rect x="-28" y="-105" width="56" height="210" rx="28" fill="none" stroke="#fff" strokeWidth="5" />
                  <path d="M-22 10h44v66a22 22 0 0 1-44 0z" fill="#229ef0" />
                </g>
                <polyline points="160,72 196,72 210,40 228,108 246,58 262,72 308,72" fill="none" stroke="#229ef0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <g stroke="#229ef0" strokeWidth="3" fill="none" strokeLinecap="round">
                  <path d="M190 175h58l18 18h34" />
                  <path d="M200 220h86" />
                  <path d="M185 250h50l16-16" />
                </g>
                <g fill="#229ef0">
                  <circle cx="300" cy="193" r="6" />
                  <circle cx="290" cy="220" r="6" />
                  <circle cx="255" cy="232" r="6" />
                </g>
              </svg>
            </div>
          </div>

          <div className="relative mt-8 grid grid-cols-2 border-t border-white/20 pt-3 sm:grid-cols-4 sm:pt-4">
            {[
              ['Blood tests', 'Accurate, timely reports'],
              ['4 specialists', 'Medical, liver, skin and child care'],
              ['Home service', 'Sampling, injections and delivery'],
              ['Digital', 'Websites, ads and IT support'],
            ].map(([title, detail]) => (
              <div key={title} className="py-3 pr-3 sm:py-4 sm:pr-5">
                <b className="block text-base font-bold sm:text-lg">{title}</b>
                <span className="mt-1 block text-sm leading-relaxed text-white/75">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lab" data-reveal className="scroll-mt-32 bg-mist px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
                <span className="size-2 rounded-full bg-accent-red" aria-hidden="true" />
                Med One Lab
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">Tests, specialists and care in one place.</h2>
              <p className="mt-3 leading-relaxed text-ink/70">
                Your local healthcare centre in Awan Town, Lahore—bringing diagnostics, specialist care
                and convenient home services together.
              </p>
            </div>
            <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-dark ring-1 ring-line">
              <svg viewBox="0 0 24 24" className="size-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Awan Town, Lahore
            </span>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
            <div className="rounded-3xl bg-brand p-6 text-white shadow-lg shadow-brand/10 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">Care for every need</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">Healthcare services</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {labServices.map(([title, detail]) => (
                  <article key={title} className="flex gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-mint" aria-hidden="true">
                      <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4 10 4 4 8-8" />
                      </svg>
                    </span>
                    <div>
                      <h4 className="font-semibold leading-snug text-white">{title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Experienced care</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">Meet our specialists</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">Consultation for children, general health, digestive care and skin concerns.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {specialists.map(([title, description, schedule]) => (
                  <article key={title} className="rounded-2xl bg-mist/70 p-4">
                    <span className="mb-3 block h-1 w-8 rounded-full bg-mint" aria-hidden="true" />
                    <h4 className="font-display font-bold text-ink">{title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">{description}</p>
                    {schedule && <p className="mt-3 border-t border-line pt-3 text-xs font-bold text-brand-dark">{schedule}</p>}
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h3 className="font-display text-lg font-bold text-ink sm:text-xl">Care is more convenient at home.</h3>
              <p className="mt-1 text-sm text-ink/65">Arrange home sample collection or an injection visit through WhatsApp.</p>
            </div>
            <a href={waLink('Hello Med One Lab, I want to book home sampling.')} target="_blank" rel="noreferrer" className="inline-flex shrink-0 justify-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
              Book a home visit
            </a>
          </div>
        </div>
      </section>

      <section data-reveal className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="flex flex-col gap-5 rounded-3xl border border-line bg-mist p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-sm" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-5 0v6.2L5.7 16a3.3 3.3 0 0 0 2.8 5h7a3.3 3.3 0 0 0 2.8-5L14 9.2V3M8 15h8" />
                  <path strokeLinecap="round" d="M10 18h4" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Find your test</p>
                <h2 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">Common tests</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/65">
                  Explore frequently requested tests, with pricing and sample details at a glance.
                </p>
              </div>
            </div>
            <Link to="/tests" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
              Browse all tests
              <span className="text-lg" aria-hidden="true">→</span>
            </Link>
          </div>
          {testsLoading && <p className="mt-5 rounded-2xl border border-line bg-paper p-5 text-sm text-ink/60" role="status">Loading common tests...</p>}
          {testsError && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900" role="alert">
              <p>Common tests could not be loaded: {testsError}</p>
              <p className="mt-1">
                You can still <Link to="/tests" className="font-bold underline">open the full test list</Link> or call us at{' '}
                <a href={`tel:+${LAB.whatsapp}`} className="font-bold underline">{LAB.phone}</a>.
              </p>
            </div>
          )}
          {!testsLoading && !testsError && tests.length === 0 && (
            <p className="mt-5 rounded-2xl border border-line bg-paper p-5 text-sm text-ink/70" role="status">
              No common tests are available right now. <Link to="/tests" className="font-bold text-brand-dark underline">Browse all tests</Link>.
            </p>
          )}
          {tests.length > 0 && (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {tests.map((t) => <TestRow key={t.id} t={t} />)}
            </div>
          )}
        </div>
      </section>

      <section id="digital" data-reveal className="scroll-mt-32 bg-brand-dark px-4 py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-12">
          <div className="flex flex-col items-start">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
              <span className="size-2 rounded-full bg-mint" aria-hidden="true" />
              Med One Digital
            </p>
            <h2 className="mt-5 max-w-xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl xl:text-5xl">
              Websites, marketing and IT for your business.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70">
              We help clinics, labs, shops and schools get found online and turn views into calls and messages.
            </p>
            <p className="mt-5 text-sm font-semibold text-white/60">Web development · Marketing · Branding · IT support</p>
            <a href={waLink('Hello Med One Digital, I want a quote for my business.')} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-brand-dark transition-colors hover:bg-white">
              Get a digital quote
              <span className="text-lg" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="rounded-3xl bg-white p-5 text-ink shadow-xl sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">What we do</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">Digital services</h3>
              </div>
              <span className="w-fit rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-brand-dark">For local businesses</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {digitalServices.map(([title, detail], index) => (
                <article key={title} className="rounded-2xl border border-line bg-paper p-4 transition-colors hover:bg-mist">
                  <span className="inline-flex size-8 items-center justify-center rounded-xl bg-mist text-xs font-extrabold text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-3 font-semibold text-ink">{title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="bg-mist px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
                <span className="size-2 rounded-full bg-accent-red" aria-hidden="true" />
                Visit Med One
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Find a branch</h2>
              <p className="mt-2 leading-relaxed text-ink/70">Find the nearest Med One centre or get directions to our Awan Town location.</p>
            </div>
            <Link to="/branches" className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-brand/15 bg-white px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand hover:text-white">
              Explore all branches
              <span className="text-lg" aria-hidden="true">→</span>
            </Link>
          </div>

          {branchesLoading ? (
            <p className="mt-6 rounded-2xl border border-line bg-white p-5 text-sm text-ink/60" role="status">Loading locations...</p>
          ) : branches.length ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((b) => <BranchCard key={b.id} b={b} />)}
            </div>
          ) : (
            <>
              {branchesError && <p className="mt-5 text-sm text-ink/65" role="status">Branch listings are unavailable right now; showing our main centre.</p>}
              <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
                <article className="rounded-3xl bg-brand p-6 text-white shadow-lg shadow-brand/10 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">Main healthcare centre</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">Med One Lab</h3>
                  <address className="mt-3 max-w-xl not-italic leading-relaxed text-white/80">{LAB.address}</address>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={directionsUrl}
                      target="_blank" rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-mist"
                    >
                      Get directions
                    </a>
                    <a href={`tel:+${LAB.whatsapp}`} className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
                      Call {LAB.phone}
                    </a>
                  </div>
                </article>
                <article className="flex flex-col items-start justify-center rounded-3xl border border-line bg-white p-6 sm:p-8">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-mist text-brand" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">Need help finding us?</h3>
                  <p className="mt-2 leading-relaxed text-ink/70">Our team can help with directions, test questions and appointments.</p>
                  <Link to="/contact" className="mt-5 text-sm font-bold text-brand-dark hover:underline">Contact Med One →</Link>
                </article>
              </div>
            </>
          )}
        </div>
      </section>

      <section id="contact" data-reveal className="scroll-mt-32 bg-mist px-4 py-14 text-ink sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <div className="flex flex-col items-start justify-center rounded-3xl bg-brand-dark p-7 text-white shadow-xl shadow-brand/10 sm:p-9 lg:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
              <span className="size-2 rounded-full bg-mint" aria-hidden="true" />
              Contact Med One
            </p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl">
              Visit, call or message us.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              For lab tests, doctor appointments and home visits, call or message us.
              For websites and marketing, tell us a little about your business.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={waLink('Hello Med One, I would like to get in touch.')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-brand-dark">
                Message on WhatsApp
                <span className="text-lg" aria-hidden="true">→</span>
              </a>
              <a href={`tel:+${LAB.whatsapp}`} className="inline-flex items-center rounded-full border border-white/35 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10">
                Call {LAB.phone}
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 text-ink shadow-xl sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Get in touch</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-ink">We’re here to help.</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-mist p-5 sm:col-span-2">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink/55">Visit our centre</p>
                <address className="mt-1 not-italic font-semibold leading-relaxed text-ink">{LAB.address}</address>
              </div>
              <div className="rounded-2xl border border-line p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/55">Call us</p>
                <a href={`tel:+${LAB.whatsapp}`} className="mt-2 inline-block font-bold text-brand-dark hover:underline">{LAB.phone}</a>
              </div>
              <a href={directionsUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-line p-5 font-semibold text-brand-dark transition-colors hover:bg-mist">
                Get directions
                <span className="text-lg" aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Map to Med One Lab, Awan Town, Lahore"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-64 w-full sm:h-72"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
