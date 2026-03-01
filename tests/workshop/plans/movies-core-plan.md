# Movies App - Core Functionality Test Plan

## Application Overview

The Movies app is a Next.js-based movie discovery platform that provides comprehensive movie browsing and search capabilities. The application is hosted at `localhost:3000` and features:

- **Movie Discovery**: Browse popular, top-rated, and upcoming movies
- **Genre Filtering**: Filter movies by 18+ different genres (Action, Comedy, Drama, etc.) 
- **Search Functionality**: Full-text search across the movie database
- **Movie Details**: Detailed movie pages with cast, synopsis, ratings, and recommendations
- **Pagination**: Navigate through multiple pages of movie results
- **Theme Switching**: Toggle between light and dark modes
- **User Simulation**: Mock login state with user profile and list management
- **Responsive Design**: TMDB-powered movie data with poster images and ratings

The app uses TMDB (The Movie Database) as its data source and includes demo banners indicating it's a test environment.

## Test Scenarios

### 1. Homepage Load and Initial State

**Seed:** `tests/seed.spec.ts`

#### 1.1 Homepage Loads Successfully

**File:** `tests/homepage/homepage-load.spec.ts`

**Preconditions:**
- Application is running on localhost:3000
- No prior session or cookies set

**Given/When/Then:**
- **Given** I navigate to `localhost:3000` 
- **When** the page loads completely
- **Then** I should see:
  - Page title contains "Popular Movies"
  - URL updates to `/?category=Popular&page=1`
  - Demo banner stating "This is a demo intended for testing. Data and images are provided by TMDB"
  - Loading state disappears
  - Movies grid displays with movie posters
  - Left sidebar navigation is visible
  - Header with search bar and theme toggle is present

**Expected Assertions:**
- Page loads within 5 seconds
- At least 20 movie items are displayed in the grid
- All movie posters load successfully (no broken images)
- Popular category is highlighted/active in sidebar
- Star ratings are visible for each movie

#### 1.2 Navigation Sidebar Structure

**File:** `tests/homepage/sidebar-navigation.spec.ts`

**Preconditions:**
- Homepage has loaded successfully

**Given/When/Then:**
- **Given** I am on the homepage
- **When** I examine the left sidebar navigation
- **Then** I should see:
  - "Discover" section with: Popular, Top Rated, Upcoming
  - "Genres" section with all 18+ genres listed
  - TMDB logo at bottom
  - All navigation items are clickable links

**Expected Assertions:**
- Popular link shows as active/selected state
- All genre links have proper URLs (`/genre?id=X&name=Y&page=1`)
- Discover links have proper URLs (`/?category=X&page=1`)

### 2. Search Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1 Basic Movie Search

**File:** `tests/search/basic-movie-search.spec.ts`

**Preconditions:**
- Application is loaded on homepage

**Given/When/Then:**
- **Given** I am on any page of the application
- **When** I click on the search input field
- **And** I type "Avengers"
- **And** I press Enter or submit the search
- **Then** I should be redirected to `/search?searchTerm=Avengers&page=1`
- **And** the page title should update to "Avengers - Search Results"
- **And** a list of Avengers-related movies should display
- **And** the search input should retain the search term

**Expected Assertions:**
- Search results contain movies with "Avengers" in the title
- Each search result shows poster, title, and rating
- Search term persists in the input field
- Results are paginated if more than 20 movies found

#### 2.2 Empty Search Results

**File:** `tests/search/empty-search-results.spec.ts`

**Preconditions:**
- Application is loaded

**Given/When/Then:**
- **Given** I am on any page
- **When** I search for a nonsensical term like "XYZ123NOTFOUND"
- **Then** I should see appropriate empty state messaging
- **And** the URL should reflect the search term
- **And** no movies should be displayed

**Expected Assertions:**
- Proper handling of no results scenario
- URL correctly formatted with search term
- No error messages or broken UI elements

#### 2.3 Search Input Persistence

**File:** `tests/search/search-persistence.spec.ts`

**Preconditions:**
- Previous search has been performed

**Given/When/Then:**
- **Given** I have performed a search for "Batman"
- **When** I navigate to a different page (like genre or movie details)
- **And** I return to search results or examine the search input
- **Then** the search term should still be visible in the input field
- **And** I can modify or clear the search term

**Expected Assertions:**
- Search term persists across page navigation
- Search input can be cleared and new searches performed
- Search functionality works from any page in the application

### 3. Genre Filtering

**Seed:** `tests/seed.spec.ts`

#### 3.1 Action Genre Filter

