import CallToAction from "@/components/landing/CallToAction";
import Features from "@/components/landing/Features";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import Footer from "@/components/landing/Footer";
import Frequent from "@/components/landing/Frequent";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import NavBar from "@/components/landing/NavBar";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";

function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Hero />
      <Features />
      <FeatureShowcase />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Frequent />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default page;
