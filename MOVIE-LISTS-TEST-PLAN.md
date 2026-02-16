# Movies List Management - Comprehensive Test Plan

## Application Overview

The Movies List Management application is a React/Next.js-based movie database that integrates with The Movie Database (TMDB) API. The application provides comprehensive movie discovery, list management, and user interaction features.

### Core Functionality

*   **Movie Discovery**: Browse movies by categories (Popular, Top Rated, Upcoming) and genres
*   **Search**: Find movies by title keywords
*   **Movie Details**: View comprehensive information about individual movies
*   **Personal Lists**: Create, manage, and organize custom movie lists
*   **Movie List Management**: Add movies to lists, remove from lists, view list contents, and manage movie order
*   **User Management**: Profile management with authentication
*   **Responsive Design**: Theme toggle between light and dark modes
*   **Pagination**: Navigate through large movie collections

## Test Scenarios

### 1\. Homepage and Movie Grid Display

**Seed:** `tests/seed.spec.ts`

#### 1.1 Load Homepage Successfully

**File:** `tests/homepage-display/load-homepage.spec.ts`

**Steps:**

1.  Navigate to `http://localhost:3000`
2.  Wait for page to fully load

**Expected Results:**

*   Page title contains "Movies"
*   Popular movies are displayed by default
*   URL shows `/?category=Popular&page=1`
*   Movie grid displays 20 movies per page
*   Each movie shows poster image, title, and star rating
*   Navigation sidebar is visible with categories and genres

#### 1.2 Verify Movie Grid Layout

**File:** `tests/homepage-display/movie-grid-layout.spec.ts`

**Steps:**

1.  Navigate to homepage
2.  Count visible movie items in the grid
3.  Verify each movie card contains required elements

**Expected Results:**

*   Movie grid contains exactly 20 movie items
*   Each movie card has: poster image, title, star rating
*   Star ratings are displayed as filled/unfilled stars
*   Movie cards are clickable links
*   Grid layout is responsive

#### 1.3 Verify Header Components

**File:** `tests/homepage-display/header-components.spec.ts`

**Steps:**

1.  Navigate to homepage
2.  Verify header elements are present and functional

**Expected Results:**

*   Movie ticket logo is visible
*   Search bar is present with placeholder "Search for a movie..."
*   Theme toggle (☀/☾) is functional
*   User profile button is visible
*   TMDB attribution banner is displayed

### 2\. Navigation and Categories

**Seed:** `tests/seed.spec.ts`

#### 2.1 Navigate Between Discover Categories

**File:** `tests/navigation/discover-categories.spec.ts`

**Steps:**

1.  Navigate to homepage (Popular)
2.  Click "Top Rated" in sidebar
3.  Verify URL and page content
4.  Click "Upcoming" in sidebar
5.  Verify URL and page content
6.  Click "Popular" to return

**Expected Results:**

*   Each category click updates URL correctly:
    *   Popular: `/?category=Popular&page=1`
    *   Top Rated: `/?category=Top+Rated&page=1`
    *   Upcoming: `/?category=Upcoming&page=1`
*   Page title updates accordingly
*   Movie grid refreshes with category-appropriate content
*   Active category is highlighted in sidebar

#### 2.2 Navigate Between Genre Categories

**File:** `tests/navigation/genre-categories.spec.ts`

**Steps:**

1.  Navigate to homepage
2.  Click "Action" genre in sidebar
3.  Verify URL shows `/genre?id=28&name=Action&page=1`
4.  Test 3 additional genres (Comedy, Horror, Sci-Fi)
5.  Verify each shows appropriate URL pattern

**Expected Results:**

*   Genre URLs follow pattern: `/genre?id={id}&name={name}&page=1`
*   Page updates with genre-specific movies
*   Page title reflects selected genre
*   Genre remains highlighted in sidebar

#### 2.3 Sidebar Navigation Persistence

**File:** `tests/navigation/sidebar-persistence.spec.ts`

**Steps:**

1.  Navigate to various categories and genres
2.  Verify sidebar remains visible and functional
3.  Test navigation from different starting points

**Expected Results:**

*   Sidebar always visible across all movie list pages
*   All categories and genres remain clickable
*   Active selection is consistently highlighted
*   TMDB logo/attribution remains at bottom of sidebar

### 3\. Movie Details and Interactions

**Seed:** `tests/seed.spec.ts`

#### 3.1 Navigate to Movie Details

**File:** `tests/movie-details/navigate-to-details.spec.ts`

**Steps:**

