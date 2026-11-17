import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { LAB, waLink } from '../config.js';

const links = [
  ['/', 'Home'],
  ['/tests', 'Test list'],
  ['/branches', 'Our location'],
  ['/contact', 'Contact'],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  const nav = (mobile = false) => ({ isActive }) =>
    `rounded-xl text-sm font-semibold transition-colors ${
      mobile ? 'block w-full px-4 py-3' : 'px-4 py-2.5'
    } ${
      isActive
        ? 'bg-mist text-brand-dark'
        : 'text-ink/70 hover:bg-mist hover:text-brand-dark'
    }`;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-white/95 shadow-sm backdrop-blur">
        <div className="bg-brand-dark text-white">
          <div className="mx-auto flex min-h-7 max-w-7xl items-center justify-between px-4 text-[10px] sm:text-xs">
            <p className="hidden font-medium text-white/85 sm:block">{LAB.tagline}</p>
            <p className="ml-auto inline-flex items-center gap-2 font-semibold">
              <span className="size-2 rounded-full bg-mint" aria-hidden="true" />
              {LAB.hours}
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1 sm:py-1.5">
          <Link to="/" className="flex shrink-0 items-center text-brand-dark">
            <img src="/med-one-lab-digital.png" alt={LAB.name} className="h-auto w-[120px] object-contain sm:w-[142px]" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} className={nav()}>{label}</NavLink>
            ))}
            <a href={`tel:+${LAB.whatsapp}`} className="ml-3 inline-flex items-center gap-2.5 rounded-xl bg-brand px-4 py-2.5 text-left text-white shadow-sm transition-colors hover:bg-brand-dark">
              <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.75A2.75 2.75 0 0 1 5.75 3h1.6c.7 0 1.3.48 1.45 1.16l.65 2.94a1.5 1.5 0 0 1-.75 1.65l-1.1.63a14.1 14.1 0 0 0 5.02 5.02l.63-1.1a1.5 1.5 0 0 1 1.65-.75l2.94.65c.68.15 1.16.75 1.16 1.45v1.6A2.75 2.75 0 0 1 16.25 19H15C8.37 19 3 13.63 3 7V5.75Z" />
              </svg>
              <span>
                <span className="block text-xs font-medium text-white/75">Call our lab</span>
                <span className="block text-sm font-bold">{LAB.phone}</span>
              </span>
            </a>
          </nav>

          <a href={`tel:+${LAB.whatsapp}`} className="hidden items-center rounded-xl border border-brand/15 px-3 py-2 text-sm font-bold text-brand hover:bg-mist md:inline-flex lg:hidden">
            Call us
          </a>
          <button
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line text-brand-dark transition-colors hover:bg-mist lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
        {open && (
          <nav id="mobile-navigation" className="border-t border-line bg-white px-4 py-3 shadow-lg lg:hidden" aria-label="Mobile">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {links.map(([to, label]) => (
                <NavLink key={to} to={to} end={to === '/'} className={nav(true)}>{label}</NavLink>
              ))}
              <a href={`tel:+${LAB.whatsapp}`} className="mt-2 rounded-xl bg-brand px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-brand-dark">
                Call our lab · {LAB.phone}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="bg-brand-dark text-white/70">
        <div className="h-1 bg-gradient-to-r from-accent-red via-mint to-brand" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_.7fr_1.1fr] lg:gap-12">
          <div>
            <p className="font-display text-xl font-bold tracking-wide text-white">{LAB.name}</p>
            <p className="mt-2 text-sm font-medium text-white/85">{LAB.tagline}</p>
            <a href={waLink(`Hi ${LAB.name}, I need some information.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Chat on WhatsApp
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-white">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {links.map(([to, label]) => (
                <li key={to}><Link to={to} className="transition-colors hover:text-mint">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-white">Visit or contact us</p>
            <address className="mt-4 not-italic leading-relaxed">{LAB.address}</address>
            <a href={`tel:+${LAB.whatsapp}`} className="mt-3 inline-block font-semibold text-white transition-colors hover:text-mint">{LAB.phone}</a>
            <a href={`mailto:${LAB.email}`} className="mt-1 block transition-colors hover:text-mint">{LAB.email}</a>
            <p className="mt-1">{LAB.hours}</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {LAB.name}. All rights reserved.</p>
            <Link to="/" className="font-semibold text-white/80 transition-colors hover:text-mint">Back to home ↑</Link>
          </div>
        </div>
      </footer>

      <a
        href={waLink(`Hi ${LAB.name}, I need some information.`)}
        target="_blank" rel="noreferrer"
        className="fixed bottom-4 right-4 z-30 rounded-full bg-[#1fa855] px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#188a45]"
      >
        WhatsApp us
      </a>
    </div>
  );
}
