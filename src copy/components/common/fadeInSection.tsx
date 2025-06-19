"use client";

import { useEffect, useRef, useState, ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

interface FadeInSectionProps extends HTMLAttributes<HTMLDivElement> {
    /** Content to animate */
    children: ReactNode;
    /** Intersection threshold (default 0.1) */
    threshold?: number;
    /** Delay(ms) before starting the transition once visible */
    delay?: number;
}

/**
 * Wrapper that fades content in by sliding it slightly upward once it enters the viewport.
 *
 * The component is lightweight (uses a single `IntersectionObserver`) and only runs on the client.
 */
export default function FadeInSection({
    children,
    className,
    threshold = 0.1,
    delay = 0,
    ...rest
}: FadeInSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

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

    return (
        <div
            ref={ref}
            className={clsx("fade-in-section", className, { "is-visible": isVisible })}
            style={{ transitionDelay: `${delay}ms` }}
            {...rest}
        >
            {children}
        </div>
    );
} 