import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "JavaLab — Master OOPs With Java",
    template: "%s | JavaLab",
  },
  description:
    "Master OOP in Java with theory, coding, viva & exam questions. Search, track progress, bookmark concepts & study smarter.",
  openGraph: {
    title: "JavaLab — Master OOPs With Java",
    description:
      "Master OOP in Java with theory, coding, viva & exam questions. Search, track progress, bookmark concepts & study smarter.",
    url: "https://javalabapp.vercel.app",
    siteName: "JavaLab",
    images: [
      {
        url: "https://javalabapp.vercel.app/Javalab-whatsapp-og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaLab — Master OOPs With Java",
    description:
      "Master OOP in Java with theory, coding, viva & exam questions.",
    images: ["https://javalabapp.vercel.app/Javalab-whatsapp-og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
  manifest: "/favicon/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head />
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Navbar />
            <main className="flex-1 px-3 sm:px-5 lg:px-8">{children}</main>
            <Footer />
            <Toaster position="top-right" richColors closeButton />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
