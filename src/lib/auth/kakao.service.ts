export const kakaoAuthService = {
  // 카카오 로그인 URL 생성
  getAuthUrl: () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId!,
      redirect_uri: redirectUri!,
      scope: 'profile_nickname,profile_image', // 필요한 권한
    });

    return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
  },

  // 카카오 로그인 실행
  login: () => {
    const authUrl = kakaoAuthService.getAuthUrl();
    window.location.href = authUrl;
  },
};
