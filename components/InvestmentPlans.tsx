import InvestmentCard from "./InvestmentCard"

const plans = [
  {
    title: "Starter",
    acreage: 0.5,
    price: 500000,
    roi: 25,
    duration: "2 years",
    features: [
      "0.5 acres of premium land",
      "Quarterly ROI payouts",
      "Farm progress updates",
      "Access to investor portal",
      "Certificate of ownership",
    ],
  },
  {
    title: "Premium",
    acreage: 2,
    price: 2000000,
    roi: 30,
    duration: "3 years",
    features: [
      "2 acres of premium land",
      "Monthly ROI payouts",
      "Priority farm updates",
      "Exclusive investor events",
      "Farm visit privileges",
      "Dedicated account manager",
    ],
    isPopular: true,
  },
  {
    title: "Elite",
    acreage: 5,
    price: 5000000,
    roi: 35,
    duration: "5 years",
    features: [
      "5 acres of premium land",
      "Weekly ROI payouts",
      "Real-time farm analytics",
      "VIP investor status",
      "Unlimited farm visits",
      "Personal investment advisor",
      "Profit sharing opportunities",
    ],
  },
]

export default function InvestmentPlans() {
  return (
    <section id="plans" className="py-20 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Investment Plans</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto text-primary">
            Choose the perfect plan that matches your investment goals and timeline.
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
  )
}
