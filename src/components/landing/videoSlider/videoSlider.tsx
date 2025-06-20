"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import VideoSlide from './videoSlide';
import SliderDots from './sliderDots';
import VideoModal from './videoModal';

// 비디오 데이터 (webm 우선, mp4 fallback)
const videoSlides = [
  {
    src: 'https://storage.googleapis.com/neon101-videos/slideVideos/superbot101.webm',
    subSrc: 'https://storage.googleapis.com/neon101-videos/slideVideos/superbot101.mp4',
    title: 'Superbot101'
  },
  {
    src: 'https://storage.googleapis.com/neon101-videos/slideVideos/das.webm',
    subSrc: 'https://storage.googleapis.com/neon101-videos/slideVideos/das.mp4',
    title: 'DAS101'
  }
];





export default function VideoSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVideoSrc, setModalVideoSrc] = useState('');
    const [modalVideoSubSrc, setModalVideoSubSrc] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const scrollPosRef = useRef(0);

    // 스크롤 위치 저장 및 복원
    const preserveScrollPosition = useCallback(() => {
        // 현재 스크롤 위치 저장
        scrollPosRef.current = window.scrollY;
        console.log('Scroll position saved:', scrollPosRef.current);

        // 다음 프레임에서 스크롤 위치 복원
        requestAnimationFrame(() => {
            window.scrollTo(0, scrollPosRef.current);
            console.log('Scroll position restored:', scrollPosRef.current);
        });
    }, []);

    // 다음 슬라이드로 이동
    const nextSlide = useCallback(() => {
        preserveScrollPosition();
        setCurrentSlide((prev) => (prev + 1) % videoSlides.length);
    }, [preserveScrollPosition]);

    // 특정 슬라이드로 이동
    const goToSlide = useCallback((index: number) => {
        console.log('Dot clicked - going to slide:', index);
        preserveScrollPosition();
        setCurrentSlide(index);
        setIsPaused(true);
        // 3초 후 자동 재생 재개
        setTimeout(() => {
            setIsPaused(false);
        }, 3000);
    }, [preserveScrollPosition]);

    // 비디오 슬라이드 클릭 핸들러
    const handleSlideClick = useCallback((slide: typeof videoSlides[0]) => {
        console.log('Video slide clicked:', slide.title);
        setModalVideoSrc(slide.src);
        setModalVideoSubSrc(slide.subSrc);
        setModalTitle(slide.title);
        setModalOpen(true);
        setIsPaused(true); // 모달이 열리면 슬라이더 일시정지
    }, []);

    // 모달 닫기 핸들러
    const handleModalClose = useCallback(() => {
        setModalOpen(false);
        setIsPaused(false); // 모달이 닫히면 슬라이더 재개
    }, []);

    // 자동 슬라이드 (15초마다)
    useEffect(() => {
        if (!isPaused && !modalOpen) {
            const interval = setInterval(nextSlide, 15000);
            return () => clearInterval(interval);
        }
    }, [nextSlide, isPaused, modalOpen]);

    return (
        <>
            <section className='flex flex-col items-center gap-[100px] pb-[8rem] md:pb-[12rem]'>
                <div
                    className="relative w-full h-[700px] overflow-hidden"
                    style={{
                        minHeight: '700px',
                        maxHeight: '700px',
                        contain: 'layout style paint'
                    }}
                    onMouseEnter={() => {
                        setIsPaused(true);
                    }}
                    onMouseLeave={() => {
                        setIsPaused(false);
                    }}
                >
                    {/* 비디오 슬라이드들 */}
                    {videoSlides.map((slide, index) => (
                        <VideoSlide
                            key={`slide-${index}`}
                            src={slide.src}
                            subSrc={slide.subSrc}
                            title={slide.title}
                            isActive={currentSlide === index}
                            onClick={() => handleSlideClick(slide)}
                        />
                    ))}

                    {/* 슬라이더 인디케이터 */}
                    <SliderDots
                        totalSlides={videoSlides.length}
                        currentSlide={currentSlide}
                        onDotClick={goToSlide}
                    />
                </div>
            </section>

            {/* 비디오 모달 */}
            <VideoModal
                isOpen={modalOpen}
                videoSrc={modalVideoSrc}
                videoSubSrc={modalVideoSubSrc}
                title={modalTitle}
                onClose={handleModalClose}
            />
        </>
    );
}