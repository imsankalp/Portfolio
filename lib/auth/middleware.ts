/**
 * Authentication Middleware
 * 
 * Protects admin routes by verifying authentication.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);
const TOKEN_NAME = 'admin-token';

/**
 * Verify JWT token
 */
async function verifyToken(token: string): Promise<boolean> {
  try {
    const { jwtVerify } = await import('jose');
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

/**
 * Authentication middleware for protecting admin routes
 */
export async function authMiddleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value;
  
  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // Verify token
  const isValid = await verifyToken(token);
  
  if (!isValid) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // Token is valid, allow access
  return NextResponse.next();
}

/**
 * Check if user is authenticated (for use in server components)
 */
export async function requireAuth(): Promise<boolean> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  
  if (!token) {
    return false;
  }
  
  return verifyToken(token);
}
