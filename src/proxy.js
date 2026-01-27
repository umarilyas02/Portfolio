import { NextResponse } from 'next/server';

// Using the new 'proxy' function name for Next.js 16
export function proxy(request) {
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Add performance headers for static assets
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/_next/static/') || 
      pathname.startsWith('/images/') ||
      pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