1.  Navigate to homepage
2.  Click on first movie poster/title
3.  Verify movie details page loads
4.  Test navigation back to list

**Expected Results:**

*   Movie details URL follows pattern: `/movie?id={id}&page=1`
*   Movie details page displays:
    *   Movie title and tagline
    *   Star rating with numeric score
    *   Language, duration, and release year
    *   Genres list with clickable genre links
*   Browser back button returns to previous list page
*   Page title updates to movie title

#### 3.2 Genre Links from Movie Details

**File:** `tests/movie-details/genre-navigation.spec.ts`

**Steps:**

1.  Navigate to movie details page
2.  Click on a genre link in movie details
3.  Verify navigation to genre page

**Expected Results:**

*   Clicking genre navigates to genre movie list
*   URL updates correctly to genre format
*   Movies displayed match the selected genre
*   Can navigate back to original movie details

#### 3.3 Movie Rating Display

**File:** `tests/movie-details/rating-display.spec.ts`

**Steps:**

1.  Navigate to multiple movie details pages
2.  Verify rating display format
3.  Test rating consistency between list and details

**Expected Results:**

*   Star rating displayed consistently
*   Numeric rating shown (e.g., "7.574")
*   Rating matches between list view and details view
*   Stars accurately represent numeric rating

### 4\. Search Functionality

**Seed:** `tests/seed.spec.ts`

#### 4.1 Perform Basic Search

**File:** `tests/search/basic-search.spec.ts`

**Steps:**

1.  Navigate to homepage
2.  Click in search input field
3.  Type "Deadpool"
4.  Press Enter or click search button

**Expected Results:**

*   Navigate to URL: `/search?searchTerm=Deadpool&page=1`
*   Page title updates to search results
*   Search results display matching movies
*   Search term remains in input field
*   Results show same grid layout as other lists

#### 4.2 Handle No Search Results

**File:** `tests/search/no-results.spec.ts`

**Steps:**

1.  Navigate to homepage
2.  Search for "invalidmovietitle12345"
3.  Verify no results page

**Expected Results:**

*   URL shows search term in querystring
*   Page displays "Sorry!" heading
*   Shows "There were no results for {searchTerm}..." message
*   "Not found!" image is displayed
*   "Home" button provides navigation back to homepage

#### 4.3 Search Input Validation

**File:** `tests/search/search-validation.spec.ts`

**Steps:**

1.  Test empty search submission
2.  Test search with special characters
3.  Test search with very long strings
4.  Test search with numbers only

**Expected Results:**

*   Empty search handles gracefully (no navigation or shows all movies)
*   Special characters are properly encoded in URL
*   Long search terms are handled without errors
*   Numeric searches work correctly

### 5\. Pagination

**Seed:** `tests/seed.spec.ts`

#### 5.1 Navigate to Next Page

**File:** `tests/pagination/next-page-navigation.spec.ts`

**Steps:**

1.  Navigate to homepage (Popular movies)
2.  Scroll to bottom to find pagination
3.  Click "Page 2" button
4.  Verify page 2 loads correctly

**Expected Results:**

*   URL updates to `/?category=Popular&page=2`
*   Page 2 loads with different set of movies
*   Page title may update to reflect pagination
*   Movies displayed are different from page 1

#### 5.2 Pagination Across Categories

**File:** `tests/pagination/category-pagination.spec.ts`

**Steps:**

1.  Navigate to "Top Rated" category
2.  Navigate to page 2 of Top Rated
3.  Switch to "Upcoming" category
4.  Verify pagination resets to page 1

**Expected Results:**

*   Each category maintains independent pagination
*   Switching categories resets to page 1
*   Page 2 URLs are category-specific:
    *   `/?category=Top+Rated&page=2`
    *   `/?category=Upcoming&page=1`

#### 5.3 Genre Pagination

**File:** `tests/pagination/genre-pagination.spec.ts`

**Steps:**

1.  Navigate to "Action" genre
2.  Navigate to page 2 if available
3.  Switch to different genre
4.  Verify pagination behavior

**Expected Results:**

*   Genre pages support pagination
*   URL pattern: `/genre?id={id}&name={name}&page=2`
*   Switching genres resets to page 1
*   Pagination controls display when applicable

### 6\. User Profile and Authentication

**Seed:** `tests/seed.spec.ts`

#### 6.1 Access User Profile Menu

**File:** `tests/user-profile/profile-menu-access.spec.ts`

**Steps:**

1.  Navigate to homepage
2.  Click "User Profile" button in header
3.  Verify dropdown menu appears

