import InvestmentCard from "./InvestmentCard";

const plans = [
  {
    title: "Starter",
    acreage: 1,
    price: 3700000,
    roi: "6m -12m",
    maturity: "4–5 years",
    duration: "50years and above",
    features: [
      "1-9 acre of premium land",
      "Annual ROI payouts",
      "Farm progress updates",
      "Access to investor portal",
      "Certificate of ownership",
    ],
  },
  {
    title: "Premium",
    acreage: 10,
    price: 3700000,
    roi: "6m -12m",
    maturity: "4–5 years",
    duration: "50years and above",
    features: [
      "10 -49 acres of premium land",
      "Annual ROI payouts",
      "Priority farm updates",
      "Exclusive investor events",
      "Dedicated account manager",
    ],
    isPopular: true,
  },
  {
    title: "Elite",
    acreage: 50,
    price: 3700000,
    roi: "6m -12m",
    maturity: "4–5 years",
    duration: "50years and above",
    features: [
      "50 -100 acres of premium land",
      "Annual ROI payouts",
      "VIP investor status",
      "Personal investment advisor",
    ],
  },
];

export default function InvestmentPlans() {
  return (
    <section id="plans" className="py-20 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Investment Plans
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto text-primary">
            Choose the perfect plan that matches your investment goals and
            timeline.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <InvestmentCard key={idx} {...plan} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
