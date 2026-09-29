/**
 * authService — mock implementation.
 *
 * Interface is shaped for a real backend. To swap: replace the bodies with
 * fetch() calls and delete the mock helpers. Nothing in the UI imports the
 * mock helpers, so no component changes are needed.
 */

const STORAGE_KEY = 'voxa.auth.user';
const LATENCY_MS = 650;

let currentUser = readStoredUser();

function readStoredUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user) {
  try {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable — session stays in memory only */
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeUser({ email, name }) {
  const displayName = name || email.split('@')[0];
  return {
    id: `usr_${Math.random().toString(36).slice(2, 10)}`,
    email,
    name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
    initials: displayName.slice(0, 2).toUpperCase(),
    plan: 'Free Plan',
    createdAt: new Date().toISOString(),
  };
}

/** Minimal validation errors surfaced to the form. */
export class AuthError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'AuthError';
    this.field = field;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const authService = {
  /** @returns {Promise<{user: object}>} */
  async login({ email, password }) {
    await delay(LATENCY_MS);

    if (!email || !EMAIL_RE.test(email)) {
      throw new AuthError('Enter a valid email address.', 'email');
    }
    if (!password || password.length < 6) {
      throw new AuthError('Password must be at least 6 characters.', 'password');
    }

    const user = makeUser({ email });
    currentUser = user;
    writeStoredUser(user);
    return { user };
  },

  /** @returns {Promise<{user: object}>} */
  async signup({ name, email, password, confirmPassword }) {
    await delay(LATENCY_MS);

    if (!name || name.trim().length < 2) {
      throw new AuthError('Enter your name.', 'name');
    }
    if (!email || !EMAIL_RE.test(email)) {
      throw new AuthError('Enter a valid email address.', 'email');
    }
    if (!password || password.length < 6) {
      throw new AuthError('Password must be at least 6 characters.', 'password');
    }
    if (confirmPassword !== undefined && password !== confirmPassword) {
      throw new AuthError('Passwords do not match.', 'confirmPassword');
    }

    const user = makeUser({ email, name: name.trim() });
    currentUser = user;
    writeStoredUser(user);
    return { user };
  },

  async logout() {
    await delay(180);
    currentUser = null;
    writeStoredUser(null);
  },

  /** Synchronous read of the in-memory session. */
  getCurrentUser() {
    return currentUser;
  },

  async requestPasswordReset({ email }) {
    await delay(LATENCY_MS);
    if (!email || !EMAIL_RE.test(email)) {
      throw new AuthError('Enter a valid email address.', 'email');
    }
    return { sent: true, email };
  },
};

export default authService;
