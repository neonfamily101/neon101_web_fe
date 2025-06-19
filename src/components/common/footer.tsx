import Spline from '@splinetool/react-spline';
import Mail from '@/assets/svgs/footer/mail';
import Youtube from '@/assets/svgs/footer/youtube';
import LinkedIn from '@/assets/svgs/footer/linkedIn';

export default function Footer() {
    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* Spline 3D Background */}
            <div className="absolute inset-0 opacity-30">
                <Spline
                    scene="https://prod.spline.design/y4FrPYdPb3a87X3s/scene.splinecode"
                />
            </div>

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
                        <LinkTextBlock text="Home" />
                        <LinkTextBlock text="Service" />
                        <LinkTextBlock text="Contact" />
                    </FooterBlock>

                    {/* Partner Links */}
                    <FooterBlock title="Partner">
                        <LinkTextBlock text="For individuals" />
                        <LinkTextBlock text="For freelancers" />
                        <LinkTextBlock text="For teams" />
                        <LinkTextBlock text="For enterprises" />
                    </FooterBlock>

                    {/* Resources Links */}
                    <FooterBlock title="Resources">
                        <LinkTextBlock text="Support" />
                        <LinkTextBlock text="Security" />
                        <LinkTextBlock text="Preferences" />
                        <LinkTextBlock text="Privacy Policy" />
                        <LinkTextBlock text="Terms of Use" />
                    </FooterBlock>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-8 mt-8 pt-6 text-center text-sm text-slate-11 flex justify-between">
                    <p>@2024 NEON101. All rights reserved.</p>
                    <div className="flex gap-4 items-center">
                        <IconBlock>
                            <Mail />
                        </IconBlock>
                        <IconBlock>
                            <LinkedIn />
                        </IconBlock>
                        <IconBlock>
                            <Youtube />
                        </IconBlock>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function FooterBlock({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h4 className="text-lg font-semibold">{title}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
                {children}
            </ul>
        </div>
    )
}

function LinkTextBlock({ text }: { text: string }) {
    return (
        <li><span className="text-slate-11">{text}</span></li>
    )
}

function IconBlock({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-slate-11">
            {children}
        </span>
    )
}