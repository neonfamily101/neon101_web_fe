import { useEffect, useRef } from 'react';
import SilverTitle from '@/components/ui/silverTitle';
import VideoInline from '../../ui/videoInlline';
import clsx from 'clsx';

interface VideoSlideProps {
    src: string;
    subSrc?: string;
    isActive: boolean;
    title?: string;
    onClick?: () => void;
}

export default function VideoSlide({ src, subSrc, isActive, title, onClick }: VideoSlideProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playPromiseRef = useRef<Promise<void> | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const video = containerRef.current?.querySelector('video');
        if (!video) return;

        // 이전 타이머 정리
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const handleVideoControl = async () => {
            try {
                if (isActive) {
                    console.log('Slide activated, resetting video:', title);

                    // 이전 play promise가 있으면 대기
                    if (playPromiseRef.current) {
                        await playPromiseRef.current.catch(() => {
                            // 이전 play가 중단되는 것은 정상적인 상황
                        });
                    }

                    // 비디오 초기화
                    video.currentTime = 0;

                    // 짧은 딜레이 후 재생 (다른 처리 완료 대기)
                    timeoutRef.current = setTimeout(async () => {
                        try {
                            playPromiseRef.current = video.play();
                            await playPromiseRef.current;
                            console.log('Video slide play successful:', title);
                        } catch (err) {
                            console.log('Video autoplay failed:', err);
                        } finally {
                            playPromiseRef.current = null;
                        }
                    }, 150);

                } else {
                    // 슬라이드 비활성화 시 리소스 정리
                    if (playPromiseRef.current) {
                        await playPromiseRef.current.catch(() => { });
                    }
                    video.pause();
                    video.currentTime = 0;
                }
            } catch (err) {
                console.log('Video control failed:', err);
            }
        };

        handleVideoControl();

        // cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isActive, title]);

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
        <div
            ref={containerRef}
            className={clsx(
                'absolute top-0 left-0 w-full h-[700px] flex flex-col items-center gap-[70px] transition-opacity duration-500 cursor-pointer hover:opacity-90',
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
            style={{
                contain: 'layout style paint',
                willChange: 'opacity',
                minHeight: '700px',
                maxHeight: '700px'
            }}
            onClick={onClick}
        >
            {isActive && title && (
                <SilverTitle small>{title}</SilverTitle>
            )}

            <div
                className="w-full flex-1"
                style={{
                    contain: 'layout',
                    overflow: 'hidden'
                }}
            >
                <VideoInline
                    key={`${src}-${isActive ? 'active' : 'inactive'}`}
                    src={src}
                    subSrc={subSrc}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
