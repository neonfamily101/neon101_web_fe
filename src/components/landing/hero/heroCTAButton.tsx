import LinkButton from "../../ui/linkButton";
import clsx from 'clsx';
import RightChevron from "@/assets/svgs/rightChevron";

interface HeroCTAButtonProps {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
}

export default function HeroCTAButton({
    text,
    href,
    variant = 'primary'
}: HeroCTAButtonProps) {
    // 공통 className
    const baseClasses = "inline-flex items-center border justify-center select-none rounded-full disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 text-base h-12 gap-0 px-5 font-semibold";

    // variant에 따른 스타일
    const variantClasses = {
        primary: "bg-white text-black hover:bg-white/90 focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:outline-hidden focus-visible:bg-white/90 disabled:hover:bg-white",
        secondary: "bg-slate-1 border-slate-1 text-slate-11 hover:bg-slate-5 hover:text-slate-12 focus-visible:ring-4 focus-visible:ring-slate-7 focus-visible:outline-hidden focus-visible:bg-slate-6 disabled:hover:bg-slate-1"
    };

    return (
        <LinkButton
            className={clsx(baseClasses, variantClasses[variant])}
            href={href}
        >
            {text}
            <span className="text-[#70757E] -mr-2">
                <RightChevron />
            </span>
        </LinkButton>
    );
}
