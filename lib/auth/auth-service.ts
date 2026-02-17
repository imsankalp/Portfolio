/**
 * Authentication Service
 * 
 * Handles admin authentication using password-based authentication with JWT tokens.
 */

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const TOKEN_NAME = 'admin-token';
const TOKEN_EXPIRY = '7d'; // 7 days

/**
 * Authentication Service
 * Provides methods for verifying credentials and managing sessions
 */
export class AuthService {
  /**
   * Verify admin credentials
   */
  async verifyCredentials(password: string): Promise<boolean> {
    return password === ADMIN_PASSWORD;
  }

  /**
   * Create authentication session
   * Returns JWT token
   */
  async createSession(): Promise<string> {
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(JWT_SECRET);
    
    return token;
  }

  /**
   * Verify authentication session
   */
  async verifySession(token: string): Promise<boolean> {
    try {
      await jwtVerify(token, JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Destroy authentication session
   */
  async destroySession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_NAME);
  }

  /**
   * Set session cookie
   */
  async setSessionCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
  }

  /**
   * Get session token from cookie
   */
  async getSessionToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_NAME)?.value;
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getSessionToken();
    if (!token) {
      return false;
    }
    return this.verifySession(token);
  }
}

// Export singleton instance
export const authService = new AuthService();
