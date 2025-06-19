import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;

  // www가 없는 경우 www로 리디렉션
  if (host === 'neon101.ai') {
    url.hostname = 'www.neon101.ai';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
