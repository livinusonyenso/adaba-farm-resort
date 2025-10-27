"use client"

import type React from "react"
import Image from "next/image"

const partners = [
  {
    src: "/Partners1.png",
    alt: "Firm-T Global",
  },
  {
    src: "/Partners2.png",
    alt: "Unitrust Insurance",
  },
  {
    src: "/Partners3.png",
    alt: "Astrantia Garden Service",
  },
]

const Partners: React.FC = () => {
  return (
    <section className="w-full bg-green-700 py-16 px-6 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-left">
          Our Partners
        </h2>

        {/* Responsive grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-8
          place-items-center
        ">
          {partners.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-lg
                shadow
                p-4
                h-24
                w-48
                flex
                items-center
                justify-center
              "
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
