import { useRef } from 'react';
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
                    autoPlay={isActive}
                />
            </div>
        </div>
    );
}
