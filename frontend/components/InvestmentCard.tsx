"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

interface InvestmentCardProps {
  title: string;
  acreage: number;
  price: number;
  roi: string;
  maturity: string;
  duration: string;
  features: string[];
}

export default function InvestmentCard({
  title,
  acreage,
  price,
  roi,
  maturity,
  duration,
  features,
}: InvestmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{
        y: -6,
        boxShadow: "0 18px 34px rgba(46,125,50,0.12)",
      }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm w-full"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h3 className="text-3xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">
          {acreage} acre{acreage > 1 ? "s" : ""} of premium land
        </p>
      </div>

      {/* Price & ROI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-border text-center">
        <div>
          <p className="text-muted-foreground text-sm mb-1">Investment</p>
          <p className="text-xl font-bold text-primary">
            ₦{price.toLocaleString()}/acre
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm mb-1">Expected ROI</p>
          <p className="text-2xl font-bold text-secondary">{roi}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm mb-1">Maturity</p>
          <p className="text-lg font-semibold text-foreground">{maturity}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm mb-1">Duration</p>
          <p className="text-lg font-semibold text-foreground">{duration}</p>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 border border-border rounded-lg px-4 py-3 bg-background/40 hover:bg-background/70 transition"
          >
            <Check
              size={18}
              className="text-primary flex-shrink-0 mt-0.5"
            />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href="/BookInvestment"
          className="block w-full text-center py-4 rounded-xl font-semibold bg-primary text-white hover:opacity-90 transition"
        >
          Invest Now
        </Link>
      </motion.div>
    </motion.div>
  );
}
