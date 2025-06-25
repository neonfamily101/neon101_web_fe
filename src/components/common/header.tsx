"use client";

import LogoNav from "@/assets/svgs/logoNav";
import Menu from "@/assets/svgs/menu";
import NavButton from "./nav/navButton";
import NavMobile from "./nav/navMobile";
import Close from "@/assets/svgs/close";
import { useState, useEffect } from "react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    // 모바일 메뉴 열릴 때 스크롤 방지
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // 컴포넌트 언마운트 시 스크롤 복원
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <header className="sticky top-0 z-40 bg-black/50" aria-label="Main" data-orientation="horizontal" dir="ltr">
            <div className="mx-auto w-full max-w-5xl px-6 md:max-w-7xl">
                <div className="bg-background absolute left-0 top-0 z-20 flex w-full flex-col items-center md:hidden">
                    <div className="flex w-full items-center px-6 py-1">
                        <div className="flex-auto">
                            <LogoNav />
                        </div>
                        {/* 모바일 메뉴 버튼 */}
                        <div className="flex flex-auto justify-end">
                            <button aria-label="menu" className="inline-flex items-center justify-center rounded-md p-1 text-slate-11 transition ease-in-out hover:bg-slate-5 hover:text-slate-12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-6" type="button" onClick={handleMobileMenu}><span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? <Close /> : <Menu />}
                            </button>
                        </div>
                    </div>
                    {isMobileMenuOpen && <NavMobile onClose={handleMobileMenu} />}
                </div>
                <div className="mx-auto hidden md:block h-[58px] w-full transition duration-500 ease-in-out">
                    <div className="absolute left-0 top-0 flex items-center justify-center h-full px-5 lg:w-[225px]">
                        <span data-state="closed" className="">
                            <LogoNav />
                        </span>
                    </div>
                    <ul data-orientation="horizontal" className="flex items-center justify-center gap-6" dir="ltr">
                        <NavButton text="Home" href="/#home" />
                        <NavButton text="Consulting" href="/" />
                        <NavButton text="Service" href="/#service" />
                        <NavButton text="Contact" href="/#contact" />
                        <NavButton text="Demo" href="/demo" />
                    </ul>
                </div>
            </div>
            <div className="z-50 perspective-[2000px] absolute left-[1rem] flex w-[calc(100%-1rem)] justify-center"></div>
        </header>
    );
}