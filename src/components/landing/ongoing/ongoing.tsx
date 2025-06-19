import VideoShowcase from './videoShowcase';
import { sampleData } from './sampleData';
import SilverTitle from '@/components/ui/silverTitle';


export default function Ongoing() {
    return (
        <div className="min-h-screen p-8">
            <div className="flex flex-col gap-[70px] mx-auto max-w-7xl">
                <SilverTitle small={true}>
                    On-Going Projects
                </SilverTitle>

                <VideoShowcase
                    items={sampleData}
                    autoPlay={true}
                    autoPlayInterval={4000}
                    className="mb-16"
                />
            </div>
        </div>
    );
} 