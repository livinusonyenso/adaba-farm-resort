"use client";

import { useState, useEffect } from "react";
import { CheckCircle, TrendingUp, Clock, MapPin, Leaf, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const flyerSlides = [
  {
    type: "pricing",
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/%C3%80d%C3%A0b%C3%A0Dove_pg94ra.jpg",
    badge: "🔥 PRE-LAUNCH PRICE",
    badgeStyle: "bg-amber-400 text-amber-900",
    label: "Per Acre — Limited 200 Acres Only",
    price: "₦3,700,000",
    deposit: "₦1,000,000",
    roiMin: "₦6,000,000",
    roiMax: "₦12,000,000",
    tagline: "We farm, you earn without stress.",
    features: [
      "60 hybrid coconut trees per acre",
      "ROI: ₦6M – ₦12M per annum (gross)",
      "200 acres only at this prelaunch price",
      "₦1M initial deposit to reserve",
      "30% processing & management fee applies",
    ],
  },
  {
    type: "pricing",
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632119/WhatsApp_Image_2026-03-03_at_7.11.00_AM_qghoo0.jpg",
    badge: "NOW SELLING",
    badgeStyle: "bg-red-500 text-white",
    label: "Per Acre",
    price: "₦5,000,000",
    deposit: "₦1,000,000",
    roiMin: "₦6,000,000",
    roiMax: "₦12,000,000",
    tagline: "The new gold mine in agricultural investments",
    features: [
      "60 hybrid coconut trees per acre",
      "ROI: ₦6M – ₦12M per annum (gross)",
      "₦1M initial deposit to reserve",
      "30% processing & management fee applies",
      "3 or 6 month flexible payment plan",
    ],
  },
  {
    type: "pricing",
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632117/WhatsApp_Image_2026-03-03_at_7.11.00_AM_1_vlhptx.jpg",
    badge: "NOW SELLING",
    badgeStyle: "bg-red-500 text-white",
    label: "Per Hectare",
    price: "₦12,500,000",
    deposit: "₦3,000,000",
    roiMin: "₦15,000,000",
    roiMax: "₦30,000,000",
    tagline: "The new gold mine in agricultural investments",
    features: [
      "~150 hybrid coconut trees per hectare",
      "ROI: ₦15M – ₦30M per annum (gross)",
      "₦3M initial deposit to reserve",
      "30% processing & management fee applies",
      "3 or 6 month flexible payment plan",
    ],
  },
  {
    type: "payment",
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632113/WhatsApp_Image_2026-03-03_at_7.11.01_AM_1_duxgmf.jpg",
    badge: "INTEREST FREE",
    badgeStyle: "bg-green-500 text-white",
    label: "Adaba Coconut Farm Payment Plan (3 Months)",
    noteText: "This is an outright purchase and it is interest free",
    noteStyle: "text-green-400",
    payments: [
      { label: "Initial Deposit", amount: "₦1,000,000" },
      { label: "2nd Payment", amount: "₦2,000,000" },
      { label: "3rd Payment", amount: "₦2,000,000" },
    ],
    total: "₦5,000,000",
    totalNote: "Total for 1 Acre — No Interest",
  },
  {
    type: "payment",
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632113/WhatsApp_Image_2026-03-03_at_7.11.01_AM_yrnbcx.jpg",
    badge: "5% INTEREST",
    badgeStyle: "bg-amber-400 text-amber-900",
    label: "Adaba Coconut Farm Payment Plan (6 Months)",
    noteText: "Note: 6 months payment plan attracts 5% interest",
    noteStyle: "text-amber-300",
    payments: [
      { label: "Initial Deposit", amount: "₦1,000,000" },
      { label: "2nd Payment", amount: "₦850,000" },
      { label: "3rd Payment", amount: "₦850,000" },
      { label: "4th Payment", amount: "₦850,000" },
      { label: "5th Payment", amount: "₦850,000" },
      { label: "6th Payment", amount: "₦850,000" },
    ],
    total: "₦5,250,000",
    totalNote: "Total for 1 Acre (inc. 5% interest)",
  },
  {
    type: "roitable",
    image: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632113/WhatsApp_Image_2026-03-03_at_8.27.09_AM_oe2l4j.jpg",
    badge: "ROI PROJECTION",
    badgeStyle: "bg-amber-400 text-amber-900",
    label: "Investment & Return of Investment Projection",
    tagline: "We farm, you earn without stress.",
    rows: [
      { acres: "1 Acre",   trees: 60,   fruits: "12,000",  avg: "₦6M",   max: "₦12M" },
      { acres: "5 Acres",  trees: 300,  fruits: "60,000",  avg: "₦30M",  max: "₦60M" },
      { acres: "10 Acres", trees: 600,  fruits: "120,000", avg: "₦60M",  max: "₦120M" },
      { acres: "20 Acres", trees: 1200, fruits: "240,000", avg: "₦120M", max: "₦240M" },
      { acres: "50 Acres", trees: 3000, fruits: "300,000", avg: "₦300M", max: "₦600M" },
    ],
  },
];

const pricingCards = [
  { label: "Pre-Launch", sublabel: "1 Acre", price: "₦3,700,000", deposit: "₦1M", trees: 60, roiMin: "₦6M", roiMax: "₦12M", highlight: false, tag: "Limited 200 Acres" },
  { label: "Per Acre",   sublabel: "Now Selling", price: "₦5,000,000", deposit: "₦1M", trees: 60, roiMin: "₦6M", roiMax: "₦12M", highlight: false, tag: "Now Selling" },
  { label: "Per Hectare",sublabel: "Now Selling", price: "₦12,500,000", deposit: "₦3M", trees: 150, roiMin: "₦15M", roiMax: "₦30M", highlight: true, tag: "Most Popular" },
];

const roiTable = [
  { acres: "1 Acre",   trees: 60,   fruits: "12,000",  avg: "₦6,000,000",   max: "₦12,000,000" },
  { acres: "5 Acres",  trees: 300,  fruits: "60,000",  avg: "₦30,000,000",  max: "₦60,000,000" },
  { acres: "10 Acres", trees: 600,  fruits: "120,000", avg: "₦60,000,000",  max: "₦120,000,000" },
  { acres: "20 Acres", trees: 1200, fruits: "240,000", avg: "₦120,000,000", max: "₦240,000,000" },
  { acres: "50 Acres", trees: 3000, fruits: "300,000", avg: "₦300,000,000", max: "₦600,000,000" },
];

function SlideContent({ slide }) {
  if (slide.type === "pricing") {
    return (
      <div className="bg-primary flex flex-col justify-center p-6 sm:p-8 lg:p-10 overflow-y-auto md:h-full">
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 self-start ${slide.badgeStyle}`}>
          {slide.badge}
        </span>
        <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">{slide.label}</p>
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">{slide.price}</h3>
        <p className="text-amber-300 text-sm font-semibold mb-1">Initial deposit: {slide.deposit}</p>
        <p className="text-white/70 text-sm mb-4 italic">{slide.tagline}</p>
        <div className="bg-white/10 rounded-xl p-3 mb-4">
          <p className="text-white/60 text-xs uppercase font-semibold mb-1">ROI Per Annum (Gross)</p>
          <p className="text-white font-bold text-lg">{slide.roiMin} – {slide.roiMax}</p>
          <p className="text-white/50 text-xs mt-0.5">30% processing & management fee applies</p>
        </div>
        <ul className="space-y-2 mb-4">
          {slide.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-white/90 text-sm">
              <CheckCircle size={15} className="text-amber-400 mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 text-white/60 text-xs pt-3 border-t border-white/20">
          <Clock size={13} className="text-amber-400" />
          ROI starts 6–12 months after planting
        </div>
      </div>
    );
  }

  if (slide.type === "payment") {
    return (
      <div className="bg-primary flex flex-col justify-center p-6 sm:p-8 lg:p-10 overflow-y-auto md:h-full">
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 self-start ${slide.badgeStyle}`}>
          {slide.badge}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-5 leading-snug">{slide.label}</h3>
        <div className="space-y-2 mb-4">
          {slide.payments.map((p) => (
            <div key={p.label} className="flex items-center justify-between bg-red-500 text-white rounded-xl px-4 py-2.5">
              <span className="text-sm font-medium">{p.label}:</span>
              <span className="font-bold text-sm">{p.amount}</span>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl px-4 py-3 flex justify-between items-center mb-3">
          <span className="text-white/70 text-sm font-semibold">Total</span>
          <div className="text-right">
            <p className="text-white font-bold">{slide.total}</p>
            <p className="text-white/50 text-xs">{slide.totalNote}</p>
          </div>
        </div>
        <p className={`text-xs font-semibold text-center ${slide.noteStyle}`}>{slide.noteText}</p>
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <MapPin size={12} className="text-amber-400" />
            Owode, Ogun State — less than 1hr from Epe
          </div>
        </div>
      </div>
    );
  }

  if (slide.type === "roitable") {
    return (
      <div className="bg-primary flex flex-col justify-center p-5 sm:p-7 lg:p-10 overflow-y-auto md:h-full">
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 self-start ${slide.badgeStyle}`}>
          {slide.badge}
        </span>
        <h3 className="text-base sm:text-lg font-bold text-white mb-1">{slide.label}</h3>
        <p className="text-white/60 text-sm italic mb-4">{slide.tagline}</p>
        <div className="rounded-xl overflow-hidden border border-white/10 mb-3">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/20">
                <th className="text-left px-2 py-2 text-white/80 font-semibold">Land</th>
                <th className="text-center px-2 py-2 text-white/80 font-semibold">Trees</th>
                <th className="text-center px-2 py-2 text-white/80 font-semibold">Fruits</th>
                <th className="text-center px-2 py-2 text-white/80 font-semibold">Avg Rev</th>
                <th className="text-center px-2 py-2 text-amber-300 font-semibold">Max Rev</th>
              </tr>
            </thead>
            <tbody>
              {slide.rows.map((row, i) => (
                <tr key={row.acres} className={i % 2 === 0 ? "bg-white/5" : "bg-white/10"}>
                  <td className="px-2 py-2 text-white font-semibold whitespace-nowrap">{row.acres}</td>
                  <td className="px-2 py-2 text-center text-white/70">{row.trees.toLocaleString()}</td>
                  <td className="px-2 py-2 text-center text-white/70">{row.fruits}</td>
                  <td className="px-2 py-2 text-center text-white/80">{row.avg}</td>
                  <td className="px-2 py-2 text-center text-amber-300 font-bold">{row.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-red-500 rounded-xl px-3 py-2.5">
          <p className="text-white text-xs font-semibold text-center">
            Note that the processing and management fee attracts 30% of the proceed.
          </p>
        </div>
        <p className="text-white/40 text-xs text-right mt-3">Development by Kazifield Integrated Services Ltd</p>
      </div>
    );
  }

  return null;
}

export default function PricingFlyer() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % flyerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + flyerSlides.length) % flyerSlides.length);
  const next = () => setCurrent((p) => (p + 1) % flyerSlides.length);

  return (
    <section id="pricing-flyer" className="py-16 bg-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="section-container relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full mb-4 text-sm">
            <TrendingUp size={16} />
            LIMITED OFFER — INVEST NOW
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Pricing & Offers
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Own your piece of Àdàbà Coconut Farm & Resort — Nigeria's first hybrid coconut farm.
            Secure steady returns for 50+ years.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-3 text-sm text-primary/70">
            <span className="flex items-center gap-1"><MapPin size={14} />Owode, Ogun State — less than 1hr from Epe</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1"><Leaf size={14} />We farm, you earn without stress</span>
          </div>
        </div>


        {/* Slideshow Banner */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {flyerSlides.map((slide, i) => (
                <div key={i} className="min-w-full flex flex-col md:grid md:grid-cols-2 md:min-h-[480px]">
                  {/* Image — top on mobile, right column on md+ */}
                  <div className="relative order-first md:order-last h-[220px] md:h-auto">
                    <Image
                      src={slide.image}
                      alt={slide.label}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-primary/40 md:bg-linear-to-r md:from-primary/30 md:to-transparent" />
                  </div>
                  {/* Content — below image on mobile, left column on md+ */}
                  <div className="order-last md:order-first">
                    <SlideContent slide={slide} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide counter badge */}
          <div className="absolute top-3 right-3 z-20 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold">
            {current + 1} / {flyerSlides.length}
          </div>

          {/* Dot + arrow controls */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
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
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}