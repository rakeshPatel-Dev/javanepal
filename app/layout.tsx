import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://javanepal.vercel.app"),
  title: {
    default: "JavaNepal — Master OOPs With Java",
    template: "%s | JavaNepal",
  },
  description:
    "Master OOP in Java with theory, coding, viva & exam questions. Search, track progress, bookmark concepts & study smarter.",
  openGraph: {
    title: "JavaNepal — Master OOPs With Java",
    description:
      "Master OOP in Java with theory, coding, viva & exam questions. Search, track progress, bookmark concepts & study smarter.",
    url: "https://javanepal.vercel.app",
    siteName: "JavaNepal",
    images: [
      {
        url: "/javanepal-whatsapp-og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaNepal — Master OOPs With Java",
    description:
      "Master OOP in Java with theory, coding, viva & exam questions.",
    images: ["/javanepal-whatsapp-og.png"],
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
  appleWebApp: {
    capable: true,
    title: "JavaNepal",
    statusBarStyle: "black-translucent",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans antialiased" suppressHydrationWarning>
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
