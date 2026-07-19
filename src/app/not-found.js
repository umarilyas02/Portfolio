import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-5">
      <h1 className="leading-none tracking-[-0.03em] text-[clamp(3rem,10vw,8rem)]">
        404
      </h1>
      <p className="text-muted">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="border-b border-ink/30 pb-1 text-[12px] font-semibold tracking-[0.14em] transition-colors duration-300 hover:border-mint hover:text-mint"
      >
        BACK HOME
      </Link>
    </main>
  );
}
