# Google OAuth Setup Guide

## Backend Configuration

1. **Set up Google OAuth credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to "Credentials" and create an OAuth 2.0 Client ID
   - Set the authorized redirect URI to: `http://localhost:8000/auth/google/callback`

2. **Update your backend `.env` file:**
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
   FRONTEND_URL=http://localhost:3000
   ```

## Frontend Configuration

1. **Create a `.env.local` file in the frontend directory:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## How it works

1. User clicks "Continue with Google" button on the login page
2. Frontend redirects to backend Google OAuth endpoint (`/auth/google`)
3. Backend redirects to Google OAuth consent screen
4. User authorizes the application
5. Google redirects back to backend callback (`/auth/google/callback`)
6. Backend processes the OAuth response and creates/authenticates the user
7. Backend redirects to frontend callback page with JWT token
8. Frontend stores the token and redirects to dashboard

## Testing

1. Start your backend server: `php artisan serve`
2. Start your frontend server: `npm run dev`
3. Navigate to the login page
4. Click "Continue with Google"
5. Complete the Google OAuth flow
6. You should be redirected to the dashboard with a valid JWT token 