**Expected Results:**

*   Dropdown menu displays with three options:
    *   "Create New List" (links to `/list/add-or-edit`)
    *   "My Lists" (links to `/my-lists?page=1`)
    *   "Logout" button
*   Menu remains open until clicked elsewhere
*   All menu items are clickable

#### 6.2 Navigate to My Lists

**File:** `tests/user-profile/my-lists-navigation.spec.ts`

**Steps:**

1.  Click User Profile button
2.  Click "My Lists" from dropdown
3.  Verify My Lists page loads

**Expected Results:**

*   Navigate to `/my-lists?page=1`
*   Page title shows "My Lists"
*   Header shows "My Lists" and "TMDB"
*   If no lists exist, shows "There's no lists yet. Let's change that!"
*   "Create your first list" button is present

#### 6.3 Logout Functionality

**File:** `tests/user-profile/logout.spec.ts`

**Steps:**

1.  Click User Profile button
2.  Click "Logout" button
3.  Verify logout behavior

**Expected Results:**

*   User is logged out successfully
*   Session cleared
*   May redirect to login page or guest state
*   User profile button behavior changes appropriately

### 7\. List Management

**Seed:** `tests/seed.spec.ts`

#### 7.1 Access Create New List

**File:** `tests/list-management/create-list-access.spec.ts`

**Steps:**

1.  Click User Profile button
2.  Click "Create New List"
3.  Verify form loads correctly

**Expected Results:**

*   Navigate to `/list/add-or-edit`
*   Page title shows "Create New List"
*   Form contains:
    *   "Name" text input field
    *   "Description" text input field
    *   "Public List?" dropdown set to "Yes"
    *   "Continue" button

#### 7.2 Create New List - Form Validation

**File:** `tests/list-management/create-list-validation.spec.ts`

**Steps:**

1.  Navigate to Create New List page
2.  Submit form with empty fields
3.  Test with only name filled
4.  Test with all fields filled
5.  Test public/private toggle

**Expected Results:**

*   Form validates required fields appropriately
*   Name field is required for submission
*   Description field accepts long text
*   Public/Private dropdown toggles between "Yes" and "No"
*   "Continue" button submits form when valid

#### 7.3 Create List - Complete Flow

**File:** `tests/list-management/create-list-complete.spec.ts`

**Steps:**

1.  Navigate to Create New List
2.  Fill out form completely:
    *   Name: "My Favorite Action Movies"
    *   Description: "Collection of best action films"
    *   Public: "No" (Private)
3.  Click "Continue"
4.  Verify list creation success

**Expected Results:**

*   Form submits successfully
*   May navigate to list details or movie selection page
*   New list appears in "My Lists"
*   List properties saved correctly (private status, name, description)

#### 7.4 Manage Existing Lists

**File:** `tests/list-management/manage-existing-lists.spec.ts`

**Steps:**

1.  Create one or more lists via Create New List flow
2.  Navigate to "My Lists"
3.  Verify lists are displayed
4.  Test list interactions (view, edit, delete if available)

**Expected Results:**

*   Created lists appear in My Lists page
*   Each list shows name and basic information
*   Lists are clickable for viewing/editing
*   List management options are available
*   Page shows appropriate message when lists exist

#### 7.5 Add Movies to List from Movie Details

**File:** `tests/list-management/add-movie-from-details.spec.ts`

**Steps:**

1.  Create a new list named "Action Favorites"
2.  Navigate to homepage and click on an action movie
3.  On movie details page, look for "Add to List" or similar functionality
4.  Select the "Action Favorites" list
5.  Confirm movie is added to list
6.  Navigate to "My Lists" and verify movie appears

**Expected Results:**

*   Movie details page has "Add to List" functionality
*   User can select from existing lists in dropdown/modal
*   Movie is successfully added to selected list
*   List shows updated movie count
*   Movie appears when viewing list contents

#### 7.6 Add Movies to List from Movie Grid

**File:** `tests/list-management/add-movie-from-grid.spec.ts`

**Steps:**

1.  Create a new list named "Comedy Collection"
2.  Navigate to Comedy genre page
3.  Find "Add to List" functionality on movie cards
4.  Add multiple movies to "Comedy Collection"
5.  Verify additions in My Lists

**Expected Results:**

*   Movie cards have "Add to List" buttons/icons
*   Can add movies without leaving the grid view
*   Multiple movies can be added to same list
*   Visual feedback confirms successful additions
*   List contents update accurately

#### 7.7 Remove Movies from Lists

