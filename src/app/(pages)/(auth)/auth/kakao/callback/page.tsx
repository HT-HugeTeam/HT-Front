'use client';

import { LoadingSpinner } from '@/components/loading-spinner';
import { kakaoLogin } from '@/lib/api/authentication/authentication';
import { getOnboardingStatus } from '@/lib/api/user/user';
import { useAuthStore } from '@/lib/stores/auth-store';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [isLoading, setIsLoading] = useState(false);

  const setAccessToken = useAuthStore(state => state.setAccessToken);

  if (!code) {
    console.error('No authorization code received');
    redirect('/login?error=no_code');
  }
  const handleKakaoLogin = async (): Promise<string> => {
    const result = await kakaoLogin({
      authorizationCode: code,
    });
    const token = result.accessToken!;
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/cookie-set`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      },
    );
    if (!response.ok) {
      console.error('Failed to set cookie:', response.statusText);
      redirect('/login?error=cookie_failed');
    }
    return token;
  };
  const handleOnboarding = async () => {
    const result = await getOnboardingStatus();
    if (!result.termsOfServiceAccepted) {
      redirect('/onboarding');
    } else {
      redirect('/home');
    }
  };
  useEffect(() => {
    let isMounted = true;
    void (async () => {
      void setIsLoading(true);
      try {
        await handleKakaoLogin();
        if (!isMounted) return;
        await handleOnboarding();
      } finally {
        if (!isMounted) return;
        void setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [code]);

  return <LoadingSpinner />;
}
