// API service functions to replace localStorage logic

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Base API configuration
const API_BASE_URL = '/api';

// Generic fetch wrapper with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Authentication API
export const authApi = {
  login: async (username: string, password: string) => {
    return apiRequest<{ employee: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
};

// Sessions API
export const sessionsApi = {
  getAll: async () => {
    return apiRequest<any[]>('/sessions');
  },

  create: async (sessionData: any) => {
    return apiRequest<any>('/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  },

  update: async (id: string, sessionData: any) => {
    return apiRequest<any>(`/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sessionData),
    });
  },

  delete: async (id: string) => {
    return apiRequest<{ success: boolean }>(`/sessions/${id}`, {
      method: 'DELETE',
    });
  },
};

// Bookings API
export const bookingsApi = {
  getAll: async () => {
    return apiRequest<any[]>('/bookings');
  },

  create: async (bookingData: any) => {
    return apiRequest<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  cancel: async (id: string) => {
    return apiRequest<{ success: boolean }>(`/bookings/${id}`, {
      method: 'DELETE',
    });
  },
};

// Loading state management
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export const createLoadingState = (): LoadingState => ({
  isLoading: false,
  error: null,
});

export const setLoading = (_state: LoadingState, isLoading: boolean, error: string | null = null): LoadingState => ({
  isLoading,
  error,
});
