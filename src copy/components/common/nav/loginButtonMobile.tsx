import LinkButton from "../../ui/linkButton";
import clsx from 'clsx';

interface LoginButtonMobileProps {
    text: string;
    href: string;
    variant?: 'secondary' | 'primary';
    children?: React.ReactNode;
}

export default function LoginButtonMobile({
    text,
    href,
    variant = 'secondary',
    children
}: LoginButtonMobileProps) {
    // 공통 className
    const baseClasses = "font-semibold inline-flex items-center justify-center border select-none relative cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 text-base h-11 pl-4 pr-4 rounded-md gap-2 mb-4 w-full border-slate-6";

    // variant에 따른 스타일
    const variantClasses = {
        secondary: "bg-slate-3 text-slate-11 bg-slate-2 text-slate-12 hover:bg-slate-4 hover:bg-slate-4 focus-visible:ring-2 focus-visible:ring-slate-7 focus-visible:outline-hidden focus-visible:bg-slate-4 disabled:hover:bg-slate-4",
        primary: "bg-black bg-white text-black hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-hidden focus-visible:bg-white/90 focus-visible:bg-black/90 disabled:hover:bg-white"
    };

    return (
        <LinkButton
            className={clsx(baseClasses, variantClasses[variant])}
            href={href}
        >
            {text}
            {children}
        </LinkButton>
    );
}