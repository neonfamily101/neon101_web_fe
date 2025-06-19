'use client';

import { useRef, useEffect, useState } from 'react';
import VideoCard, { ShowcaseItem } from './videoCard';

interface VideoCarouselProps {
    items: ShowcaseItem[];
    currentIndex: number;
    onSlideChange: (index: number) => void;
    centerScale?: number;
    sideScale?: number;
    gapRatio?: number;
}

export default function VideoCarousel({
    items,
    currentIndex,
    onSlideChange,
    centerScale = 1,
    sideScale = 3 / 5,
    gapRatio = 0.2
}: VideoCarouselProps) {
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
    // 각 비디오의 음소거 상태 관리
    const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({});

    // 초기 음소거 상태 설정
    useEffect(() => {
        const initialMutedStates: { [key: string]: boolean } = {};
        items.forEach(item => {
            initialMutedStates[item.id] = true; // 기본적으로 모든 비디오는 음소거
        });
        setMutedStates(initialMutedStates);
    }, [items]);

    // 현재 선택된 카드의 비디오만 재생
    useEffect(() => {
        // 모든 비디오 일시정지
        Object.values(videoRefs.current).forEach(video => {
            if (video) {
                video.pause();
            }
        });

        const currentItem = items[currentIndex];
        if (currentItem) {
            const currentVideo = videoRefs.current[currentItem.id];
            if (currentVideo) {
                currentVideo.currentTime = 0; // 비디오를 처음부터 다시 재생
                currentVideo.play().catch(console.error);
            }
        }
    }, [currentIndex, items]);

    // 카드 클릭 핸들러 - 슬라이드 변경과 음소거 해제
    const handleCardClick = (index: number) => {
        const item = items[index];
        if (item) {
            // 음소거 해제
            setMutedStates(prev => ({
                ...prev,
                [item.id]: false
            }));
        }
        // 슬라이드 변경
        onSlideChange(index);
    };

    const calculateCardPosition = (index: number) => {
        const n = items.length;
        let diff = index - currentIndex;

        if (n > 1) { // 순환 로직
            const half = n / 2;
            if (diff > half) diff -= n;
            else if (diff <= -half) diff += n;
        }

        const isVisible = Math.abs(diff) <= 2;
        const isCenter = diff === 0;

        const scale = isCenter ? centerScale : sideScale;
        const opacity = isVisible ? 1 : 0;
        const pointerEvents = isVisible ? 'auto' : 'none';

        const cardWidthPercent = 100 / 5; // 각 카드의 너비를 컨테이너의 1/5로 설정
        const gap = cardWidthPercent * gapRatio;

        const w_c = cardWidthPercent;
        const w_s = w_c * (sideScale / centerScale);

        // 중앙 카드에서 첫 번째 옆 카드까지의 이동 거리
        const d1 = (w_c / 2) + gap + (w_s / 2);
        // 옆 카드들 사이의 이동 거리
        const d_subsequent = w_s + gap;

        let totalTranslation = 0;
        if (diff !== 0) {
            totalTranslation = d1 + (Math.abs(diff) - 1) * d_subsequent;
            totalTranslation *= Math.sign(diff);
        }

        // translateX는 카드 자체 너비에 대한 백분율이므로 변환 필요
        const xPercent = (totalTranslation / w_c) * 100;

        return {
            transform: `translateX(${xPercent}%) scale(${scale})`,
            opacity,
            pointerEvents: pointerEvents as React.CSSProperties['pointerEvents'],
            position: 'absolute' as const,
            width: `${cardWidthPercent}%`,
            left: `calc(50% - ${cardWidthPercent / 2}%)`,
            transition: 'all 700ms cubic-bezier(0.25, 0.8, 0.25, 1)',
            isCenter,
            isVisible
        };
    };

    if (!items.length) return null;

    return (
        <div className="w-full max-w-7xl mx-auto overflow-hidden">
            <div className="relative">
                {/* 높이 계산을 위한 숨겨진 카드 (가장 큰 카드 기준) */}
                <div className="w-1/5 mx-auto invisible">
                    <div className="aspect-[3/5] rounded-xl" />
                </div>

                {/* 카드 렌더링 영역 */}
                <div className="absolute inset-0">
                    {items.map((item, index) => {
                        const { isCenter, isVisible, ...style } = calculateCardPosition(index);

                        if (!isVisible) return null;

                        return (
                            <VideoCard
                                key={item.id}
                                item={item}
                                isCenter={isCenter}
                                style={style}
                                muted={mutedStates[item.id] ?? true}
                                onVideoRef={(video) => {
                                    if (video) {
                                        videoRefs.current[item.id] = video;
                                    }
                                }}
                                onClick={() => handleCardClick(index)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
} 