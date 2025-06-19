import LinkButton from "../../ui/linkButton";
import clsx from 'clsx';

interface LoginButtonProps {
    text: string;
    href: string;
    variant?: 'secondary' | 'primary';
    children?: React.ReactNode;
}

export default function LoginButton({
    text,
    href,
    variant = 'secondary',
    children
}: LoginButtonProps) {
    // 공통 className
    const baseClasses = "outline-hidden items-center border justify-center select-none rounded-full disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 text-sm h-10 gap-0 px-4 font-semibold hidden lg:flex";

    // variant에 따른 스타일
    const variantClasses = {
        secondary: "bg-slate-1 border-slate-1 text-slate-11 hover:bg-slate-5 hover:text-slate-12 focus-visible:ring-4 focus-visible:ring-slate-7 focus-visible:outline-hidden focus-visible:bg-slate-6 disabled:hover:bg-slate-1",
        primary: "inline-flex bg-white text-black hover:bg-white/90 focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:outline-hidden focus-visible:bg-white/90 disabled:hover:bg-white"
    };

    return (
        <LinkButton
            className={clsx(baseClasses, variantClasses[variant])}
            href={href}
            data-state="closed"
        >
            {text}
            {children}
        </LinkButton>
    );
}