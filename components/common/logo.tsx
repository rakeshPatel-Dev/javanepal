import Image from "next/image"

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <>
      <Image
        src="/logo-black.png"
        alt="Logo"
        width={40}
        height={40}
        className={`block dark:hidden ${className}`}
      />
      <Image
        src="/logo-white.png"
        alt="Logo"
        width={40}
        height={40}
        className={`hidden dark:block ${className}`}
      />
    </>
  )
}
