# Movies App Test Suite

This directory contains a comprehensive test suite generated from `tests/workshop/plans/movies-core-plan.md`. The test suite follows Playwright best practices and includes proper use of `test.step()` for reporting clarity, shared helpers for code reuse, and validated selectors.

## Directory Structure

```
tests/workshop/movies/
├── shared-helpers.ts              # Shared utilities and helper functions
├── homepage/
│   ├── homepage-load.spec.ts         # Homepage loading and initial state
│   └── sidebar-navigation.spec.ts    # Sidebar navigation structure
├── search/
│   ├── basic-movie-search.spec.ts    # Basic search functionality
│   ├── empty-search-results.spec.ts  # Empty search results handling
│   └── search-persistence.spec.ts    # Search term persistence across navigation
├── genre/
│   ├── action-genre-filter.spec.ts   # Action genre filtering
│   ├── genre-sort-functionality.spec.ts # Genre sorting options
│   └── multiple-genre-navigation.spec.ts # Navigation between genres
├── movie-details/
│   ├── navigate-to-details.spec.ts   # Navigation to movie details
│   └── details-content-verification.spec.ts # Movie details content
├── theme/
│   └── light-to-dark-toggle.spec.ts  # Theme switching functionality
├── pagination/
│   └── homepage-pagination.spec.ts   # Homepage pagination navigation
└── login/
    └── user-profile-access.spec.ts   # Mock login and user profile
```

## Test Coverage

### ✅ Implemented Test Categories

**Homepage Load and Initial State** (2 tests)

*   Homepage loads successfully with all required elements
*   Navigation sidebar structure and functionality

**Search Functionality** (3 tests)

*   Basic movie search with results validation
*   Empty search results handling
*   Search term persistence across page navigation

**Genre Filtering** (3 tests)

*   Action genre filter functionality
*   Genre sort options and URL parameter updates
*   Multiple genre navigation and state management

**Movie Details Navigation** (2 tests)

*   Navigation to movie details from various pages
*   Movie details content verification (title, rating, cast, etc.)

**Theme Toggle** (1 test)

*   Light to dark theme switching with persistence

**Pagination** (1 test)

*   Homepage pagination with content verification

**Mock Login Flow** (1 test)

*   User profile dropdown and navigation options

### 🔄 Additional Tests from Plan (Not Yet Implemented)

The following test scenarios from the original plan can be added using the same patterns:

*   **Recommendations**: Recommended movies display and navigation
*   **Cast Member Navigation**: Navigation from movie details to person pages
*   **Genre Page Pagination**: Pagination within genre pages
*   **Search Results Pagination**: Pagination within search results
*   **Additional Theme Tests**: Dark to light toggle, theme persistence
*   **My Lists Navigation**: Create New List and My Lists functionality
*   **Mock Logout Flow**: Logout functionality testing

## Key Features

### Shared Helpers (`shared-helpers.ts`)

The test suite includes a comprehensive helpers library with:

*   **Navigation Helpers**: Navigate to homepage, genres, movie details
*   **Search Helpers**: Perform searches with proper waiting
*   **Theme Helpers**: Toggle between light and dark themes
*   **Validation Helpers**: Verify movie grids, page loading performance
*   **UI Interaction Helpers**: Open/close sidebar, handle user profile

### Test Structure

Each test follows consistent patterns:

1.  **Descriptive test names** matching the test plan scenarios
2.  **test.step()** usage for clear reporting and debugging
3.  **Proper selectors** validated using Playwright MCP browser testing
4.  **Performance considerations** with appropriate wait strategies
5.  **Cross-browser compatibility** with flexible selector strategies

### Selector Validation

All selectors have been validated using Playwright MCP browser interaction:

*   **Theme toggles**: `button "☀"` and `button "☾"`
*   **Search input**: `textbox "Search Input"`
*   **Navigation menu**: `menu` role for hamburger button
*   **Movie grids**: `list[aria-label="movies"]` with proper structure
*   **Genre links**: Dynamic genre name matching with proper URLs
*   **User profile**: `button "Log In"` for profile access

## Running the Tests

```
# Run all movie tests
npx playwright test tests/workshop/movies/

# Run specific test category
npx playwright test tests/workshop/movies/search/
npx playwright test tests/workshop/movies/homepage/

# Run with headed mode for debugging
npx playwright test tests/workshop/movies/ --headed

# Run specific test file
npx playwright test tests/workshop/movies/homepage/homepage-load.spec.ts
```

## Best Practices Implemented

1.  **Code Reuse**: Shared helpers prevent code duplication
2.  **Performance**: Page load performance thresholds and proper waiting
3.  **Accessibility**: Keyboard navigation testing where applicable
4.  **Error Handling**: Graceful handling of missing elements and timeouts
5.  **Cross-Page Testing**: Tests verify functionality across different page types
6.  **URL Validation**: Proper URL parameter verification for all navigation
7.  **Content Validation**: Movie grid structure and content verification
8.  **State Management**: Theme and search persistence testing

## Future Enhancements

To complete the full test plan coverage, consider adding:

1.  **Recommendations tests** for movie recommendation functionality
2.  **Person page tests** for cast member navigation
3.  **Advanced pagination** tests for genre and search pages
4.  **Performance tests** with detailed metrics collection
5.  **Mobile responsive** tests for different viewport sizes
6.  **API integration** tests if backend testing is needed
7.  **Visual regression** tests for theme switching validation

This test suite provides a solid foundation for comprehensive end-to-end testing of the Movies application with excellent maintainability and extensibility.