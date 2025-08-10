'use client';

import KakaoLogo from '@/public/svg/logo/kakao-logo.svg';

export default function LoginPage() {

  return (
    <div className="w-full min-h-screen mx-auto bg-white flex flex-col justify-between">

        {/* 헤더 || 로고 영역 */}
        <div className="flex justify-center px-6 py-12">
            <div className="w-32 h-32 bg-gray-200 rounded-2xl flex items-center justify-center">
                <span className="text-gray-600 font-medium">로고</span>
            </div>
        </div>

        {/* 로그인 버튼 영역 */}
        <div className="px-6 pb-8">
            <button
                // onClick={login}
                // disabled={isLoading}
                className="w-full bg-[#FEE500] hover:bg-[#FADA0A] active:bg-[#F5D800] 
                        text-[#3C1E1E] font-semibold py-4 px-6 rounded-xl 
                        flex items-center justify-center space-x-3
                        transition-all duration-200 ease-in-out
                        disabled:opacity-70 disabled:cursor-not-allowed
                        shadow-lg hover:shadow-xl
                        border border-[#FEE500]"
            >
                <KakaoLogo />
                <span>카카오톡으로 로그인</span>
            </button>
        
            {/* 부가 정보 */}
            <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                로그인 시 <span className="underline">서비스 이용약관</span> 및{' '}
                <span className="underline">개인정보처리방침</span>에 동의한 것으로 간주됩니다.
            </p>
        </div>
  </div>
  );
}