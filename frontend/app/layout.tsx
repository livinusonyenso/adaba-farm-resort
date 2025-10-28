import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "../styles/globals.css"
import CalculatorButton from "@/components/CalculatorButton"
import ScrollToTop from "@/components/ScrollToTop"
import { UserProvider } from "@/context/UserContext"
import { ApiProvider } from "@/context/ApiContext"

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
  title: "Àdàbà Coconut Farm & Resort",
  description: "Invest in sustainable coconut farming with Àdàbà",
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
        <UserProvider>
          <ApiProvider>
            {children}
            <ScrollToTop />
            <CalculatorButton />
          </ApiProvider>
        </UserProvider>
      </body>
    </html>
  )
}
