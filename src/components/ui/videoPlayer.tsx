import { useIsIOS } from "@/hooks/isIOS";
import { useState, useEffect } from "react";

interface VideoPlayerProps {
    src: string;
    subSrc?: string;
    className?: string;
    width?: number;
    height?: number;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
}

export default function VideoPlayer({
    src,
    subSrc,
    className = "",
    width,
    height,
    autoPlay = false,
    muted = false,
    loop = false
}: VideoPlayerProps) {

    const isIOS = useIsIOS();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <video
            controls
            className={className}
            width={width}
            height={height}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
        >
            {/* webm은 클라이언트 마운트 후, iOS가 아닐 때만 추가 */}
            {mounted && !isIOS() && <source src={src} type="video/webm" />}
            {/* mp4 먼저 */}
            {subSrc && <source src={subSrc} type="video/mp4" />}
            브라우저가 비디오를 지원하지 않습니다.
        </video>
    );
} 