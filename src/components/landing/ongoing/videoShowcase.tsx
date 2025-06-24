'use client';

import { useState, useEffect, useRef } from 'react';
import SilverTitle from '@/components/ui/silverTitle';
import SliderDots from '@/components/landing/videoSlider/sliderDots';
import VideoCarousel from './videoCarousel';
import { ShowcaseItem } from './videoCard';
import clsx from 'clsx';

interface VideoShowcaseProps {
    items: ShowcaseItem[];
    className?: string;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    centerScale?: number;
    sideScale?: number;
    gapRatio?: number;
}

export default function VideoShowcase({
    items,
    className = "",
    autoPlay = false,
    autoPlayInterval = 7000,
    centerScale = 1,
    sideScale = 3 / 5,
    gapRatio = 0.2
}: VideoShowcaseProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    // 자동 재생 기능
    useEffect(() => {
        if (!autoPlay || items.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, items.length, currentIndex]);

    // 섹션이 뷰포트에 들어오면 활성화
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                io.disconnect(); // 한 번만
            }
        }, { threshold: 0.1 });

        io.observe(node);
        return () => io.disconnect();
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (!items.length) return null;

    const currentItem = items[currentIndex];

    return (
        <div ref={sectionRef} className={clsx('relative w-full', className)}>
            {/* 비디오 카루셀 */}
            {isVisible && (
                <VideoCarousel
                    items={items}
                    currentIndex={currentIndex}
                    onSlideChange={goToSlide}
                    centerScale={centerScale}
                    sideScale={sideScale}
                    gapRatio={gapRatio}
                />
            )}

            {/* 텍스트 영역 */}
            {currentItem && (
                <div className="mt-[5rem] text-center max-w-4xl mx-auto px-6 h-[7rem]">
                    <SilverTitle
                        className="text-slate-12 mb-4 transition-all duration-500"
                        textSizeClassName="text-2xl lg:text-3xl"
                    >
                        {currentItem.title}
                    </SilverTitle>

                    {currentItem.description && (
                        <p className="text-slate-11 leading-relaxed text-sm md:text-lg lg:text-xl transition-all duration-500">
                            {currentItem.description}
                        </p>
                    )}
                </div>
            )}

            {/* 하단 인디케이터 */}
            {items.length > 1 && (
                <div className="relative mt-[5rem]">
                    <SliderDots
                        totalSlides={items.length}
                        currentSlide={currentIndex}
                        onDotClick={goToSlide}
                        dotClassName="w-3 h-3"
                    />
                </div>
            )}
        </div>
    );
}
