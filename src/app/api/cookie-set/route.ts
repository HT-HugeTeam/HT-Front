import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: '토큰이 필요합니다' }, { status: 400 });
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({ success: true });

    response.cookies.set('accessToken', token as string, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? 'lax' : 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: '토큰 설정 중 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
