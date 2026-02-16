import type { NextApiRequest, NextApiResponse } from 'next';
import { tmdbFetch, TmdbError } from '../../../../lib/tmdb';

/**
 * GET /api/movies/[id]          → Movie details (with videos appended)
 * GET /api/movies/popular       → Popular movies
 * GET /api/movies/top_rated     → Top-rated movies
 * GET /api/movies/upcoming      → Upcoming movies
 *
 * Static categories (popular, top_rated, upcoming) use api_key auth
 * to match the existing frontend behavior.
 */

const STATIC_CATEGORIES = ['popular', 'top_rated', 'upcoming', 'now_playing'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, page } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing movie id' });
  }

  try {
    if (STATIC_CATEGORIES.includes(id)) {
      // Static category endpoint (popular, top_rated, etc.)
      const data = await tmdbFetch(`/movie/${id}`, {
        params: { page: page ? Number(page) : 1 },
        useApiKey: true,
      });
      return res.status(200).json(data);
    }

    // Numeric movie ID → movie details
    const data = await tmdbFetch(`/movie/${id}`, {
      params: { append_to_response: 'videos' },
    });
    return res.status(200).json(data);
  } catch (err) {
    if (err instanceof TmdbError) {
      return res.status(err.status).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
