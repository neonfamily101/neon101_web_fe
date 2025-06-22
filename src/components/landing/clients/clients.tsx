import SilverTitle from "@/components/ui/silverTitle";
import ClientLogos from "./clientLogos";

export default function Clients() {
    return (
        <section className="flex flex-col items-center gap-[70px] pt-[40px] pb-[8rem] md:pb-[12rem]">
            <SilverTitle small={true} textSizeClassName="!text-2xl md:!text-3xl">
                Trusted by 1000+ companies
            </SilverTitle>
            <ClientLogos />
        </section>
    );
}