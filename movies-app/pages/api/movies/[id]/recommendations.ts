import type { NextApiRequest, NextApiResponse } from 'next';
import { tmdbFetch, TmdbError } from '../../../../lib/tmdb';

/**
 * GET /api/movies/[id]/recommendations?page=1
 * Get movie recommendations based on a specific movie.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, page } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing movie id' });
  }

  try {
    const data = await tmdbFetch(`/movie/${id}/recommendations`, {
      params: { page: page ? Number(page) : 1 },
    });
    return res.status(200).json(data);
  } catch (err) {
    if (err instanceof TmdbError) {
      return res.status(err.status).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
