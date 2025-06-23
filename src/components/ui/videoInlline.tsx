'use client';

import { useEffect, useRef, useCallback } from 'react';

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

    // iOS 감지 (간소화)
    const isIOS = useCallback(() => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }, []);

    // 비디오 ref 콜백
    useEffect(() => {
        if (onVideoRef) {
            onVideoRef(videoRef.current);
        }
    }, [onVideoRef]);

    // 간단하고 안정적인 비디오 재생 처리
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !autoPlay) return;

        console.log('Setting up video autoplay:', src);

        const handleCanPlay = () => {
            console.log('Video can play, attempting to start:', src);
            video.play().catch(err => {
                console.log('Video autoplay failed (expected on some browsers):', err);
            });
        };

        const handleLoadedData = () => {
            console.log('Video data loaded:', src);
            // iOS에서는 loadeddata 이벤트 후 약간의 딜레이를 줌
            if (isIOS()) {
                setTimeout(() => {
                    video.play().catch(err => {
                        console.log('iOS Video autoplay failed:', err);
                    });
                }, 100);
            }
        };

        // 이미 로드된 경우 즉시 재생 시도
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA
            handleCanPlay();
        } else {
            // 이벤트 리스너 등록
            video.addEventListener('canplay', handleCanPlay, { once: true });
            video.addEventListener('loadeddata', handleLoadedData, { once: true });
        }

        // 루프가 제대로 작동하지 않을 경우를 대비한 이벤트 리스너
        const handleEnded = () => {
            console.log('Video ended, restarting:', src);
            video.currentTime = 0;
            video.play().catch(err => {
                console.log('Video restart failed:', err);
            });
        };

        if (loop) {
            video.addEventListener('ended', handleEnded);
        }

        // cleanup
        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('ended', handleEnded);
        };
    }, [src, autoPlay, loop, isIOS]);

    return (
        <video
            ref={videoRef}
            autoPlay={autoPlay && muted} // muted일 때만 autoPlay 허용
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            {...(playsInline && { 'webkit-playsinline': 'true' })} // iOS Safari 호환성
            preload={isIOS() ? "metadata" : "auto"} // iOS에서는 metadata만 preload
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