**File:** `tests/genre/action-genre-filter.spec.ts`

**Preconditions:**
- Homepage is loaded

**Given/When/Then:**
- **Given** I am on the homepage
- **When** I click on "Action" in the Genres section
- **Then** I should be redirected to `/genre?id=28&name=Action&page=1`
- **And** the page title should update to "Action Movies"
- **And** the Action genre should show as active/selected
- **And** a list of action movies should display
- **And** a "Sort By" dropdown should be visible

**Expected Assertions:**
- URL contains correct genre ID (28) and name (Action)
- Only action movies are displayed
- Sort dropdown shows "Popularity" as default
- Page displays movie count appropriate for the genre
- Action link in sidebar shows active state

#### 3.2 Genre Sort Functionality

**File:** `tests/genre/genre-sort-functionality.spec.ts`

**Preconditions:**
- Action genre page is loaded

**Given/When/Then:**
- **Given** I am on the Action genre page (`/genre?id=28&name=Action&page=1`)
- **When** I click on the "Sort By" dropdown
- **And** I select a different sort option
- **Then** the movie list should reorder according to the selected sort criteria
- **And** the URL should update to reflect the sort parameter
- **And** the dropdown should show the selected sort option

**Expected Assertions:**
- Movies reorder visibly when sort changes
- Sort options include multiple criteria (Popularity, Rating, Release Date, etc.)
- URL parameters update correctly
- Movie grid maintains proper layout after sorting

#### 3.3 Multiple Genre Navigation

**File:** `tests/genre/multiple-genre-navigation.spec.ts`

**Preconditions:**
- Application is loaded

**Given/When/Then:**
- **Given** I am on the homepage 
- **When** I click on "Comedy" genre
- **Then** I should see comedy movies
- **When** I then click on "Horror" genre  
- **Then** I should see horror movies
- **And** the URL should update to reflect the Horror genre
- **And** the Horror genre should show as active

**Expected Assertions:**
- Each genre selection updates the active state correctly
- Movie lists change appropriately for each genre
- URL parameters update correctly for each genre
- No stale data from previous genre selections

### 4. Movie Details Navigation

**Seed:** `tests/seed.spec.ts`

#### 4.1 Navigate to Movie Details

**File:** `tests/movie-details/navigate-to-details.spec.ts`

**Preconditions:**
- Homepage with movie list is loaded

**Given/When/Then:**
- **Given** I am on a page with movie listings (homepage, genre, or search)
- **When** I click on any movie poster or title
- **Then** I should be redirected to `/movie?id=MOVIE_ID&page=1`
- **And** the page title should update to include the movie title
- **And** the movie details page should load with comprehensive information

**Expected Assertions:**
- URL contains correct movie ID parameter
- Page title includes movie name
- Movie details page loads completely within 5 seconds

#### 4.2 Movie Details Content Verification

**File:** `tests/movie-details/details-content-verification.spec.ts`

**Preconditions:**
- Movie details page has loaded (e.g., Deadpool & Wolverine)

**Given/When/Then:**  
- **Given** I am on a specific movie details page
- **When** the page loads completely
- **Then** I should see the following sections:
  - Movie title and tagline
  - Star rating and numerical score
  - Language, duration, and release year
  - "The Genres" section with clickable genre links
  - "The Synopsis" section with movie description
  - "The Cast" section with actor photos and names
  - Cast member scroll buttons (left/right)
  - External links (Website, IMDB, Trailer)
  - Back button

**Expected Assertions:**
- All sections render with proper content
- Cast photos load successfully
- Genre links are functional and redirect to genre pages
- External links open correctly (Website, IMDB)
- Back button returns to previous page
- Cast scroll functionality works

#### 4.3 Cast Member Navigation

**File:** `tests/movie-details/cast-member-navigation.spec.ts`

**Preconditions:**
- Movie details page with cast is loaded

**Given/When/Then:**
- **Given** I am on a movie details page
- **When** I click on any cast member photo or name
- **Then** I should be redirected to `/person?id=PERSON_ID&page=1`
- **And** the person details page should load
- **And** I should see information about that actor/actress

**Expected Assertions:**
- Person URL contains correct person ID
- Person page loads successfully
- Cast member navigation works for multiple actors
- Back navigation returns to movie details

### 5. Recommendations

**Seed:** `tests/seed.spec.ts`

#### 5.1 Recommended Movies Display

**File:** `tests/recommendations/recommended-movies-display.spec.ts`

**Preconditions:**
- Movie details page has loaded

