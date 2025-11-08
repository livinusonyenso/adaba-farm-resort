import InvestmentCard from "./InvestmentCard";

export default function InvestmentPlans() {
  const plan = {
    title: "Starter",
    acreage: 1,
    price: 3700000,
    roi: "6m – 12m",
    maturity: "4–5 years",
    duration: "50 years and above",
    features: [
      "Annual ROI payouts",
      "Farm progress updates",
    ],
  };

  return (
    <section id="plans" className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Investment Plan
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto text-primary/90">
            A focused plan that matches your goals and timeline.
          </p>
        </div>

        {/* Full-width card */}
        <div className="w-full">
          <InvestmentCard {...plan} />
        </div>
      </div>
    </section>
  );
}
