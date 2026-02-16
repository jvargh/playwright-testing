import type { NextApiRequest, NextApiResponse } from 'next';
import { tmdbFetch, TmdbError } from '../../../lib/tmdb';

/**
 * GET /api/movies/search?query=...&page=1
 * Search movies by title.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, page } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Missing required "query" parameter' });
  }

  try {
    const data = await tmdbFetch('/search/movie', {
      params: {
        query,
        page: page ? Number(page) : 1,
      },
    });
    return res.status(200).json(data);
  } catch (err) {
    if (err instanceof TmdbError) {
      return res.status(err.status).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
