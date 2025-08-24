'use client';

import { kakaoAuthService } from '@/services/auth/kakao.service';
import KakaoLogo from '@/public/svg/logo/kakao-logo.svg';
import LoginMainBigLogo from '@/public/svg/logo/login-main-big.svg';
import { redirect, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useEffect } from 'react';
import { apiClient } from '@/lib/api/axios-client-config';

export default function LoginPage() {
  const router = useRouter();
  const accessToken = useAuthStore(state => state.accessToken);

  const handleKakaoLogin = () => {
    kakaoAuthService.login();
  };
  const handleGuestLogin = async () => {
    const tokenResponse: { accessToken: string } = await apiClient({
      url: '/test/auth/login',
      method: 'POST',
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/cookie-set`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenResponse.accessToken }),
      },
    );
    if (!response.ok) {
      console.error('Failed to set cookie:', response.statusText);
      return;
    }
    router.push('/home');
  };
  useEffect(() => {
    if (accessToken) {
      router.push('/home');
    }
  }, [accessToken]);
  return (
    <div className='px-6 pt-57 pb-20 min-w-0 w-full h-screen mx-auto login-bg flex flex-col justify-between'>
      {/* 헤더 || 로고 영역 */}
      <header className='flex flex-col items-center justify-center gap-8'>
        <LoginMainBigLogo />
        <div className='flex flex-col items-center justify-center gap-4'>
          <h4 className='text-headlineSmall text-orange400'>
            식당 탐색의 새로운 판
          </h4>
          <h2 className='login-main-title text-orange500'>쇼츠테이블</h2>
        </div>
      </header>

      {/* 로그인 버튼 영역 */}

      <div className='flex flex-col gap-4'>
        {/* 카카오 로그인 */}
        <button onClick={handleKakaoLogin} className='kakao-btn'>
          <KakaoLogo />
          <span className='kakao-btn-text'>카카오 로그인</span>
        </button>

        {/* 게스트 로그인 */}
        <button
          onClick={handleGuestLogin}
          className='px-5 py-2 w-full h-14 flex-center bg-orange200 rounded-[6px] text-bodySmall text-orange400'
        >
          게스트로 로그인
        </button>
      </div>
    </div>
  );
}
