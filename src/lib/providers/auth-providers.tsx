'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
  initialToken: string | null;
}

export function AuthProvider({ children, initialToken }: AuthProviderProps) {
  const setAccessToken = useAuthStore(state => state.setAccessToken);

  useEffect(() => {
    if (initialToken) {
      setAccessToken(initialToken);
    }
  }, [initialToken, setAccessToken]);

  return <>{children}</>;
}
