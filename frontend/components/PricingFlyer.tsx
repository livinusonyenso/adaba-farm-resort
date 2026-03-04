"use client";

import { useState, useEffect } from "react";
import { CheckCircle, TrendingUp, Clock, MapPin, Phone, Mail, ChevronLeft, ChevronRight, Leaf, Calendar } from "lucide-react";
import Image from "next/image";

const flyerSlides = [
  {
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/%C3%80d%C3%A0b%C3%A0Dove_pg94ra.jpg",
    badge: "Starter Package",
    label: "1 Acre of Land",
    trees: 60,
    fruits: "12,000",
    price: "₦5,000,000",
    deposit: "₦1,000,000",
    grossMin: "₦6,000,000",
    grossMax: "₦12,000,000",
    tagline: "Your first step into coconut farming",
    features: [
      "60 hybrid coconut trees",
      "ROI: ₦6M–₦12M per annum (gross)",
      "3-month interest-free payment plan",
      "30% processing & management fee",
      "50+ year land ownership",
    ],
  },
  {
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632119/WhatsApp_Image_2026-03-03_at_7.11.00_AM_qghoo0.jpg",
    badge: "Hectare Package",
    label: "1 Hectare of Land",
    trees: 150,
    fruits: "30,000",
    price: "₦12,500,000",
    deposit: "₦3,000,000",
    grossMin: "₦15,000,000",
    grossMax: "₦30,000,000",
    tagline: "The new gold mine in agricultural investments",
    features: [
      "~150 hybrid coconut trees",
      "ROI: ₦15M–₦30M per annum (gross)",
      "₦3M initial deposit to reserve",
      "30% processing & management fee",
      "50+ year land ownership",
    ],
  },
  {
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632117/WhatsApp_Image_2026-03-03_at_7.11.00_AM_1_vlhptx.jpg",
    badge: "Most Popular",
    label: "5 Acres of Land",
    trees: 300,
    fruits: "60,000",
    price: "₦25,000,000",
    deposit: "₦5,000,000",
    grossMin: "₦30,000,000",
    grossMax: "₦60,000,000",
    tagline: "The sweet spot for serious investors",
    features: [
      "300 hybrid coconut trees",
      "ROI: ₦30M–₦60M per annum (gross)",
      "Dedicated farm manager",
      "30% processing & management fee",
      "50+ year land ownership",
    ],
  },
  {
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632113/WhatsApp_Image_2026-03-03_at_7.11.01_AM_1_duxgmf.jpg",
    badge: "Premium Choice",
    label: "10 Acres of Land",
    trees: 600,
    fruits: "120,000",
    price: "₦50,000,000",
    deposit: "₦10,000,000",
    grossMin: "₦60,000,000",
    grossMax: "₦120,000,000",
    tagline: "Scale up your farm income significantly",
    features: [
      "600 hybrid coconut trees",
      "ROI: ₦60M–₦120M per annum (gross)",
      "Monthly farm progress reports",
      "30% processing & management fee",
      "50+ year land ownership",
    ],
  },
  {
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632113/WhatsApp_Image_2026-03-03_at_7.11.01_AM_yrnbcx.jpg",
    badge: "High Yield",
    label: "20 Acres of Land",
    trees: 1200,
    fruits: "240,000",
    price: "₦100,000,000",
    deposit: "₦20,000,000",
    grossMin: "₦120,000,000",
    grossMax: "₦240,000,000",
    tagline: "Build generational wealth through farming",
    features: [
      "1,200 hybrid coconut trees",
      "ROI: ₦120M–₦240M per annum (gross)",
      "VIP investor status",
      "30% processing & management fee",
      "50+ year land ownership",
    ],
  },
  {
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632113/WhatsApp_Image_2026-03-03_at_8.27.09_AM_oe2l4j.jpg",
    badge: "Elite Investor",
    label: "50 Acres of Land",
    trees: 3000,
    fruits: "300,000",
    price: "₦250,000,000",
    deposit: "₦50,000,000",
    grossMin: "₦300,000,000",
    grossMax: "₦600,000,000",
    tagline: "Maximum land, maximum generational returns",
    features: [
      "3,000 hybrid coconut trees",
      "ROI: ₦300M–₦600M per annum (gross)",
      "Dedicated relationship manager",
      "30% processing & management fee",
      "50+ year land ownership",
    ],
  },
];

const pricingTiers = [
  {
    label: "Per Acre",
    acres: 1,
    trees: 60,
    price: "₦5,000,000",
    deposit: "₦1M",
    netMin: "₦4,200,000",
    netMax: "₦8,400,000",
    grossMin: "₦6,000,000",
    grossMax: "₦12,000,000",
    highlight: false,
  },
  {
    label: "Per Hectare",
    acres: "~2.47",
    trees: 150,
    price: "₦12,500,000",
    deposit: "₦3M",
    netMin: "₦10,500,000",
    netMax: "₦21,000,000",
    grossMin: "₦15,000,000",
    grossMax: "₦30,000,000",
    highlight: true,
  },
  {
    label: "10 Acres",
    acres: 10,
    trees: 600,
    price: "₦50,000,000",
    deposit: "₦10M",
    netMin: "₦42,000,000",
    netMax: "₦84,000,000",
    grossMin: "₦60,000,000",
    grossMax: "₦120,000,000",
    highlight: false,
  },
];