**Given/When/Then:**
- **Given** I am on any movie details page  
- **When** I scroll down to the bottom of the page
- **Then** I should see a "Recommended Movies" section
- **And** multiple recommended movies should be displayed
- **And** each recommended movie should show poster, title, and rating
- **And** recommended movies should be clickable

**Expected Assertions:**
- "Recommended Movies" heading is visible
- At least 8-10 recommended movies are shown
- Each recommendation shows poster image
- Each recommendation has title and star rating
- Posters load without errors

#### 5.2 Recommended Movie Navigation

**File:** `tests/recommendations/recommended-movie-navigation.spec.ts`

**Preconditions:**
- Movie details page with recommendations is loaded

**Given/When/Then:**
- **Given** I am viewing recommended movies on a movie details page
- **When** I click on any recommended movie poster or title  
- **Then** I should be redirected to that movie's details page
- **And** the new movie details page should load completely
- **And** that movie should also show its own recommendations

**Expected Assertions:**
- Clicking recommendations navigates to correct movie details page
- New movie page loads with all standard details sections
- New movie shows different set of recommendations
- Navigation history works correctly (can go back)

#### 5.3 Recommendation Relevance

**File:** `tests/recommendations/recommendation-relevance.spec.ts`

**Preconditions:**
- Movie details page loaded (test with specific movie like Deadpool & Wolverine)

**Given/When/Then:**
- **Given** I am viewing a specific genre movie (e.g., Action/Comedy) 
- **When** I examine the recommended movies
- **Then** the recommendations should be contextually relevant
- **And** recommended movies should share similar genres or themes
- **And** no duplicate of the current movie should appear in recommendations

**Expected Assertions:**
- Recommended movies share at least one genre with current movie
- Current movie does not appear in its own recommendations
- Recommendations show variety while maintaining relevance
- All recommendations have valid movie data

### 6. Pagination

**Seed:** `tests/seed.spec.ts`

#### 6.1 Homepage Pagination

**File:** `tests/pagination/homepage-pagination.spec.ts`

**Preconditions:**
- Homepage is loaded showing page 1

**Given/When/Then:**
- **Given** I am on the homepage (`/?category=Popular&page=1`)
- **When** I scroll to the bottom of the movie list
- **And** I click on "Page 2" button
- **Then** I should be redirected to `/?category=Popular&page=2`
- **And** a different set of movies should load
- **And** the page title should remain "Popular Movies"

**Expected Assertions:**
- URL updates to page=2
- Movies displayed are different from page 1
- Page 2 loads same number of movies as page 1
- Navigation buttons show current page state

#### 6.2 Genre Page Pagination

**File:** `tests/pagination/genre-pagination.spec.ts`

**Preconditions:**
- Genre page (e.g., Action) is loaded on page 1

**Given/When/Then:**
- **Given** I am on a genre page (`/genre?id=28&name=Action&page=1`)
- **When** I navigate to page 2
- **Then** I should be redirected to `/genre?id=28&name=Action&page=2`
- **And** the movies should change to show page 2 of action movies
- **And** the genre filter should remain active

**Expected Assertions:**
- URL maintains genre ID and name parameters
- Page parameter updates to 2
- Genre-specific movies load on page 2
- Sort preference persists across pagination

#### 6.3 Search Results Pagination

**File:** `tests/pagination/search-pagination.spec.ts`

**Preconditions:**
- Search results are displayed for a popular term

**Given/When/Then:**
- **Given** I have performed a search with multiple pages of results
- **When** I navigate to page 2 of search results  
- **Then** I should see `/search?searchTerm=TERM&page=2`
- **And** page 2 of search results should load
- **And** the search term should remain in the search input

**Expected Assertions:**
- Search term persists in URL and input field
- Page 2 shows different search results
- Search results maintain relevance on subsequent pages
- Can navigate back to page 1 with search intact

### 7. Mock Login Flow

**Seed:** `tests/seed.spec.ts`

#### 7.1 User Profile Access

**File:** `tests/login/user-profile-access.spec.ts`

**Preconditions:**
- Application is loaded (mock logged-in state is default)

**Given/When/Then:**
- **Given** I am on any page of the application
- **When** I click on the "User Profile" button in the header
- **Then** a dropdown menu should appear with the following options:
  - "Create New List" 
  - "My Lists"
  - "Logout"
- **And** each option should be clickable

**Expected Assertions:**
- User profile dropdown opens on click
- Three menu options are visible and functional
- Dropdown closes when clicking outside
- Profile icon indicates logged-in state

#### 7.2 My Lists Navigation

**File:** `tests/login/my-lists-navigation.spec.ts`

