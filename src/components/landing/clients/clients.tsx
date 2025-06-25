import SilverTitle from "@/components/ui/silverTitle";
import CountUpNumber from "@/components/ui/countUpNumber";
import ClientLogos from "./clientLogos";

export default function Clients() {
    return (
        <section className="flex flex-col items-center gap-[70px] pt-[40px] pb-[8rem] md:pb-[12rem]">
            <SilverTitle small={true} textSizeClassName="!text-2xl md:!text-3xl">
                <CountUpNumber
                    start={101}
                    target={1000}
                    threshold={0.5}
                    startDelay={500}
                    prefix="Trusted by "
                    suffix="+ companies"
                />
            </SilverTitle>
            <ClientLogos />
        </section>
    );
}