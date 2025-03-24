
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/home/Contact";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ContactPage = () => {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    // Get the plan and subject from the URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get("plan");
    const subject = searchParams.get("subject");

    if (plan) {
      setSelectedPlan(plan);
    } else if (subject) {
      setSelectedPlan(subject);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24">
        <Contact selectedPlan={selectedPlan} />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
