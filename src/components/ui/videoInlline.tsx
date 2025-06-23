'use client';

import { useEffect, useRef } from 'react';

interface VideoInlineProps {
    src: string;
    subSrc?: string;
    className?: string;
    width?: number;
    muted?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    autoPlay?: boolean;
    onVideoRef?: (video: HTMLVideoElement | null) => void;
}

export default function VideoInline({
    src,
    subSrc,
    className,
    width,
    muted = true,
    loop = true,
    playsInline = true,
    autoPlay = true,
    onVideoRef
}: VideoInlineProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // 비디오 ref 콜백
    useEffect(() => {
        if (onVideoRef) {
            onVideoRef(videoRef.current);
        }
    }, [onVideoRef]);

    // 소스 변경 시 재생 초기화
    useEffect(() => {
        const video = videoRef.current;
        if (video && autoPlay) {
            console.log('Video source changed, resetting to start:', src);
            video.currentTime = 0;
            video.load(); // 비디오 재로딩
            video.play().catch(err => {
                console.log('Video autoplay failed:', err);
            });
        }
    }, [src, autoPlay]);

    return (
        <video
            ref={videoRef}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            preload="metadata"
            className={className}
            width={width}
            style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
            }}
        >
            <source src={src} type="video/webm" />
            {subSrc && <source src={subSrc} type="video/mp4" />}
            브라우저가 비디오를 지원하지 않습니다.
        </video>
    );
}
