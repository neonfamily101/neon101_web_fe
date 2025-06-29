import React from 'react';

export interface ScrollPagesProps {
    headlines: string[];
    imageUrls: string[];
}

export function ScrollPages({
    headlines,
    imageUrls,
}: ScrollPagesProps) {
    const items = headlines.map((title, idx) => ({
        title,
        image: imageUrls[idx],
    }));

    return (
        <div className="w-screen overflow-x-hidden font-sans text-slate-900">
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="scroll-section bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                >
                    <div className="scroll-text-holder">
                        <h1 className="scroll-fixed-text text-white text-[12vw] md:text-9xl font-serif tracking-tight drop-shadow-2xl select-none text-center">
                            {item.title.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < item.title.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h1>
                    </div>
                </div>
            ))}
        </div>
    );
} 