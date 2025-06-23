'use client';

// import VideoInline from '@/components/ui/videoInlline';
import clsx from 'clsx';

export interface ShowcaseItem {
    id: string;
    title: string;
    description?: string;
    videoSrc: string;
    videoSubSrc?: string;
}

interface VideoCardProps {
    item: ShowcaseItem;
    isCenter: boolean;
    style: React.CSSProperties;
    muted?: boolean;
    onVideoRef: (video: HTMLVideoElement | null) => void;
    onClick: () => void;
}

export default function VideoCard({
    item,
    isCenter,
    style,
    muted = true,
    onVideoRef,
    onClick
}: VideoCardProps) {
    console.log(item.videoSrc, item.videoSubSrc, muted, onVideoRef);
    return (
        <div
            style={style}
            className="cursor-pointer"
            onClick={onClick}
        >
            <div className={clsx(
                'rounded-xl overflow-hidden relative aspect-[3/5] transition-shadow duration-700',
                isCenter ? 'shadow-2xl' : 'shadow-lg'
            )}>
                <div className="w-full h-full overflow-hidden">
                    {/* <VideoInline
                        src={item.videoSrc}
                        subSrc={item.videoSubSrc}
                        className="w-full h-full object-cover"
                        muted={muted}
                        onVideoRef={onVideoRef}
                        autoPlay={false}
                    /> */}
                </div>
            </div>
        </div>
    );
} 