import { NextResponse } from 'next/server';
import { authService } from '@/lib/auth/auth-service';

/**
 * POST /api/admin/auth/logout
 * Logout admin user
 */
export async function POST() {
  try {
    // Destroy session
    await authService.destroySession();

    return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
