'use client';

import KakaoLogo from '@/public/svg/logo/kakao-logo.svg';
import LoginMainBigLogo from '@/public/svg/logo/login-main-big.svg';

export default function LoginPage() {
  return (
    <div className='px-6 pt-57 pb-20 not-only-of-type:w-full h-screen mx-auto login-bg flex flex-col justify-between'>
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
      <button
        // onClick={login}
        // disabled={isLoading}
        className='kakao-btn'
      >
        <KakaoLogo />
        <span className='kakao-btn-text'>카카오톡으로 로그인</span>
      </button>
    </div>
  );
}
