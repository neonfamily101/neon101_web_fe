"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpNumberProps {
    /** Target number to count up to */
    target: number;
    /** Duration of animation in milliseconds (default 3000ms) */
    duration?: number;
    /** Intersection threshold (default 0.3) */
    threshold?: number;
    /** Delay before starting animation in milliseconds (default 300ms) */
    startDelay?: number;
    /** Optional prefix (e.g., "Trusted by ") */
    prefix?: string;
    /** Optional suffix (e.g., "+ companies") */
    suffix?: string;
    /** Custom className */
    className?: string;
}

export default function CountUpNumber({
    target,
    duration = 3000,
    threshold = 0.3,
    startDelay = 300,
    prefix = "",
    suffix = "",
    className = ""
}: CountUpNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentNumber, setCurrentNumber] = useState(0);

    // Intersection Observer to trigger animation when element comes into view
    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Early exit if already visible (prevents re-observing)
        if (isVisible) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold,
            }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [threshold, isVisible]);

    // Number animation when becomes visible
    useEffect(() => {
        if (!isVisible) return;

        // Add delay before starting animation
        const delayTimeout = setTimeout(() => {
            const startTime = Date.now();
            const startNumber = 0;

            const updateNumber = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-in function: starts slow and accelerates
                const easeIn = progress * progress * progress;

                const newNumber = Math.floor(startNumber + (target - startNumber) * easeIn);

                setCurrentNumber(newNumber);

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    setCurrentNumber(target); // Ensure we end exactly at target
                }
            };

            requestAnimationFrame(updateNumber);
        }, startDelay);

        return () => clearTimeout(delayTimeout);
    }, [isVisible, target, duration, startDelay]);

    return (
        <span ref={ref} className={className}>
            {prefix}{currentNumber.toLocaleString()}{suffix}
        </span>
    );
} 