import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import WhySanasaa from "@/components/sections/WhySanasaa";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Subjects from "@/components/sections/Subjects";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Points from "@/components/sections/Points";
import FAQ from "@/components/sections/FAQ";
import Download from "@/components/sections/Download";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import MorphBlob from "@/components/ui/MorphBlob";

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <MorphBlob className="start-[-10%] top-[120vh] w-[520px]" />
      <MorphBlob className="end-[-12%] top-[280vh] w-[480px] rotate-180" />
      <Header />
      <Hero />
      <WhySanasaa />
      <Features />
      <HowItWorks />
      <Subjects />
      <Stats />
      <Testimonials />
      <Points />
      <FAQ />
      <Download />
      <Contact />
      <Footer />
    </main>
  );
}
