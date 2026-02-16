Pages (Next.js, file-based routing) live under movies-app/pages:
- / -> movies-app/pages/index.js
- /404 -> movies-app/pages/404.js
- /error -> movies-app/pages/error.js
- /_error -> movies-app/pages/_error.js
- /genre -> movies-app/pages/genre/index.js
- /list -> movies-app/pages/list/index.js
- /list/add-or-edit -> movies-app/pages/list/add-or-edit/index.js
- /list/add-or-remove-items -> movies-app/pages/list/add-or-remove-items/index.js
- /list/choose-image -> movies-app/pages/list/choose-image/index.js
- /list/remove -> movies-app/pages/list/remove/index.js
- /movie -> movies-app/pages/movie/index.js
- /my-lists -> movies-app/pages/my-lists/index.js
- /person -> movies-app/pages/person/index.js
- /search -> movies-app/pages/search/index.js

Framework pages:
- App wrapper: movies-app/pages/_app.js
- Document: movies-app/pages/_document.js

API routes:
- None found (no movies-app/pages/api directory).

---

# Movies App API Reference

All API routes are served by Next.js under `/api`. The frontend uses these routes as its data layer — every UI request flows through them before reaching the upstream TMDB mock backend.

## Base URL

```
http://localhost:3000/api
```

## Architecture

```
Browser (React/Redux)
  → /api/*  (Next.js API routes)
    → https://movies-tmdb-mock.azurewebsites.net  (upstream mock)
```

| Layer | File |
| --- | --- |
| Server-side TMDB proxy helper | `movies-app/lib/tmdb.ts` |
| Client-side HTTP client | `movies-app/services/localAPI.js` |
| API route handlers | `movies-app/pages/api/**/*.ts` |

---

## Endpoints

### Genres

#### `GET /api/genres`

Returns all movie genres.

**Response**

```
{
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 35, "name": "Comedy" }
  ]
}
```

---

### Movies

#### `GET /api/movies/search`

Search movies by title.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | Yes | Search term |
| `page` | number | No | Page number (default 1) |

**Example:** `/api/movies/search?query=batman&page=1`

**Response**

```
{
  "page": 1,
  "results": [ ... ],
  "total_results": 10,
  "total_pages": 1
}
```

---

#### `GET /api/movies/discover`

Discover movies by genre, cast, or sort order.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `with_genres` | string | No | Genre ID to filter by |
| `with_cast` | string | No | Person ID to filter by cast |
| `page` | number | No | Page number (default 1) |
| `sort_by` | string | No | Sort field (e.g. `popularity.desc`) |

**Example:** `/api/movies/discover?with_genres=28&page=1&sort_by=popularity.desc`

---

#### `GET /api/movies/:id`

Get details for a single movie (includes videos). Also serves static category lists.

| Param | Type | Description |
| --- | --- | --- |
| `id` | number or string | Movie ID (`550`) or category (`popular`, `top_rated`, `upcoming`, `now_playing`) |
| `page` | number | Page number (only for static categories) |

**Examples:**

*   `/api/movies/550` — movie details
*   `/api/movies/popular?page=2` — popular movies, page 2

---

#### `GET /api/movies/:id/credits`

Get cast and crew for a movie.

**Example:** `/api/movies/550/credits`

**Response**

```
{
  "id": 550,
  "cast": [ ... ],
  "crew": [ ... ]
}
```

---

#### `GET /api/movies/:id/recommendations`

Get recommended movies based on a specific movie.

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | number | No | Page number (default 1) |

**Example:** `/api/movies/550/recommendations?page=1`

---

### Person

#### `GET /api/person/:id`

Get details for an actor or crew member.

**Example:** `/api/person/287`

---

### Configuration

#### `GET /api/configuration`

Get TMDB image configuration (base URLs, sizes).

---

## Error Responses

All endpoints return consistent error JSON:

| Status | Meaning |
| --- | --- |
| `400` | Missing or invalid required parameter |
| `405` | HTTP method not allowed (only GET supported) |
| `4xx` | Upstream TMDB error (status forwarded) |
| `500` | Internal server error |

```
{
  "error": "Missing required \"query\" parameter"
}
```

---

## Testing with Playwright

These routes can be tested directly via `request` context or intercepted during UI tests:

```
import { test, expect } from '@playwright/test';

// Direct API test
test('GET /api/genres returns genres', async ({ request }) => {
  const response = await request.get('/api/genres');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.genres.length).toBeGreaterThan(0);
});

// API test with query params
test('GET /api/movies/search', async ({ request }) => {
  const response = await request.get('/api/movies/search', {
    params: { query: 'batman', page: 1 }
  });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty('results');
});
```

---

## Interactive API Docs (Swagger-style)

Navigate to [`/api`](http://localhost:3000/api) in a browser to access the interactive API explorer.

**Features:**

*   Expandable endpoint cards with method badges, paths, and descriptions
*   Parameter tables showing name, type, required/optional, and description
*   **Try it** — editable URL input + Execute button that fires a live request and displays the response with status code
*   **Dual format** — returns HTML in a browser; returns JSON when `Accept: application/json` header is sent

**JSON format (for programmatic use):**

```
curl -H "Accept: application/json" http://localhost:3000/api
```

**Source:** `movies-app/pages/api/index.ts`

---

## File Map

```
movies-app/
├── lib/tmdb.ts                              # Server-side TMDB fetch helper
├── services/localAPI.js                     # Client-side axios instance → /api
├── pages/api/
│   ├── index.ts                             # Interactive API docs page
│   ├── configuration/index.ts               # GET /api/configuration
│   ├── genres/index.ts                      # GET /api/genres
│   ├── movies/
│   │   ├── search.ts                        # GET /api/movies/search
│   │   ├── discover.ts                      # GET /api/movies/discover
│   │   └── [id]/
│   │       ├── index.ts                     # GET /api/movies/:id
│   │       ├── credits.ts                   # GET /api/movies/:id/credits
│   │       └── recommendations.ts           # GET /api/movies/:id/recommendations
│   └── person/
│       └── [id].ts                          # GET /api/person/:id
```