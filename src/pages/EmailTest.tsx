
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmailTest from "@/components/test/EmailTest";

const EmailTestPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <EmailTest />
      </div>
      <Footer />
    </div>
  );
};

export default EmailTestPage;
