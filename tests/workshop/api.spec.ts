import { test, expect } from '@playwright/test';

const EXPECTED_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

test.describe('GET /api/genres', () => {
  test('returns 200 with all expected genres', async ({ request }) => {
    const response = await request.get('/api/genres');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('genres');
    expect(Array.isArray(body.genres)).toBe(true);
    expect(body.genres).toHaveLength(EXPECTED_GENRES.length);
    expect(body.genres).toEqual(EXPECTED_GENRES);
  });
});

test.describe('GET /api/movies/search', () => {
  test('returns 200 with expected response structure', async ({ request }) => {
    const response = await request.get('/api/movies/search', {
      params: { query: 'spider', page: 1 },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('page');
    expect(body).toHaveProperty('results');
    expect(body).toHaveProperty('total_results');
    expect(body).toHaveProperty('total_pages');
    expect(typeof body.page).toBe('number');
    expect(Array.isArray(body.results)).toBe(true);
  });

  test('returns 400 when query param is missing', async ({ request }) => {
    const response = await request.get('/api/movies/search');

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toContain('query');
  });

  test('returns 405 for non-GET methods', async ({ request }) => {
    const response = await request.post('/api/movies/search', {
      data: { query: 'spider' },
    });

    expect(response.status()).toBe(405);
  });
});
