"use client";

import { useEffect, useRef, useCallback, useState } from "react";
// import SilverTitle from "@/components/ui/silverTitle";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // iOS 감지 (간소화)
  const isIOS = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }, []);

  // hydration 완료 후 마운트 상태 설정
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          // console.log('Hero video in view, attempting to play');
          // 간단한 재생 시도
          video.play().catch(err => {
            console.log('Hero video autoplay failed:', err);
          });
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.3, // 화면의 30% 이상 보이면 재생
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full aspect-square sm:h-[70vh] max-h-[950px] overflow-hidden"
    >
      {/* ✅ 비디오 배경: 전체화면 꽉 채움 */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-90 pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          {...(isMounted && { 'webkit-playsinline': 'true' })} // iOS Safari 호환성 (hydration 후)
          preload={isMounted && isIOS() ? "metadata" : "auto"}
        >
          <source
            src="https://storage.googleapis.com/neon101-videos/heroVideos/neon101_brand_final.webm"
            type="video/webm"
          />
          <source
            src="https://storage.googleapis.com/neon101-videos/heroVideos/neon101_brand_final.mp4"
            type="video/mp4"
          />
          브라우저가 비디오 태그를 지원하지 않습니다.
        </video>
      </div>

      {/* ✅ 텍스트 콘텐츠 (패딩 유지) */}
      {/* <div className="relative z-10 mx-auto max-w-5xl px-6 flex h-full flex-col items-center justify-between md:flex-row md:pb-24 max-md:pt-[200px]">
        <div className="origin-center-left order-2 max-w-3xl animate-hero-text-slide-up-fade sm:shrink-0 md:order-1 lg:pl-8">
          <SilverTitle className="text-center md:text-left">
            NEON101 <br />
            <span className="text-[2rem] md:text-[3rem]">AX Company</span>
          </SilverTitle>
          <p className="text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left">
            {
              "NEON101은 'Human in the Loop' 철학을 바탕으로, AI의 자동화 능력과 인간의 통찰력이 조화를 이루는 맞춤형 AI Transformation 서비스와 플랫폼을 제공하기 위해 탄생한 AX Company Group입니다."
            }
          </p>
        </div>
      </div> */}
    </section>
  );
}

// 테스트