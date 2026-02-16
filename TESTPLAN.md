# Movies App End-to-End Test Plan

## Home And Navigation

### Header And Sidebar Navigation

Objective: Verify the header controls and sidebar navigation links are visible and route correctly.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Confirm the sidebar shows Discover and Genres sections.
2.  Click Discover > Popular and verify the URL contains category=Popular and page=1.
3.  Click Discover > Top Rated and verify the URL contains category=Top+Rated and page=1.
4.  Click Discover > Upcoming and verify the URL contains category=Upcoming and page=1.
5.  Click the app logo if present and verify it returns to the home page.

### User Profile Entry Point

Objective: Confirm the user profile button is visible and can be opened.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Click the User Profile button in the header.
2.  Verify the profile menu or login entry is displayed.

## Discover And Browsing

### Category Listing And Pagination

Objective: Ensure category results load and pagination changes results.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Click Discover > Popular.
2.  Confirm a list of movie cards appears.
3.  Use the pagination control to go to the next page.
4.  Verify the page query updates and new results load.

### Genre Landing

Objective: Verify genre navigation loads the genre list page.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Open the genre list from the sidebar or the /genre route.
2.  Verify the page displays a list of genres.
3.  Select a genre and confirm results load for that genre.

## Search

### Basic Search

Objective: Validate search input and results page behavior.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Enter a movie title in the search input.
2.  Submit the search.
3.  Verify the URL is /search and results are displayed.

### Search Empty State

Objective: Validate behavior when searching with no query.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Focus the search input and submit an empty query.
2.  Verify a user-friendly message or no-results state is shown.

## Movie Details

### Movie Details Page

Objective: Confirm a movie details page loads with key information.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Open a movie from any list.
2.  Verify the /movie route loads.
3.  Confirm summary details, rating, and images are visible.

### Recommended Movies

Objective: Ensure recommended movies are shown and navigable.  
Setup: Start the app at http://localhost:3000 and open a movie details page.  
Test Steps:

1.  Scroll to the recommended movies section.
2.  Click a recommended movie.
3.  Verify the movie details page updates to the selected movie.

## Person Details

### Person Page From Credits

Objective: Validate navigation from credits to person details.  
Setup: Start the app at http://localhost:3000 and open a movie details page.  
Test Steps:

1.  Click a person from the credits list.
2.  Verify the /person route loads.
3.  Confirm the person summary and related movies are visible.

## Authentication

### Login

Objective: Verify login works with provided credentials.  
Setup: Start the app at http://localhost:3000 and open the user profile entry.  
Test Steps:

1.  Enter user me@outlook.com and password 12345.
2.  Submit the login form.
3.  Verify the UI reflects an authenticated state.

### Logout

Objective: Verify a user can log out successfully.  
Setup: Log in using valid credentials.  
Test Steps:

1.  Open the user profile menu.
2.  Click Log out.
3.  Confirm the UI returns to a signed-out state.

## My Lists

### My Lists Page

Objective: Confirm the My Lists page loads for authenticated users.  
Setup: Log in using valid credentials.  
Test Steps:

1.  Navigate to /my-lists.
2.  Verify the page loads and displays existing lists or an empty state.

### Create List

Objective: Validate creating a new list.  
Setup: Log in using valid credentials.  
Test Steps:

1.  Navigate to /list/add-or-edit.
2.  Enter list name and description.
3.  Save the list.
4.  Verify the list appears in /my-lists.

### Add And Remove List Items

Objective: Validate adding and removing movies in a list.  
Setup: Log in using valid credentials and have a list available.  
Test Steps:

1.  Navigate to /list/add-or-remove-items.
2.  Add a movie to the list.
3.  Verify the movie appears in the list.
4.  Remove the same movie.
5.  Verify the movie is removed.

### Choose List Image

Objective: Verify selecting a list image updates the list.  
Setup: Log in using valid credentials and have a list available.  
Test Steps:

1.  Navigate to /list/choose-image.
2.  Select an image.
3.  Save the selection.
4.  Verify the chosen image appears on the list details.

### Delete List

Objective: Validate list deletion.  
Setup: Log in using valid credentials and have a list available.  
Test Steps:

1.  Navigate to /list/remove.
2.  Choose a list to delete.
3.  Confirm deletion.
4.  Verify the list no longer appears in /my-lists.

## UI Preferences

### Theme Toggle

Objective: Confirm the light and dark mode toggles work.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Click the theme toggle to switch to dark mode.
2.  Verify the UI updates to dark mode.
3.  Click the toggle to switch back to light mode.
4.  Verify the UI updates to light mode.

## Error Handling

### Not Found Page

Objective: Verify the 404 page appears for invalid routes.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Navigate to /not-a-real-route.
2.  Verify the 404 page is displayed.

### Error Page

Objective: Verify the error page can be displayed.  
Setup: Start the app at http://localhost:3000.  
Test Steps:

1.  Navigate to /error.
2.  Verify the error page is displayed.