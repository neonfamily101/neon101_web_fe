// import { useEffect, useRef } from 'react';
// import SilverTitle from '@/components/ui/silverTitle';
// import VideoInline from '../../ui/videoInlline';
// import clsx from 'clsx';

// interface VideoSlideProps {
//     src: string;
//     subSrc?: string;
//     isActive: boolean;
//     title?: string;
//     onClick?: () => void;
// }

// export default function VideoSlide({ src, subSrc, isActive, title, onClick }: VideoSlideProps) {
//     const containerRef = useRef<HTMLDivElement>(null);

//     // 슬라이드가 활성화될 때마다 비디오 리셋
//     useEffect(() => {
//         if (isActive && containerRef.current) {
//             const video = containerRef.current.querySelector('video');
//             if (video) {
//                 console.log('Slide activated, resetting video:', title);
//                 video.currentTime = 0;
//                 video.play().catch(err => {
//                     console.log('Video autoplay failed:', err);
//                 });
//             }
//         }
//     }, [isActive, title]);

//     return (
//         <div
//             ref={containerRef}
//             className={clsx(
//                 'absolute top-0 left-0 w-full h-[700px] flex flex-col items-center gap-[70px] transition-opacity duration-500 cursor-pointer hover:opacity-90',
//                 isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
//             )}
//             style={{
//                 contain: 'layout style paint',
//                 willChange: 'opacity',
//                 minHeight: '700px',
//                 maxHeight: '700px'
//             }}
//             onClick={onClick}
//         >
//             {/* title은 활성 슬라이드일 때만 보임 */}
//             {isActive && title && (
//                 <SilverTitle small>
//                     {title}
//                 </SilverTitle>
//             )}

//             <div
//                 className="w-full flex-1"
//                 style={{
//                     contain: 'layout',
//                     overflow: 'hidden'
//                 }}
//             >
//                 {/* 슬라이드가 활성화될 때마다 비디오 컴포넌트를 새로 생성 */}
//                 <VideoInline
//                     key={`${src}-${isActive ? 'active' : 'inactive'}`}
//                     src={src}
//                     subSrc={subSrc}
//                     className="w-full h-full object-cover"
//                 />
//             </div>
//         </div>
//     );
// } 



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

    useEffect(() => {
        const video = containerRef.current?.querySelector('video');
        if (!video) return;

        if (isActive) {
            console.log('Slide activated, resetting video:', title);
            video.currentTime = 0;
            video.play().catch(err => {
                console.log('Video autoplay failed:', err);
            });
        } else {
            // 슬라이드 비활성화 시 리소스 정리
            video.pause();
            video.currentTime = 0;
        }
    }, [isActive, title]);

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
