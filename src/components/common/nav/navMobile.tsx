import NavMobileButton from "./navMobileButton";
import { useRouter } from "next/navigation";

export default function NavMobile({ onClose }: { onClose: () => void }) {

    const router = useRouter();

    const goHome = () => {
        onClose();
        router.push("/#home");
    }
    const goService = () => {
        onClose();
        router.push("/#service");
    }
    const goContact = () => {
        onClose();
        router.push("/#contact");
    }
    const goDemo = () => {
        onClose();
        router.push("/demo");
    }

    return (
        <div className="overflow-y-auto opacity-0 overflow-x-hidden h-[calc(100dvh-72px)] flex w-full py-4 md:hidden duration-200 ease-in-out animate-header-slide-down-fade bg-black/80 backdrop-blur-md" id="mobile-menu" style={{ opacity: 1 }}>
            <div className="relative">
                <div className="absolute top-0 left-0 min-h-full px-6 w-screen">
                    <NavMobileButton text="Home" onClick={goHome} />
                    <NavMobileButton text="Service" onClick={goService} />
                    <NavMobileButton text="Contact" onClick={goContact} />
                    <NavMobileButton text="Demo" onClick={goDemo} />
                </div>
            </div>
        </div>
    )
}