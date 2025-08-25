import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // accessToken
    cookieStore.delete('accessToken');

    return NextResponse.json({
      success: true,
      message: 'Logout success',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout error' }, { status: 500 });
  }
}
