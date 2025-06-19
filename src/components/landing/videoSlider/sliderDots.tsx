interface SliderDotsProps {
    totalSlides: number;
    currentSlide: number;
    onDotClick: (index: number) => void;
    className?: string;
    dotClassName?: string;
}

export default function SliderDots({
    totalSlides,
    currentSlide,
    onDotClick,
    className = "absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-5 z-20",
    dotClassName = "w-4 h-4"
}: SliderDotsProps) {
    return (
        <div className={className}>
            {Array.from({ length: totalSlides }, (_, index) => (
                <button
                    key={index}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDotClick(index);
                    }}
                    className={`${dotClassName} rounded-full transition-all duration-300 hover:scale-125 cursor-pointer ${currentSlide === index
                        ? 'bg-white scale-110 shadow-lg'
                        : 'bg-white/40 hover:bg-white/60'
                        }`}
                    aria-label={`슬라이드 ${index + 1}로 이동`}
                />
            ))}
        </div>
    );
} 