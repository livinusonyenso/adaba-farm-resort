import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill, Bs4CircleFill } from "react-icons/bs";

const Why: React.FC = () => {
  return (
   <section className="w-full bg-white py-20 px-6 text-gray-800">
  <div className="max-w-6xl mx-auto space-y-16">

    {/* Section Title */}
    <h2 className="text-center text-4xl md:text-5xl font-bold text-green-800">
      Why Invest in Àdàbà Coconut Farm
    </h2>

    {/* ROW 1 */}
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* LEFT CARD */}
      <div className="p-8 rounded-xl border shadow-sm bg-primary text-white">
        <div className="flex items-center gap-2 mb-5">
          <Bs1CircleFill className="text-white text-2xl" />
          <h3 className="text-2xl font-semibold">Reasons to Invest</h3>
        </div>

        <ul className="space-y-4 text-sm md:text-base leading-relaxed">
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Guaranteed outright land ownership.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            100% stress-free farming management by experts.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Sustainable long-term coconut returns.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Managed by Kazfield Integrated Agribusiness experts.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Eco-friendly agricultural impact.
          </li>
        </ul>
      </div>

      {/* RIGHT CARD */}
      <div className="p-8 rounded-xl border shadow-sm bg-primary text-white">
        <div className="flex items-center gap-2 mb-5">
          <Bs2CircleFill className="text-white text-2xl" />
          <h3 className="text-2xl font-semibold">Investment Highlights</h3>
        </div>

        <ul className="space-y-4 text-sm md:text-base leading-relaxed">
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Location: Owode, Ogun State.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Minimum investment: 1 acre.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Hybrid Coconut Variety (high yield).
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Income stream up to 60 years.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Attractive annual ROI after maturity.
          </li>
        </ul>
      </div>
    </div>

    {/* ROW 2 */}
    <div className="grid md:grid-cols-2 gap-8">

      {/* LEFT CARD */}
      <div className="p-8 rounded-xl border shadow-sm bg-primary text-white">
        <div className="flex items-center gap-2 mb-5">
          <Bs3CircleFill className="text-white text-2xl" />
          <h3 className="text-2xl font-semibold">We Handle Operations</h3>
        </div>

        <ul className="space-y-4 text-sm md:text-base leading-relaxed">
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Land acquisition & documentation.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Soil testing & land preparation.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Coconut seedling planting.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Maintenance & irrigation.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Harvesting & processing.
          </li>
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-200 mt-1" />
            Sales & profit remittance.
          </li>
        </ul>
      </div>

      {/* RIGHT CARD */}
      <div className="p-8 rounded-xl border shadow-sm flex flex-col justify-center bg-primary text-white">
        <div className="flex items-center gap-2 mb-5">
          <Bs4CircleFill className="text-white text-2xl" />
          <h3 className="text-2xl font-semibold">Projected Returns</h3>
        </div>

        <p className="text-sm md:text-base leading-relaxed text-white/90">
          Based on performance over 4–5 years, expected returns per acre range:
        </p>

        <h4 className="text-3xl md:text-4xl font-extrabold text-green-200 mt-4">
          ₦6 Million — ₦12 Million
        </h4>

        <p className="mt-3 text-white/70 text-xs italic">
          Figures depend on maturity, seasonal pricing, and harvest yield.
        </p>
      </div>
    </div>

  </div>
</section>

  );
};

export default Why;
