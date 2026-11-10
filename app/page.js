import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventInfo from "@/components/EventInfo";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Videos from "@/components/Videos";
import Learn from "@/components/Learn";
import Speakers from "@/components/Speakers";
import QariJourney from "@/components/QariJourney";
import Offers from "@/components/Offers";
import Register from "@/components/Register";
import Project from "@/components/Project";
import Moments from "@/components/Moments";
import Venue from "@/components/Venue";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import FloatingCall from "@/components/FloatingCall";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <EventInfo />
        <Marquee />
        <About />
        <Videos />
        <Learn />
        <Speakers />
        <QariJourney />
        <Offers />
        <Register />
        <Project />
        <Moments />
        <Venue />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCall />
    </SmoothScroll>
  );
}
