import { authService } from '@/lib/auth/auth.service';
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

  //   try {
  //     const result = await authService.kakaoLogin(code ?? '');

  //     // token이 있다고 가정
  //     const token = result.token;

  //     const response = await fetch('/api/cookie-set', {
  //       method: 'POST',
  //       body: JSON.stringify({ token }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to set cookie');
  //     }
  //     redirect('/');
  //   } catch (error) {
  //     console.error(error);
  //   }

  return null;
}
