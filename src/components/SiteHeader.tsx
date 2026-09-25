import { brand } from "@/lib/offer";

export function SiteHeader() {
  return (
    <header className="section-pad absolute inset-x-0 top-0 z-20 flex items-center justify-between py-5">
      <a href="#top" className="display text-xl font-bold tracking-tight no-underline sm:text-2xl">
        {brand.name}
      </a>
      <nav className="flex items-center gap-4 text-sm font-semibold sm:gap-6">
        <a href="#packages" className="hidden no-underline hover:underline sm:inline">
          Packages
        </a>
        <a href="#work" className="hidden no-underline hover:underline sm:inline">
          Work
        </a>
        <a href="#quote" className="btn-primary !px-4 !py-2 text-sm">
          Get a quote
        </a>
      </nav>
    </header>
  );
}
