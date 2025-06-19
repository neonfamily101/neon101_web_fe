import RightArrow from "@/assets/svgs/rightArrow";

export default function NavMobileButton({ text, onClick }: { text: string, onClick: () => void }) {
    return (
        <button className="flex items-center justify-between text-md w-full border-b border-slate-6 py-4 font-semibold text-slate-11 transition duration-200 ease-in-out last:border-none 
                        hover:text-slate-12" onClick={onClick}>
            {text}
            <RightArrow />
        </button>
    )
}