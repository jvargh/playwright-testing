# Playwright Movies App - Comprehensive API & Pages Documentation

## Overview

The **Playwright Movies App** is a Next.js-based movie discovery platform that integrates with The Movie Database (TMDB) API. It provides both frontend pages and REST API endpoints for browsing movies, searching, filtering by genre, and exploring cast information.

**Base URL:** `http://localhost:3000`  
**API Base:** `/api`  
**Framework:** Next.js with React, Redux for state management

---

## 1. Pages Section

### Main Application Routes

| Route | File | Purpose |
|-------|------|---------|
| `/` | `pages/index.js` | Home page with static movie categories (Popular, Top Rated, Upcoming, Now Playing) |
| `/genre` | `pages/genre/index.js` | Browse movies filtered by genre with sorting options |
| `/movie` | `pages/movie/index.js` | Movie detail page with cast, recommendations, and videos |
| `/person` | `pages/person/index.js` | Actor/director profile with filmography |
| `/search` | `pages/search/index.js` | Search movies by title with pagination |
| `/my-lists` | `pages/my-lists/` | User favorites and watchlist management |
| `/list` | `pages/list/` | Custom list management |
| `/404` | `pages/404.js` | Custom 404 error page |
| `/error` | `pages/error.js` | Custom error page |

### Framework Pages (Non-routable)

| File | Purpose |
|------|---------|
| `pages/_app.js` | Application wrapper with Redux Provider, Theme, and Auth providers |
| `pages/_document.js` | HTML document structure and global configuration |
| `pages/_error.js` | Error boundary component for error handling |

---

## 2. Architecture Section

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Browser / Frontend (React)                     │
│                                                                     │
│  Pages:                                                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Genre | Movie | Person | Search | Home pages              │   │
│  │ - useRouter() for query params                              │   │
│  │ - useDispatch() to trigger Redux actions                   │   │
│  │ - useSelector() to read Redux state                        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                           │                                         │
│                           ▼                                         │
│  Redux Layer:                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Actions: getMovie, getGenres, getGenreMovies, etc.         │   │
│  │ Reducers: movies, movie, person, personMovies, etc.        │   │
│  │ Store: Centralized state management                        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
           │
           │ (HTTP GET/POST Requests)
           ▼
