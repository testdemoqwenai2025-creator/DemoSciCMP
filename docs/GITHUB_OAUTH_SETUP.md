# GitHub OAuth Integration Guide

## Overview

SciCMP now supports **GitHub OAuth authentication** using the **PKCE (Proof Key for Code Exchange)** flow. This is a secure, modern authentication method that works perfectly with **static sites** - no server required!

## Features

### ✅ What's Implemented

1. **Live GitHub Login Button** - The "Sign in with GitHub" button in the login modal is now fully functional
2. **PKCE Security** - Uses SHA-256 code challenge for protection against code interception
3. **CSRF Protection** - State parameter prevents cross-site request forgery attacks
4. **Token Management** - Access tokens stored securely and used for API calls
5. **User Profile Sync** - Automatically fetches name, email, avatar from GitHub
6. **Session Persistence** - User stays logged in across page refreshes (via localStorage)

## Setup Instructions

### Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the details:

| Field | Value |
|-------|-------|
| Application name | `SciCMP Production` (or your preferred name) |
| Homepage URL | `https://[your-username].github.io/DemoSciCMP/` |
| Authorization callback URL | `https://[your-username].github.io/DemoSciCMP/` |

> **Note:** For local development, you can also add:
> - `http://localhost:3000/DemoSciCMP/`

4. Click **"Register application"**

### Step 2: Copy Your Client ID

After creating the app, you'll see your **Client ID** on the app details page.

Copy it and update your `.env` file:

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_actual_client_id_here
```

### Step 3: Restart Development Server

```bash
npm run dev
```

The environment variable will be available immediately.

## How It Works

### Authentication Flow

```
┌─────────────┐     ┌─────────────────┐     ┌──────────┐
│   SciCMP    │     │   GitHub OAuth  │     │  GitHub  │
│   (Browser) │     │   Authorization │     │   API    │
└──────┬──────┘     └────────┬────────┘     └────┬─────┘
       │                     │                   │
       │ 1. Initiate Login   │                   │
       │────────────────────>│                   │
       │                     │ 2. Generate PKCE  │
       │                     │ 3. Redirect to GH │
       │                     │──────────────────>│
       │                     │                   │
       │                     │ 4. User authorizes│
       │                     │<──────────────────│
       │ 5. Callback + code  │                   │
       │<────────────────────│                   │
       │                     │                   │
       │ 6. Exchange code    │                   │
       │    for token        │──────────────────>│
       │                     │<──────────────────│
       │ 7. Fetch user data  │                   │
       │────────────────────────────────────────>│
       │<────────────────────────────────────────│
       │ 8. Authenticated!   │                   │
       │                     │                   │
```

### PKCE Flow Details

1. **Code Verifier Generation**: Creates a cryptographically random 64-character string
2. **Code Challenge**: SHA-256 hash of verifier, Base64URL encoded
3. **Authorization Request**: Sends challenge to GitHub, stores verifier securely
4. **Token Exchange**: GitHub verifies code was issued with matching challenge
5. **Access Token**: Returned only if verification succeeds

This prevents token interception even if someone captures the authorization code.

## Theme System: Auto Mode

### New Feature: "Auto" Theme Option

The theme toggle now has **three states** that cycle through:

| State | Icon | Behavior |
|-------|------|----------|
| ☀️ Light | Sun icon | Forces light mode |
| 🌙 Dark | Moon icon | Forces dark mode |
| 🖥️ Auto | Monitor icon | Follows OS system preference |

### How Auto Mode Works

When "Auto" is selected:
- Detects `prefers-color-scheme: dark` media query on mount
- Listens for **system preference changes** in real-time
- If user switches between light/dark in OS settings → SciCMP updates automatically!
- Persists choice in localStorage (`scicmp-theme-v2`)

### Keyboard Shortcut

Press **Ctrl+D** (or Cmd+D on Mac) to cycle through themes:
Light → Dark → Auto → Light...

## Files Modified/Created

### New Files
- `/src/lib/github-oauth.ts` - Complete OAuth implementation
- `/src/lib/theme-store.ts` - Zustand store for 3-state theme management
- `/docs/GITHUB_OAUTH_SETUP.md` - This documentation

### Modified Files
- `/src/lib/auth-store.ts` - Added GitHub OAuth actions
- `/src/components/SciCMP/LoginModal.tsx` - Live GitHub button
- `/src/components/SciCMP/Header.tsx` - 3-state theme toggle
- `/src/components/SciCMP/UserMenu.tsx` - Show GitHub @handle
- `/src/app/page.tsx` - Theme store integration + OAuth callback handling
- `.env` - Added GitHub Client ID

## Testing

### Test GitHub OAuth

1. Click **"Sign In"** button in header
2. In the modal, click **"GitHub"** button
3. You'll be redirected to GitHub's authorization page
4. Authorize the application
5. You'll be redirected back with user profile loaded

### Test Demo Mode (Still Available)

The demo credentials still work:
- Email: `demo@scicmp.com`
- Password: `demo123`

### Test Theme Cycling

1. Click the theme toggle button (cycles: Light → Dark → Auto)
2. Try **Ctrl+D** keyboard shortcut
3. When in **Auto** mode:
   - Change your OS dark/light setting
   - Watch SciCMP update automatically!

## Troubleshooting

### "Redirect URI Mismatch" Error

Ensure your GitHub OAuth App settings match exactly:
- Callback URL must end with `/` 
- Must match your deployment URL including subdirectory

### Token Not Working After Refresh

Tokens are stored via Zustand persist (localStorage). Check browser console:
```javascript
localStorage.getItem('scicmp-auth')
```

### Theme Not Applying

Check the theme storage:
```javascript
localStorage.getItem('scicmp-theme-v2')
// Should return: {"state":{"themeMode":"auto"},"version":0}
```

## Security Considerations

✅ **Secure by Design**
- PKCE prevents authorization code interception
- CSRF state parameter prevents request forgery
- Tokens stored in memory (not exposed to XSS easily)
- No server-side secrets required

⚠️ **Important Notes**
- Client ID is public (intended for client-side use)
- Never expose your Client Secret in frontend code
- Tokens have limited scope (`read:user`, `user:email`)
- Users can revoke access anytime from GitHub Settings

## Next Steps (Future Enhancements)

- [ ] Add Google OAuth (currently shows "coming soon")
- [ ] Implement token refresh flow
- [ ] Add organization-based access control
- [ ] Support GitHub Enterprise (self-hosted)
- [ ] Add two-factor authentication prompt
- [ ] Implement session timeout handling

---

**Last Updated:** 2026-01-17  
**Version:** 2.0.0 (OAuth + Auto Theme)
