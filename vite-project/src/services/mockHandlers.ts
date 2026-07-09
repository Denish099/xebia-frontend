import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface DemoAccount {
  email: string;
  password: string;
  id: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

const MOCK_TOKEN = 'mock-jwt-token-xyz789';
const MOCK_REFRESH_TOKEN = 'mock-refresh-token-abc456';

function getDemoAccounts(): DemoAccount[] {
  return [
    {
      email: import.meta.env.VITE_DEMO_SUPER_ADMIN_EMAIL || 'superadmin@university.com',
      password: import.meta.env.VITE_DEMO_SUPER_ADMIN_PASSWORD || 'password123',
      id: 'mock-super-admin-001',
      firstName: 'Super',
      lastName: 'Admin',
      roles: ['super_admin'],
    },
    {
      email: import.meta.env.VITE_DEMO_UNIVERSITY_ADMIN_EMAIL || 'uniadmin@university.com',
      password: import.meta.env.VITE_DEMO_UNIVERSITY_ADMIN_PASSWORD || 'password123',
      id: 'mock-uni-admin-002',
      firstName: 'University',
      lastName: 'Admin',
      roles: ['university_admin'],
    },
    {
      email: import.meta.env.VITE_DEMO_FACULTY_EMAIL || 'faculty@university.com',
      password: import.meta.env.VITE_DEMO_FACULTY_PASSWORD || 'password123',
      id: 'mock-faculty-003',
      firstName: 'John',
      lastName: 'Faculty',
      roles: ['faculty'],
    },
    {
      email: import.meta.env.VITE_DEMO_STUDENT_EMAIL || 'student@university.com',
      password: import.meta.env.VITE_DEMO_STUDENT_PASSWORD || 'password123',
      id: 'mock-student-004',
      firstName: 'Jane',
      lastName: 'Student',
      roles: ['student'],
    },
  ];
}

type MockResult = AxiosResponse | null;

export function handleMockRequest(config: AxiosRequestConfig): MockResult {
  const { method, url, data } = config;
  const body = data ? JSON.parse(data as string) : {};

  if (!url) return null;

  if (method?.toLowerCase() === 'post' && url.includes('/api/auth/login')) {
    return mockLogin(body);
  }

  if (method?.toLowerCase() === 'post' && url.includes('/api/auth/signup')) {
    return mockSignup(body);
  }

  if (method?.toLowerCase() === 'post' && url.includes('/api/auth/logout')) {
    return mockLogout();
  }

  if (method?.toLowerCase() === 'post' && url.includes('/api/auth/password-reset/request')) {
    return mockForgotPassword();
  }

  if (method?.toLowerCase() === 'post' && url.includes('/api/auth/password-reset/confirm')) {
    return mockResetPassword();
  }

  if (method?.toLowerCase() === 'post' && url.includes('/api/auth/refresh-token')) {
    return mockRefreshToken();
  }

  return null;
}

function mockLogin(body: Record<string, unknown>): MockResult {
  const accounts = getDemoAccounts();
  const account = accounts.find(
    (a) => a.email === body.email && a.password === body.password,
  );

  if (!account) {
    return createResponse(401, {
      message: 'Invalid email or password',
    });
  }

  return createResponse(200, {
    message: 'Login successful',
    data: {
      id: account.id,
      email: account.email,
      roles: account.roles,
      token: MOCK_TOKEN,
      refreshToken: MOCK_REFRESH_TOKEN,
    },
  });
}

function mockSignup(body: Record<string, unknown>): MockResult {
  return createResponse(201, {
    message: 'Signup successful',
    data: {
      id: 'mock-new-user-' + Date.now(),
      email: body.email || '',
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      roles: ['student'],
    },
  });
}

function mockLogout(): MockResult {
  return createResponse(200, {
    message: 'Logged out successfully',
  });
}

function mockForgotPassword(): MockResult {
  return createResponse(200, {
    message: 'Password reset link sent to your email',
  });
}

function mockResetPassword(): MockResult {
  return createResponse(200, {
    message: 'Password changed successfully',
  });
}

function mockRefreshToken(): MockResult {
  return createResponse(200, {
    data: {
      token: MOCK_TOKEN,
    },
  });
}

function createResponse(status: number, data: unknown): AxiosResponse {
  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: { 'content-type': 'application/json' },
    config: {} as InternalAxiosRequestConfig,
  };
}
