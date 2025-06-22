// interface VideoPlayerProps {
//     src: string;
//     subSrc?: string;
//     className?: string;
//     width?: number;
//     height?: number;
//     autoPlay?: boolean;
//     muted?: boolean;
//     loop?: boolean;
// }

// export default function VideoPlayer({
//     src,
//     subSrc,
//     className = "",
//     width,
//     height,
//     autoPlay = false,
//     muted = false,
//     loop = false
// }: VideoPlayerProps) {
//     return (
//         <video
//             controls
//             className={className}
//             width={width}
//             height={height}
//             autoPlay={autoPlay}
//             muted={muted}
//             loop={loop}
//         >
//             {/* webm 우선 */}
//             <source src={src} type="video/webm" />
//             {/* mp4 fallback */}
//             {subSrc && <source src={subSrc} type="video/mp4" />}
//             브라우저가 비디오를 지원하지 않습니다.
//         </video>
//     );
// } 


'use client';

import { useEffect, useState } from 'react';
import { isIOS } from '@/utils/isIOS';

interface VideoPlayerProps {
  src: string; // webm
  subSrc?: string; // mp4
  className?: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export default function VideoPlayer({
  src,
  subSrc,
  className = "",
  width,
  height,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true
}: VideoPlayerProps) {
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    setIsIOSDevice(isIOS());
  }, []);

  return (
    <video
      className={className}
      width={width}
      height={height}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline
      controls={controls}
      preload="auto"
    >
      {isIOSDevice ? (
        <>
          {subSrc && <source src={subSrc} type="video/mp4" />}
        </>
      ) : (
        <>
          <source src={src} type="video/webm" />
          {subSrc && <source src={subSrc} type="video/mp4" />}
        </>
      )}
      브라우저가 비디오를 지원하지 않습니다.
    </video>
  );
}
