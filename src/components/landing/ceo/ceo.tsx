import NextImage from "@/components/ui/nextImage";
import SilverTitle from "@/components/ui/silverTitle";

const ceoData = [
    {
        title: "Professional Expertise",
        texts: [
            "AX Specialist",
            "Big Data / Machine Learning Expert",
            "AI Agent Designer"
        ]
    },
    {
        title: "Current Position",
        texts: ["AI Consulting Partner(EDB X Etiverse)"]
    },
    {
        title: "Education",
        texts: [
            "KAIST 산업공학과 박사과정 수료",
            "KAIST 산업공학과 석사",
            "한양대학교 산업공학과 학사"
        ]
    }
]

export default function Ceo() {
    return (
        <section
            className="relative flex flex-col lg:flex-row items-center pb-[8rem] px-6 lg:px-[5rem] lg:pb-[12rem] max-w-8xl mx-auto"
        >
            <div className="w-full max-w-[500px] lg:w-[50%] lg:max-w-none flex justify-center">
                <NextImage src="/images/ceo/profile.png" alt="ceo" width={500} height={500} />
            </div>
            <div className="w-full max-w-[500px] lg:w-[50%] lg:max-w-none px-6 pt-10 lg:p-10 flex flex-col gap-5">
                <NameBlock />
                {ceoData.map((data, index) => (
                    <TextBlock key={index} title={data.title} texts={data.texts} />
                ))}
            </div>
        </section>
    );
}

function NameBlock() {
    return (
        <SilverTitle small={true} textSizeClassName="!text-2xl lg:!text-3xl" className="text-left text-slate-11">
            CEO 이정훈
        </SilverTitle>
    )
}

function TextBlock({ title, texts }: { title: string, texts: string[] }) {
    return (
        <div className="flex flex-col gap-2">
            <BoldText text={title} />
            <div className="flex flex-col gap-1">
                {texts.map((text, index) => (
                    <NormalText key={index} text={text} />
                ))}
            </div>
        </div>
    );
}

function BoldText({ text }: { text: string }) {
    return <span className="font-semibold text-slate-12 text-2xl pb-3">{text}</span>
}

function NormalText({ text }: { text: string }) {
    return (
        <span className="flex items-center text-slate-11">
            <span className="w-1 h-1 bg-slate-11 rounded-full mr-2"></span>
            {text}
        </span>
    )
}