**File:** `tests/list-management/remove-movies-from-list.spec.ts`

**Steps:**

1.  Create list and add several movies to it
2.  Navigate to list contents view
3.  Find and use "Remove" functionality for one movie
4.  Confirm removal and verify list updates
5.  Test removing multiple movies

**Expected Results:**

*   List contents page shows all added movies
*   Each movie has remove/delete option
*   Removal confirmation dialog appears (optional)
*   Movie is removed from list immediately
*   List count and contents update correctly

#### 7.8 View List Contents and Details

**File:** `tests/list-management/view-list-contents.spec.ts`

**Steps:**

1.  Create list with descriptive name and description
2.  Add 5-10 movies to the list
3.  Navigate to list contents from "My Lists"
4.  Verify list display and movie information

**Expected Results:**

*   List contents page shows list name and description
*   All added movies are displayed with posters and titles
*   Movies may show ratings and brief details
*   List metadata (creation date, movie count) is visible
*   Movies are clickable to view details

#### 7.9 Bulk Add Movies to Lists

**File:** `tests/list-management/bulk-add-movies.spec.ts`

**Steps:**

1.  Create a new list "Must Watch"
2.  Navigate to Popular movies page
3.  Look for bulk selection functionality
4.  Select multiple movies (3-5)
5.  Add selected movies to "Must Watch" list

**Expected Results:**

*   Multiple movie selection is possible (checkboxes/multi-select)
*   Bulk actions toolbar appears when movies selected
*   "Add to List" option available for multiple movies
*   All selected movies added to chosen list
*   Success confirmation shown for bulk operation

#### 7.10 Manage Movie Order in Lists

**File:** `tests/list-management/reorder-movies-in-list.spec.ts`

**Steps:**

1.  Create list and add several movies
2.  View list contents
3.  Look for reordering functionality (drag-drop, up/down arrows)
4.  Change the order of movies in the list
5.  Verify order persists after page refresh

**Expected Results:**

*   Movies in list can be reordered by user
*   Drag-and-drop or arrow controls available
*   Visual feedback during reordering process
*   New order saves automatically
*   Order persists across sessions

#### 7.11 Add Movies from Search Results

**File:** `tests/list-management/add-from-search.spec.ts`

**Steps:**

1.  Create list "Sci-Fi Favorites"
2.  Search for "Star Wars" movies
3.  Add search results to the created list
4.  Verify movies appear in list

**Expected Results:**

*   Search results have "Add to List" functionality
*   Can add movies directly from search results
*   Multiple movies from search can be added
*   Search doesn't reset when adding to lists
*   Added movies appear correctly in target list

#### 7.12 Duplicate Movie Prevention

**File:** `tests/list-management/duplicate-prevention.spec.ts`

**Steps:**

1.  Create a list and add a specific movie to it
2.  Attempt to add the same movie to the list again
3.  Verify duplicate handling behavior

**Expected Results:**

*   System prevents adding duplicate movies to same list
*   Clear messaging when duplicate detected
*   Option to add to different list is available
*   List integrity maintained without duplicates

#### 7.13 List Sharing and Privacy

**File:** `tests/list-management/list-privacy-sharing.spec.ts`

**Steps:**

1.  Create both public and private lists
2.  Add movies to both types of lists
3.  Test visibility and sharing functionality
4.  Verify privacy settings work correctly

**Expected Results:**

*   Public lists are discoverable by other users
*   Private lists remain user-exclusive
*   List privacy can be toggled after creation
*   Shared lists maintain proper access controls
*   List URLs work correctly for public lists

### 8\. Theme and UI Controls

**Seed:** `tests/seed.spec.ts`

#### 8.1 Dark/Light Mode Toggle

**File:** `tests/theme/mode-toggle.spec.ts`

**Steps:**

1.  Navigate to homepage
2.  Note current theme (light/dark)
3.  Click theme toggle checkbox
4.  Verify theme changes
5.  Toggle back to original

**Expected Results:**

*   Theme toggle switches between light and dark modes
*   Visual changes are immediately apparent
*   Toggle state reflects current theme
*   Theme preference persists during session
*   All page elements adapt to theme change

#### 8.2 Theme Persistence

**File:** `tests/theme/theme-persistence.spec.ts`

**Steps:**

1.  Set theme to dark mode
2.  Navigate to different pages (movie details, search, lists)
3.  Verify theme consistency
4.  Test browser refresh behavior

**Expected Results:**

*   Theme remains consistent across all pages
*   Dark mode applies to all UI elements
*   Navigation doesn't reset theme
*   Theme preference may persist after refresh

