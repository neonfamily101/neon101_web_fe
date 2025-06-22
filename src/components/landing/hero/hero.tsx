// "use client";

// import { useEffect, useRef } from "react";
// import SilverTitle from "@/components/ui/silverTitle";

// export default function Hero() {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const sectionRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         const video = videoRef.current;
//         if (!video) return;

//         if (entry.isIntersecting) {
//           video.play().catch((e) => console.warn("Video play failed", e));
//         } else {
//           video.pause();
//         }
//       },
//       {
//         threshold: 0.3, // 화면의 30% 이상 보이면 재생
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative mx-auto max-w-5xl px-6 pb-[8rem] md:h-screen md:max-h-[950px] md:max-w-7xl md:pb-[4rem] overflow-hidden"
//     >
//       {/* 📽️ 비디오 배경 */}
//       <video
//         ref={videoRef}
//         className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 pointer-events-none"
//         muted
//         loop
//         playsInline
//         preload="auto"
//       >
//         <source
//           src="https://storage.googleapis.com/neon101-videos/heroVideos/neon101_brand_final.webm"
//           type="video/webm"
//         />
//         <source
//           src="https://storage.googleapis.com/neon101-videos/heroVideos/neon101_brand_final.mov"
//           type="video/quicktime"
//         />
//         브라우저가 비디오 태그를 지원하지 않습니다.
//       </video>


//       {/* 텍스트 영역 */}
//       <div className="relative z-10 flex h-full flex-col items-center justify-between md:flex-row md:pb-24 max-md:pt-[200px]">
//         <div className="origin-center-left order-2 max-w-3xl animate-hero-text-slide-up-fade sm:shrink-0 md:order-1 lg:pl-8">
//           <SilverTitle className="text-center md:text-left">
//             NEON101 <br />
//             <span className="text-[2rem] md:text-[3rem]">AX Company</span>
//           </SilverTitle>
//           <p className="text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left">
//             {
//               "NEON101은 'Human in the Loop' 철학을 바탕으로, AI의 자동화 능력과 인간의 통찰력이 조화를 이루는 맞춤형 AI Transformation 서비스와 플랫폼을 제공하기 위해 탄생한 AX Company Group입니다."
//             }
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useRef } from "react";
import SilverTitle from "@/components/ui/silverTitle";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch((e) => console.warn("Video play failed", e));
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
      className="relative w-full pb-[8rem] md:h-screen md:max-h-[950px] md:pb-[4rem] overflow-hidden"
    >
      {/* ✅ 비디오 배경: 전체화면 꽉 채움 */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-90 pointer-events-none"
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="https://storage.googleapis.com/neon101-videos/heroVideos/neon101_brand_final.webm"
            type="video/webm"
          />
          <source
            src="https://storage.googleapis.com/neon101-videos/heroVideos/neon101_brand_final.mov"
            type="video/quicktime"
          />
          브라우저가 비디오 태그를 지원하지 않습니다.
        </video>
      </div>

      {/* ✅ 텍스트 콘텐츠 (패딩 유지) */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 flex h-full flex-col items-center justify-between md:flex-row md:pb-24 max-md:pt-[200px]">
        <div className="origin-center-left order-2 max-w-3xl animate-hero-text-slide-up-fade sm:shrink-0 md:order-1 lg:pl-8">
          <SilverTitle className="text-center md:text-left">
            {/* NEON101 */}
             <br />
            <span className="text-[2rem] md:text-[3rem]">
              {/* AX Company */}
            </span>
          </SilverTitle>
          <p className="text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left">
            {
              // "NEON101은 'Human in the Loop' 철학을 바탕으로, AI의 자동화 능력과 인간의 통찰력이 조화를 이루는 맞춤형 AI Transformation 서비스와 플랫폼을 제공하기 위해 탄생한 AX Company Group입니다."
            }
          </p>
        </div>
      </div>
    </section>
  );
}
