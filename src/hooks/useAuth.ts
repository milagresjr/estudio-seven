// hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, type User, type LoginRequest } from '@/lib/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const checkAuth = useCallback(async () => {
    if (!authApi.isAuthenticated()) {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      return;
    }

    try {
      const user = await authApi.getCurrentUser();
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginRequest) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await authApi.login(credentials);

      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
      });

      navigate('/admin/dashboard');
      return response;
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await authApi.logout();
    } finally {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      navigate('/admin/login');
    }
  };

  return {
    ...state,
    login,
    logout,
    checkAuth,
  };
};
