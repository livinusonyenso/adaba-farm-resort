"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    title: "Àdàbà Coconut Farm & Resort",
    description:
      "With high local demand and global market potential, owning a coconut farm today means securing steady returns for years to come. Welcome to Àdàbà Coconut Farm & Resort, located in Owode, Ogun State, less than an hour’s drive from Epe.",
    url: "https://res.cloudinary.com/dikhomv7m/image/upload/%C3%80d%C3%A0b%C3%A0Dove_pg94ra.jpg",
  },
 
  {
    id: 2,
    title: "Àdàbà Coconut Farm & Resort",
    description:
      "With high local demand and global market potential, owning a coconut farm today means securing steady returns for years to come. Welcome to Àdàbà Coconut Farm & Resort, located in Owode, Ogun State, less than an hour’s drive from Epe.",
    url: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632119/WhatsApp_Image_2026-03-03_at_7.11.00_AM_qghoo0.jpg",
  },
  {
    id: 3,
    title: "Àdàbà Coconut Farm & Resort",
    description:
      "With high local demand and global market potential, owning a coconut farm today means securing steady returns for years to come. Welcome to Àdàbà Coconut Farm & Resort, located in Owode, Ogun State, less than an hour’s drive from Epe.",
    url: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632117/WhatsApp_Image_2026-03-03_at_7.11.00_AM_1_vlhptx.jpg",
  },
  {
    id: 4,
    title: "Àdàbà Coconut Farm & Resort",
    description:
      "With high local demand and global market potential, owning a coconut farm today means securing steady returns for years to come. Welcome to Àdàbà Coconut Farm & Resort, located in Owode, Ogun State, less than an hour’s drive from Epe.",
    url: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632113/WhatsApp_Image_2026-03-03_at_7.11.01_AM_1_duxgmf.jpg",
  },
  {
    id: 5,
    title: "Lush Coconut Plantation",
    description: "Our thriving coconut plantation in full bloom",
     url: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632113/WhatsApp_Image_2026-03-03_at_7.11.01_AM_yrnbcx.jpg",
  },
  {
    id: 6,
    title: "Lush Coconut Plantation",
    description: "Our thriving coconut plantation in full bloom",
    url: "https://res.cloudinary.com/dikhomv7m/image/upload/v1772632113/WhatsApp_Image_2026-03-03_at_8.27.09_AM_oe2l4j.jpg",
  },
 
  {
    id: 8,
    title: "Modern Farming Equipment",
    description: "State-of-the-art equipment for optimal yield",
    url: "https://images.pexels.com/photos/15923487/pexels-photo-15923487.jpeg",
  },
  {
    id: 9,
    title: "Harvest Season",
    description: "Fresh coconuts ready for processing",
    url: "https://images.pexels.com/photos/12421272/pexels-photo-12421272.jpeg",
  },
  {
    id: 10,
    title: "Processing Facility",
    description: "Advanced processing and packaging facility",
    url: "https://images.pexels.com/photos/11495414/pexels-photo-11495414.jpeg",
  },
  {
    id: 11,
    title: "Farm Infrastructure",
    description: "Sustainable infrastructure and irrigation systems",
    url: "https://images.pexels.com/photos/4387821/pexels-photo-4387821.jpeg",
  },
  {
    id: 12,
    title: "Resort Amenities",
    description: "Comfortable facilities for farm visitors",
    url: "https://images.pexels.com/photos/33191056/pexels-photo-33191056.jpeg",
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 bg-primary/5">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Farm Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our state-of-the-art facilities and thriving plantation.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(image.id)}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">{image.title}</h3>
                <p className="text-white/80 text-sm">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            <Image
              src={
                galleryImages.find((img) => img.id === selectedImage)?.url || ""
              }
              alt="Gallery"
              width={800}
              height={600}
              className="w-full rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} className="text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
