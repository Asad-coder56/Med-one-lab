import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TestRow from '../components/TestRow.jsx';
import { api } from '../api.js';
import { LAB, waLink } from '../config.js';

const PAGE_SIZE = 12;
const EMPTY_DATA = { items: [], total: 0, pages: 0 };

export default function Tests() {
  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const category = params.get('category') || '';
  const [input, setInput] = useState(search);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState('');
  const [data, setData] = useState(EMPTY_DATA);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setInput(search);
  }, [search]);

  useEffect(() => {
    const value = input.trim();
    if (value === search) return undefined;

    const timeout = setTimeout(() => {
      setParams((current) => {
        const next = new URLSearchParams(current);
        if (value) next.set('search', value);
        else next.delete('search');
        return next;
      }, { replace: true });
    }, 350);

    return () => clearTimeout(timeout);
  }, [input, search, setParams]);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setCategoriesLoading(true);
    setCategoriesError('');

    api('/categories', { signal: controller.signal })
      .then((items) => {
        if (active) setCategories(items);
      })
      .catch((requestError) => {
        if (active && requestError.name !== 'AbortError') {
          setCategoriesError(requestError.message);
        }
      })
      .finally(() => {
        if (active) setCategoriesLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [retryKey]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const query = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
    });
    if (search) query.set('search', search);
    if (category) query.set('category', category);

    setLoading(true);
    setError('');
    if (page === 1) setData(EMPTY_DATA);

    api(`/tests?${query.toString()}`, { signal: controller.signal })
      .then((result) => {
        if (!active) return;
        setData((current) => page === 1
          ? result
          : { ...result, items: [...current.items, ...result.items] });
      })
      .catch((requestError) => {
        if (active && requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [search, category, page, retryKey]);

  const selectCategory = (id) => {
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (id) next.set('category', String(id));
      else next.delete('category');
      return next;
    }, { replace: true });
  };

  const clearFilters = () => {
    setInput('');
    setParams((current) => {
      const next = new URLSearchParams(current);
      next.delete('search');
      next.delete('category');
      return next;
    }, { replace: true });
  };

  const retry = () => {
    setPage(1);
    setRetryKey((current) => current + 1);
  };

  const hasFilters = Boolean(search || category);

  return (
    <div className="min-h-screen bg-paper">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-[#0f5fb8] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-mint/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/90">
                <span className="h-2 w-2 rounded-full bg-mint" />
                {LAB.name} · Test directory
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Find your test, with the details you need.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Browse lab tests and check sample type, report turnaround, and price. Search by test name or filter by category.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={`tel:${LAB.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Call the lab
              </a>
              <a
                href={waLink('Hello Med One Lab, I need help choosing a test.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-mint px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-white"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-8 max-w-4xl">
            <label htmlFor="test-search" className="mb-2 block text-sm font-semibold text-white/90">
              Search the test list
            </label>
            <div className="relative">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/50">
                <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
                <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                id="test-search"
                type="search"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Try CBC, thyroid, vitamin D..."
                className="w-full rounded-2xl border border-white/70 bg-white py-4 pl-12 pr-24 text-base text-ink shadow-xl shadow-brand-dark/15 placeholder:text-ink/45 focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/25"
              />
              {input && (
                <button
                  type="button"
                  onClick={() => setInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-sm font-bold text-brand hover:bg-mist"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-white/70">
              {search ? `Showing matches for “${search}”` : 'Search by test name to find the information you need.'}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">Test catalogue</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">Browse lab tests</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65 sm:text-base">
              Review available tests and open any item for more information.
            </p>
          </div>
          <p className="text-sm font-semibold text-ink/65" aria-live="polite">
            {loading
              ? data.items.length ? 'Loading more tests...' : 'Loading tests...'
              : error ? 'Test list unavailable' : `${data.total} ${data.total === 1 ? 'test' : 'tests'} found`}
          </p>
        </div>

        <section aria-label="Filter tests by category" className="mt-6 rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-brand-dark">Filter by category</p>
            {categoriesLoading && <p className="text-xs text-ink/55">Loading categories...</p>}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={!category}
              onClick={() => selectCategory('')}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                !category ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-brand hover:text-brand'
              }`}
            >
              All tests
            </button>
            {categories.map((item) => {
              const selected = category === String(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectCategory(item.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    selected ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-brand hover:text-brand'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          {categoriesError && (
            <p role="status" className="mt-3 text-sm text-red-700">
              Categories could not be loaded: {categoriesError}
            </p>
          )}
        </section>

        {error && (
          <section role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-brand-dark">The test list is temporarily unavailable</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/70">
                  Please try again in a moment, or contact the lab and we can help you find the information you need.
                </p>
                <p className="mt-2 text-xs text-ink/55">Details: {error}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={retry}
                  className="rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  Try again
                </button>
                <a
                  href={waLink('Hello Med One Lab, I need information about your tests.')}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-bold text-brand transition-colors hover:bg-mist"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </section>
        )}

        {loading && data.items.length === 0 && (
          <div role="status" aria-label="Loading tests" className="mt-6 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <div className="h-3 w-24 rounded bg-mist" />
                <div className="mt-4 h-5 w-2/3 rounded bg-mist" />
                <div className="mt-3 h-3 w-5/6 rounded bg-mist" />
              </div>
            ))}
          </div>
        )}

        {data.items.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {data.items.map((test) => <TestRow key={test.id} t={test} />)}
          </div>
        )}

        {!loading && !error && data.items.length === 0 && (
          <section className="mt-6 rounded-2xl border border-line bg-white px-5 py-10 text-center shadow-sm sm:py-14">
            <div aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-brand">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
                <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-brand-dark">
              {hasFilters ? 'No tests match those filters' : 'No tests are available right now'}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-ink/65">
              {hasFilters
                ? 'Try another search or clear the selected filters to browse all tests.'
                : 'Please contact Med One Lab for current test information.'}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  Clear filters
                </button>
              )}
              <a
                href={`tel:${LAB.phone.replace(/\s+/g, '')}`}
                className="rounded-full border border-line px-5 py-3 text-sm font-bold text-brand transition-colors hover:bg-mist"
              >
                Call {LAB.phone}
              </a>
            </div>
          </section>
        )}

        {!error && data.items.length > 0 && page < data.pages && (
          <div className="mt-8 text-center">
            <button
              type="button"
              disabled={loading}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-full border border-brand px-6 py-3 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? 'Loading more tests...' : 'Show more tests'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
