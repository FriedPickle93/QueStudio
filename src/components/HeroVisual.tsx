export function HeroVisual() {
  return (
    <div
      className="animate-drift relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
      aria-hidden="true"
    >
      <div className="site-mock relative overflow-hidden rounded-sm">
        <div className="flex items-center gap-1.5 border-b border-line bg-[#eef2f6] px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff6b5b]" />
          <span className="size-2 rounded-full bg-[#f5c84c]" />
          <span className="size-2 rounded-full bg-[#61c454]" />
          <span className="ml-3 truncate text-[11px] text-muted">
            yourshop.questudio.site
          </span>
        </div>
        <div className="grid gap-0 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-48 bg-gradient-to-br from-[#1a3d3a] via-[#0f6d62] to-[#c8e86a] p-5 text-white sm:min-h-72">
            <p className="display text-3xl font-bold leading-none sm:text-4xl">
              Open
              <br />
              for
              <br />
              bookings
            </p>
            <p className="mt-4 max-w-[12rem] text-sm text-white/85">
              Hours · services · deposit · confirm
            </p>
            <div className="absolute bottom-5 left-5 right-5 h-9 bg-white/95 text-center text-xs font-semibold leading-9 text-ink">
              Book now
            </div>
          </div>
          <div className="space-y-3 bg-screen p-5">
            <div className="h-3 w-24 bg-ink/80" />
            <div className="h-2 w-full bg-ink/15" />
            <div className="h-2 w-4/5 bg-ink/10" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="aspect-[4/3] bg-gradient-to-br from-paper-deep to-[#9eb0c2]" />
              <div className="aspect-[4/3] bg-gradient-to-br from-[#7a8f7c] to-[#c5d4b8]" />
              <div className="aspect-[4/3] bg-gradient-to-br from-[#4a6678] to-[#a8c0d0]" />
              <div className="aspect-[4/3] bg-gradient-to-br from-[#8b6b4a] to-[#d4c4a8]" />
            </div>
            <div className="flex gap-2 pt-2">
              <span className="h-8 flex-1 bg-signal text-center text-[10px] font-semibold leading-8 text-white">
                Call
              </span>
              <span className="h-8 flex-1 bg-ink text-center text-[10px] font-semibold leading-8 text-highlight">
                Book
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
