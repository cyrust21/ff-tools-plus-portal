
import SensitivityCalculator from "@/components/SensitivityCalculator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SensitivityCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SensitivityCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default SensitivityCalculatorPage;
