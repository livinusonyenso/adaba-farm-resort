"use client";

import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Clock, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

const pricingTiers = [
  {
    acres: 1,
    trees: 60,
    price: "₦3,700,000",
    minRevenue: "₦4,200,000",
    maxRevenue: "₦8,400,000",
    highlight: false,
  },
  {
    acres: 5,
    trees: 300,
    price: "₦18,500,000",
    minRevenue: "₦21,000,000",
    maxRevenue: "₦52,000,000",
    highlight: true,
  },
  {
    acres: 10,
    trees: 600,
    price: "₦37,000,000",
    minRevenue: "₦42,000,000",
    maxRevenue: "₦84,000,000",
    highlight: false,
  },
];

const features = [
  "Annual ROI payouts from year 4–5",
  "We plant and manage for you",
  "50+ year land ownership",
  "Farm progress updates",
  "Harvest & sell managed by experts",
  "60 coconut trees per acre",
];

export default function PricingFlyer() {
  return (
    <section id="pricing-flyer" className="py-20 bg-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full mb-4 text-sm">
            <TrendingUp size={16} />
            LIMITED OFFER — INVEST NOW
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Pricing & Offers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Own your piece of Àdàbà Coconut Farm & Resort in Owode, Ogun State.
            Secure steady returns for the next 50+ years.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-primary/70">
            <MapPin size={15} />
            <span>Owode, Ogun State — less than 1 hour from Epe</span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.acres}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-6 flex flex-col gap-4 border-2 transition-shadow hover:shadow-xl ${
                tier.highlight
                  ? "bg-primary text-white border-primary shadow-lg scale-105"
                  : "bg-white text-primary border-primary/20 shadow-md"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full shadow">
                  MOST POPULAR
                </div>
              )}

              <div>
                <p className={`text-sm font-semibold uppercase tracking-wide ${tier.highlight ? "text-white/70" : "text-primary/60"}`}>
                  {tier.acres} {tier.acres === 1 ? "Acre" : "Acres"}
                </p>
                <h3 className={`text-3xl font-bold mt-1 ${tier.highlight ? "text-white" : "text-primary"}`}>
                  {tier.price}
                </h3>
                <p className={`text-sm mt-1 ${tier.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                  {tier.trees} coconut trees
                </p>
              </div>

              <div className={`rounded-xl p-4 ${tier.highlight ? "bg-white/10" : "bg-primary/5"}`}>
                <p className={`text-xs font-semibold uppercase mb-1 ${tier.highlight ? "text-white/60" : "text-primary/50"}`}>
                  Projected Net Profit
                </p>
                <p className={`text-lg font-bold ${tier.highlight ? "text-white" : "text-primary"}`}>
                  {tier.minRevenue} – {tier.maxRevenue}
                </p>
                <p className={`text-xs mt-1 ${tier.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  Per harvest season (after 30% processing deduction)
                </p>
              </div>

              <a
                href="#plans"
                className={`mt-auto text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                  tier.highlight
                    ? "bg-white text-primary hover:bg-white/90"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                Invest Now
              </a>
            </motion.div>
          ))}
        </div>

        {/* Flyer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Offer Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-2">
                What You Get
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Everything Managed.<br />You Just Earn.
              </h3>
              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white/90 text-sm">
                    <CheckCircle size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock size={16} className="text-amber-400" />
                  ROI starts in 6–12 months after planting
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20 space-y-2">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Phone size={14} className="text-amber-400" />
                  <span>+234 803 000 0000</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Mail size={14} className="text-amber-400" />
                  <span>invest@adabafarm.com</span>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative min-h-64 lg:min-h-full">
              <Image
                src="https://res.cloudinary.com/dikhomv7m/image/upload/%C3%80d%C3%A0b%C3%A0Dove_pg94ra.jpg"
                alt="Àdàbà Coconut Farm"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent lg:bg-gradient-to-l" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white">
                  <p className="text-xs text-white/70 uppercase font-semibold mb-1">Starting from</p>
                  <p className="text-2xl font-bold">₦3,700,000 / acre</p>
                  <p className="text-xs text-white/70 mt-1">Own it for 50+ years</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
