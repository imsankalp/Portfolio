import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth/auth-service';

/**
 * POST /api/admin/auth/login
 * Authenticate admin user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      );
    }

    // Verify credentials
    const isValid = await authService.verifyCredentials(password);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session
    const token = await authService.createSession();
    
    // Set session cookie
    await authService.setSessionCookie(token);

    return NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
