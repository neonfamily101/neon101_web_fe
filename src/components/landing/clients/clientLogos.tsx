import NextImage from "@/components/ui/nextImage";

const clientLogos = [
    {
        name: "KT",
        webp: "/images/clients_logo/KT.webp",
        png: "/images/clients_logo/KT.png"
    },
    {
        name: "LGU+",
        webp: "/images/clients_logo/LGU+.webp",
        png: "/images/clients_logo/LGU+.png"
    },
    {
        name: "한국관광공사",
        webp: "/images/clients_logo/한국관광공사.webp",
        png: "/images/clients_logo/한국관광공사.png"
    },
    {
        name: "파라다이스",
        webp: "/images/clients_logo/파라다이스.webp",
        png: "/images/clients_logo/파라다이스.png"
    },
    {
        name: "이베이",
        webp: "/images/clients_logo/이베이.webp",
        png: "/images/clients_logo/이베이.png"
    },
    {
        name: "워커힐",
        webp: "/images/clients_logo/워커힐.webp",
        png: "/images/clients_logo/워커힐.png"
    },
    {
        name: "아모레퍼시픽",
        webp: "/images/clients_logo/아모레퍼시픽.webp",
        png: "/images/clients_logo/아모레퍼시픽.png"
    },
    {
        name: "신한카드",
        webp: "/images/clients_logo/신한카드.webp",
        png: "/images/clients_logo/신한카드.png"
    },
    {
        name: "롯데카드",
        webp: "/images/clients_logo/롯데카드.webp",
        png: "/images/clients_logo/롯데카드.png"
    },
    {
        name: "삼성전자",
        webp: "/images/clients_logo/삼성전자.webp",
        png: "/images/clients_logo/삼성전자.png"
    },
    {
        name: "나이키",
        webp: "/images/clients_logo/나이키.webp",
        png: "/images/clients_logo/나이키.png"
    },
    {
        name: "국방과학연구소",
        webp: "/images/clients_logo/국방과학연구소.webp",
        png: "/images/clients_logo/국방과학연구소.png"
    },
    {
        name: "SK텔레콤",
        webp: "/images/clients_logo/SKtelecom.webp",
        png: "/images/clients_logo/SKtelecom.png"
    },
    {
        name: "LG전자",
        webp: "/images/clients_logo/LG전자.webp",
        png: "/images/clients_logo/LG전자.png"
    }
];

export default function ClientLogos() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-0">
                {clientLogos.map((client, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center p-2"
                    >
                        <picture className="w-full h-15 flex items-center justify-center">
                            <source srcSet={client.webp} type="image/webp" />
                            <NextImage
                                src={client.png}
                                alt={`${client.name} 로고`}
                                width={120}
                                height={48}
                                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </picture>
                    </div>
                ))}
            </div>
        </div>
    );
} 