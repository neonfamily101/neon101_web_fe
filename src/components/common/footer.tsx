import Mail from '@/assets/svgs/footer/mail';
import Youtube from '@/assets/svgs/footer/youtube';
import LinkedIn from '@/assets/svgs/footer/linkedIn';

export default function Footer() {
    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* 🔥 삭제된 Spline 3D Background */}

            {/* Footer Content */}
            <div className="relative z-10 container mx-auto px-6 py-24">
                <div className="border-t border-slate-8 mb-8 pt-6 text-center text-sm text-slate-12">
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
                    {/* Company Info */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <FooterBlock title="NEON101">
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                <span className="text-slate-11 min-w-[60px]">Tel:</span>
                                <span className="text-slate-11">02-562-1101</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                <span className="text-slate-11 min-w-[60px]">Email:</span>
                                <span className="text-slate-11 break-all">neon101@neon101.ai</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                <span className="text-slate-11 min-w-[60px]">Address:</span>
                                <span className="text-slate-11 break-words leading-relaxed">
                                    3th, 31, SeolleungRo 119-Gil GangNamGu, Seoul, Republic of Korea
                                </span>
                            </div>
                        </FooterBlock>
                    </div>

                    {/* Quick Links */}
                    <FooterBlock title="Company">
                        <LinkTextBlock text="Home" href="#home" />
                        <LinkTextBlock text="Consulting" href="/" />
                        <LinkTextBlock text="Service" href="#service" />
                        <LinkTextBlock text="Contact" href="#contact" />
                        <LinkTextBlock text="Demo" href="/demo" />
                    </FooterBlock>

                    {/* Partner Links */}
                    <FooterBlock title="Partner">
                        <TextBlock text="For individuals" />
                        <TextBlock text="For freelancers" />
                        <TextBlock text="For teams" />
                        <TextBlock text="For enterprises" />
                    </FooterBlock>

                    {/* Resources Links */}
                    <FooterBlock title="Resources">
                        <TextBlock text="Support" />
                        <TextBlock text="Security" />
                        <TextBlock text="Preferences" />
                        <TextBlock text="Privacy Policy" />
                        <TextBlock text="Terms of Use" />
                    </FooterBlock>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-8 mt-8 pt-6 text-center text-sm text-slate-11 flex justify-between">
                    <p>@2025 NEON101. All rights reserved.</p>
                    <div className="flex gap-4 items-center">
                        <IconBlock>
                            <Mail />
                        </IconBlock>
                        <IconBlock>
                            <a href="https://www.linkedin.com/in/%EB%A7%88%EC%BC%80%ED%8C%85%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EC%BD%94%EB%A6%AC%EC%95%84%EC%9D%B4%EC%A0%95%ED%9B%88/" // 원하는 LinkedIn URL로 변경
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit our LinkedIn">
                                <LinkedIn />
                            </a>
                        </IconBlock>
                        <IconBlock>
                            <Youtube />
                        </IconBlock>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterBlock({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h4 className="text-lg font-semibold">{title}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
                {children}
            </ul>
        </div>
    );
}

function TextBlock({ text }: { text: string }) {
    return (
        <li><span className="text-slate-11">{text}</span></li>
    );
}

function LinkTextBlock({ text, href }: { text: string, href: string }) {
    return (
        <li><a href={href} className="text-slate-11">{text}</a></li>
    );
}

function IconBlock({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-slate-11">
            {children}
        </span>
    );
}
