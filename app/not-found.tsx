import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4 font-mono font-black text-primary">404</div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-6">The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
