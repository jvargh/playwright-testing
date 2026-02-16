/**
 * Server-side TMDB API helper.
 * Used by Next.js API routes to proxy requests to the TMDB mock backend.
 */

const TMDB_BASE = 'https://movies-tmdb-mock.azurewebsites.net';
const TMDB_VERSION = 3;
const TMDB_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN || '';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';

interface TmdbRequestOptions {
  params?: Record<string, string | number | undefined>;
  useApiKey?: boolean;
}

export async function tmdbFetch<T = unknown>(
  path: string,
  options: TmdbRequestOptions = {}
): Promise<T> {
  const url = new URL(`/${TMDB_VERSION}${path}`, TMDB_BASE);

  if (options.useApiKey) {
    url.searchParams.set('api_key', TMDB_API_KEY);
  }

  if (options.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  if (!options.useApiKey) {
    headers['Authorization'] = `Bearer ${TMDB_READ_ACCESS_TOKEN}`;
  }

  const res = await fetch(url.toString(), { headers });

  if (!res.ok) {
    const body = await res.text();
    throw new TmdbError(res.status, body);
  }

  const text = await res.text();
  if (!text) {
    return {} as T;
  }
  return JSON.parse(text) as T;
}

export class TmdbError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`TMDB API error ${status}: ${body}`);
    this.status = status;
    this.body = body;
  }
}
