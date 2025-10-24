import React from "react";

const partners = [
  {
    src: "/partners/firm-t.png",
    alt: "Firm-T Global",
  },
  {
    src: "/partners/unitrust.png",
    alt: "Unitrust Insurance",
  },
  {
    src: "/partners/astrantia.png",
    alt: "Astrantia Garden Service",
  },
  // Add more if needed
];

const Partners: React.FC = () => {
  return (
    <section className="w-full bg-green-800 py-16 px-6 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-left">
          Our Partners
        </h2>

        {/* Slider Wrapper */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-12 animate-slide whitespace-nowrap">
            {/* Duplicate logos twice for seamless loop */}
            {[...partners, ...partners].map((item, index) => (
              <img
                key={index}
                src={item.src}
                alt={item.alt}
                className="h-20 w-auto object-contain bg-white rounded-lg shadow p-3"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Partners;
