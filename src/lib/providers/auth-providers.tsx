'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';

interface AuthProviderProps {
  initialToken: string | null;
}

export function AuthProvider({ initialToken }: AuthProviderProps) {
  const setAccessToken = useAuthStore(state => state.setAccessToken);
  setAccessToken(initialToken);
  useEffect(() => {
    if (initialToken) {
      setAccessToken(initialToken);
    }
  }, [initialToken, setAccessToken]);
  return null;
}
