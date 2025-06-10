
import RankCalculator from "@/components/RankCalculator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RankCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RankCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default RankCalculatorPage;