const roiTable = [
  { acres: "1 Acre", trees: 60, fruits: "12,000", avgRev: "₦6,000,000", maxRev: "₦12,000,000" },
  { acres: "5 Acres", trees: 300, fruits: "60,000", avgRev: "₦30,000,000", maxRev: "₦60,000,000" },
  { acres: "10 Acres", trees: 600, fruits: "120,000", avgRev: "₦60,000,000", maxRev: "₦120,000,000" },
  { acres: "20 Acres", trees: 1200, fruits: "240,000", avgRev: "₦120,000,000", maxRev: "₦240,000,000" },
  { acres: "50 Acres", trees: 3000, fruits: "300,000", avgRev: "₦300,000,000", maxRev: "₦600,000,000" },
];

export default function PricingFlyer() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % flyerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + flyerSlides.length) % flyerSlides.length);
  const next = () => setCurrent((p) => (p + 1) % flyerSlides.length);

  return (
    <section id="pricing-flyer" className="py-20 bg-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full mb-4 text-sm">
            <TrendingUp size={16} />
            LIMITED OFFER — INVEST NOW
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Pricing & Offers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Own your piece of Àdàbà Coconut Farm & Resort — Nigeria's first hybrid coconut farm.
            Secure steady returns for the next 50+ years.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3 text-sm text-primary/70">
            <span className="flex items-center gap-1"><MapPin size={15} /> Owode, Ogun State — less than 1 hour from Epe</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1"><Leaf size={15} /> We farm, you earn without stress</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {pricingTiers.map((tier) => (
            <div
              key={tier.label}
              className={`relative rounded-2xl p-6 flex flex-col gap-4 border-2 transition-shadow hover:shadow-xl ${
                tier.highlight
                  ? "bg-primary text-white border-primary shadow-lg scale-105"
                  : "bg-white text-primary border-primary/20 shadow-md"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full shadow whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              <div>
                <p className={`text-sm font-semibold uppercase tracking-wide ${tier.highlight ? "text-white/70" : "text-primary/60"}`}>
                  {tier.label}
                </p>
                <h3 className={`text-3xl font-bold mt-1 ${tier.highlight ? "text-white" : "text-primary"}`}>
                  {tier.price}
                </h3>
                <p className={`text-sm mt-1 ${tier.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                  {tier.trees} coconut trees · Initial deposit {tier.deposit}
                </p>
              </div>
              <div className={`rounded-xl p-4 ${tier.highlight ? "bg-white/10" : "bg-primary/5"}`}>
                <p className={`text-xs font-semibold uppercase mb-1 ${tier.highlight ? "text-white/60" : "text-primary/50"}`}>
                  Gross Revenue Per Annum
                </p>
                <p className={`text-lg font-bold ${tier.highlight ? "text-white" : "text-primary"}`}>
                  {tier.grossMin} – {tier.grossMax}
                </p>
                <p className={`text-xs mt-1 ${tier.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  Net after 30% processing & management fee: {tier.netMin} – {tier.netMax}
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
            </div>
          ))}
        </div>

        {/* ROI Projection Table */}
        <div className="bg-white rounded-2xl shadow-md border border-primary/10 overflow-hidden mb-10">
          <div className="bg-primary px-6 py-4">
            <h3 className="text-white font-bold text-lg">Investment & Return of Investment Projection</h3>
            <p className="text-white/70 text-sm mt-0.5">Note: 30% processing & management fee applies to all proceeds</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary/5 border-b border-primary/10">
                  <th className="text-left px-4 py-3 text-primary font-semibold">Land Size</th>
                  <th className="text-center px-4 py-3 text-primary font-semibold">Coconut Trees</th>
                  <th className="text-center px-4 py-3 text-primary font-semibold">Fruit Projection</th>
                  <th className="text-center px-4 py-3 text-primary font-semibold">Avg Revenue</th>
                  <th className="text-center px-4 py-3 text-primary font-semibold">Max Revenue</th>
                </tr>
              </thead>
              <tbody>
                {roiTable.map((row, i) => (
                  <tr key={row.acres} className={`border-b border-primary/5 ${i % 2 === 0 ? "bg-white" : "bg-primary/3"}`}>
                    <td className="px-4 py-3 font-semibold text-primary">{row.acres}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{row.trees.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{row.fruits}</td>
                    <td className="px-4 py-3 text-center font-medium text-primary">{row.avgRev}</td>
                    <td className="px-4 py-3 text-center font-bold text-amber-600">{row.maxRev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* 3-Month Plan */}
          <div className="bg-white rounded-2xl shadow-md border border-primary/10 overflow-hidden">
            <div className="bg-primary px-6 py-4 flex items-center gap-3">
              <Calendar size={20} className="text-amber-400" />
              <div>
                <h3 className="text-white font-bold text-base">3-Month Payment Plan</h3>
                <p className="text-white/60 text-xs">Outright purchase — Interest free</p>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: "Initial Deposit", amount: "₦1,000,000" },
                { label: "2nd Payment", amount: "₦2,000,000" },
                { label: "3rd Payment", amount: "₦2,000,000" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-red-500 text-white rounded-xl px-4 py-3">
                  <span className="text-sm font-medium">{item.label}:</span>
                  <span className="font-bold">{item.amount}</span>
                </div>
              ))}
              <div className="bg-blue-50 rounded-xl px-4 py-3 flex justify-between items-center mt-2">
                <span className="text-primary text-sm font-semibold">Total</span>
                <span className="text-primary font-bold">₦5,000,000 (1 Acre)</span>
              </div>
              <p className="text-xs text-center text-green-600 font-semibold pt-1">✓ This is an outright purchase and it is interest free</p>
            </div>
          </div>

          {/* 6-Month Plan */}
          <div className="bg-white rounded-2xl shadow-md border border-primary/10 overflow-hidden">
            <div className="bg-primary px-6 py-4 flex items-center gap-3">
              <Calendar size={20} className="text-amber-400" />
              <div>
                <h3 className="text-white font-bold text-base">6-Month Payment Plan</h3>
                <p className="text-white/60 text-xs">5% interest applies</p>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: "Initial Deposit", amount: "₦1,000,000" },
                { label: "2nd Payment", amount: "₦850,000" },
                { label: "3rd Payment", amount: "₦850,000" },
                { label: "4th Payment", amount: "₦850,000" },
                { label: "5th Payment", amount: "₦850,000" },
                { label: "6th Payment", amount: "₦850,000" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between bg-red-500 text-white rounded-xl px-4 py-3">
                  <span className="text-sm font-medium">{item.label}:</span>
                  <span className="font-bold">{item.amount}</span>
                </div>
              ))}
              <div className="bg-blue-50 rounded-xl px-4 py-3 flex justify-between items-center mt-2">
                <span className="text-primary text-sm font-semibold">Total</span>
                <span className="text-primary font-bold">₦5,250,000 (1 Acre)</span>
              </div>
              <p className="text-xs text-center text-amber-600 font-semibold pt-1">⚠ Note: 6-month payment plan attracts 5% interest</p>
            </div>
          </div>
        </div>

        {/* Flyer Banner Slideshow */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: "520px" }}>
          {flyerSlides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2"
              style={{
                transform: `translateX(${(i - current) * 100}%)`,
                transition: "transform 0.55s ease-in-out",
              }}
            >
              {/* Left: Info panel */}
              <div className="relative bg-primary flex flex-col justify-center p-8 md:p-12 z-10 overflow-y-auto">
                <span className="inline-block bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                  {slide.badge}
                </span>
                <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-1">
                  {slide.label}
                </p>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-1">
                  {slide.price}
                </h3>
                <p className="text-amber-300 text-sm font-semibold mb-1">
                  Initial deposit: {slide.deposit}
                </p>
                <p className="text-white/70 text-base mb-4 italic">
                  {slide.tagline}
                </p>
                <div className="bg-white/10 rounded-xl p-3 mb-4">
                  <p className="text-white/60 text-xs uppercase font-semibold mb-1">ROI Per Annum (Gross)</p>
                  <p className="text-white font-bold text-lg">{slide.grossMin} – {slide.grossMax}</p>
                  <p className="text-white/50 text-xs">After 30% fee: ₦{Math.round(parseInt(slide.grossMin.replace(/[₦,]/g, '')) * 0.7).toLocaleString()} – ₦{Math.round(parseInt(slide.grossMax.replace(/[₦,]/g, '')) * 0.7).toLocaleString()}</p>
                </div>
                <ul className="space-y-2 mb-4">
                  {slide.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-white/90 text-sm">
                      <CheckCircle size={16} className="text-amber-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                  <Clock size={15} className="text-amber-400" />
                  ROI starts 6–12 months after planting
                </div>
                <div className="pt-4 border-t border-white/20 space-y-2">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Phone size={13} className="text-amber-400" />
                    <span>+234 803 000 0000</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Mail size={13} className="text-amber-400" />
                    <span>invest@adabafarm.com</span>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative hidden lg:block">
                <Image
                  src={slide.image}
                  alt={slide.label}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
            </div>
          ))}

          {/* Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
            <button
              onClick={prev}
              className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {flyerSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === current ? "#fbbf24" : "rgba(255,255,255,0.5)",
                    width: i === current ? "20px" : "8px",
                    height: "8px",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}