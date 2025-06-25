import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Clients from "@/components/landing/clients/clients";
import Hero from "@/components/landing/hero/hero";
import VideoSlider from "@/components/landing/videoSlider/videoSlider";
import Ceo from "@/components/landing/ceo/ceo";
import Ongoing from "@/components/landing/ongoing/ongoing";
import FadeInSection from "@/components/common/fadeInSection";

// import HeroBgVideo from "@/components/landing/heroBgVideo";


export default function Home() {
  return (
    <div className="bg-black" translate="no">
      <Header />
      <div id="home">
        <Hero />
      </div>

      {/* Sections with scroll-in animation */}
      <FadeInSection>
        <Clients />
      </FadeInSection>

      <FadeInSection>
        <VideoSlider />
      </FadeInSection>

      <FadeInSection>
        <Ceo />
      </FadeInSection>

      <div id="service">
        <FadeInSection>
          <Ongoing />
        </FadeInSection>
      </div>
      <div id="contact">
        <FadeInSection>
          <Footer />
        </FadeInSection>
      </div>
    </div>
  );
}
