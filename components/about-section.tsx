"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Centered Title Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            About Àdàbà Farm and Resort
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted max-w-2xl mx-auto text-primary"
          >
            Nigeria's First Hybrid Coconut Farm — where we farm, you earn without stress
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-foreground/90 leading-relaxed"
            >
              <p className="text-base md:text-lg">
                Welcome to <strong>Nigeria's First Hybrid Coconut Farm</strong> — a revolutionary lifetime investment
                opportunity designed to deliver profits on the go for smart investors. Located in the serene and fertile
                environment of <strong>Owode Egba, Ogun State</strong>, Àdàbà Farm and Resort combines cutting-edge
                farming techniques with high-yield hybrid coconuts to ensure sustainable returns.
              </p>

              <p className="text-base md:text-lg">
                Operated by <strong>Kazfield Integrated Service Limited</strong>, we offer a unique investment model:
                you buy and own the land, we plant and manage the farm, and you enjoy periodic returns without lifting a
                finger. Our expert team handles every stage — from planting and nurturing to harvesting and sales.
              </p>

              <p className="text-base md:text-lg">
                Whether you're a seasoned investor or new to agribusiness, our farm offers a unique chance to grow your
                wealth while supporting local communities and sustainable agriculture. With real-time updates, seamless
                payouts, and a fully insured farm, your investment is secure and profitable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-chart-1" />
                <span className="text-sm font-medium text-muted-foreground">Guaranteed Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-chart-2" />
                <span className="text-sm font-medium text-muted-foreground">Stress-Free Farming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-chart-3" />
                <span className="text-sm font-medium text-muted-foreground">Sustainable Returns</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-first lg:order-last"
          >
            <Image
              src="https://cdn.leonardo.ai/users/817abbab-57f8-437c-a787-c50fbb7043b2/generations/294a9458-17c2-4b36-baa3-241c81594b76/segments/2:4:1/Lucid_Origin_A_proud_Nigerian_farmer_holding_a_young_coconut_p_1.jpg"
              alt="Àdàbà Coconut Farm - Lush green coconut plantation in Owode Egba, Ogun State"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