**Preconditions:**
- User profile dropdown is accessible

**Given/When/Then:**
- **Given** I have opened the user profile dropdown
- **When** I click on "My Lists"
- **Then** I should be redirected to `/my-lists?page=1`
- **And** the My Lists page should load
- **And** I should see the user's movie lists (if any)

**Expected Assertions:**
- URL updates to /my-lists with page parameter
- My Lists page loads successfully
- Page shows appropriate content (lists or empty state)
- Navigation back to previous page works

#### 7.3 Create New List Navigation

**File:** `tests/login/create-list-navigation.spec.ts`

**Preconditions:**
- User profile dropdown is accessible

**Given/When/Then:**
- **Given** I have opened the user profile dropdown  
- **When** I click on "Create New List"
- **Then** I should be redirected to `/list/add-or-edit`
- **And** the list creation page should load
- **And** I should see a form to create a new movie list

**Expected Assertions:**
- URL updates to /list/add-or-edit
- List creation page loads successfully
- Form elements are present and functional
- Can navigate back without creating a list

#### 7.4 Mock Logout Flow

**File:** `tests/login/mock-logout-flow.spec.ts`

**Preconditions:**
- User is in mock logged-in state

**Given/When/Then:**
- **Given** I have opened the user profile dropdown
- **When** I click on "Logout"
- **Then** the application should simulate a logout action
- **And** the user interface should update to reflect logged-out state
- **And** the user profile button should show logged-out state

**Expected Assertions:**
- Logout action completes successfully
- UI updates to show logged-out state
- User profile dropdown is no longer accessible or shows login option
- Application remains functional after logout

### 8. Theme Toggle

**Seed:** `tests/seed.spec.ts`

#### 8.1 Light to Dark Theme Toggle

**File:** `tests/theme/light-to-dark-toggle.spec.ts`

**Preconditions:**
- Application loads in light theme (default)

**Given/When/Then:**
- **Given** I am on any page with light theme active
- **When** I click on the dark mode button (☾ moon icon)
- **Then** the application should switch to dark theme
- **And** the toggle switch should show as checked/active
- **And** the dark theme button should show as active
- **And** all page elements should render in dark colors

**Expected Assertions:**
- Theme changes immediately without page reload
- Toggle switch visually updates to checked state
- Dark mode button shows active state
- Background, text, and UI elements use dark theme colors
- All pages maintain dark theme after navigation

#### 8.2 Dark to Light Theme Toggle

**File:** `tests/theme/dark-to-light-toggle.spec.ts`

**Preconditions:**
- Application is in dark theme mode

**Given/When/Then:**
- **Given** I am on any page with dark theme active
- **When** I click on the light mode button (☀ sun icon)
- **Then** the application should switch to light theme
- **And** the toggle switch should show as unchecked/inactive
- **And** the light theme button should show as active
- **And** all page elements should render in light colors

**Expected Assertions:**
- Theme changes immediately without page reload
- Toggle switch visually updates to unchecked state
- Light mode button shows active state
- Background, text, and UI elements use light theme colors
- Theme preference persists across page navigation

#### 8.3 Theme Persistence

**File:** `tests/theme/theme-persistence.spec.ts`

**Preconditions:**
- User has switched to dark theme

**Given/When/Then:**
- **Given** I have switched to dark theme
- **When** I navigate to different pages (genre, movie details, search)
- **Then** the dark theme should persist across all pages
- **And** when I refresh the browser
- **Then** the theme preference should be maintained

**Expected Assertions:**
- Theme persists across all page navigation
- Theme preference survives browser refresh
- All page types (home, genre, movie details, search) respect theme choice
- Theme toggle state remains consistent across pages

## Test Execution Guidelines

### Prerequisites
- Application running on `localhost:3000`
- Stable internet connection for TMDB API calls
- Modern browser with JavaScript enabled

### Test Data Considerations  
- Tests use real TMDB data which may change over time
- Popular movies, genres, and cast information may vary
- Search results depend on TMDB database current state
- Some tests may need periodic updates for specific movie titles

### Cross-Browser Testing
- All scenarios should be tested across Chrome, Firefox, Safari, and Edge
- Mobile viewport testing recommended for responsive behavior
- Theme toggle functionality across different browsers

### Performance Considerations
- Movie poster images should load within 3 seconds
- Page navigation should complete within 5 seconds
- Search results should return within 3 seconds
- No memory leaks during extended usage

This test plan provides comprehensive coverage of the Movies app's core functionality while maintaining realistic expectations for a demo application using external APIs.