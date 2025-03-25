
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import About from "@/components/home/About";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
