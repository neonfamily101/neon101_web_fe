"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import VideoSlide from './videoSlide';
import SliderDots from './sliderDots';
import VideoModal from './videoModal';

const videoSlidesData = [
    {
        id: "superbot101",
        src: 'https://storage.googleapis.com/neon101-videos/slideVideos/superbot101.webm',
        subSrc: 'https://storage.googleapis.com/neon101-videos/slideVideos/superbot101.mp4',
        title: 'Superbot101'
    },
    {
        id: "das101",
        src: 'https://storage.googleapis.com/neon101-videos/slideVideos/das.webm',
        subSrc: 'https://storage.googleapis.com/neon101-videos/slideVideos/das.mp4',
        title: 'DAS101'
    }
];

export default function VideoSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVideo, setModalVideo] = useState({
        src: "",
        subSrc: "",
        title: "",
    });

    const videoSlides = useRef(videoSlidesData);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % videoSlides.current.length);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000);
    };

    const handleSlideClick = (slide: (typeof videoSlides.current)[0]) => {
        setModalVideo({ src: slide.src, subSrc: slide.subSrc, title: slide.title });
        setModalOpen(true);
        setIsPaused(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setIsPaused(false);
    };

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (!isPaused && !modalOpen) {
            intervalRef.current = setInterval(nextSlide, 15000);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [nextSlide, isPaused, modalOpen]);

    return (
        <>
            <section className='flex flex-col items-center gap-[100px] pb-[8rem] md:pb-[12rem]'>
                <div
                    className="relative w-full h-[80vh] md:h-[700px] overflow-hidden"
                    style={{
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
                    {videoSlides.current.map((slide, index) => (
                        <VideoSlide
                            key={slide.id}
                            src={slide.src}
                            subSrc={slide.subSrc}
                            title={slide.title}
                            isActive={currentSlide === index}
                            onClick={() => handleSlideClick(slide)}
                        />
                    ))}

                    {/* 슬라이더 인디케이터 */}
                    <SliderDots
                        totalSlides={videoSlides.current.length}
                        currentSlide={currentSlide}
                        onDotClick={goToSlide}
                    />
                </div>
            </section>

            {/* 비디오 모달 */}
            <VideoModal
                isOpen={modalOpen}
                videoSrc={modalVideo.src}
                videoSubSrc={modalVideo.subSrc}
                title={modalVideo.title}
                onClose={handleModalClose}
            />
        </>
    );
}