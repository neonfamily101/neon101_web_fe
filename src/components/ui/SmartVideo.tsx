'use client';

import { useEffect, useState } from "react";
import { isIOS } from "../../utils/isIOS";

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  webmSrc?: string;
  mp4Src?: string;
  movSrc?: string;
}

export default function SmartVideo({
  webmSrc,
  mp4Src,
  movSrc,
  controls = false,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  ...props
}: SmartVideoProps) {
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    setIsIOSDevice(isIOS());
  }, []);

  return (
    <video
      {...props}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
    >
      {isIOSDevice ? (
        <>
          {movSrc && <source src={movSrc} type="video/quicktime" />}
          {mp4Src && <source src={mp4Src} type="video/mp4" />}
        </>
      ) : (
        <>
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          {mp4Src && <source src={mp4Src} type="video/mp4" />}
        </>
      )}
      브라우저가 video 태그를 지원하지 않습니다.
    </video>
  );
}
