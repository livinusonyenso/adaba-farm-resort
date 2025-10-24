import React from "react";
import HowItWorks from "./HowItWorks";

const HowItWorksMain: React.FC = () => {
  return (
    <>
   <section
  className="
    w-full
    bg-cover
    bg-center
    relative
    text-white
    py-16
    px-6
     bg-green-800/70
    bg-blend-multiply
  "
  style={{
    backgroundImage:
      "url('https://images.pexels.com/photos/27429700/pexels-photo-27429700.jpeg')",
  }}
>
  {/* Heading */}
  <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
    <span className="inline-block bg-green-800/70 px-6 py-2 rounded-lg backdrop-blur-sm">
      How It Works
    </span>
  </h2>

  {/* Cards Grid */}
  <div
    className="
      grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl
      bg-cover bg-center rounded-xl p-6 md:p-10
      mx-auto
    "
  >
    {/* CARD 1 */}
    <div className="bg-green-800/70 p-6 md:p-8 rounded-xl shadow-md text-white backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-3 leading-snug">
        1. Buy a Minimum of one Acre of Land
      </h3>
      <p className="text-sm md:text-base text-green-50 leading-relaxed">
        Become a landowner in the serene and fertile environment of
        Owode, Ogun State.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="bg-green-800/70 p-6 md:p-8 rounded-xl shadow-md text-white backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-3 leading-snug">
        2. We Plant and Manage for You
      </h3>
      <p className="text-sm md:text-base text-green-50 leading-relaxed">
        Our team of experts handle planting, nurturing, and maintaining
        your coconut trees.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="bg-green-800/70 p-6 md:p-8 rounded-xl shadow-md text-white backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-3 leading-snug">
        3. We Harvest and Sell
      </h3>
      <p className="text-sm md:text-base text-green-50 leading-relaxed">
        Once the coconuts mature, we handle harvesting, processing,
        and marketing.
      </p>
    </div>

    {/* CARD 4 */}
    <div className="bg-green-800/70 p-6 md:p-8 rounded-xl shadow-md text-white backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-3 leading-snug">
        4. You Earn Returns
      </h3>
      <p className="text-sm md:text-base text-green-50 leading-relaxed">
        You enjoy periodic profits from sales — hassle-free!
      </p>
    </div>
  </div>
</section>

    <HowItWorks/>
    </>
  );
};

export default HowItWorksMain;
