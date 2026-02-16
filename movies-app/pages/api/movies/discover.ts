import type { NextApiRequest, NextApiResponse } from 'next';
import { tmdbFetch, TmdbError } from '../../../lib/tmdb';

/**
 * GET /api/movies/discover?with_genres=28&page=1&sort_by=popularity.desc
 * GET /api/movies/discover?with_cast=123&page=1&sort_by=popularity.desc
 * Discover movies filtered by genre, cast, or other criteria.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { with_genres, with_cast, page, sort_by } = req.query;

  try {
    const data = await tmdbFetch('/discover/movie', {
      params: {
        with_genres: with_genres as string | undefined,
        with_cast: with_cast as string | undefined,
        page: page ? Number(page) : 1,
        sort_by: sort_by as string | undefined,
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
