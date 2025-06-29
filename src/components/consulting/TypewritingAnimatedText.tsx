import React, { useState, useEffect, useRef } from 'react';

export interface TypewritingAnimatedTextProps {
    text: string;
    className?: string;
    startAnimation: boolean;
    speed?: number;
    center?: boolean;
    endings?: string[];
}

export function TypewritingAnimatedText({ 
    text, 
    className, 
    startAnimation, 
    speed = 100, 
    center = false, 
    endings = [] 
}: TypewritingAnimatedTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(false);

    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const currentTextRef = useRef('');
    const endingsIndexRef = useRef(0);
    const isDeletingRef = useRef(false);

    const startTypewriter = () => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
        currentTextRef.current = '';
        endingsIndexRef.current = 0;
        isDeletingRef.current = false;
        setShowCursor(true);

        const PAUSE_MS = 1500;

        const animate = () => {
            if (currentTextRef.current.length < text.length) {
                currentTextRef.current = text.substring(0, currentTextRef.current.length + 1);
                setDisplayedText(currentTextRef.current);
                timeoutId.current = setTimeout(animate, speed);
                return;
            }

            if (endings.length > 0 && endingsIndexRef.current < endings.length) {
                const currentEnding = endings[endingsIndexRef.current];

                if (!isDeletingRef.current) {
                    const currentEndingPart = currentTextRef.current.substring(text.length);
                    if (currentEndingPart.length < currentEnding.length) {
                        currentTextRef.current = text + currentEnding.substring(0, currentEndingPart.length + 1);
                        setDisplayedText(currentTextRef.current);
                        timeoutId.current = setTimeout(animate, speed);
                        return;
                    }

                    // Always go to deletion phase after completing each ending
                    isDeletingRef.current = true;
                    setDisplayedText(currentTextRef.current);
                    timeoutId.current = setTimeout(animate, PAUSE_MS);
                    return;
                } else {
                    if (currentTextRef.current.length > text.length) {
                        currentTextRef.current = currentTextRef.current.substring(0, currentTextRef.current.length - 1);
                        setDisplayedText(currentTextRef.current);
                        timeoutId.current = setTimeout(animate, speed / 2);
                        return;
                    }

                    isDeletingRef.current = false;
                    endingsIndexRef.current += 1;

                    if (endingsIndexRef.current >= endings.length) {
                        // Reset to beginning for infinite loop
                        endingsIndexRef.current = 0;
                    }

                    timeoutId.current = setTimeout(animate, speed);
                    return;
                }
            }

            setShowCursor(false);
        };

        animate();
    };

    const prevStartRef = useRef(false);
    useEffect(() => {
        if (startAnimation && !prevStartRef.current) {
            startTypewriter();
        }
        prevStartRef.current = startAnimation;
    }, [startAnimation]);

    useEffect(() => {
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
        };
    }, []);

    const finalClassName = [className, center ? 'text-center' : 'text-left']
        .filter(Boolean)
        .join(' ');

    const multilineText = displayedText.split('\n').map((line, idx, arr) => (
        <React.Fragment key={idx}>
            {line}
            {idx < arr.length - 1 && <br />}
        </React.Fragment>
    ));

    return (
        <div className={finalClassName}>
            {multilineText}
            {showCursor && <span className="blinking-cursor">|</span>}
        </div>
    );
}