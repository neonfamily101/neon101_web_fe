// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;

  if (host === 'neon101.ai') {
    url.hostname = 'www.neon101.ai';
    // ✅ 포트 제거
    url.port = ''; 
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|images|videos).*)'],
};
