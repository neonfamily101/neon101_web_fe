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
    const playPromiseRef = useRef<Promise<void> | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 비디오 ref 콜백
    useEffect(() => {
        if (onVideoRef) {
            onVideoRef(videoRef.current);
        }
    }, [onVideoRef]);

    // 소스 변경 시 재생 초기화 - 개선된 버전
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !autoPlay) return;

        console.log('Video source changed, resetting to start:', src);

        // 이전 타이머 정리
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // 이전 play promise가 있으면 대기
        const handleVideoReset = async () => {
            try {
                // 현재 재생 중인 것이 있으면 중단
                if (playPromiseRef.current) {
                    await playPromiseRef.current.catch(() => {
                        // 이전 play가 중단되는 것은 정상적인 상황
                    });
                }

                // 비디오 상태 초기화
                video.currentTime = 0;
                video.load();

                // 짧은 딜레이 후 재생 (load 완료 대기)
                timeoutRef.current = setTimeout(async () => {
                    try {
                        // 새로운 play promise 저장
                        playPromiseRef.current = video.play();
                        await playPromiseRef.current;
                        console.log('Video started successfully:', src);
                    } catch (err) {
                        console.log('Video autoplay failed:', err);
                    } finally {
                        playPromiseRef.current = null;
                    }
                }, 100);

            } catch (err) {
                console.log('Video reset failed:', err);
            }
        };

        handleVideoReset();

        // cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [src, autoPlay]);

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            playPromiseRef.current = null;
        };
    }, []);

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
