import type { AuthState } from '../types/authTypes';

const AUTH_KEY = 'auth_data';
const REMEMBER_KEY = 'remember_me';

function getStorage(): Storage {
  const rememberMe = localStorage.getItem(REMEMBER_KEY) === 'true';
  return rememberMe ? localStorage : sessionStorage;
}

export const storage = {
  getAuth(): AuthState | null {
    try {
      const data = getStorage().getItem(AUTH_KEY);
      return data ? (JSON.parse(data) as AuthState) : null;
    } catch {
      return null;
    }
  },

  setAuth(auth: AuthState): void {
    const storage = getStorage();
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    storage.setItem(AUTH_KEY, JSON.stringify(auth));
  },

  clearAuth(): void {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
  },

  getRememberMe(): boolean {
    return localStorage.getItem(REMEMBER_KEY) === 'true';
  },

  setRememberMe(remember: boolean): void {
    if (remember) {
      localStorage.setItem(REMEMBER_KEY, 'true');
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }
  },

  getToken(): string | null {
    return this.getAuth()?.token ?? null;
  },

  getRefreshToken(): string | null {
    return this.getAuth()?.refreshToken ?? null;
  },

  updateToken(token: string): void {
    const auth = this.getAuth();
    if (auth) {
      this.setAuth({ ...auth, token });
    }
  },
};
