import type { NextApiRequest, NextApiResponse } from 'next';
import { tmdbFetch, TmdbError } from '../../../lib/tmdb';

/**
 * GET /api/person/[id]
 * Get person (actor/crew) details.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing person id' });
  }

  try {
    const data = await tmdbFetch(`/person/${id}`);
    return res.status(200).json(data);
  } catch (err) {
    if (err instanceof TmdbError) {
      return res.status(err.status).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
