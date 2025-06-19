// // src/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const host = request.headers.get('host') || '';
//   const url = request.nextUrl;

//   if (host === 'neon101.ai') {
//     url.hostname = 'www.neon101.ai';
//     // ✅ 포트 제거
//     url.port = ''; 
//     return NextResponse.redirect(url, 301);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/', '/((?!_next|favicon.ico|images|videos).*)'],
// };



// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl;

  // ✅ www 없는 도메인을 www로 리디렉션 + 포트 제거
  if (host === 'neon101.ai') {
    url.hostname = 'www.neon101.ai';
    url.port = ''; // 포트 번호 제거
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// ✅ 모든 페이지 요청을 처리하되, 정적 자산은 제외
export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|images|videos|static).*)'],
};