┌─────────────────────────────────────────────────────────────────────┐
│              Next.js API Routes (/api - Backend)                    │
│                                                                     │
│  Routers:                                                           │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ GET /api/genres          → pages/api/genres/index.ts       │   │
│  │ GET /api/movies/search   → pages/api/movies/search.ts      │   │
│  │ GET /api/movies/discover → pages/api/movies/discover.ts    │   │
│  │ GET /api/movies/[id]     → pages/api/movies/[id]/index.ts  │   │
│  │ GET /api/movies/[id/*]   → pages/api/movies/[id]/*         │   │
│  │ GET /api/person/[id]     → pages/api/person/[id].ts        │   │
│  │ GET /api/configuration   → pages/api/configuration/index.ts│   │
│  └─────────────────────────────────────────────────────────────┘   │
│                           │                                         │
│  Client Library:          │                                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ tmdbFetch() - lib/tmdb.ts                                   │   │
│  │ - Builds request URL with auth headers                      │   │
│  │ - Adds Bearer token or API key                              │   │
│  │ - Handles error responses                                   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
           │
           │ (Proxy requests with authentication)
           ▼
┌─────────────────────────────────────────────────────────────────────┐
│              TMDB Mock Backend Service (Upstream)                   │
│              https://movies-tmdb-mock.azurewebsites.net            │
│                                                                     │
│  Features:                                                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ - Bearer Token Authentication (Read Access)                 │   │
│  │ - API Key Authentication (Static Categories)                │   │
│  │ - TMDB v3 Endpoints                                         │   │
│  │ - Movie, Genre, Person, Credits data                        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Architecture Layer-to-File Mapping

| Layer | Files/Components | Responsibility |
|-------|------------------|-----------------|
| **Presentation** | `components/`, `parts/` | React UI components, page layouts, reusable UI elements |
| **Pages** | `pages/*.js` | Next.js page components that compose UI and dispatch Redux actions |
| **State Management** | `store.js`, `actions/`, `reducers/` | Redux store configuration, action creators, state reducers |
| **API Routes** | `pages/api/**` | Next.js API routes that receive frontend requests and proxy to TMDB |
| **HTTP Client** | `lib/tmdb.ts` | Authentication, request building, error handling for TMDB calls |
| **Configuration** | `config/`, `utils/constants/` | API keys, URLs, app settings, constants |
| **Upstream Service** | TMDB Mock Backend | External REST API providing movie, genre, and person data |

---

## 3. Endpoints Section

### Configuration Endpoints

#### GET `/api/configuration`

Retrieve TMDB configuration including image base URLs and sizes for rendering images.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| *(none)* | - | - | No parameters required |

**Example Request:**
```
GET http://localhost:3000/api/configuration
```

**Response Examples:**
```json
{
  "images": {
    "base_url": "https://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": ["w300", "w780", "w1280", "original"],
    "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    "profile_sizes": ["w45", "w92", "h632", "original"]
  },
  "change_keys": [
    "adult", "air_date", "budget", "clapper_board", "config_value",
    "external_ids", "genres", "imdb_id", "original_language"
  ]
}
```

---

### Genre Endpoints

#### GET `/api/genres`

Fetch all available movie genres for filtering and category selection.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| *(none)* | - | - | No parameters required |

**Example Request:**
```
GET http://localhost:3000/api/genres
```

**Response Example:**
```json
{
  "genres": [
    {"id": 28, "name": "Action"},
    {"id": 12, "name": "Adventure"},
    {"id": 16, "name": "Animation"},
    {"id": 35, "name": "Comedy"},
    {"id": 80, "name": "Crime"},
    {"id": 99, "name": "Documentary"},
    {"id": 18, "name": "Drama"},
    {"id": 10751, "name": "Family"},
    {"id": 14, "name": "Fantasy"},
    {"id": 36, "name": "History"},
    {"id": 27, "name": "Horror"},
    {"id": 10749, "name": "Romance"}
  ]
}
```

---

### Movie Endpoints

#### GET `/api/movies/search`

Search for movies by title or keywords with pagination support.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | Search term (movie title, keywords, etc.) |
| `page` | number | No | Results page number (default: 1, max: 1000) |

**Example Request:**
```
GET http://localhost:3000/api/movies/search?query=batman&page=1
```

**Response Example:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 272,
      "title": "Batman",
      "overview": "The Dark Knight of Gotham City begins his war on crime with a new vigilante...",
      "poster_path": "/kVfn3WpYLargC4VfRiS8OVHw0D.png",
      "backdrop_path": "/cinER6EOJ0yKpewX9KE28GHa686.jpg",
      "vote_average": 7.8,
      "vote_count": 5430,
      "release_date": "1989-06-23",
      "popularity": 50.5,
      "original_language": "en"
    },
    {
      "id": 671,
      "title": "Batman Returns",
      "overview": "Batman must face two enemies: the vengeful Catwoman and the bizarre Penguin...",
      "poster_path": "/gHF8WBqH9q4QzDEPLAKlnVl8Qzz.jpg",
      "backdrop_path": "/6jtUhbBb4KqYTWGNkMcvMu31cSn.jpg",
      "vote_average": 7.1,
      "vote_count": 4123,
      "release_date": "1992-06-19",
      "popularity": 42.2,
      "original_language": "en"
    }
  ],
  "total_pages": 15,
  "total_results": 289
}
```

---

#### GET `/api/movies/discover`

Discover and filter movies by genre, cast, ratings, or other criteria with sorting options.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `with_genres` | string | No | Genre ID to filter by (e.g., "28" for Action, comma-separated for multiple) |
| `with_cast` | string | No | Person/Actor ID to filter by cast |
| `page` | number | No | Results page number (default: 1) |
| `sort_by` | string | No | Sort field (e.g., "popularity.desc", "vote_average.desc", "release_date.desc") |

**Example Request:**
```
GET http://localhost:3000/api/movies/discover?with_genres=28&page=1&sort_by=popularity.desc
```

**Response Example:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 408464,
      "title": "Top Gun: Maverick",
      "overview": "After thirty years, Maverick is still pushing the envelope as a test pilot...",
      "poster_path": "/xFI4QXcVlEbJAaolmj3I0tmenTU.jpg",
      "backdrop_path": "/2vFuG6bV6r5ePJeuBRXie5kyDMy.jpg",
      "vote_average": 8.4,
      "vote_count": 8932,
      "release_date": "2022-05-19",
      "popularity": 450.5,
      "genre_ids": [28, 18]
    },
    {
      "id": 385687,
      "title": "Fast X",
      "overview": "An unexpected turn of events forces Dominic Toretto to confront his past...",
      "poster_path": "/fiVW06jE7z8zSJD2mXtzM2dZ1PX.jpg",
      "backdrop_path": "/1yOwqJ8cPT0rHFJ7ZBjqI5L6Bnm.jpg",
      "vote_average": 7.3,
      "vote_count": 6234,
      "release_date": "2023-06-28",
      "popularity": 380.2,
      "genre_ids": [28, 80]
    }
  ],
  "total_pages": 200,
  "total_results": 4000
}
```

---

#### GET `/api/movies/{id}`

Get detailed information about a specific movie OR fetch a static category of movies (popular, top_rated, upcoming, now_playing).

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Movie ID (numeric) or category name (popular, top_rated, upcoming, now_playing) |
| `page` | number | No | Page number for category results (default: 1) |

**Example Requests:**

**Get Movie Details (Numeric ID):**
```
GET http://localhost:3000/api/movies/550
```

**Get Static Category:**
```
GET http://localhost:3000/api/movies/popular?page=1
```

**Response Example (Movie Detail):**
```json
{
  "id": 550,
  "title": "Fight Club",
  "overview": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club...",
  "poster_path": "/5w8VhzYoJiHv7Y1dTY7YGV6CaVQ.jpg",
  "backdrop_path": "/4F3UKM48cLKF9F0eVndYQq5e0dL.jpg",
  "vote_average": 8.8,
  "vote_count": 24835,
  "release_date": "1999-10-15",
  "runtime": 139,
  "budget": 63000000,
  "revenue": 100853753,
  "genres": [
    {"id": 18, "name": "Drama"},
    {"id": 53, "name": "Thriller"}
  ],
  "videos": {
    "results": [
      {
        "id": "abc123",
        "name": "Official Trailer",
        "key": "2IdTv1dxrYc",
        "site": "YouTube",
        "type": "Trailer",
        "official": true,
        "published_at": "2012-03-20T23:58:16.000Z"
      }
    ]
  }
}
```

**Response Example (Static Category):**
```json
{
  "page": 1,
  "results": [
    {
      "id": 408464,
      "title": "Top Gun: Maverick",
      "overview": "After thirty years, Maverick is still pushing the envelope...",
      "poster_path": "/xFI4QXcVlEbJAaolmj3I0tmenTU.jpg",
      "vote_average": 8.4,
      "release_date": "2022-05-19",
      "popularity": 450.5
    },
    {
      "id": 385687,
      "title": "Fast X",
      "overview": "An unexpected turn of events forces Dominic Toretto...",
      "poster_path": "/fiVW06jE7z8zSJD2mXtzM2dZ1PX.jpg",
      "vote_average": 7.3,
      "release_date": "2023-06-28",
      "popularity": 380.2
    }
  ],
  "total_pages": 200,
  "total_results": 4000
}
```

---

#### GET `/api/movies/{id}/credits`

Retrieve cast and crew credits for a specific movie.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Movie ID |

**Example Request:**
```
GET http://localhost:3000/api/movies/550/credits
```

**Response Example:**
```json
{
  "id": 550,
  "cast": [
    {
      "id": 819,
      "name": "Brad Pitt",
      "character": "Tyler Durden",
      "profile_path": "/ct2Jd4L5FBxeGp3Nn6OXU1t9tJk.jpg",
      "order": 0,
      "popularity": 78.5
    },
    {
      "id": 3131,
      "name": "Edward Norton",
      "character": "The Narrator",
      "profile_path": "/2m9U1w46q7B7pWPx3T9LuGYN6x.jpg",
      "order": 1,
      "popularity": 45.2
    },
    {
      "id": 1956,
      "name": "Meat Loaf",
      "character": "Robert 'Bob' Paulson",
      "profile_path": "/yT1YPDMg6K4fLVw7nBxJo3r4Zy9.jpg",
      "order": 2,
      "popularity": 15.8
    }
  ],
  "crew": [
    {
      "id": 7497,
      "name": "David Fincher",
      "job": "Director",
      "profile_path": "/cwCQk9wJ1V6zQZAysL4dBqCAhnZ.jpg",
      "popularity": 35.2
    },
    {
      "id": 44665,
      "name": "Trent Reznor",
      "job": "Original Music Composer",
      "profile_path": null,
      "popularity": 22.1
    }
  ]
}
```

---

#### GET `/api/movies/{id}/recommendations`

Get recommended movies based on a specific movie (collaborative filtering).

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Movie ID |
| `page` | number | No | Page number (default: 1) |

**Example Request:**
```
GET http://localhost:3000/api/movies/550/recommendations?page=1
```

**Response Example:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 278,
      "title": "The Shawshank Redemption",
      "overview": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency...",
      "poster_path": "/2nBpyROEOcNP2WT0F9rqKdAjLpb.jpg",
      "vote_average": 9.3,
      "vote_count": 29564,
      "release_date": "1994-09-23",
      "popularity": 95.5
    },
    {
      "id": 238,
      "title": "The Godfather",
      "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime dynasty...",
      "poster_path": "/3bhkrj58Vtu7enYsRolD1cjexvx.jpg",
      "vote_average": 9.2,
      "vote_count": 19562,
      "release_date": "1972-03-14",
      "popularity": 108.3
    }
  ],
  "total_pages": 5,
  "total_results": 97
}
```

---

### Person Endpoints

#### GET `/api/person/{id}`

Get detailed information about a person (actor, director, crew member) including biography and filmography.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Person ID |

**Example Request:**
```
GET http://localhost:3000/api/person/287
```

**Response Example:**
```json
{
  "id": 287,
  "name": "Brad Pitt",
  "biography": "William Bradley Pitt is an American actor and film producer. He has received multiple awards and nominations including an Academy Award...",
  "birthday": "1963-12-18",
  "deathday": null,
  "place_of_birth": "Springfield, Missouri, USA",
  "profile_path": "/ct2Jd4L5FBxeGp3Nn6OXU1t9tJk.jpg",
  "popularity": 78.5,
  "imdb_id": "nm0000199",
  "known_for_department": "Acting",
  "also_known_as": [
    "William Bradley Pitt",
    "ブラッド・ピット",
    "Бред Питт"
  ],
  "gender": 2
}
```

---

## 4. Error Responses

All API errors follow a consistent JSON error format with appropriate HTTP status codes.

| Status Code | HTTP Meaning | Example Error | Description |
|-------------|--------------|---------------|-------------|
| 400 | Bad Request | `{ "error": "Missing required \"query\" parameter" }` | Invalid request parameters or missing required fields |
| 405 | Method Not Allowed | `{ "error": "Method not allowed" }` | Request method (POST, DELETE, etc.) not supported for endpoint |
| 500 | Internal Server Error | `{ "error": "Internal server error" }` | Unexpected server-side error |
| 503 | Service Unavailable | `{ "error": "Service temporarily unavailable" }` | Upstream TMDB service is down or unreachable |

**Example Error Response (Missing Parameter):**
```json
{
  "error": "Missing required \"query\" parameter"
}
```

**Example Error Response (Invalid Movie ID):**
```json
{
  "error": "Invalid movie id"
}
```

---

## 5. Testing with Playwright

### Test Suite Setup

```typescript
import { test, expect } from '@playwright/test';

test.describe('Movies App API & Pages', () => {
  const baseURL = 'http://localhost:3000';

  // Tests follow below
});
```

### Example Test: Search Movies

```typescript
test('should search for movies and display results', async ({ page }) => {
  // Navigate to search page with query
  await page.goto(`${baseURL}/search?searchTerm=batman&page=1`);
  
  // Wait for search results container to load
  await page.waitForSelector('[data-testid="movie-list"]', { timeout: 10000 });
  
  // Verify movies are displayed
  const movieItems = await page.locator('[data-testid="movie-item"]').all();
  expect(movieItems.length).toBeGreaterThan(0);
  
  // Verify first movie title contains search term
  const firstMovieTitle = await movieItems[0]
    .locator('[data-testid="movie-title"]')
    .textContent();
  expect(firstMovieTitle?.toLowerCase()).toContain('batman');
  
  // Verify pagination is visible
  const pagination = page.locator('[data-testid="pagination"]');
  await expect(pagination).toBeVisible();
});
```

### Example Test: Filter Movies by Genre

```typescript
test('should filter movies by genre with sorting options', async ({ page }) => {
  // Navigate to genre page
  await page.goto(`${baseURL}/genre?id=28&name=Action&page=1`);
  
  // Wait for genre header to verify correct page
  const genreTitle = page.locator('[data-testid="genre-title"]');
  await expect(genreTitle).toContainText('Action');
  
  // Wait for movie list to load
  await page.waitForSelector('[data-testid="movie-list"]');
  
  // Verify movies are displayed
  const movies = await page.locator('[data-testid="movie-item"]').all();
  expect(movies.length).toBeGreaterThan(0);
  
  // Click sort dropdown
  const sortSelect = page.locator('[data-testid="sort-by-select"]');
  await sortSelect.click();
  
  // Select "Popularity (Highest)" option
  await page.click('text=Popularity (Highest)');
  
  // Wait for sorted results
  await page.waitForTimeout(500);
  
  // Verify sorted results are displayed
  const sortedMovies = await page.locator('[data-testid="movie-item"]').all();
  expect(sortedMovies.length).toBeGreaterThan(0);
});
```

### Example Test: View Movie Details with Credits

```typescript
test('should view movie details with cast and recommendations', async ({ page }) => {
  // Navigate to movie detail page
  await page.goto(`${baseURL}/movie?id=550&page=1`);
  
  // Wait for movie summary/details to load
  await page.waitForSelector('[data-testid="movie-summary"]', { timeout: 10000 });
  
  // Verify movie title is displayed
  const movieTitle = page.locator('[data-testid="movie-title"]');
  await expect(movieTitle).toContainText('Fight Club');
  
  // Verify ratings are displayed
  const rating = page.locator('[data-testid="movie-rating"]');
  await expect(rating).toBeVisible();
  
  // Scroll to credits section
  const creditsSection = page.locator('[data-testid="credits-section"]');
  await creditsSection.scrollIntoViewIfNeeded();
  
  // Verify cast members are displayed
  const castMembers = await page.locator('[data-testid="cast-member"]').all();
  expect(castMembers.length).toBeGreaterThan(0);
  
  // Click on first cast member to navigate to person page
  await castMembers[0].click();
  
  // Verify person page loaded
  await page.waitForSelector('[data-testid="person-summary"]');
  const personName = page.locator('[data-testid="person-name"]');
  await expect(personName).toBeVisible();
});
```

### Example Test: Person Profile and Filmography

```typescript
test('should display person profile with filmography', async ({ page }) => {
  // Navigate to person profile
  await page.goto(`${baseURL}/person?id=287&page=1`);
  
  // Wait for person summary to load
  await page.waitForSelector('[data-testid="person-summary"]', { timeout: 10000 });
  
  // Verify person name (Brad Pitt)
  const personName = page.locator('[data-testid="person-name"]');
  await expect(personName).toContainText('Brad Pitt');
  
  // Verify biography is displayed
  const biography = page.locator('[data-testid="person-biography"]');
  await expect(biography).toBeVisible();
  
  // Scroll to filmography section
  const filmography = page.locator('[data-testid="filmography-list"]');
  await filmography.scrollIntoViewIfNeeded();
  
  // Verify movies are listed
  const filmItems = await page.locator('[data-testid="film-item"]').all();
  expect(filmItems.length).toBeGreaterThan(0);
  
  // Click on first movie in filmography
  await filmItems[0].click();
  
  // Verify navigated to movie detail page
  await page.waitForSelector('[data-testid="movie-summary"]');
});
```

### Example Test: Pagination Navigation

```typescript
test('should navigate between pagination pages correctly', async ({ page }) => {
  // Navigate to home page with popular movies
  await page.goto(`${baseURL}/?category=popular&page=1`);
  
  // Wait for movie list
  await page.waitForSelector('[data-testid="movie-list"]');
  
  // Get first page movie items
  const firstPageMovies = await page.locator('[data-testid="movie-item"]').all();
  const firstPageFirstTitle = await firstPageMovies[0]
    .locator('[data-testid="movie-title"]')
    .textContent();
  
  // Click next page button
  const nextButton = page.locator('[data-testid="pagination-next"]');
  await nextButton.click();
  
  // Wait for page parameter to change
  await expect(page).toHaveURL(/page=2/);
  
  // Wait for new results to load
  await page.waitForSelector('[data-testid="movie-list"]');
  
  // Get second page movies and verify they're different
  const secondPageMovies = await page.locator('[data-testid="movie-item"]').all();
  const secondPageFirstTitle = await secondPageMovies[0]
    .locator('[data-testid="movie-title"]')
    .textContent();
  
  expect(secondPageFirstTitle).not.toBe(firstPageFirstTitle);
  
  // Click previous button to go back
  const prevButton = page.locator('[data-testid="pagination-prev"]');
  await prevButton.click();
  
  // Verify back on page 1
  await expect(page).toHaveURL(/page=1/);
});
```

### Example Test: API Endpoint Direct Testing

```typescript
test('should fetch movies from API endpoint', async ({ page }) => {
  // Make direct API request
  const response = await page.request.get(
    `${baseURL}/api/movies/search?query=batman&page=1`
  );
  
  // Verify response status
  expect(response.status()).toBe(200);
  
  // Parse response JSON
  const data = await response.json();
  
  // Verify response structure
  expect(data).toHaveProperty('page');
  expect(data).toHaveProperty('results');
  expect(data).toHaveProperty('total_pages');
  expect(data).toHaveProperty('total_results');
  
  // Verify results contain movies
  expect(data.results.length).toBeGreaterThan(0);
  
  // Verify movie object structure
  const firstMovie = data.results[0];
  expect(firstMovie).toHaveProperty('id');
  expect(firstMovie).toHaveProperty('title');
  expect(firstMovie).toHaveProperty('poster_path');
  expect(firstMovie).toHaveProperty('vote_average');
});
```

### Example Test: Error Handling

```typescript
test('should handle missing query parameter error', async ({ page }) => {
  // Make API request without required parameter
  const response = await page.request.get(`${baseURL}/api/movies/search`);
  
  // Verify 400 status code
  expect(response.status()).toBe(400);
  
  // Parse error response
  const data = await response.json();
  
  // Verify error structure
  expect(data).toHaveProperty('error');
  expect(data.error).toContain('Missing required');
  expect(data.error).toContain('query');
});
```

---

## 6. Interactive API Documentation

The application provides an interactive API specification endpoint that documents all available endpoints.

#### GET `/api`

Returns the complete OpenAPI-like specification for all available endpoints.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| *(none)* | - | - | No parameters required |

**Example Request:**
```bash
curl http://localhost:3000/api | jq
```

**Response Structure:**
```json
{
  "info": {
    "title": "Movies App API",
    "version": "1.0.0",
    "description": "REST API for the Movies application. Proxies requests to the TMDB mock backend."
  },
  "baseUrl": "/api",
  "endpoints": [
    {
      "method": "GET",
      "path": "/api/genres",
      "summary": "List all movie genres",
      "params": [],
      "example": "/api/genres"
    },
    {
      "method": "GET",
      "path": "/api/movies/search",
      "summary": "Search movies by title",
      "params": [
        {
          "name": "query",
          "type": "string",
          "required": true,
          "description": "Search term"
        },
        {
          "name": "page",
          "type": "number",
          "required": false,
          "description": "Page number (default 1)"
        }
      ],
      "example": "/api/movies/search?query=batman&page=1"
    }
  ]
}
```

---

## 7. File Map & Directory Structure

```
playwright-movies-app/
│
├── pages/                                  # Next.js page routes (Routable)
│   ├── index.js                           # [/] Home page with static categories (Popular, Top Rated, Upcoming, Now Playing)
│   ├── 404.js                             # [/404] Custom 404 not found page
│   ├── error.js                           # [/error] Custom error page
│   ├── _app.js                            # [FRAMEWORK] App wrapper with Redux Provider, Theme, Auth providers
│   ├── _document.js                       # [FRAMEWORK] HTML document structure and global config
│   ├── _error.js                          # [FRAMEWORK] Error boundary component
│   │
│   ├── api/                               # Next.js API routes (Backend, Non-routable)
│   │   ├── index.ts                       # [GET /api] API specification endpoint
│   │   │
│   │   ├── configuration/
│   │   │   └── index.ts                   # [GET /api/configuration] TMDB config (image sizes, URLs)
│   │   │
│   │   ├── genres/
│   │   │   └── index.ts                   # [GET /api/genres] List all movie genres
│   │   │
│   │   ├── movies/
│   │   │   ├── search.ts                  # [GET /api/movies/search] Search movies by title
│   │   │   ├── discover.ts                # [GET /api/movies/discover] Discover/filter movies by genre/cast
│   │   │   │
│   │   │   └── [id]/
│   │   │       ├── index.ts               # [GET /api/movies/{id}] Movie details or static categories
│   │   │       ├── credits.ts             # [GET /api/movies/{id}/credits] Movie cast and crew
│   │   │       └── recommendations.ts     # [GET /api/movies/{id}/recommendations] Recommended movies
│   │   │
│   │   └── person/
│   │       └── [id].ts                    # [GET /api/person/{id}] Person/actor/director details
│   │
│   ├── genre/
│   │   └── index.js                       # [/genre?id={id}&name={name}&page={page}] Genre movies browsing
│   │
│   ├── movie/
│   │   └── index.js                       # [/movie?id={id}&page={page}] Movie details with cast & recommendations
│   │
│   ├── person/
│   │   └── index.js                       # [/person?id={id}&page={page}] Actor/person profile with filmography
│   │
│   ├── search/
│   │   └── index.js                       # [/search?searchTerm={q}&page={page}] Search results page
│   │
│   ├── list/                              # [/list/*] Custom user list management pages
│   │
│   └── my-lists/                          # [/my-lists/*] User favorites and watchlist pages
│
├── components/                             # Reusable React UI components (Presentational)
│   ├── MovieList/                          # Movie grid/list display component
│   ├── MovieSummary/                       # Movie detail summary/info component
│   ├── PersonSummary/                      # Person profile summary component
│   ├── PersonMovieList/                    # Actor filmography list component
│   ├── RecommendedMovieList/               # Recommended movies carousel component
│   ├── Menu/                               # Navigation menu component
│   ├── Pagination/                         # Pagination controls component
│   ├── SortBy/                             # Sort dropdown selector component
│   ├── SearchBar/                          # Search input component
│   ├── Rating/                             # Movie rating display component
│   ├── Image/                              # Image component with loading & fallback
│   ├── AnchorButton/                       # Link-styled button component
│   ├── LinkButton/                         # Navigation button component
│   ├── BackButton/                         # Back navigation button component
│   ├── ImageLoadingPlaceholder/            # Skeleton/placeholder for images
│   ├── PosterLink/                         # Movie poster as clickable link
│   ├── PosterTitle/                        # Movie poster with title overlay
│   ├── UI/                                 # Generic UI components folder
│   │   ├── Loader.js                       # Loading spinner component
│   │   └── ...                             # Other UI utility components
│   └── ...                                 # Additional utility components
│
├── containers/                             # Smart/Container components (Redux-connected)
│   ├── SearchBar/                          # Search container (dispatches search actions)
│   ├── Sidebar/                            # Sidebar navigation container
│   ├── ListNavigation/                     # List view navigation container
│   ├── ListActions/                        # List action buttons container
│   ├── DarkModeToggle/                     # Theme toggle container
│   ├── AppHeader/                          # App header container
│   └── ...                                 # Additional smart components
│
├── actions/                                # Redux action creators (dispatch creators)
│   ├── getMovie.js                         # Action: Fetch single movie from /api/movies/{id}
│   ├── getMovies.js                        # Action: Internal helper for fetching multiple movies
│   ├── getGenres.js                        # Action: Fetch genres from /api/genres
│   ├── getGenreMovies.js                   # Action: Fetch genre-filtered movies from /api/movies/discover
│   ├── getSearchMovies.js                  # Action: Fetch search results from /api/movies/search
│   ├── getStaticCategoryMovies.js          # Action: Fetch popular/top_rated/etc from /api/movies/{category}
│   ├── getPerson.js                        # Action: Fetch person details from /api/person/{id}
│   ├── getPersonMovies.js                  # Action: Fetch actor filmography (credits from each movie)
│   ├── getCredits.js                       # Action: Fetch credits from /api/movies/{id}/credits
│   ├── getRecommendedMovies.js             # Action: Fetch recommendations from /api/movies/{id}/recommendations
│   ├── clearMovie.js                       # Action: Clear movie from Redux state
│   ├── clearMovies.js                      # Action: Clear movies list from Redux state
│   ├── clearPerson.js                      # Action: Clear person from Redux state
│   ├── clearPersonMovies.js                # Action: Clear filmography from Redux state
│   ├── clearRecommendedMovies.js           # Action: Clear recommendations from Redux state
│   ├── clearError.js                       # Action: Clear error message from Redux state
│   ├── setSelectedMenuItemName.js          # Action: Update currently selected menu item
│   ├── init.js                             # Action: Initialize app state on load
│   ├── getConfig.js                        # Action: Fetch app config from /api/configuration
│   └── types.js                            # Action type constants (Redux action types)
│
├── reducers/                               # Redux state reducers (state transformers)
│   ├── general.js                          # Reducer: loading/error states
│   ├── movies.js                           # Reducer: movies list state (search/discover results)
│   ├── movie.js                            # Reducer: single movie details state
│   ├── person.js                           # Reducer: person profile state
│   ├── personMovies.js                     # Reducer: filmography/credits state
│   ├── recommendedMovies.js                # Reducer: recommended movies state
│   └── index.js                            # CombineReducers root reducer
│
├── lib/                                    # Utility libraries & helpers
│   └── tmdb.ts                             # TMDB API client: auth, request building, error handling
│
├── config/                                 # Application configuration
│   ├── tmdb.ts                             # TMDB API keys and endpoint URLs
│   ├── image-sizes.js                      # Image size configuration for responsive images
│   ├── imdb.js                             # IMDb link builder utility
│   └── app-level.js                        # App-level settings and constants
│
├── contexts/                               # React Context providers (State providers)
│   ├── theme-context.js                    # Dark/light mode theme context provider
│   └── auth-context.js                     # Authentication context provider
│
├── styles/                                 # CSS and styling files
│   ├── global.js                           # Global application styles
│   └── ...                                 # Component-specific style files
│
├── utils/                                  # Utility functions and helpers
│   ├── constants/
│   │   ├── query-params.js                 # Query parameter key names (id, page, etc)
│   │   ├── links.js                        # Route path constants
│   │   ├── static-movie-categories.js      # Category names: popular, top_rated, etc
│   │   └── select-search.js                # Sort options for SortBy component
│   │
│   ├── helpers/
│   │   ├── checkEmptyObject.js             # Empty object validator
│   │   └── ...                             # Additional helper functions
│   │
│   ├── hocs/
│   │   ├── ThemeProvider.js                # Theme provider Higher-Order Component
│   │   └── AuthProvider.js                 # Auth provider Higher-Order Component
│   │
│   └── ...                                 # Additional utility files
│
├── parts/                                  # Page layout sections/parts
│   ├── Layout.js                           # Main layout wrapper for all pages
│   ├── Header.js                           # Page header component
│   ├── Sidebar.js                          # Sidebar navigation
│   ├── PageWrapper.js                      # Page container wrapper
│   ├── PaddingWrapper.js                   # Padding/spacing wrapper
│   ├── MovieList.js                        # Movie grid/list part
│   ├── MovieSummary.js                     # Movie info section
│   ├── PersonSummary.js                    # Person info section
│   ├── ErrorBox.js                         # Error display component
│   ├── NotFound.js                         # Not found (404) display
│   ├── GradientImageWrapper.js             # Gradient overlay image wrapper
│   └── ...                                 # Additional page parts
│
├── public/                                 # Static assets (images, fonts, etc)
│   ├── favicon.ico
│   ├── images/
│   └── ...
│
├── store.js                                # Redux store configuration & initialization
├── tsconfig.json                           # TypeScript configuration
├── next.config.ts                          # Next.js build and runtime configuration
├── package.json                            # Node.js dependencies & npm scripts
├── README.md                               # Project overview and getting started
├── SETUP.md                                # Setup instructions
├── SETUP2.MD                               # (This file) Complete API & Pages Documentation
├── playwright.config.ts                    # Playwright test configuration
└── .env.example                            # Environment variables template
```

---

## Summary & Quick Reference

### Key Technologies
- **Frontend:** React, Redux (state management), Next.js (routing/SSR)
- **Backend:** Next.js API routes, Node.js
- **External API:** TMDB Mock Backend (https://movies-tmdb-mock.azurewebsites.net)
- **Testing:** Playwright

### Core Concepts
- **Redux Flow:** Component dispatches action → Thunk calls API route → Route proxies to TMDB → Response stored in Redux state → Component re-renders
- **Authentication:** Bearer token (default) or API key (static categories)
- **Pagination:** All list endpoints support `page` parameter (1-indexed)
- **Error Handling:** Consistent JSON error responses with appropriate HTTP status codes

### Pages at a Glance
| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Popular, Top Rated, Upcoming, Now Playing categories |
| Genre | `/genre?id={id}&name={name}&page={page}` | Movies filtered by genre |
| Movie | `/movie?id={id}&page={page}` | Movie details, cast, recommendations |
| Person | `/person?id={id}&page={page}` | Actor profiles and filmography |
| Search | `/search?searchTerm={q}&page={page}` | Search results |

### API Endpoints at a Glance
```
GET /api/configuration              # TMDB config
GET /api/genres                     # List genres
GET /api/movies/search              # Search movies
GET /api/movies/discover            # Filter/discover movies
GET /api/movies/{id}                # Movie details or category
GET /api/movies/{id}/credits        # Cast and crew
GET /api/movies/{id}/recommendations # Recommendations
GET /api/person/{id}                # Person details
```

---

**For more information, see [README.md](README.md) and [SETUP.md](SETUP.md)**
