// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const host = request.headers.get('host') || '';
//   const url = request.nextUrl;

//   // www가 없는 경우 www로 리디렉션
//   if (host === 'neon101.ai') {
//     return NextResponse.redirect(`https://www.neon101.ai${url.pathname}`, 301);
//   }

//   return NextResponse.next();
// }



// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;

  if (host === 'neon101.ai') {
    url.hostname = 'www.neon101.ai';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// 👇 matcher가 없으면 middleware가 작동하지 않을 수 있음
export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|images|videos).*)'],
};
