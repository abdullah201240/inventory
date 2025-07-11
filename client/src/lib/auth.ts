import { User } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const login = async (email: string, password: string): Promise<User> => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'Login failed');
  localStorage.setItem('token', result.token);
  // Fetch user profile after login
  const user = await getCurrentUser(true);
  if (!user) throw new Error('Failed to fetch user profile');
  return user;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async (forceRefresh = false): Promise<User | null> => {
  const cached = localStorage.getItem('user');
  if (cached && !forceRefresh) {
    try {
      return JSON.parse(cached);
    } catch {
      localStorage.removeItem('user');
    }
  }
  const token = localStorage.getItem('token');
  if (!token) return null;
  const res = await fetch(`${API_URL}/users/profile`, {
    headers: { Authorization: `Token ${token}` }
  });
  if (!res.ok) {
    logout();
    return null;
  }
  const user = await res.json();
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const hasRole = () => {
  // This function should be updated to work with the new user object if needed
  // For now, just check if user exists
  return isAuthenticated();
};