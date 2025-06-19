import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Close from '@/assets/svgs/close';
import VideoPlayer from '@/components/ui/videoPlayer';

interface VideoModalProps {
    isOpen: boolean;
    videoSrc: string;
    videoSubSrc?: string;
    title?: string;
    onClose: () => void;
}

export default function VideoModal({ isOpen, videoSrc, videoSubSrc, title, onClose }: VideoModalProps) {
    const [isMouseInModal, setIsMouseInModal] = useState(false);

    // 커서가 모달 안에 있을 때만 배경 스크롤 방지
    useEffect(() => {
        if (isOpen && isMouseInModal) {
            // 커서가 모달 안에 있을 때 body 스크롤 방지
            document.body.style.overflow = 'hidden';
            console.log('Mouse in modal - scroll disabled');
        } else {
            // 커서가 모달 밖에 있거나 모달이 닫혔을 때 body 스크롤 복원
            document.body.style.overflow = 'unset';
            console.log('Mouse out of modal or modal closed - scroll enabled');
        }

        // cleanup 함수: 컴포넌트 언마운트 시 스크롤 복원
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isMouseInModal]);

    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleModalMouseEnter = () => {
        setIsMouseInModal(true);
    };

    const handleModalMouseLeave = () => {
        setIsMouseInModal(false);
    };

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            onClick={handleBackdropClick}
        >
            <div
                className="relative bg-black overflow-hidden max-w-[1920px] max-h-[1080px] max-h-full w-full aspect-[16/10] flex flex-col"
                onMouseEnter={handleModalMouseEnter}
                onMouseLeave={handleModalMouseLeave}
            >
                {/* 타이틀 */}
                {title && (
                    <div className="p-3 md:p-5 flex-shrink-0 relative z-10 bg-black/50 flex items-center justify-between w-full">
                        <h2 className="text-slate-12 md:text-lg md:font-semibold">{title}</h2>
                        {/* 닫기 버튼 */}
                        <button
                            onClick={onClose}
                            className="z-20 inline-flex items-center justify-center rounded-md text-slate-11 transition ease-in-out hover:bg-slate-5 hover:text-slate-12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-6"
                            aria-label="close"
                        >
                            <Close />
                        </button>
                    </div>
                )}

                {/* 비디오 플레이어 컨테이너 */}
                <div className="flex-1 overflow-hidden relative min-h-0">
                    <VideoPlayer
                        src={videoSrc}
                        subSrc={videoSubSrc}
                        className="absolute inset-0 w-full h-full object-contain"
                        autoPlay
                        muted
                    />
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}