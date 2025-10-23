import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "../styles/globals.css"
import CalculatorButton from "@/components/CalculatorButton"
import ScrollToTop from "@/components/ScrollToTop"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Adaba Coconut Farm & Resort",
  description: "Invest in sustainable coconut farming with Adaba",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <ScrollToTop />
        <CalculatorButton />
      </body>
    </html>
  )
}
