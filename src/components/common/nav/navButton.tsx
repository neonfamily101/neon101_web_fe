import { useRouter } from "next/navigation";

export default function NavButton({ text, href }: { text: string, href: string }) {
    const router = useRouter();
    return (
        <li>
            <button className="h-[58px] flex items-center rounded-md mx-1 py-1 text-base font-medium text-slate-12 hover:text-slate-11 focus-visible:text-slate-11 lg:mx-3 lg:pr-0 group select-none gap-[2px] outline-hidden transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 cursor-pointer" data-radix-collection-item="" onClick={() => router.push(href)}>{text}
            </button>
        </li>
    );
}