/**
 * GitHub OAuth Configuration for SciCMP
 * 
 * Uses PKCE (Proof Key for Code Exchange) flow - ideal for static sites
 * No server-side components required
 * 
 * Setup Instructions:
 * 1. Go to https://github.com/settings/developers
 * 2. Click "New OAuth App"
 * 3. Set:
 *    - Application name: SciCMP Production
 *    - Homepage URL: https://[your-username].github.io/DemoSciCMP/
 *    - Authorization callback URL: https://[your-username].github.io/DemoSciCMP/
 * 4. Copy the Client ID below
 * 
 * For local development, you can also add:
 *    - http://localhost:3000/DemoSciCMP/
 */

export const GITHUB_OAUTH_CONFIG = {
  // Replace this with your actual GitHub OAuth App Client ID
  // Get yours at: https://github.com/settings/developers
  CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'Ov23liESxh0AqJQxE8bC',
  
  // Configuration
  AUTH_URL: 'https://github.com/login/oauth/authorize',
  TOKEN_URL: 'https://github.com/login/oauth/access_token',
  USER_API: 'https://api.github.com/user',
  EMAIL_API: 'https://api.github.com/user/emails',
  
  // Scopes requested from GitHub
  SCOPES: ['read:user', 'user:email'],
  
  // Storage keys
  STORAGE_KEYS: {
    STATE: 'github-oauth-state',
    CODE_VERIFIER: 'github-oauth-code-verifier',
    TOKEN: 'github-oauth-token',
    USER: 'github-user-data',
  },
} as const;

/**
 * Generate random string for PKCE
 */
export function generateRandomString(length: number): string {
  const allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values, (v) => allowed[v % allowed.length]).join('');
}

/**
 * Generate SHA-256 hash for code verifier
 */
async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

/**
 * Base64URL encode a buffer
 */
function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Generate PKCE code challenge from verifier
 */
export async function generatePKCE(): Promise<{
  codeVerifier: string;
  codeChallenge: string;
}> {
  const verifier = generateRandomString(64);
  const hash = await sha256(verifier);
  const challenge = base64UrlEncode(hash);
  
  return { codeVerifier: verifier, codeChallenge: challenge };
}

/**
 * Build GitHub authorization URL with PKCE
 */
export function buildAuthUrl(
  codeChallenge: string,
  state: string
): string {
  const params = new URLSearchParams({
    client_id: GITHUB_OAUTH_CONFIG.CLIENT_ID,
    redirect_uri: `${window.location.origin}${window.location.pathname || '/DemoSciCMP/'}`,
    scope: GITHUB_OAUTH_CONFIG.SCOPES.join(' '),
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });
  
  return `${GITHUB_OAUTH_CONFIG.AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  code: string,
  codeVerifier: string
): Promise<string> {
  const response = await fetch(GITHUB_OAUTH_CONFIG.TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_OAUTH_CONFIG.CLIENT_ID,
      redirect_uri: `${window.location.origin}${window.location.pathname || '/DemoSciCMP/'}`,
      code: code,
      code_verifier: codeVerifier,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error_description || data.error);
  }
  
  return data.access_token;
}

/**
 * Fetch GitHub user profile with token
 */
export async function fetchGitHubUser(accessToken: string) {
  const response = await fetch(GITHUB_OAUTH_CONFIG.USER_API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  
  return response.json();
}

/**
 * Fetch GitHub user's primary email
 */
export async function fetchGitHubEmails(accessToken: string): Promise<string> {
  const response = await fetch(GITHUB_OAUTH_CONFIG.EMAIL_API, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user emails');
  }
  
  const emails = await response.json();
  
  // Find primary verified email
  const primaryEmail = emails.find(
    (email: { primary: boolean; verified: boolean }) => 
      email.primary && email.verified
  );
  
  return primaryEmail?.email || emails[0]?.email || '';
}

/**
 * Parse OAuth callback from URL
 */
export function parseOAuthCallback(url: string): {
  code: string | null;
  state: string | null;
  error: string | null;
} {
  const urlObj = new URL(url);
  const params = urlObj.searchParams;
  
  return {
    code: params.get('code'),
    state: params.get('state'),
    error: params.get('error'),
  };
}

/**
 * Store OAuth data securely in sessionStorage (not persisted across tabs)
 */
export function storeOAuthData(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

/**
 * Retrieve OAuth data from sessionStorage
 */
export function getOAuthData(key: string): string | null {
  return sessionStorage.getItem(key);
}

/**
 * Clear all OAuth data from sessionStorage
 */
export function clearOAuthData(): void {
  Object.values(GITHUB_OAUTH_CONFIG.STORAGE_KEYS).forEach(key => {
    sessionStorage.removeItem(key);
  });
}
