import axios from 'redaxios';

/**
 * Client-side HTTP client for the local Next.js API routes.
 * All frontend requests go through /api/* which proxies to the TMDB backend.
 * This makes the API a core part of the application architecture.
 */
const localAPI = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export default localAPI;
