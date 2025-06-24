'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface VideoInlineProps {
    src: string;
    subSrc?: string;
    className?: string;
    width?: number;
    muted?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    autoPlay?: boolean;
    forcePreload?: boolean; // autoPlay가 false여도 미리 로딩 강제
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
    forcePreload = false,
    onVideoRef
}: VideoInlineProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
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

    // 비디오 ref 콜백
    useEffect(() => {
        if (onVideoRef) {
            onVideoRef(videoRef.current);
        }
    }, [onVideoRef]);

    // 간단하고 안정적인 비디오 재생 처리
    useEffect(() => {
        const video = videoRef.current;
        if (!video || (!autoPlay && !forcePreload)) return;

        console.log('Setting up video autoplay:', src);
        let hasAttemptedPlay = false;

        const handlePlayAttempt = () => {
            if (hasAttemptedPlay || !autoPlay) return; // forcePreload시에는 재생하지 않음
            hasAttemptedPlay = true;

            console.log('Video attempting to play:', src);
            video.play().catch(err => {
                console.log('Video autoplay failed (expected on some browsers):', err);
            });
        };

        // iOS에서는 loadeddata만 사용, 다른 브라우저는 canplay 사용
        if (isIOS()) {
            const handleLoadedData = () => {
                console.log('iOS Video data loaded:', src);
                if (autoPlay) {
                    setTimeout(handlePlayAttempt, 100);
                }
            };

            if (video.readyState >= 2) { // HAVE_CURRENT_DATA
                if (autoPlay) {
                    handlePlayAttempt();
                }
            } else {
                video.addEventListener('loadeddata', handleLoadedData, { once: true });
            }

            return () => {
                video.removeEventListener('loadeddata', handleLoadedData);
            };
        } else {
            const handleCanPlay = () => {
                console.log('Video can play, attempting to start:', src);
                handlePlayAttempt();
            };

            if (video.readyState >= 3) { // HAVE_FUTURE_DATA
                if (autoPlay) {
                    handlePlayAttempt();
                }
            } else {
                video.addEventListener('canplay', handleCanPlay, { once: true });
            }

            return () => {
                video.removeEventListener('canplay', handleCanPlay);
            };
        }
    }, [src, autoPlay, forcePreload, isIOS]);

    // 루프 처리는 별도 useEffect로 분리
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !loop) return;

        const handleEnded = () => {
            console.log('Video ended, restarting:', src);
            video.currentTime = 0;
            video.play().catch(err => {
                console.log('Video restart failed:', err);
            });
        };

        video.addEventListener('ended', handleEnded);
        return () => video.removeEventListener('ended', handleEnded);
    }, [src, loop]);

    // preload 값 결정
    const getPreloadValue = () => {
        if (!isMounted) return "auto";
        if (forcePreload) return "auto"; // 강제 preload 시 auto
        return isIOS() ? "metadata" : "auto";
    };

    return (
        <video
            ref={videoRef}
            autoPlay={autoPlay && muted} // muted일 때만 autoPlay 허용
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            {...(isMounted && playsInline && { 'webkit-playsinline': 'true' })} // iOS Safari 호환성 (hydration 후)
            preload={getPreloadValue()} // forcePreload 고려한 preload 값
            className={className}
            width={width}
            style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
            }}
        >
            {/* iOS 최적화: iOS에서는 mp4만 제공하여 불필요한 webm 요청 방지 */}
            {isMounted && isIOS() ? (
                subSrc && <source src={subSrc} type="video/mp4" />
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
