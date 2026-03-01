# Comprehensive End-to-End Test Plan: Movie Discovery Application

## Document Header & Test Environment

| Property | Value |
| --- | --- |
| **Application URL** | http://localhost:3000 |
| **Test Credentials** | Email: `me@outlook.com` Password: `12345` |
| **Application Type** | Playwright-based Movie Discovery Web App |
| **Document Version** | 1.0 |
| **Last Updated** | February 28, 2026 |

---

## Table of Contents

1.  [Test Execution Summary](#test-execution-summary)
2.  [Home Page & Application Layout](#1-home-page--application-layout)
3.  [Movie Discovery & Browsing](#2-movie-discovery--browsing)
4.  [Search Functionality](#3-search-functionality)
5.  [Movie Details Page](#4-movie-details-page)
6.  [Person/Cast Details Page](#5-personcast-details-page)
7.  [User Authentication & Profile Management](#6-user-authentication--profile-management)
8.  [Pagination & Navigation](#7-pagination--navigation)
9.  [Theme & UI Preferences](#8-theme--ui-preferences)
10.  [Responsive Design & Layout](#9-responsive-design--layout)
11.  [Error Handling & Edge Cases](#10-error-handling--edge-cases)
12.  [Accessibility & Keyboard Navigation](#11-accessibility--keyboard-navigation)
13.  [Cross-Browser Compatibility](#12-cross-browser-compatibility)
14.  [Notes & Observations](#notes--observations)

---

## Test Execution Summary

### Prerequisites & Checklists

**Before Starting Test Execution:**

*   Application is deployed and running at `http://localhost:3000`
*   Web server is accessible and responding to requests
*   Test credentials (`me@outlook.com` / `12345`) are valid and functional
*   Network connectivity is stable with adequate bandwidth
*   Browser cache and cookies have been cleared
*   Latest versions of test browsers are installed (Chrome, Firefox, Safari/Edge)
*   Playwright is installed and configured on the testing machine
*   Database is populated with movie, genre, and person data
*   All external APIs (TMDB) are reachable and functional
*   No maintenance windows or scheduled downtime

### Testing Environment Requirements

**Hardware & Software:**

*   **Operating System:** Windows 10/11, macOS 11+, or Linux (Ubuntu 20+)
*   **Browser Versions:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
*   **RAM:** Minimum 4GB (8GB recommended)
*   **Disk Space:** 500MB available for test reports
*   **Internet Connection:** Broadband with stable connection (min 5 Mbps)
*   **Node.js:** v16+ (for test execution)
*   **Playwright:** Latest stable version (v1.40+)

### Execution Guidelines

**Testing Approach:**

1.  **Sequential Execution:** Follow the test sections in order: Home Page → Discovery → Search → Details → Authentication
2.  **Test Isolation:** Clear browser cache and cookies between major test sections
3.  **Failure Handling:** Document failures immediately with screenshots and browser console logs
4.  **Pass Criteria:** All "Expected Results" must be satisfied with zero errors
5.  **Time Allocation:** Allocate 2-3 hours for full test execution per browser
6.  **Data Consistency:** Verify data freshness before and after each test session
7.  **Network Conditions:** Test under normal and degraded network conditions

### Post-Testing Procedures

**After Test Completion:**

1.  Generate test execution report with pass/fail summary
2.  Capture and archive all screenshots and video recordings
3.  Document any bugs or issues in the issue tracking system
4.  Clear temporary test data from application
5.  Verify database integrity and reset to baseline state
6.  Archive logs for compliance and audit purposes
7.  Create summary document with recommendations for next testing cycle

---

## 1\. Home Page & Application Layout

### Test 1.1: Homepage Loads with All Core Components

**Objective:** Verify that the application homepage loads successfully and displays all primary UI components in the correct layout.

**Setup:**

*   Open browser and navigate to `http://localhost:3000`
*   Ensure no authentication is required initially
*   Check browser console for any errors

**Test Steps:**

1.  Open a new browser window
2.  Navigate to `http://localhost:3000`
3.  Wait for page to fully load (monitor Network tab for completion)
4.  Observe the page layout and visible elements
5.  Scroll down to see all content sections
6.  Check that images load properly and display movie posters

**Expected Results:**

*   Page loads within 3 seconds
*   Homepage displays without errors
*   Header navigation is visible at top
*   Sidebar navigation is present and accessible
*   Movie grid/list is displayed with multiple movie items
*   All images load successfully without broken image indicators
*   No JavaScript errors in browser console
*   Page title reflects "Movie Discovery" or similar branding

---

### Test 1.2: Header Navigation Controls

**Objective:** Verify that header navigation elements (logo, menu items, search, profile icons) are present and accessible.

**Setup:**

*   Application is loaded on homepage
*   Browser is at standard desktop resolution (1920x1080)

**Test Steps:**

1.  Locate the application header/navigation bar
2.  Identify and verify presence of: logo, navigation menu items, search icon, user profile icon
3.  Click on logo and verify it navigates to homepage
4.  Hover over menu items to check for tooltips or dropdowns
5.  Verify search icon is prominently displayed
6.  Check profile icon/button is accessible in header

**Expected Results:**

*   Header is sticky/visible at all times during scrolling
*   Logo is clickable and navigates to homepage
*   All expected navigation items are present and properly aligned
*   Menu items have clear labels and consistent styling
*   Search icon is visible and functional
*   Profile icon appears on the right side of header
*   Header has consistent background color and good contrast
*   No overlapping text or layout issues in header

---

### Test 1.3: Sidebar Navigation Functionality

**Objective:** Verify that sidebar navigation menu provides access to all main application sections and displays correctly.

**Setup:**

*   Homepage is fully loaded
*   Application is in standard view (not mobile)

**Test Steps:**

1.  Identify sidebar navigation panel (left or hamburger menu)
2.  Verify sidebar displays main categories: Home, Genres, My Lists, Search, Profile
3.  Click on each menu item and verify navigation
4.  Check that current page indicator/highlight shows active section
5.  Verify sidebar collapse/expand functionality (if hamburger menu)
6.  Scroll through sidebar to check all menu items are visible
7.  Verify menu styling is consistent throughout

**Expected Results:**

*   Sidebar is clearly labeled and organized
*   All main sections are accessible via sidebar
*   Menu items are properly highlighted when active
*   Sidebar does not obscure main content
*   Collapse/expand functionality works smoothly
*   Menu items have consistent padding and alignment
*   No text truncation in sidebar labels
*   Hover effects are visible on menu items

---

### Test 1.4: Content Grid Layout and Spacing

**Objective:** Verify that the main content area displays movies in a properly formatted grid with appropriate spacing and alignment.

**Setup:**

*   Homepage is loaded
*   Desktop resolution is active (1920x1080)

**Test Steps:**

1.  Observe the movie grid layout on homepage
2.  Verify movies are arranged in uniform columns (typically 4-6 per row)
3.  Check that each movie tile has consistent dimensions
4.  Verify spacing between movie tiles is uniform
5.  Scroll through grid to verify layout consistency throughout
6.  Check movie poster images are properly centered in tiles
7.  Verify no content shifts or jumps during scrolling

**Expected Results:**

*   Movies are arranged in a responsive grid layout
*   Grid is properly aligned with no gaps or misalignment
*   Movie tiles have consistent width and height
*   Spacing between tiles is uniform
*   No horizontal scrollbar or overflow issues
*   Grid adjusts appropriately for content changes
*   All movie information (title, rating) is visible and readable
*   Hover effects highlight movie tiles smoothly

---

### Test 1.5: Footer and Application Metadata

**Objective:** Verify that application footer displays copyright information, links, and metadata correctly.

**Setup:**

*   Homepage is fully loaded
*   User is logged out (anonymous access)

**Test Steps:**

1.  Scroll to bottom of page to locate footer
2.  Identify all footer sections: copyright, links, metadata
3.  Verify footer contains copyright notice with current year
4.  Check for links to: Terms of Service, Privacy Policy, About
5.  Click on each footer link and verify navigation
6.  Return to homepage using browser back button
7.  Verify footer displays consistently across pages

**Expected Results:**

*   Footer is visible at bottom of every page
*   Copyright year is current (2026)
*   All expected links are present and clickable
*   Links open in new tabs or navigate properly
*   Footer has distinct background color/styling
*   Footer content is properly formatted and readable
*   No broken links in footer section
*   Footer does not overlap main content

---

## 2\. Movie Discovery & Browsing

### Test 2.1: Browse Static Category - Popular Movies

**Objective:** Verify that users can browse and view popular movies from a static category.

**Setup:**

*   Homepage is loaded
*   User is not authenticated (anonymous access)
*   Popular Movies category should be visible on homepage

**Test Steps:**

1.  Scroll to find "Popular Movies" or "Trending" section
2.  Observe the movies displayed in this category
3.  Click on "View All" or navigate to the full Popular Movies page
4.  Verify page title indicates "Popular Movies"
5.  Check that multiple movies are displayed in grid format
6.  Verify movie titles and ratings are visible for each item
7.  Scroll through all pages of popular movies (if paginated)
8.  Navigate back to homepage

**Expected Results:**

*   Popular Movies section is evident on homepage
*   Movies are sorted by popularity/trending order
*   All displayed movies show title, poster image, and rating
*   Movie grid displays 20+ movies total
*   Page title reflects "Popular Movies" category
*   Movies are clickable and interactive
*   No duplicate movies in the listing
*   Loadingindicatorsappearandclearappropriatelyduringnavigation

---

### Test 2.2: Browse Static Category - Top Rated Movies

**Objective:** Verify that users can browse and view top-rated movies from a static category.

**Setup:**

*   Homepage is loaded
*   Top Rated Movies category should be accessible

**Test Steps:**

1.  Identify and navigate to "Top Rated" movies section
2.  Verify page title indicates "Top Rated Movies"
3.  Observe that movies are sorted by rating (highest first)
4.  Check that rating values are displayed for each movie
5.  Verify at least 20 movies are shown
6.  Compare ratings to ensure descending order
7.  Click on a movie to verify it opens movie details page
8.  Return to Top Rated listing

**Expected Results:**

*   Top Rated category displays movies sorted by rating
*   Highest-rated movies appear first
*   All movies show rating information prominently
*   Movies are displayed in consistent grid format
*   Page is titled "Top Rated Movies"
*   All movies are clickable and functional
*   No duplicate movies displayed
*   Rating values are accurate and properly displayed

---

### Test 2.3: Browse Static Category - Upcoming Movies

**Objective:** Verify that users can browse and view upcoming movie releases.

**Setup:**

*   Homepage is loaded
*   Upcoming Movies category should be available

**Test Steps:**

1.  Navigate to "Upcoming" movies section
2.  Verify page displays movies with release dates
3.  Check that movies are sorted chronologically (nearest release first)
4.  Examine release date information for accuracy
5.  Verify movie posters and titles are visible
6.  Ensure at least 20 upcoming movies are displayed
7.  Click on a movie to verify further details page loads
8.  Return to Upcoming Movies listing

**Expected Results:**

*   Upcoming Movies section displays future releases
*   Movies are sorted by release date (nearest first)
*   Release dates are displayed for each movie
*   Release dates appear accurate and in proper format
*   All movies are displayed with poster images and titles
*   Page navigates correctly between sections
*   All movies are clickable and functional
*   No expired/past release dates shown as upcoming

---

### Test 2.4: Genre Filtering and Selection

**Objective:** Verify that users can filter movies by genre and view genre-specific listings.

**Setup:**

*   Homepage or movie browsing page is loaded
*   Genre filter/sidebar is accessible

**Test Steps:**

1.  Locate genre filter options (sidebar or dropdown menu)
2.  Identify available genres: Action, Comedy, Drama, Horror, Sci-Fi, Animation
3.  Click on "Action" genre filter
4.  Verify page updates to show only Action movies
5.  Check page title reflects "Action Movies" or similar
6.  Verify displayed movies have action genre tag
7.  Click on a different genre (e.g., "Comedy")
8.  Verify page updates to show Comedy movies
9.  Click on multiple genres to verify filter behavior
10.  Clear all filters and return to default view

**Expected Results:**

*   Genre filters are easily accessible and clearly labeled
*   Selecting a genre displays relevant movies only
*   Page title updates to reflect selected genre
*   All displayed movies contain the selected genre tag
*   Filter selection persists while browsing genre movies
*   Multiple genre selection works correctly (if supported)
*   Clearing filters returns to default/all movies view
*   No movies appear without the selected genre
*   Loading indicator appears during filter application

---

### Test 2.5: Category Switching and Navigation

**Objective:** Verify that users can easily switch between different movie categories and navigate between them.

**Setup:**

*   User is viewing a movie category (e.g., Popular)
*   Multiple categories are accessible in navigation

**Test Steps:**

1.  Note current category ("Popular Movies")
2.  Click on a different category button/link ("Top Rated")
3.  Verify page updates with new category content
4.  Observe URL changes to reflect new category
5.  Switch to another category ("Upcoming")
6.  Verify page content updates correctly
7.  Use breadcrumb navigation (if available) to go back
8.  Click forward to verify history navigation works
9.  Switch between 3-4 categories rapidly
10.  Verify no content mixing or caching issues

**Expected Results:**

*   Categories switch smoothly without errors
*   Page content updates immediately upon category selection
*   URL reflects the selected category
*   Page title updates to show new category
*   Previous category movies are no longer displayed
*   Back/forward browser buttons work correctly
*   No content flickering or layout shifts
*   Loading indicators appear during transitions
*   All category switches complete within 2 seconds
*   All categories display appropriate movie collections

---

## 3\. Search Functionality

### Test 3.1: Basic Search - Single Keyword

**Objective:** Verify that users can perform a basic search with a single keyword and receive relevant results.

**Setup:**

*   Homepage is loaded
*   Search functionality is accessible in header

**Test Steps:**

1.  Click on search icon or search field in header
2.  Type movie title: "Wolverine"
3.  Press Enter or click search button
4.  Wait for search results to load
5.  Observe the displayed search results
6.  Verify "Wolverine" or similar movies appear in results
7.  Verify search term is shown in page title or header
8.  Check that result count is displayed
9.  Verify all results are relevant to search term

**Expected Results:**

*   Search field accepts text input
*   Search executes upon pressing Enter or clicking search button
*   Results page loads within 2 seconds
*   Search term is preserved and displayed
*   Relevant movies matching "Wolverine" are shown
*   Result count is displayed (e.g., "15 results found")
*   Each result shows movie poster, title, and rating
*   No irrelevant movies appear in results
*   All results are clickable and lead to movie details

---

### Test 3.2: Search - Movie with Multiple Results

**Objective:** Verify that search returns multiple results for a common movie title and displays them correctly.

**Setup:**

*   Search functionality is accessible
*   Application has movies with common titles in database

**Test Steps:**

1.  Click search field
2.  Type popular movie title: "Spider-Man"
3.  Execute search
4.  Wait for results to load
5.  Count the displayed results
6.  Verify all results contain "Spider-Man" in title
7.  Check that different versions/years are shown separately
8.  Verify each result displays unique ID or year
9.  Observe pagination controls if more than 20 results
10.  Click on different results to verify they open correctly

**Expected Results:**

*   Search returns 5+ results for "Spider-Man"
*   All results are relevant to search term
*   Different versions (Spider-Man 2, 3, Homecoming, etc.) are displayed separately
*   Year or release date distinguishes between versions
*   Results are displayed in grid format
*   All result items are clickable and functional
*   Pagination controls appear if 20+ results
*   Each result shows poster, title, and rating
*   No duplicate results are displayed

---

### Test 3.3: Multi-Keyword Search

**Objective:** Verify that search correctly handles multiple keywords and returns relevant results.

**Setup:**

*   Search functionality is accessible
*   Database contains movies matching multi-keyword searches

**Test Steps:**

1.  Click search field
2.  Type multi-keyword search: "science fiction action"
3.  Execute search
4.  Wait for results to load
5.  Verify results contain movies matching keywords
6.  Check that results include sci-fi action genre movies
7.  Try another multi-keyword search: "superhero comedy"
8.  Verify results are appropriate for combined keywords
9.  Observe word order impact on results (if any)
10.  Compare result ordering and relevance

**Expected Results:**

*   Multi-keyword search executes successfully
*   Results contain movies matching all/most keywords
*   Results are sorted by relevance
*   Genre-based filtering appears to apply
*   Sci-fi action movies appear for that search
*   Superhero comedy movies appear for that search
*   Result count is reasonable (5-50 movies)
*   All results are relevant to combined keywords
*   No completely unrelated movies appear
*   Search handles multiple keywords without errors

---

### Test 3.4: Search Edge Cases - Special Characters and Numbers

**Objective:** Verify that search functionality handles edge cases including special characters, numbers, and unusual input.

**Setup:**

*   Search functionality is accessible
*   Database is properly indexed for searches

**Test Steps:**

1.  Search for movie with apostrophe: "It's A Wonderful Life"
2.  Verify results show relevant movies
3.  Search for movie with numbers: "2001: A Space Odyssey"
4.  Verify results show movies with numbers in title
5.  Search for movie with hyphen: "X-Men"
6.  Verify results display X-Men movies
7.  Try searching with special characters: "@", "#"
8.  Verify application handles gracefully (error message or no results)
9.  Search for all numbers: "2001"
10.  Verify numeric search returns relevant movies

**Expected Results:**

*   Movies with apostrophes are found and displayed correctly
*   Movies with numbers in title are searchable
*   Hyphenated titles are handled properly
*   Apostrophes and hyphens don't cause search errors
*   Special characters (@, #) either show results or display helpful message
*   Numeric searches return movies with those numbers
*   No search crashes or errors occur
*   Results are relevant and properly formatted
*   Search is case-insensitive
*   Partial matches are returned when appropriate

---

### Test 3.5: Search - No Results and Empty State

**Objective:** Verify that the application handles search queries that return no results gracefully.

**Setup:**

*   Search functionality is accessible
*   Database does not contain certain fake movies

**Test Steps:**

1.  Click search field
2.  Type non-existent movie: "XyzNotARealMovie12345"
3.  Execute search
4.  Wait for results page to load
5.  Observe the empty state message/display
6.  Verify page indicates "No results found" or similar
7.  Check if suggestion for popular searches is offered
8.  Try searching for blank/empty query
9.  Verify application handles empty search appropriately
10.  Return to homepage from no-results page

**Expected Results:**

*   Search executes without errors
*   Empty results page displays helpful message
*   Message clearly indicates no movies match search
*   No error page or broken layout appears
*   Popular movies or suggestions may be offered
*   User can easily return to search or homepage
*   Empty search query is handled gracefully
*   No console errors occur
*   Page title reflects empty results state
*   Navigation remains functional on empty results page

---

### Test 3.6: Search Result Pagination

**Objective:** Verify that search results with many movies display pagination controls and allow navigation between pages.

**Setup:**

*   A search has been executed that returns 30+ results
*   Pagination controls should be visible

**Test Steps:**

1.  Perform search for common keyword: "movie"
2.  Observe first page of results (items 1-20)
3.  Note pagination controls at bottom
4.  Click "Next Page" or page 2
5.  Verify new movies are displayed (items 21-40)
6.  Check URL updates to reflect page number
7.  Click "Previous" to return to page 1
8.  Verify original results reappear
9.  Click on page 3 directly
10.  Verify correct movies display for that page
11.  Try navigating with keyboard (if supported)

**Expected Results:**

*   Pagination controls are visible and clear
*   Each page displays correct number of results (typically 20)
*   Pages are numbered correctly
*   Clicking next/previous updates results
*   URL changes to reflect current page
*   Back button navigates between pages correctly
*   All movies on each page are unique
*   No duplicate results across pages
*   Current page is highlighted in pagination controls
*   Going to last page removes next/forward option

---

## 4\. Movie Details Page

### Test 4.1: Movie Details Page Load and Display

**Objective:** Verify that clicking on a movie displays full details page with all required information.

**Setup:**

*   A movie search or browse page is displayed
*   Movie items are visible and clickable

**Test Steps:**

1.  Click on a movie poster or title from search results or category page
2.  Wait for movie details page to load
3.  Observe page title shows the movie name
4.  Check that full movie poster is displayed prominently
5.  Verify movie title, release date, and rating are shown
6.  Check for movie runtime information
7.  Observe genres associated with the movie
8.  Verify movie synopsis/overview is visible
9.  Check page layout is clean and organized
10.  Scroll down to see additional movie details

**Expected Results:**

*   Movie details page loads within 2 seconds
*   Page title reflects the movie name
*   High-quality movie poster is displayed
*   Movie title is prominent and clearly visible
*   Release date is shown in readable format
*   Rating/score is displayed prominently
*   Runtime duration is listed
*   Genre tags are visible
*   Movie synopsis is complete and readable
*   No broken images or layout issues
*   All required details are present on page

---

### Test 4.2: Movie Cast and Credits Information

**Objective:** Verify that movie details page displays cast information, crew details, and credits.

**Setup:**

*   Movie details page is loaded for a movie with cast data
*   User is viewing the full movie details

**Test Steps:**

1.  Scroll down on movie details page to find cast section
2.  Verify movie director name is displayed
3.  Check for cast list showing main actors
4.  Observe cast member photos/headshots
5.  Verify cast member names are clearly displayed
6.  Click on a cast member to verify navigation to person details
7.  Return to movie details page
8.  Check for producer and screenwriter information (if available)
9.  Verify crew/credits section is organized and readable
10.  Scroll through entire cast list to verify completeness

**Expected Results:**

*   Cast section is clearly labeled and visible
*   Director name is prominently displayed
*   Main cast members are listed (5-10 top actors)
*   Cast member names are accurate and readable
*   Cast member photos are displayed and load correctly
*   Cast members are clickable and link to person details page
*   Returning from person page preserves scroll position
*   Producer and screenwriter roles are identified
*   Credits are organized in logical sections
*   No missing photo placeholders or broken images

---

### Test 4.3: Movie Recommendations Section

**Objective:** Verify that movie details page displays recommended movies based on the current movie.

**Setup:**

*   Movie details page is loaded
*   Application has access to recommendation engine data

**Test Steps:**

1.  Scroll down to find "Recommended Movies" section
2.  Observe movies displayed as recommendations
3.  Verify at least 5 recommendations are shown
4.  Check that recommended movies have similar genre
5.  Verify posters and titles are visible for each recommendation
6.  Click on a recommended movie
7.  Verify it opens that movie's details page correctly
8.  Return to previous movie using back button
9.  Check that recommendations remain the same (consistent algorithm)
10.  Verify recommendation section is properly styled

**Expected Results:**

*   Recommendations section is clearly labeled
*   At least 5 movies are recommended
*   Recommendations are relevant and similar in genre
*   Recommended movies have different titles than current movie
*   Each recommendation shows poster and title
*   Recommendations are clickable and navigable
*   Clicking recommendation loads that movie's details
*   Back button returns to previous movie details
*   Recommendations are consistent across sessions
*   Section formatting is clean and organized

---

### Test 4.4: Movie Videos and Trailers

**Objective:** Verify that movie details page displays available videos including trailers and clips.

**Setup:**

*   Movie details page is loaded
*   Movie should have videos/trailers in database

**Test Steps:**

1.  Scroll to find "Videos" or "Trailers" section
2.  Observe video thumbnails or titles
3.  Click on a video thumbnail or play button
4.  Wait for video player to load
5.  Verify video starts playing (don't let it play fully)
6.  Check video quality and playback controls
7.  Verify pause, play, volume controls work
8.  Check for fullscreen button and click it
9.  Exit fullscreen and return to details page
10.  Click on another video if available

**Expected Results:**

*   Videos section is present for movies with trailers
*   Video thumbnails are visible and clear
*   Clicking video opens player/modal
*   Video player loads and displays properly
*   Play/pause controls are functional
*   Volume control is available and works
*   Fullscreen mode is available
*   Video quality is good (no pixelation)
*   Returning from fullscreen preserves page state
*   Multiple videos can be viewed sequentially
*   No autoplay of videos (respects user preferences)

---

### Test 4.5: Movie Rating and User Review Display

**Objective:** Verify that movie details page displays ratings and user reviews appropriately.

**Setup:**

*   Movie details page is loaded
*   Movie has rating and review data

**Test Steps:**

1.  Locate rating information on movie details page
2.  Check that average rating is displayed (e.g., 8.5/10)
3.  Observe rating distribution if available (star ratings breakdown)
4.  Scroll to find reviews or user feedback section
5.  Verify individual review scores/ratings are shown
6.  Check review text snippets are visible
7.  Verify reviewer names or "Anonymous" is displayed
8.  Check review dates are shown
9.  Look for "helpful/not helpful" voting on reviews (if available)
10.  Verify "write review" option if user is logged in

**Expected Results:**

*   Movie rating is prominently displayed
*   Rating format is clear (e.g., 8.5/10 or 5 stars)
*   Rating matches known movie data accuracy
*   Review section is labeled clearly
*   Multiple reviews are displayed (5-10)
*   Each review shows score, text, and reviewer info
*   Review text is readable and properly formatted
*   Review dates are accurate and properly formatted
*   No sensitive information in reviews
*   Vote helpfulness feature (if present) is functional
*   Write review option visible for authenticated users

---

### Test 4.6: Related Information and References

**Objective:** Verify that movie details page displays related information such as IMDb link, budget, revenue, and other metadata.

**Setup:**

*   Movie details page is fully loaded
*   Movie has additional metadata in database

**Test Steps:**

1.  Scroll through entire movie details page
2.  Look for external links (IMDb, Wikipedia, etc.)
3.  Verify external links open in new tabs
4.  Check for budget/box office information (if available)
5.  Look for production company information
6.  Verify studio/network details are displayed
7.  Check for filming location information (if available)
8.  Look for original language display
9.  Verify parent company or distributor info (if shown)
10.  Check that all metadata is clearly organized

**Expected Results:**

*   External links present and functional
*   External links (IMDb) open in new tabs/windows
*   Budget information displays if available
*   Box office/revenue info shows if available
*   Production company names are displayed
*   Studio information is present and accurate
*   All external links are valid and working
*   Metadata is organized in logical sections
*   No broken or 404 links
*   Information layout is clean and readable

---

## 5\. Person/Cast Details Page

### Test 5.1: Person Profile Page Load and Display

**Objective:** Verify that clicking on a cast member displays their profile with all available information.

**Setup:**

*   A movie details page with cast information is displayed
*   Cast member link is visible and clickable

**Test Steps:**

1.  Navigate to a movie details page
2.  Scroll to cast section
3.  Click on a cast member name or photo
4.  Wait for person profile page to load
5.  Observe page displays person name prominently
6.  Check that person's profile photo is displayed
7.  Verify biographical information is shown
8.  Look for birth date/place information
9.  Check that career information/bio is visible
10.  Scroll down to see additional information sections

**Expected Results:**

*   Person profile page loads within 2 seconds
*   Page title shows person's name
*   Person's profile photo is displayed and clear
*   Biographical information is present
*   Birth date and birthplace are shown
*   Career/biography text is readable
*   Page layout is clean and organized
*   Navigation back to previous page is available
*   No broken images or missing data
*   All essential person information is present

---

### Test 5.2: Person Filmography/Movie List

**Objective:** Verify that person profile displays a comprehensive list of movies they appeared in or contributed to.

**Setup:**

*   Person profile page is loaded
*   Person has movies in their filmography

**Test Steps:**

1.  Scroll down on person profile page
2.  Find "Filmography" or "Movies" section
3.  Observe the list of movies
4.  Verify movies are displayed in chronological order (recent first)
5.  Check that movie titles are clearly visible
6.  Verify character names are shown (for actors) or role titles (for directors)
7.  Check release years are displayed
8.  Click on a movie from filmography
9.  Verify it opens that movie's details page
10.  Return to person profile using back button
11.  Scroll through filmography to verify completeness

**Expected Results:**

*   Filmography section is clearly labeled
*   Movies are listed in logical order (usually recent first)
*   Movie titles are accurate and readable
*   Character/role names are displayed
*   Release years are shown for each movie
*   All movies are clickable and navigable
*   Clicking a movie loads its details page correctly
*   Filmography is not cut off (uses pagination if needed)
*   Movies match person's actual filmography
*   No duplicate movies in list

---

### Test 5.3: Person Images and Gallery

**Objective:** Verify that person profile displays a gallery of images/photos related to the person.

**Setup:**

*   Person profile page is loaded
*   Person should have images in the database

**Test Steps:**

1.  Look for "Gallery" or "Images" section on person profile
2.  Observe thumbnails of various photos
3.  Click on an image thumbnail
4.  Wait for image viewer/lightbox to open
5.  Verify image displays in larger format
6.  Check for navigation arrows to view next/previous images
7.  Click next arrow to view another image
8.  Verify all images display clearly
9.  Check close button closes image viewer
10.  Return to profile page and verify layout is intact

**Expected Results:**

*   Image gallery section is present
*   Multiple images (10+) are available
*   Image thumbnails are visible and clear
*   Clicking thumbnail opens image in viewer
*   Full-size image displays properly
*   Image navigation controls work
*   Next/previous arrows navigate between images
*   Images are high quality and clear
*   Close button functions properly
*   Gallery preserves scroll position on profile

---

### Test 5.4: Person External Links and References

**Objective:** Verify that person profile includes external links to IMDb, Wikipedia, and other reference sites.

**Setup:**

*   Person profile page is loaded
*   Person has external reference data

**Test Steps:**

1.  Scroll on person profile to find external links section
2.  Look for IMDb link
3.  Click IMDb link and verify it opens in new tab
4.  Verify URL is to correct IMDb person page
5.  Return to application tab
6.  Look for other external links (Wikipedia, etc.)
7.  Click on other external links
8.  Verify they open in new tabs
9.  Check that URLs are valid and relevant
10.  Verify no broken links exist

**Expected Results:**

*   External links section is clearly labeled
*   IMDb link is present and functional
*   IMDb link opens in new tab correctly
*   IMDb URL is valid and for correct person
*   Other reference links (if available) work properly
*   All links open in new tabs (not replacing app)
*   No broken or 404 links
*   Links are clearly labeled with source name
*   External links are properly formatted
*   Returning to app tab shows person profile

---

## 6\. User Authentication & Profile Management

### Test 6.1: Login Page Display and Accessibility

**Objective:** Verify that the login page properly displays and is accessible from the application.

**Setup:**

*   Application is loaded but user is not authenticated
*   Login page should be accessible

**Test Steps:**

1.  Identify login link or button in header/navigation
2.  Click profile icon or login button
3.  Wait for login page or modal to display
4.  Observe login form elements: email field, password field, login button
5.  Verify page title indicates login/authentication
6.  Check for remember me checkbox (if available)
7.  Look for forgot password link (if available)
8.  Check for sign up/registration link
9.  Verify focus is on first input field
10.  Check form styling and layout

**Expected Results:**

*   Login page is accessible and loads quickly
*   Email input field is visible and labeled
*   Password input field is visible and labeled
*   Login button is clearly visible
*   Password field masks input (shows dots/asterisks)
*   Form has clear focus management
*   Remember me option available (if applicable)
*   Forgot password link present (if applicable)
*   Sign up link available (if applicable)
*   Page title reflects "Login" or "Sign In"

---

### Test 6.2: Login with Valid Credentials

**Objective:** Verify that users can successfully login with valid test credentials.

**Setup:**

*   Login page is displayed and ready
*   Valid credentials: Email: `me@outlook.com`, Password: `12345`

**Test Steps:**

1.  Click on email input field
2.  Type test email: `me@outlook.com`
3.  Click on password input field
4.  Type test password: `12345`
5.  Click the login button
6.  Wait for login to process
7.  Observe page redirect/updates
8.  Verify user is logged in (check header shows profile/user info)
9.  Check that my list or profile options appear
10.  Navigate to a different page to confirm authentication persists

**Expected Results:**

*   Email field accepts input correctly
*   Password field masks input properly
*   Login button is clickable and functional
*   Login processes within 3 seconds
*   User is successfully authenticated
*   Application redirects to homepage or my lists page
*   Header displays user profile/name after login
*   User menu options appear in header
*   Session/authentication persists on page refresh
*   User can access protected pages (my lists, etc.)

---

### Test 6.3: Login with Invalid Credentials

**Objective:** Verify that login with incorrect credentials fails gracefully with appropriate error message.

**Setup:**

*   Login page is displayed
*   User is entering invalid credentials

**Test Steps:**

1.  Enter email: `me@outlook.com`
2.  Enter incorrect password: `wrongpassword123`
3.  Click login button
4.  Wait for login to complete
5.  Observe error message displayed
6.  Verify error message is clear and specific
7.  Check that email field is not wiped clear (user can edit)
8.  Try another invalid password: `00000`
9.  Verify error message appears again
10.  Verify user remains on login page (not redirected)

**Expected Results:**

*   Login fails gracefully without crashing
*   Error message is displayed prominently
*   Error message clearly indicates login failed
*   Email remains in field for user to correct
*   Password field is cleared (security)
*   User can try again without refreshing
*   No generic error messages
*   Error message appears within 2 seconds
*   User remains on login page
*   Multiple failed attempts show consistent errors

---

### Test 6.4: Logout Functionality

**Objective:** Verify that users can successfully logout and session is cleared.

**Setup:**

*   User is logged in with valid credentials
*   User profile/menu is visible in header

**Test Steps:**

1.  Click on profile/user icon in header
2.  Wait for dropdown menu to appear
3.  Locate and click "Logout" or "Sign Out" option
4.  Wait for logout to process
5.  Verify page redirects to homepage or login page
6.  Check that profile/user info is no longer visible in header
7.  Verify login option has reappeared
8.  Try navigating to protected page (e.g., /my-lists)
9.  Verify user is redirected to login page
10.  Refresh page and verify user is still logged out

**Expected Results:**

*   Profile menu appears when profile icon clicked
*   Logout option is clearly labeled and accessible
*   Logout processes within 2 seconds
*   User is redirected appropriately after logout
*   Session data is cleared from client
*   Authentication cookies/tokens are removed
*   User menu no longer shows after logout
*   Protected pages redirect to login
*   Page refresh maintains logged-out state
*   User can login again immediately after logout

---

### Test 6.5: Profile Menu and Options

**Objective:** Verify that logged-in user can access profile menu with all available options.

**Setup:**

*   User is logged in with valid credentials
*   User profile icon/menu is visible in header

**Test Steps:**

1.  Click on profile icon in header
2.  Wait for dropdown menu to display
3.  Observe all menu options: View Profile, My Lists, Settings, Logout
4.  Verify user name is displayed in menu header
5.  Click "View Profile" option
6.  Wait for profile page to load
7.  Return to menu
8.  Click "My Lists" option
9.  Verify my lists page displays
10.  Check that menu options are consistent and properly labeled

**Expected Results:**

*   Profile menu opens smoothly
*   Menu displays user's name or email
*   All expected options are present
*   Menu options are clearly labeled
*   View Profile option navigates correctly
*   My Lists option navigates correctly
*   Settings option available (if applicable)
*   Logout option is clearly visible
*   Menu closes when clicking outside or selecting option
*   All menu items are clickable and functional

---

### Test 6.6: My Lists Management

**Objective:** Verify that authenticated users can create, view, and manage their custom movie lists.

**Setup:**

*   User is logged in
*   Navigation to "My Lists" section is available

**Test Steps:**

1.  Click on "My Lists" in header or profile menu
2.  Wait for my lists page to load
3.  Observe existing lists (if any)
4.  Look for "Create New List" or "+" button
5.  Click create new list button
6.  Fill in list name: "My Favorites"
7.  Click create button
8.  Wait for list to be created
9.  Verify new list appears in My Lists
10.  Click on created list to open it
11.  Verify list is empty and ready for adding movies
12.  Navigate back to My Lists

**Expected Results:**

*   My Lists page displays with existing lists
*   Create new list option is available
*   List creation form is accessible and clear
*   New list is created with provided name
*   Created list appears in My Lists immediately
*   List details page opens when clicked
*   Empty list shows helpful message
*   Add to list option available on movie pages
*   Lists persist after page refresh
*   User can create multiple lists

---

### Test 6.7: Adding/Removing Movies from Lists

**Objective:** Verify that users can add movies to their custom lists and remove movies as desired.

**Setup:**

*   User is logged in
*   A movie details page is displayed
*   User has created or can access a custom list

**Test Steps:**

1.  Navigate to a movie details page
2.  Look for "Add to List" button or similar
3.  Click on add to list button
4.  Wait for list selection modal/dropdown to appear
5.  Select a list from the options
6.  Verify movie is added to list (confirmation message)
7.  Navigate to that list to verify movie appears
8.  Return to movie details page
9.  Look for remove or checkmark indicator
10.  Click to remove movie from list
11.  Navigate back to list to verify movie is removed

**Expected Results:**

*   Add to list option is accessible on movie pages
*   List selection modal displays all user lists
*   Movie is added successfully to selected list
*   Confirmation message appears after adding
*   Movie appears in correct list immediately
*   Remove option is available for added movies
*   Removing movie is successful
*   Movie disappears from list after removal
*   Changes persist after page refresh
*   User can add multiple movies to same list

---

## 7\. Pagination & Navigation

### Test 7.1: Pagination Controls and Navigation

**Objective:** Verify that pagination controls are present and functional for navigating through multi-page content.

**Setup:**

*   A page with multiple items is displayed (e.g., search results or category with 40+ movies)
*   Pagination should be visible at bottom of page

**Test Steps:**

1.  Locate pagination controls at bottom of content
2.  Observe page numbers or next/previous buttons
3.  Verify current page is highlighted/indicated
4.  Click "Next" button
5.  Wait for page to load
6.  Verify new set of items appears
7.  Check URL reflects new page number
8.  Click on specific page number (e.g., page 3)
9.  Verify that page's items load
10.  Click "Previous" button
11.  Verify previous page items appear

**Expected Results:**

*   Pagination controls are clearly visible
*   Current page is visually indicated
*   Next/Previous buttons work correctly
*   Specific page numbers are clickable
*   Page indicator in URL updates correctly
*   Correct items display for selected page
*   No duplicate items across pages
*   Page transitions complete within 2 seconds
*   All pagination buttons are functional
*   Last page removes next/disabled state

---

### Test 7.2: URL Parameter Navigation

**Objective:** Verify that page URL includes proper parameters and navigation via direct URL changes works.

**Setup:**

*   User is on a paginated page with URL parameters
*   Example: `http://localhost:3000/search?q=movie&page=1`

**Test Steps:**

1.  Note the current URL with page parameter
2.  Manually change URL page parameter: change `page=1` to `page=2`
3.  Press Enter to navigate
4.  Wait for page to load
5.  Verify page 2 content displays
6.  Check that URL reflects page=2
7.  Try changing URL to `page=5`
8.  Press Enter and verify navigation
9.  Try invalid page number: `page=999`
10.  Observe how application handles invalid page

**Expected Results:**

*   URLs include proper page parameters
*   Changing URL page parameter navigates correctly
*   Browser history updates appropriately
*   Back button removes manual URL changes
*   Invalid page numbers show error or redirect
*   URL parameters are persistent
*   Other parameters (search query) are preserved
*   Bookmarking a page URL works correctly
*   Direct link sharing of page works
*   Page content matches URL parameters

---

### Test 7.3: Navigation History and Back Button

**Objective:** Verify that browser back button correctly navigates through application pages.

**Setup:**

*   User has navigated through multiple pages
*   Browser navigation history is active

**Test Steps:**

1.  Navigate to: Homepage → Movie Details → Cast Member → Back
2.  Verify back button shows previous movie details
3.  Click back again to return to homepage
4.  Click forward button (if available)
5.  Verify forward navigation shows movie details again
6.  Navigate: Search Results → Movie Details → Recommendations (click) → Back
7.  Verify back returns to search results, not movie details
8.  Check that URL history is correct
9.  Verify scroll position is restored (if applicable)
10.  Navigate rapidly and verify history works

**Expected Results:**

*   Back button works correctly throughout app
*   Forward button functions when previous forward navigation exists
*   Correct page displays when using back/forward
*   URLs are correct in browser history
*   Scroll position may be preserved
*   No infinite loops in navigation
*   History works consistently across browsers
*   Multiple back clicks navigate correctly
*   Session data is preserved through navigation
*   External page transitions work with history

---

### Test 7.4: Breadcrumb Navigation (if applicable)

**Objective:** Verify that breadcrumb navigation (if available) provides quick navigation to parent pages.

**Setup:**

*   User is on a details page
*   Breadcrumb navigation is visible on page

**Test Steps:**

1.  Navigate to a movie details page
2.  Look for breadcrumb trail (e.g., "Home > Popular Movies > Movie Name")
3.  Verify breadcrumb is visible and readable
4.  Click on "Popular Movies" in breadcrumb
5.  Verify navigation to movie category page
6.  Navigate to person details page
7.  Look for breadcrumb trail
8.  Click on parent breadcrumb (if available)
9.  Verify navigation works correctly
10.  Check breadcrumb updates for each page

**Expected Results:**

*   Breadcrumb trail is visible and clear
*   Each breadcrumb segment is clickable
*   Breadcrumb updates for each page
*   Clicking breadcrumb navigates correctly
*   Home link always available in breadcrumb
*   Breadcrumb shows logical navigation path
*   Current page is not clickable in breadcrumb
*   Breadcrumb styling is consistent
*   Breadcrumb text is readable and properly formatted
*   Long breadcrumbs don't cause layout issues

---

## 8\. Theme & UI Preferences

### Test 8.1: Light/Dark Mode Toggle

**Objective:** Verify that users can toggle between light and dark theme modes.

**Setup:**

*   Application is loaded
*   User is on homepage
*   Theme toggle button should be visible (usually in header or sidebar)

**Test Steps:**

1.  Locate theme toggle button/switch (moon/sun icon typically)
2.  Observe current theme (light or dark)
3.  Click theme toggle button
4.  Wait for theme to change across application
5.  Verify all page elements transition to new theme
6.  Check text color contrast in new theme
7.  Verify images/posters still display correctly
8.  Click toggle button again to return to original theme
9.  Verify theme changes back
10.  Navigate to different page to verify theme persists

**Expected Results:**

*   Theme toggle is easily accessible
*   Toggle switches between light and dark mode smoothly
*   All page elements change appropriately
*   Text remains readable in both modes
*   Contrast ratio meets accessibility standards
*   Background colors change appropriately
*   Button/link colors update for readability
*   Images are visible in both modes
*   No elements become invisible in either theme
*   Theme change is immediate (no delay)

---

### Test 8.2: Theme Persistence Across Sessions

**Objective:** Verify that selected theme preference is saved and persists after logout/refresh.

**Setup:**

*   User is logged in (or on anonymous session)
*   Applied a specific theme (dark or light)

**Test Steps:**

1.  Set theme to dark mode
2.  Close browser tab
3.  Open new tab and navigate to application
4.  Verify dark mode is still selected
5.  Navigate to different pages within app
6.  Verify theme persists across pages
7.  If logged in, logout and login again
8.  Verify theme preference is preserved
9.  Clear browser cache
10.  Navigate back to application
11.  Check if theme persists (may be reset)

**Expected Results:**

*   Theme preference is saved to browser storage (localStorage)
*   Theme persists across page refreshes
*   Theme persists across multiple sessions
*   Theme remains after logout/login cycle
*   Theme preference is associated with user account (if stored server-side)
*   No theme reset unless cache is intentionally cleared
*   Mobile/desktop may have separate theme settings
*   Cookie or token properly stores preference
*   Theme applies immediately on page load

---

### Test 8.3: Theme Impact on Movie Posters and Images

**Objective:** Verify that images (movie posters, profiles) remain visible and properly displayed in both light and dark themes.

**Setup:**

*   Both light and dark themes are available
*   Application is displaying movie posters

**Test Steps:**

1.  Switch to light theme
2.  Observe movie posters visibility and clarity
3.  Check if poster frames/borders exist
4.  Switch to dark theme
5.  Verify posters remain visible and clear
6.  Check poster borders/frames (may be darker)
7.  Navigate to person profile pages
8.  Verify profile photos display well in both themes
9.  Check thumbnail images in search results
10.  Switch themes rapidly while viewing images

**Expected Results:**

*   Posters are visible and clear in light mode
*   Posters are visible and clear in dark mode
*   No image transparency issues in either theme
*   Poster borders/frames adapt to theme
*   Profile photos remain visible in both themes
*   No "lost" or invisible images when theme changes
*   Image quality is not affected by theme
*   Loading placeholders adapt to theme
*   No layout shifts when images load
*   All images load quickly regardless of theme

---

### Test 8.4: Button and Interactive Element Styling

**Objective:** Verify that buttons, links, and interactive elements maintain proper styling and contrast in both themes.

**Setup:**

*   Light and dark themes are available
*   Application is displaying buttons and interactive elements

**Test Steps:**

1.  Switch to light theme
2.  Observe button colors: CTA buttons, secondary buttons
3.  Check link colors and hover states
4.  Click buttons to verify they're responsive
5.  Check hover effects on buttons
6.  Switch to dark theme
7.  Verify button colors are appropriate
8.  Check text contrast on buttons
9.  Verify link colors are readable
10.  Test button hover states in dark mode

**Expected Results:**

*   Buttons have sufficient contrast in light mode
*   Button text is readable on button background
*   Hover effects are visible in light mode
*   Links have distinct color from regular text
*   Links are underlined or otherwise distinct
*   Buttons have sufficient contrast in dark mode
*   Button text visibility is maintained dark mode
*   Hover effects work in dark mode
*   Focus indicators are visible in both modes
*   No buttons become invisible in either theme

---

## 9\. Responsive Design & Layout

### Test 9.1: Desktop Layout (1920x1080)

**Objective:** Verify that application displays correctly at standard desktop resolution.

**Setup:**

*   Application is loaded
*   Browser is at desktop resolution (1920x1080)

**Test Steps:**

1.  Open browser at 1920x1080 resolution
2.  Navigate to homepage
3.  Observe layout with full width
4.  Verify sidebar is visible (not collapsed)
5.  Check that movie grid displays 5-6 films per row
6.  Scroll down to verify no horizontal scrolling needed
7.  Navigate to movie details page
8.  Verify layout utilizes full width appropriately
9.  Check that text is readable with good line length
10.  Verify all UI elements are accessible

**Expected Results:**

*   Homepage displays in full width
*   Movie grid shows optimal number of columns
*   No horizontal scrollbar should appear
*   Sidebar is fully visible and accessible
*   Content is centered with proper margins
*   Text line length is comfortable for reading
*   All controls are accessible without scrolling
*   Layout is not cramped or overwhelming
*   Images scale appropriately for desktop
*   Navigation is intuitive and complete

---

### Test 9.2: Tablet Layout (768x1024)

**Objective:** Verify that application displays correctly at tablet resolution.

**Setup:**

*   Browser is set to tablet resolution (iPad: 768x1024)
*   Application is loaded

**Test Steps:**

1.  Resize browser to 768x1024 (or use device emulation)
2.  Navigate to homepage
3.  Observe layout changes (sidebar may collapse to hamburger)
4.  Verify movie grid displays appropriately (2-3 films per row)
5.  Check that content is not cramped
6.  Scroll vertically to access all content
7.  Click hamburger menu (if sidebar collapsed)
8.  Verify menu opens and is usable
9.  Navigate to movie details page
10.  Verify layout scales appropriately for tablet

**Expected Results:**

*   Layout adapts smoothly to tablet size
*   Sidebar may collapse to hamburger menu
*   Movie grid shows 2-3 columns appropriately
*   Content is readable and accessible
*   Touch targets (buttons) are large enough (44x44px)
*   No horizontal scrolling required
*   Hamburger menu opens/closes smoothly
*   All controls are reachable
*   Images scale appropriately
*   Scrolling is smooth and performant

---

### Test 9.3: Mobile Layout (375x667)

**Objective:** Verify that application displays correctly at mobile phone resolution.

**Setup:**

*   Browser is set to mobile resolution (iPhone SE: 375x667)
*   Application is loaded

**Test Steps:**

1.  Resize browser to 375x667 (or use device emulation)
2.  Navigate to homepage
3.  Observe mobile layout (sidebar should be hamburger)
4.  Verify movie grid displays 1-2 films per row
5.  Check all content is scrollable
6.  Verify no horizontal scrolling occurs
7.  Click hamburger menu
8.  Verify menu is accessible and usable
9.  Navigate to movie details page
10.  Verify readability and usability on small screen

**Expected Results:**

*   Layout is fully responsive at mobile size
*   Sidebar is hidden behind hamburger menu
*   Movie grid shows 1-2 columns
*   Content is vertically scrollable
*   No horizontal scrollbar appears
*   Hamburger menu is easily accessible
*   Touch targets are appropriately sized
*   Text is readable without zooming
*   Images scale properly for mobile
*   All functionality is accessible on mobile

---

### Test 9.4: Flexible Viewport Resizing

**Objective:** Verify that application layout adjusts smoothly when viewport is resized.

**Setup:**

*   Application is loaded in browser
*   Browser window is resizable

**Test Steps:**

1.  Load application at desktop size (1920x1080)
2.  Slowly resize browser window to tablet width (768px)
3.  Observe layout transitions
4.  Continue resizing to mobile width (375px)
5.  Note at what breakpoints layout changes occur
6.  Resize back to desktop size
7.  Verify layout returns to original state
8.  Resize rapidly and verify no jumpy behavior
9.  Resize to odd sizes (600px, 1200px) and verify layout
10.  Check that no content is cut off at any size

**Expected Results:**

*   Layout adjusts smoothly during resize
*   No sudden jumps or layout shifts
*   Breakpoints are clearly defined
*   Layout at 768px shows tablet view
*   Layout at 375px shows mobile view
*   Resizing back shows appropriate layout changes
*   No content is cut off at any viewport size
*   Images scale appropriately during resize
*   Text reflows smoothly
*   Scrollbars appear/disappear appropriately

---

### Test 9.5: Landscape Orientation

**Objective:** Verify that application displays correctly when device is in landscape orientation.

**Setup:**

*   Device emulation is active
*   Mobile device in portrait mode initially

**Test Steps:**

1.  Start with mobile in portrait orientation (375x667)
2.  Rotate device to landscape (667x375)
3.  Wait for layout to adjust
4.  Observe new layout (wider, shorter)
5.  Verify content remains accessible
6.  Scroll to check all content is visible
7.  Click buttons and verify they work
8.  Navigate to different pages in landscape
9.  Rotate back to portrait
10.  Verify layout returns to portrait view

**Expected Results:**

*   Landscape orientation is supported
*   Layout switches to landscape view smoothly
*   Content utilizes wider space appropriately
*   Vertical scrolling is still available if needed
*   No content is hidden in landscape
*   Rotation animation is smooth
*   All controls function in landscape
*   Images and videos display well in landscape
*   Portrait rotation returns to proper layout
*   No data loss during orientation change

---

## 10\. Error Handling & Edge Cases

### Test 10.1: Network Error Handling

**Objective:** Verify that application handles network errors gracefully and provides appropriate feedback.

**Setup:**

*   Application is running
*   Network interruption capability is available (DevTools or throttling)

**Test Steps:**

1.  Open DevTools Network tab (F12)
2.  Enable offline mode or throttle network
3.  Try to load a page or search
4.  Observe loading indicator
5.  Wait for timeout to occur
6.  Verify error message displays
7.  Check error message is user-friendly
8.  Verify retry button or option is available
9.  Re-enable network
10.  Click retry and verify page loads

**Expected Results:**

*   Application detects network failure
*   Loading indicator appears initially
*   Timeout occurs within reasonable time
*   Error message is displayed to user
*   Error message explains the problem
*   Retry button/option is provided
*   Application doesn't show technical errors
*   No infinite loading state
*   Retry successfully loads when network restored
*   User can navigate back despite error

---

### Test 10.2: Invalid Movie/Person ID in URL

**Objective:** Verify that accessing a non-existent movie or person ID shows appropriate error.

**Setup:**

*   Application is loaded
*   Ability to manually modify URLs

**Test Steps:**

1.  Navigate to valid movie: `http://localhost:3000/movie/550`
2.  Verify movie details load
3.  Modify URL to invalid movie ID: `http://localhost:3000/movie/999999999`
4.  Press Enter
5.  Wait for page to respond
6.  Observe error message or 404 page
7.  Try similar with person: `http://localhost:3000/person/999999999`
8.  Verify error handling is consistent
9.  Check that navigation is still available
10.  Use back button to return to valid page

**Expected Results:**

*   Invalid IDs show error page
*   Error message is clear and helpful
*   404 page is styled consistently
*   No application crashes occur
*   Navigation is still available
*   User can return to working pages
*   No console errors
*   Error page suggests next steps
*   Back button works on error page
*   Error message is user-friendly

---

### Test 10.3: Missing Movie Poster or Image Data

**Objective:** Verify that missing images show appropriate placeholders without breaking layout.

**Setup:**

*   Application has some movies with missing poster images
*   Or images can be blocked to simulate missing data

**Test Steps:**

1.  Identify a movie with missing/broken poster image
2.  Navigate to movie details page
3.  Observe placeholder for missing poster
4.  Check that missing image doesn't break layout
5.  Verify text content is still readable
6.  Check that page doesn't look broken/incomplete
7.  Navigate to person profile with missing photo
8.  Verify placeholder displays appropriately
9.  Check search results with missing images
10.  Verify placeholder for each missing image

**Expected Results:**

*   Placeholder image displays when actual image missing
*   Placeholder is styled appropriately
*   Layout doesn't break due to missing image
*   Text content is readable and complete
*   Page looks intentional, not broken
*   Placeholder color matches theme
*   All placeholders are consistent
*   Alt text describes missing image
*   No broken image icons (X) displayed
*   Loading state transitions to placeholder

---

### Test 10.4: Timeout and Slow Loading

**Objective:** Verify that application handles slow loading and timeouts appropriately.

**Setup:**

*   Network throttling is available
*   Application is running normally

**Test Steps:**

1.  Open DevTools and enable "Slow 3G" throttling
2.  Click a link to navigate to new page
3.  Wait as page loads slowly
4.  Observe loading indicator
5.  Verify application is responsive
6.  Monitor if timeout occurs (after 10-15 seconds)
7.  If timeout, verify error message
8.  Stop throttling and retry
9.  Verify page loads normally at normal speed
10.  Check for performance metrics or timing

**Expected Results:**

*   Application shows loading indicator for slow loads
*   Page begins rendering content progressively (if possible)
*   Timeout occurs at reasonable interval (10-30 seconds)
*   Error message appears if timeout occurs
*   User can retry or navigate away
*   No apparent freeze or hanging
*   Application remains responsive
*   Loading indicator is visible
*   No console errors from timeout
*   Retry functionality works

---

### Test 10.5: Empty or No Results Scenarios

**Objective:** Verify that empty results scenarios are handled gracefully.

**Setup:**

*   Application is ready to display results
*   Ability to trigger empty results

**Test Steps:**

1.  Search for non-existent movie: "XyzNotExist"
2.  Observe empty results page
3.  Check for helpful message
4.  Look for suggested next steps
5.  Try filtering with parameters that yield no results
6.  Verify empty state message displays
7.  Check for "back to popular" or similar link
8.  Try visiting a genre with no movies (if possible)
9.  Verify consistent empty state handling
10.  Check that navigation still works on empty pages

**Expected Results:**

*   Empty results don't show error page
*   Helpful message explains no results found
*   Page offers suggestions: popular movies, home link
*   Layout is clean and doesn't look broken
*   Search/filter fields are still accessible
*   User can easily navigate away
*   Empty state message is friendly
*   No console errors on empty state
*   Pagination doesn't show for empty results
*   Can retry search or return home

---

### Test 10.6: Database or API Failure

**Objective:** Verify that application degrades gracefully if backend database or API is unavailable.

**Setup:**

*   API Mock or database access can be simulated

**Test Steps:**

1.  Stop or block backend API access
2.  Try to load application
3.  Observe how application handles no data
4.  Check for error messages
5.  Try to perform actions (search, browse, etc.)
6.  Verify application informs user of issue
7.  Restore API access
8.  Attempt to reload
9.  Verify application recovers
10.  Check that data eventually loads

**Expected Results:**

*   Application detects API/database failure
*   Error message is displayed to user
*   Application doesn't show raw errors
*   Some cached content may still load
*   Navigation is still available
*   User is not left in broken state
*   Data loads correctly when API restored
*   No infinite loops or hangs
*   Console shows diagnostic information
*   Graceful degradation is evident

---

## 11\. Accessibility & Keyboard Navigation

### Test 11.1: Keyboard Navigation - Tab Order

**Objective:** Verify that all interactive elements are reachable via keyboard tabbing in logical order.

**Setup:**

*   Application is loaded
*   Keyboard is the only input device (no mouse)

**Test Steps:**

1.  Press Tab to navigate to first element
2.  Verify it's the first logical element (often skip to main content)
3.  Continue pressing Tab to navigate through page
4.  Observe Tab order: header → nav → search → results
5.  Check that Tab order is logical and left-to-right
6.  Press Shift+Tab to go backwards
7.  Verify reverse navigation works
8.  Check that all interactive elements are reachable
9.  Try Tab navigation on movie details page
10.  Verify Tab order makes sense throughout page

**Expected Results:**

*   Tab key navigates through interactive elements
*   Tab order is logical and predictable
*   All buttons and links are reachable via Tab
*   No keyboard trap (all elements can be exited)
*   Skip to main content link available (or automatic)
*   Header navigation is accessible
*   Search is accessible
*   Movie results are navigable
*   Tab order is consistent across pages
*   Shift+Tab navigates backwards correctly

---

### Test 11.2: Keyboard Navigation - Enter/Space Keys

**Objective:** Verify that keyboard keys (Enter, Space) activate interactive elements.

**Setup:**

*   Application is loaded
*   Keyboard navigation is active

**Test Steps:**

1.  Use Tab to focus on a button
2.  Press Enter key to activate button
3.  Verify action occurs (e.g., navigation, form submission)
4.  Tab to a link
5.  Press Enter to activate link
6.  Verify navigation occurs
7.  Tab to a checkbox (if available)
8.  Press Space to toggle checkbox
9.  Tab to a dropdown or select
10.  Press Space or Enter to open dropdown

**Expected Results:**

*   Enter key activates focused buttons
*   Enter key activates focused links
*   Space key activates checkboxes
*   Space/Enter opens dropdowns
*   Actions occur immediately
*   No error messages on keyboard activation
*   All interactive elements respond to appropriate keys
*   Keyboard activation matches expected behavior
*   No elements ignore keyboard input
*   All page interactions work without mouse

---

### Test 11.3: Focus Indicators and Visual Feedback

**Objective:** Verify that keyboard focus is visible with clear indicator highlighting focused elements.

**Setup:**

*   Application is loaded
*   Keyboard navigation is active

**Test Steps:**

1.  Use Tab to navigate and focus on elements
2.  Observe focus indicator (outline, highlight, underline)
3.  Verify focus indicator is clearly visible
4.  Check contrast of focus indicator (must be visible)
5.  Tab through different element types
6.  Verify each shows clear focus indicator
7.  Check that browser default focus is not suppressed
8.  Verify focus indicator follows Tab order
9.  Click on element with mouse then Tab away
10.  Verify focus indicator appears when returning via Tab

**Expected Results:**

*   All focusable elements show clear focus indicator
*   Focus indicator has sufficient contrast (3:1 minimum)
*   Focus indicator is not just a color change (testable in high contrast mode)
*   Focus indicator surrounds or highlights element clearly
*   Browser default focus might be visible or custom focus provided
*   Focus order visually follows Tab order
*   No focus is "lost" during navigation
*   Dark and light modes both show focus clearly
*   Focus indicator is 2px minimum width
*   Focus indicator doesn't obscure content

---

### Test 11.4: Screen Reader Testing (NVDA/JAWS)

**Objective:** Verify that content is properly announced by screen readers and navigable.

**Setup:**

*   Screen reader (NVDA or JAWS) is installed
*   Application is ready for testing

**Test Steps:**

1.  Start screen reader
2.  Navigate to application homepage
3.  Listen for page title announcement
4.  Navigate with screen reader to identify sections
5.  Move through headings (H1, H2) structure
6.  Verify logical heading hierarchy
7.  Navigate to buttons and verify labels
8.  Move through form fields and verify labels
9.  Check that images have alt text
10.  Verify landmarks (main, nav, contentinfo) are announced

**Expected Results:**

*   Page title is announced clearly
*   Heading structure is logical (H1 → H2, not H1 → H3)
*   All buttons have descriptive labels
*   All form fields have associated labels
*   Images have meaningful alt text
*   Decorative images have empty alt text
*   Links have descriptive text (not "click here")
*   Navigation landmarks are available
*   Tables (if any) have proper headers
*   Lists are identified as lists

---

### Test 11.5: Color Contrast Verification

**Objective:** Verify that text and interactive elements have sufficient color contrast per WCAG standards.

**Setup:**

*   Application is loaded
*   Color contrast checker tool available (browser extension or web tool)

**Test Steps:**

1.  Run color contrast checker on homepage
2.  Check body text contrast (should be 4.5:1 AAA)
3.  Check button text contrast
4.  Verify link color contrast
5.  Check heading contrast
6.  Test in light theme
7.  Test in dark theme
8.  Check error/warning message colors
9.  Verify color is not the only indicator (use pattern/text)
10.  Check disabled state elements (can be lower contrast)

**Expected Results:**

*   Normal text: minimum 4.5:1 contrast (WCAG AA)
*   Large text (18pt+): minimum 3:1 contrast (WCAG AA)
*   AAA compliance preferred: 7:1 (normal), 4.5:1 (large)
*   Button text has sufficient contrast
*   Link text has sufficient contrast
*   Both light and dark theme meet standards
*   No color-only indicators without pattern/text
*   Disabled elements may have reduced contrast
*   Form field borders are visible
*   Focus indicators meet contrast requirements

---

### Test 11.6: Alt Text and Semantic HTML

**Objective:** Verify that all images have appropriate alt text and semantic HTML structure is used.

**Setup:**

*   Application is loaded
*   DevTools or accessibility inspectors available

**Test Steps:**

1.  Right-click on movie poster image
2.  Inspect element to view alt text
3.  Verify alt text describes image: "Poster for Inception, 2010"
4.  Check multiple poster images for alt text
5.  Look for decorative images (icons, logos)
6.  Verify decorative images have empty alt: `alt=""`
7.  Inspect buttons to verify semantic `<button>` tag
8.  Check links use `<a>` tag
9.  Verify form uses `<form>`, `<input>`, `<label>`
10.  Check for proper heading structure (H1, H2, etc.)

**Expected Results:**

*   All meaningful images have descriptive alt text
*   Alt text describes image content and function
*   Decorative elements have empty alt attribute
*   Buttons use semantic `<button>` element
*   Links use `<a>` element
*   Forms use semantic HTML structure
*   Labels are associated with form inputs
*   Heading hierarchy is logical and complete
*   Navigation uses `<nav>` landmark
*   Main content uses `<main>` landmark

---

## 12\. Cross-Browser Compatibility

### Test 12.1: Chrome Browser Compatibility

**Objective:** Verify that application functions correctly in Google Chrome browser.

**Setup:**

*   Google Chrome latest version is installed
*   Application is running

**Test Steps:**

1.  Open application in Chrome
2.  Navigate through all major sections
3.  Test search functionality
4.  Verify movie details page displays
5.  Test login/authentication
6.  Check theme toggle
7.  Test responsive design (resize browser)
8.  Open DevTools to check for console errors
9.  Verify no broken features
10.  Check performance metrics in DevTools

**Expected Results:**

*   Application loads smoothly in Chrome
*   All features are functional
*   No JavaScript errors in console
*   Network requests complete successfully
*   CSS styling displays correctly
*   Images load and display properly
*   Responsive design works at all breakpoints
*   Theme switching works
*   No deprecated API warnings
*   Performance metrics are acceptable

---

### Test 12.2: Firefox Browser Compatibility

**Objective:** Verify that application functions correctly in Mozilla Firefox browser.

**Setup:**

*   Mozilla Firefox latest version is installed
*   Application is running

**Test Steps:**

1.  Open application in Firefox
2.  Navigate through all major sections
3.  Test search functionality
4.  Verify movie details page displays
5.  Test login/authentication
6.  Check theme toggle
7.  Test responsive design
8.  Open DevTools to check for console errors
9.  Verify no broken features specific to Firefox
10.  Check CSS rendering (especially flexbox/grid)

**Expected Results:**

*   Application loads smoothly in Firefox
*   All features work correctly
*   Console is free of JavaScript errors
*   CSS styling is consistent with other browsers
*   Images display without issues
*   Responsive design is functional
*   No Firefox-specific issues
*   Theme toggle works
*   Form inputs function correctly
*   Layout matches Chrome rendering

---

### Test 12.3: Safari Browser Compatibility

**Objective:** Verify that application functions correctly in Apple Safari browser.

**Setup:**

*   Safari browser (macOS) is available
*   Application is running

**Test Steps:**

1.  Open application in Safari
2.  Navigate through all major sections
3.  Test search functionality
4.  Verify movie details page displays
5.  Test login/authentication
6.  Check theme toggle
7.  Test responsive design
8.  Open Web Inspector to check for errors
9.  Verify no Safari-specific issues
10.  Check CSS support (especially newer features)

**Expected Results:**

*   Application loads smoothly in Safari
*   All features are functional
*   Layout matches other browsers
*   CSS styling displays correctly
*   Images load properly
*   Responsive design works
*   Touch interactions work (if on macOS trackpad)
*   No Safari-specific console errors
*   Form functionality is intact
*   Theme toggle persists (check localStorage support)

---

### Test 12.4: Edge Browser Compatibility

**Objective:** Verify that application functions correctly in Microsoft Edge browser.

**Setup:**

*   Microsoft Edge (Chromium-based) is installed
*   Application is running

**Test Steps:**

1.  Open application in Edge
2.  Navigate through all major sections
3.  Test search functionality
4.  Verify movie details displays
5.  Test login/authentication
6.  Check theme toggle
7.  Verify responsive design
8.  Open DevTools and check console
9.  Test vertical tabs feature (if enabled)
10.  Verify sync with other Edge instances

**Expected Results:**

*   Application loads smoothly in Edge
*   All features function correctly
*   No JavaScript errors in console
*   Styling displays consistently
*   Responsive design works across breakpoints
*   Theme preference syncs if user is logged into Edge/Microsoft account
*   No Edge-specific issues
*   Performance is comparable to Chrome
*   All navigation works smoothly
*   No deprecated warnings

---

### Test 12.5: Cross-Browser CSS Consistency

**Objective:** Verify that CSS rendering is consistent across all major browsers.

**Setup:**

*   Application is open in all four browsers (Chrome, Firefox, Safari, Edge)
*   Multiple pages are loaded in each

**Test Steps:**

1.  Load homepage in each browser
2.  Compare layout, spacing, colors
3.  Check font rendering and sizes
4.  Load movie details page in each
5.  Compare CSS styling consistency
6.  Check button styles
7.  Verify form input styling
8.  Load responsive view at 768px in each
9.  Compare tablet layouts
10.  Load at 375px (mobile) in each
11.  Compare mobile layouts

**Expected Results:**

*   Homepage layout is identical across browsers
*   Movie details page styling is consistent
*   Text sizes are the same (allowing for OS font rendering differences)
*   Colors match or very closely
*   Button styling is consistent
*   Form inputs render similarly
*   Responsive breakpoints behave identically
*   Tablet layout is the same across browsers
*   Mobile layout matches across browsers
*   No significant visual differences between browsers

---

### Test 12.6: JavaScript Compatibility

**Objective:** Verify that JavaScript execution and features work across browsers without errors.

**Setup:**

*   Application is open in multiple browsers
*   DevTools console is visible in each

**Test Steps:**

1.  Open Console tab in DevTools for browser
2.  Perform search action and watch console
3.  Navigate between pages and observe console
4.  Click on buttons and monitor for errors
5.  Perform theme toggle and check for errors
6.  Test form input and submission
7.  Check for deprecation warnings
8.  Repeat in each browser
9.  Verify error messages are consistent
10.  Compare performance metrics across browsers

**Expected Results:**

*   No JavaScript errors in any browser console
*   Search functionality works without errors
*   Navigation doesn't trigger errors
*   Button clicks produce expected console activity
*   Theme toggle doesn't cause JavaScript errors
*   Form operations are error-free
*   No deprecation warnings in modern browsers
*   Async operations (promises, fetch) complete successfully
*   Event listeners work properly
*   No memory leaks (observable in DevTools)

---

## Notes & Observations

### Known Limitations

1.  **Third-Party API Dependencies:** Application relies on TMDB API availability. Network outages or API rate limiting may cause failures.
2.  **Browser Cache:** Some test results may be affected by browser caching. Clear cache between test sessions for accurate results.
3.  **Timing-Dependent Tests:** Tests involving animations, transitions, or timing may need adjustment based on network speed and hardware performance.
4.  **Database Data Freshness:** Search and discovery tests require the database to be populated with current movie data. Results may vary if data is stale.
5.  **Authentication Timeout:** Session timeout duration is not explicitly defined; long-running tests may encounter unexpected logouts.
6.  **Image CDN Performance:** Image loading times depend on external CDN performance and network conditions; timeouts may occur under poor conditions.

### Recommended Testing Tools

1.  **Playwright Test Runner:** Automated end-to-end testing for regression testing
2.  **Lighthouse:** Performance and accessibility auditing
3.  **WAVE WebAIM:** Accessibility evaluation and color contrast checking
4.  **Chrome DevTools:** DOM inspection, network monitoring, and performance analysis
5.  **Axe DevTools:** Automated accessibility testing and violations detection
6.  **Visual Regression Tools:** Percy, Applitools for cross-browser visual comparison
7.  **BrowserStack:** Real device cross-browser testing at scale
8.  **Gremlins.js:** Chaos testing for robustness validation

### Follow-Up Testing Needs

1.  **Performance Testing:** Load testing to verify application handles concurrent users
2.  **Security Testing:** SQL injection, XSS, CSRF vulnerability scanning
3.  **Compatibility Testing:** Older browser versions (IE11 support if required)
4.  **Localization Testing:** RTL language support, date/time formatting
5.  **Offline Functionality:** Service Worker and offline mode if implemented
6.  **Video Playback Testing:** Verify video codec compatibility across browsers
7.  **API Integration Testing:** Direct API testing to ensure backend contracts
8.  **Database Testing:** Data integrity, backup/restoration, corruption scenarios
9.  **Load Testing:** Stress testing with 1000+ concurrent users
10.  **Penetration Testing:** Professional security assessment before production

### Test Execution Metrics

*   **Total Test Scenarios:** 40+
*   **Estimated Execution Time:** 4-6 hours (manual testing)
*   **Estimated Automated Test Coverage:** 2-3 hours (with Playwright)
*   **Pass Criteria:** 100% pass rate required for release
*   **Regression Testing Frequency:** On every code commit
*   **Cross-Browser Testing Frequency:** Before each major release
*   **Accessibility Testing Frequency:** Quarterly minimum

### Defect Reporting Standards

When logging bugs:

*   **Title:** Clear, descriptive title of the issue
*   **Steps to Reproduce:** Numbered steps that consistently trigger the issue
*   **Expected Result:** What should happen
*   **Actual Result:** What actually happens
*   **Browser/OS:** Specific browser version and operating system
*   **Screenshots:** Visual evidence of the issue
*   **Console Errors:** Any JavaScript errors with full stack trace
*   **Attachments:** Video recording of issue if complex

### Sign-Off

*   **Test Plan Created:** February 28, 2026
*   **Test Plan Version:** 1.0
*   **Created For:** Playwright Movie Discovery Application
*   **Test Lead:** QA Team
*   **Next Review Date:** Upon significant application changes

---

**End of Test Plan**

_This test plan provides comprehensive coverage for the Playwright movie discovery application. Regular updates are recommended as features are added or modified. All test scenarios should be executed before release to ensure product quality and user satisfaction._