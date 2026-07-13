import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AnimatedBackground } from "@/components/animated-background"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-accent-serif",
})

export const metadata: Metadata = {
  title: "watsof — Personalized Tech Solutions",
  description:
    "Navigate the complexity of modern technology with personalized websites, smart automations, and digital solutions crafted for your business.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnimatedBackground />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