#### 8.3 Theme Accessibility

**File:** `tests/theme/theme-accessibility.spec.ts`

**Steps:**

1.  Test theme toggle with keyboard navigation
2.  Verify color contrast in both themes
3.  Test theme toggle announcements for screen readers

**Expected Results:**

*   Theme toggle is keyboard accessible
*   Both light and dark themes meet accessibility standards
*   Theme changes are announced appropriately
*   Focus indicators work in both themes

### 9\. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 9.1 Network Error Handling

**File:** `tests/error-handling/network-errors.spec.ts`

**Steps:**

1.  Simulate network disconnection
2.  Attempt to load homepage
3.  Attempt to search for movies
4.  Test navigation between categories

**Expected Results:**

*   Graceful error messages displayed
*   Application doesn't crash or show blank pages
*   Loading states handled appropriately
*   Retry mechanisms work when network restored

#### 9.2 Invalid URL Handling

**File:** `tests/error-handling/invalid-urls.spec.ts`

**Steps:**

1.  Navigate to `/invalid-path`
2.  Navigate to `/movie?id=invalid`
3.  Navigate to `/genre?id=invalid`
4.  Test malformed query parameters

**Expected Results:**

*   Invalid paths show appropriate 404 pages
*   Invalid movie IDs handled gracefully
*   Invalid genre IDs handled gracefully
*   Malformed URLs don't break application

#### 9.3 TMDB API Integration Errors

**File:** `tests/error-handling/api-integration.spec.ts`

**Steps:**

1.  Test behavior when TMDB API is unavailable
2.  Test handling of rate limiting
3.  Test missing image handling

**Expected Results:**

*   API errors display user-friendly messages
*   Rate limiting handled with appropriate delays/retries
*   Missing movie posters show placeholder images
*   Application remains functional during partial API failures

### 10\. Performance and Loading

**Seed:** `tests/seed.spec.ts`

#### 10.1 Page Load Performance

**File:** `tests/performance/page-load-times.spec.ts`

**Steps:**

1.  Measure homepage load time
2.  Measure movie details page load time
3.  Measure search results load time
4.  Compare performance across different categories

**Expected Results:**

*   Homepage loads within 3 seconds
*   Subsequent page navigations are fast (\< 1 second)
*   Images load progressively without blocking content
*   Loading states provide user feedback

#### 10.2 Image Loading Behavior

**File:** `tests/performance/image-loading.spec.ts`

**Steps:**

1.  Load page with many movie posters
2.  Monitor image loading sequence
3.  Test behavior with slow network
4.  Verify placeholder handling

**Expected Results:**

*   Movie poster placeholders shown while loading
*   Images load progressively from top to bottom
*   Failed image loads show appropriate placeholders
*   Page remains functional while images load

#### 10.3 Pagination Performance

**File:** `tests/performance/pagination-performance.spec.ts`

**Steps:**

1.  Navigate between multiple pages quickly
2.  Test browser back/forward with pagination
3.  Monitor loading behavior for cached vs new pages

**Expected Results:**

*   Page transitions are smooth and fast
*   Browser navigation works correctly with paginated results
*   Previously viewed pages may be cached for faster loading
*   Loading indicators show during page transitions

## Test Implementation Guidelines

### Setup Requirements

*   Tests should assume the application is running on `localhost:3000`
*   Use the configured `baseURL` in playwright.config.ts
*   Include appropriate waiting strategies for dynamic content loading

### Data Management

*   Tests should not depend on specific movie data (as TMDB content changes)
*   Focus on structure and functionality rather than specific movie titles
*   Use generic selectors that work with any movie content

### Browser Configuration

*   Test across multiple browsers (Chrome, Firefox, Safari)
*   Include mobile responsive testing
*   Test with different viewport sizes

### Error Recovery

*   Each test should clean up after itself
*   Include retry logic for network-dependent operations
*   Handle TMDB API rate limiting gracefully

### Parallel Execution

*   Tests should be designed to run in parallel
*   Avoid dependencies between test files
*   Use independent test data when possible

## Success Metrics

A successful test run should verify:

*   All major user journeys work end-to-end
*   Error scenarios are handled gracefully
*   Performance meets acceptable thresholds
*   Accessibility requirements are met
*   Cross-browser compatibility is maintained
*   Mobile responsiveness functions correctly

This comprehensive test plan ensures the Movies List Management application provides a robust, user-friendly experience for discovering, organizing, and managing movie collections.