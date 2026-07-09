import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { storage } from '../utils/storage';
import { handleMockRequest } from './mockHandlers';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

function processQueue(error: unknown, token: string | null = null): void {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = storage.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
          refreshToken,
        });

        const newToken: string = response.data.data.token;
        storage.updateToken(newToken);
        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        storage.clearAuth();
        window.location.href = '/session-expired';
        return Promise.reject(normalizeError(error));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(normalizeError(error));
  },
);

function normalizeError(error: AxiosError<{ message?: string }>): Error {
  if (error.response?.data?.message) {
    return new Error(error.response.data.message);
  }
  if (error.message) {
    return new Error(error.message);
  }
  return new Error('Something went wrong. Please try again.');
}

if (import.meta.env.VITE_MOCK_AUTH === 'true') {
  const defaultAdapter =
    typeof axios.defaults.adapter === 'function' ? axios.defaults.adapter : undefined;

  apiClient.defaults.adapter = async (config) => {
    const mockResponse = handleMockRequest(config);
    if (mockResponse) {
      return mockResponse;
    }
    if (defaultAdapter) {
      return defaultAdapter(config);
    }
    throw new Error('No adapter available');
  };
}

export default apiClient;
