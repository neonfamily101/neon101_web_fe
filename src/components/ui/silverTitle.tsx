import clsx from 'clsx';

export default function SilverTitle({ children, className, small, textSizeClassName }: { children: React.ReactNode, small?: boolean, className?: string, textSizeClassName?: string }) {
    return (
        <h2 className={clsx(
            'font-display effect-font-styling tracking-tight effect-font-gradient effect-font-hero text-center',
            textSizeClassName || (small
                ? '!text-[2rem] md:!text-[3rem] leading-[3rem] md:leading-[4rem]'
                : 'text-[3rem] md:text-7xl leading-[4.35rem] md:leading-[5rem]'
            ),
            className
        )}>
            {children}
        </h2>
    );
}

