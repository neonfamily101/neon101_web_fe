// "use client";

// import Spline from "@splinetool/react-spline";
// import SilverTitle from "@/components/ui/silverTitle";
// import { useRef } from "react";

// export default function Hero() {
//     // const [splineKey, setSplineKey] = useState(0);
//     // const [isSplineVisible, setIsSplineVisible] = useState(true);
//     // const [isAnimating, setIsAnimating] = useState(false);
//     const desktopSplineRef = useRef<HTMLDivElement>(null);
//     const mobileSplineRef = useRef<HTMLDivElement>(null);

//     // useEffect(() => {
//     //     const handleScroll = () => {
//     //         const currentScrollY = window.scrollY;

//     //         // 스크롤이 최상단으로 돌아왔을 때 페이드 인 애니메이션으로 리셋
//     //         if (currentScrollY === 0 && !isSplineVisible && !isAnimating) {
//     //             setIsAnimating(true);
//     //             // 먼저 Spline을 새로 마운트
//     //             setSplineKey(prev => prev + 1);
//     //             // 약간의 딜레이 후 페이드 인 시작
//     //             setTimeout(() => {
//     //                 setIsSplineVisible(true);
//     //                 setIsAnimating(false);
//     //             }, 100);
//     //         } else if (currentScrollY > 500 && isSplineVisible) {
//     //             // 스크롤이 일정 이상 내려가면 페이드 아웃
//     //             setIsSplineVisible(false);
//     //         }
//     //     };

//     //     window.addEventListener('scroll', handleScroll, { passive: true });
//     //     return () => window.removeEventListener('scroll', handleScroll);
//     // }, [isSplineVisible, isAnimating]);

//     return (
//         <section className="relative mx-auto max-w-5xl px-6 pb-8 md:h-screen md:max-h-[950px] md:max-w-7xl pb-[8rem] md:pb-[4rem]">
//             {/* 데스크톱 배경 Spline */}
//             <div className={`hidden md:block absolute inset-0 md:left-1/3 transition-opacity duration-500 ease-in-out opacity-90`}>
//                 <Spline
//                     // key={`desktop-${splineKey}`}
//                     ref={desktopSplineRef}
//                     scene="https://prod.spline.design/RHuCm4oT3Mj9WV3H/scene.splinecode"
//                     // onLoad={handleSplineLoad}
//                     style={{
//                         pointerEvents: 'none',
//                         backgroundColor: 'transparent',
//                         background: 'transparent'
//                     }}
//                     className="spline-transparent-bg"
//                 />
//             </div>
//             {/* 모바일 배경 Spline - Text Area 뒤에 */}
//             <div className={`block md:hidden absolute top-[70px] left-1/2 transform -translate-x-1/2 w-[250px] h-[250px] z-0 transition-opacity duration-500 ease-in-out opacity-90`}>
//                 <Spline
//                     // key={`mobile-${splineKey}`}
//                     ref={mobileSplineRef}
//                     scene="https://prod.spline.design/RHuCm4oT3Mj9WV3H/scene.splinecode"
//                     // onLoad={handleSplineLoad}
//                     style={{
//                         pointerEvents: 'none',
//                         backgroundColor: 'transparent',
//                         background: 'transparent'
//                     }}
//                     className="spline-transparent-bg"
//                 />
//                 {/* 가장자리 그라데이션 처리 */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none"></div>
//                 <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>
//             </div>
//             <div className="flex h-full flex-col items-center justify-between md:flex-row md:pb-24 max-md:pt-[200px]">
//                 {/* 모바일 상단 Spline */}
//                 {/* <div className="block md:hidden order-1 w-full h-48 mb-8 relative opacity-30">
//                     <Spline
//                         scene="https://prod.spline.design/mj5FnMYD70GcKVrc/scene.splinecode"
//                     />
//                 </div> */}
//                 {/* Text Area */}
//                 <div className="origin-center-left order-2 max-w-3xl animate-hero-text-slide-up-fade sm:shrink-0 md:order-1 lg:pl-16 relative z-10">
//                     {/* <div className="flex items-center justify-center md:inline-flex">
//                         <LinkButton href="/" className="rainbow-border mb-10 inline-flex items-center justify-center rounded-full relative text-sm leading-none after:absolute after:inset-0 after:block after:-z-10 aftter:rounded-full">
//                             <span className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-1 h-5 li m-[1px] rounded-full">
//                                 Resend acquires Mergent
//                                 <SmallRightChevron />
//                             </span>
//                         </LinkButton>
//                     </div> */}
//                     <SilverTitle className="text-center md:text-left ">
//                         NEON101 <br />
//                         <span className="text-[2rem] md:text-[3rem]">AX Company</span>
//                     </SilverTitle>
//                     <p className="text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left">
//                         {"NEON101은 'Human in the Loop' 철학을 바탕으로, AI의 자동화 능력과 인간의 통찰력이 조화를 이루는 맞춤형 AI Transformation 서비스와 플랫폼을 제공하기 위해 탄생한 AX Company Group입니다."}
//                     </p>
//                 </div>
//             </div>
//         </section >
//     );
// }


