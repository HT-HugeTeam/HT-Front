import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: '토큰이 필요합니다' }, { status: 400 });
    }

    const cookieStore = await cookies();

    // 토큰 쿠키 설정
    cookieStore.set('accessToken', token as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: '토큰 설정 중 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
