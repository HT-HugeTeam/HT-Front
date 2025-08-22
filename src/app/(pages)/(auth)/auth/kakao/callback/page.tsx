import { authService } from '@/services/auth/auth.service';
import { redirect } from 'next/navigation';

interface SearchParams {
  code?: string;
  error?: string;
  error_description?: string;
  state?: string;
}

export default async function KakaoCallbackPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { code, error, error_description } = params;

  // 에러 처리
  if (error) {
    console.error('Kakao login error:', error, error_description);
    redirect('/login?error=kakao_auth_failed');
  }

  if (!code) {
    console.error('No authorization code received');
    redirect('/login?error=no_code');
  }

  try {
    const result = await authService.kakaoLogin(code);
    console.log(result);
    const token = result.data.accessToken;
    console.log('token', token);

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
  } catch (error) {
    console.error('Kakao login failed:', error);
    redirect('/login?error=login_failed');
  }

  // 성공 시 리디렉션
  redirect('/');
}