"use client";

import Spline from "@splinetool/react-spline";
import SilverTitle from "@/components/ui/silverTitle";
import { useEffect, useRef } from "react";

// ✅ WebGL context lost 감지 함수
const addWebGLContextLostListener = (
  ref: React.RefObject<HTMLDivElement | null>,
  label: string
) => {
  const canvas = ref.current?.querySelector("canvas");
  if (canvas) {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn(`⚠️ WebGL context lost in ${label}`);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    return () =>
      canvas.removeEventListener("webglcontextlost", handleContextLost, false);
  }
  return () => {};
};

export default function Hero() {
  const desktopSplineRef = useRef<HTMLDivElement | null>(null);
  const mobileSplineRef = useRef<HTMLDivElement | null>(null);

  // ✅ WebGL context lost 이벤트 연결
  useEffect(() => {
    const removeDesktopListener = addWebGLContextLostListener(desktopSplineRef, "Desktop Spline");
    const removeMobileListener = addWebGLContextLostListener(mobileSplineRef, "Mobile Spline");

    return () => {
      removeDesktopListener();
      removeMobileListener();
    };
  }, []);

  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-8 md:h-screen md:max-h-[950px] md:max-w-7xl pb-[8rem] md:pb-[4rem]">
      {/* 데스크톱 배경 Spline */}
      <div
        ref={desktopSplineRef}
        className="hidden md:block absolute inset-0 md:left-1/3 transition-opacity duration-500 ease-in-out opacity-90"
      >
        <Spline
          scene="https://prod.spline.design/RHuCm4oT3Mj9WV3H/scene.splinecode"
          style={{
            pointerEvents: "none",
            backgroundColor: "transparent",
            background: "transparent"
          }}
          className="spline-transparent-bg"
        />
      </div>

      {/* 모바일 배경 Spline */}
      <div
        ref={mobileSplineRef}
        className="block md:hidden absolute top-[70px] left-1/2 transform -translate-x-1/2 w-[250px] h-[250px] z-0 transition-opacity duration-500 ease-in-out opacity-90"
      >
        <Spline
          scene="https://prod.spline.design/RHuCm4oT3Mj9WV3H/scene.splinecode"
          style={{
            pointerEvents: "none",
            backgroundColor: "transparent",
            background: "transparent"
          }}
          className="spline-transparent-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>
      </div>

      {/* 텍스트 영역 */}
      <div className="flex h-full flex-col items-center justify-between md:flex-row md:pb-24 max-md:pt-[200px]">
        <div className="origin-center-left order-2 max-w-3xl animate-hero-text-slide-up-fade sm:shrink-0 md:order-1 lg:pl-16 relative z-10">
          <SilverTitle className="text-center md:text-left">
            NEON101 <br />
            <span className="text-[2rem] md:text-[3rem]">AX Company</span>
          </SilverTitle>
          <p className="text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left">
            {"NEON101은 'Human in the Loop' 철학을 바탕으로, AI의 자동화 능력과 인간의 통찰력이 조화를 이루는 맞춤형 AI Transformation 서비스와 플랫폼을 제공하기 위해 탄생한 AX Company Group입니다."}
          </p>
        </div>
      </div>
    </section>
  );
}
