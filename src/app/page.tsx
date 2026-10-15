import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Method from "@/components/Method";
import MovementGallery from "@/components/MovementGallery";
import Lifestyle from "@/components/Lifestyle";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/ui/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Method />
        <MovementGallery />
        <Lifestyle />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
