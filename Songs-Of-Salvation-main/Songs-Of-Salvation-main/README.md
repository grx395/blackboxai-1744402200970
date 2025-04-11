# Songs of Salvation

## Project Overview
Songs of Salvation is a web application designed to provide a platform for users to search, manage, and upload songs with lyrics. The application features a user-friendly interface powered by Tailwind CSS, allowing for easy navigation and accessibility. An admin dashboard is included for managing songs and user contributions. All song data is synchronized through GitHub, ensuring updates are available to all users.

## Setup Instructions

1. **GitHub Token Setup**
   - When you first launch the application, you'll be redirected to the authentication page
   - Follow these steps to get your GitHub token:
     1. Go to GitHub's [Personal Access Tokens](https://github.com/settings/tokens) page
     2. Click "Generate new token" and select "Classic"
     3. Give it a name (e.g., "Songs of Salvation")
     4. Select the "repo" scope
     5. Click "Generate token" at the bottom
     6. Copy the token and paste it in the application's auth page

2. **Running the Application**
   ```bash
   # Navigate to the project directory
   cd Songs-Of-Salvation-main

   # Start the server (requires Python 3)
   python3 -m http.server 8000
   ```
   Then open your browser and visit: http://localhost:8000

## Features
- Dynamic search and sorting of songs
- User-friendly layout with responsive design
- Theme customization options
- Admin panel for song uploads and management
- Support for audio file uploads associated with songs
- GitHub-based storage for synchronized data across all users

## Usage
- **Homepage**: Users can search for songs using the search bar, sort songs by different criteria (A-Z, Z-A, Newest, Oldest), and use the tags feature.
- **Admin Dashboard**: Accessible through the admin login (email: maxyrocs01@gmail.com, password: maxyrocs01@gmail.com), users can upload new songs, manage existing songs, and modify song information.
- **Theme Selector**: Users can customize their interface through a theme selector accessible via the palette icon.

## Project Structure
```
songs-of-salvation/
├── index.html          # Main homepage displaying songs and search functionality
├── admin.html          # Admin dashboard for song management
├── auth.html           # GitHub authentication page
├── js/
│   ├── main.js         # Main script for song searching and sorting functionality
│   ├── admin.js        # Script for handling admin functionalities
│   ├── storage.js      # Script for managing storage operations
│   ├── github-storage.js # Script for GitHub storage integration
│   └── themes.js       # Script for theme management
└── README.md          # Documentation file
```

## Dependencies
The project relies on the following external libraries:
- **Tailwind CSS**: For styling and layout
- **Font Awesome**: For icons used throughout the application
- **GitHub API**: For data storage and synchronization

These libraries are included via CDN links in the HTML files.

## Data Storage
All song data is stored in the GitHub repository: https://github.com/Maxyey/LYRICSSOS-SOURCES
This ensures that:
- All users see the same song data
- Updates made by admins are immediately available to all users
- Data persists across sessions and devices
- No need for a dedicated backend server

## Troubleshooting
If you encounter any issues:
1. Ensure your GitHub token is valid and has the 'repo' scope
2. Clear your browser cache if you see outdated data
3. Check the browser console for any error messages
4. Verify your internet connection as GitHub access is required

For admin access issues, ensure you're using the correct credentials:
- Email: maxyrocs01@gmail.com
- Password: maxyrocs01@gmail.com
