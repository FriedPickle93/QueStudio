import Image from "next/image";
import { QuoteFlow } from "@/components/QuoteFlow";
import { HeroVisual } from "@/components/HeroVisual";
import { SiteHeader } from "@/components/SiteHeader";
import {
  addOns,
  brand,
  carePlans,
  formatRange,
  formatUsd,
  guardrails,
  notSelling,
  packages,
  portfolio,
  priceFactors,
  quotes,
} from "@/lib/offer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        {/* Hero — brand, one headline, one line, CTAs, visual */}
        <section className="section-pad relative grid min-h-[100svh] items-end gap-10 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-20 lg:pt-24">
          <div>
            <p className="animate-rise display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl lg:text-8xl">
              {brand.name}
            </p>
            <h1 className="animate-rise-delay-1 mt-6 max-w-xl text-2xl font-semibold leading-snug text-ink-soft sm:text-3xl">
              Sites that get calls and bookings.
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {brand.oneLiner}
            </p>
            <div className="animate-rise-delay-3 mt-8 flex flex-wrap gap-3">
              <a href="#estimate" className="btn-primary no-underline">
                Estimate your price
              </a>
              <a href="#packages" className="btn-secondary no-underline">
                See packages
              </a>
            </div>
            <p className="animate-rise-delay-3 mt-5 text-sm text-muted">
              One-pagers from {formatUsd(packages[0].priceMin)} · booking sites
              to {formatUsd(packages[2].priceMax)}+
            </p>
          </div>
          <div className="animate-rise-delay-2">
            <HeroVisual />
          </div>
        </section>

        {/* Ideal client / positioning */}
        <section className="section-pad section-y border-t border-line">
          <div className="mx-auto max-w-3xl">
            <h2 className="display text-4xl font-bold sm:text-5xl">
              For local shops that need a pro site — not an agency.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Ideal for trades, food, beauty, home services, and anyone who
              needs a branded site that converts to contact or book. Beauty and
              booking is the premium upsell — not the only niche.
            </p>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="section-pad section-y border-t border-line">
          <div className="mb-12 max-w-2xl">
            <h2 className="display text-4xl font-bold sm:text-5xl">
              Three packages, priced by scope.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Every project lands somewhere in its range depending on the work
              involved. You get one fixed number in writing before anything
              starts. Payment: {brand.payment}. Extra revisions after the
              included round: {brand.revisionRate}.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <article
                key={pkg.id}
                className={`flex flex-col border border-line bg-screen/70 p-6 backdrop-blur-sm transition hover:border-ink/40 ${
                  "featured" in pkg && pkg.featured
                    ? "ring-2 ring-signal"
                    : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="display text-3xl font-bold">{pkg.name}</h3>
                  {"featured" in pkg && pkg.featured ? (
                    <span className="text-xs font-semibold uppercase tracking-wide text-signal">
                      Most booked
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 display text-3xl font-extrabold text-signal sm:text-4xl">
                  {formatRange(
                    pkg.priceMin,
                    pkg.priceMax,
                    "openEnded" in pkg && pkg.openEnded,
                  )}
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-soft">
                  Typical {formatUsd(pkg.typical)}
                </p>
                <p className="mt-2 text-sm text-muted">
                  Best for {pkg.bestFor.toLowerCase()} · {pkg.turnaround}
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm leading-relaxed text-ink-soft">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#estimate" className="btn-primary mt-8 no-underline">
                  Price a {pkg.name} build
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* What moves the price */}
        <section id="pricing" className="section-pad section-y border-t border-line">
          <div className="mb-10 max-w-2xl">
            <h2 className="display text-4xl font-bold sm:text-5xl">
              What moves the price.
            </h2>
            <p className="mt-4 text-lg text-muted">
              No mystery math. These six things decide whether a project sits at
              the bottom or the top of its range.
            </p>
          </div>
          <div className="overflow-x-auto border border-line bg-screen/60">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="border-b border-line bg-ink text-highlight">
                <tr>
                  <th className="px-4 py-3 font-semibold">Factor</th>
                  <th className="px-4 py-3 font-semibold">Bottom of range</th>
                  <th className="px-4 py-3 font-semibold">Top of range</th>
                </tr>
              </thead>
              <tbody>
                {priceFactors.map((row) => (
                  <tr key={row.factor} className="border-b border-line/80">
                    <td className="px-4 py-3 font-semibold">{row.factor}</td>
                    <td className="px-4 py-3 text-muted">{row.low}</td>
                    <td className="px-4 py-3 text-ink-soft">{row.high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Estimator */}
        <section id="estimate" className="section-pad section-y border-t border-line">
          <div className="mb-10 max-w-2xl">
            <h2 className="display text-4xl font-bold sm:text-5xl">
              Build your estimate.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Pick the type of site and what it needs, then send it over. The
              range updates as you go and arrives with your message, so the
              first reply is a real quote instead of twenty questions.
            </p>
          </div>
          <QuoteFlow />
        </section>

        {/* Portfolio */}
        <section id="work" className="section-pad section-y border-t border-line">
          <div className="mb-10 max-w-2xl">
            <h2 className="display text-4xl font-bold sm:text-5xl">
              Already shipped.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Live work that proves the packages — branded landings, service
              sites, and full booking flows.
            </p>
          </div>
          <ul className="grid gap-8 sm:grid-cols-3">
            {portfolio.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block no-underline"
                >
                  <div className="overflow-hidden border border-line bg-screen">
                    <Image
                      src={item.image}
                      alt={`${item.name} homepage`}
                      width={1200}
                      height={750}
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="h-auto w-full transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-signal">
                    {item.tag}
                  </p>
                  <h3 className="display mt-1 text-2xl font-bold group-hover:underline">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.blurb}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink-soft">
                    {item.domain} ↗
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Add-ons */}
        <section id="addons" className="section-pad section-y border-t border-line">
          <div className="mb-10 max-w-2xl">
            <h2 className="display text-4xl font-bold sm:text-5xl">
              Feature add-ons.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Price on top of a package, or as upgrades after launch. *Twilio
              usage billed to the client.
            </p>
          </div>
          <div className="overflow-x-auto border border-line bg-screen/60">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="border-b border-line bg-ink text-highlight">
                <tr>
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {addOns.map((row) => (
                  <tr key={row.name} className="border-b border-line/80">
                    <td className="px-4 py-3 text-ink-soft">{row.name}</td>
                    <td className="px-4 py-3 font-semibold tabular-nums">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Care */}
        <section id="care" className="section-pad section-y border-t border-line">
          <div className="mb-10 max-w-2xl">
            <h2 className="display text-4xl font-bold sm:text-5xl">
              Monthly Care.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Domain and hosting stay in the client’s name (Vercel + registrar).
              You do not eat their bills.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {carePlans.map((plan) => (
              <article
                key={plan.name}
                className="border border-line bg-screen/70 p-6"
              >
                <h3 className="display text-3xl font-bold">{plan.name}</h3>
                <p className="mt-2 display text-3xl font-extrabold text-signal">
                  {formatUsd(plan.price)}
                  <span className="text-base font-semibold text-muted">/mo</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {plan.includes}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Example quotes */}
        <section id="examples" className="section-pad section-y border-t border-line">
          <div className="mb-10 max-w-2xl">
            <h2 className="display text-4xl font-bold sm:text-5xl">
              Real quotes, and where they landed.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Each of these started as a range and ended as one fixed number.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {quotes.map((q) => (
              <article
                key={q.id}
                className="flex flex-col border border-line bg-screen/70 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Quote {q.id}
                </p>
                <h3 className="display mt-1 text-2xl font-bold">{q.title}</h3>
                <p className="mt-2 text-sm text-muted">{q.scenario}</p>
                <p className="display mt-4 text-4xl font-extrabold">
                  {formatUsd(q.total)}
                </p>
                <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-4 text-sm">
                  {q.lines.map((line) => (
                    <li
                      key={line.label}
                      className="flex justify-between gap-3 text-ink-soft"
                    >
                      <span>{line.label}</span>
                      <span className="shrink-0 font-semibold tabular-nums">
                        {formatUsd(line.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold">
                  Total {formatUsd(q.total)} · 50% start = {formatUsd(q.deposit)}
                </p>
                <p className="mt-2 text-xs text-muted">{q.rangeNote}</p>
                {"footnote" in q && q.footnote ? (
                  <p className="mt-1 text-xs text-muted">{q.footnote}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* Scope + not selling */}
        <section className="section-pad section-y border-t border-line">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="display text-4xl font-bold sm:text-5xl">
                Scope guardrails.
              </h2>
              <ul className="mt-8 space-y-5">
                {guardrails.map((g) => (
                  <li key={g.rule} className="border-l-2 border-signal pl-4">
                    <p className="font-semibold">{g.rule}</p>
                    <p className="mt-1 text-sm text-muted">{g.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display text-4xl font-bold sm:text-5xl">
                Not on the menu.
              </h2>
              <p className="mt-4 text-muted">
                Keeps delivery fast and quotes honest.
              </p>
              <ul className="mt-8 space-y-3 text-ink-soft">
                {notSelling.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-muted" aria-hidden>
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted">
                Stack: Next.js + Vercel + GitHub. Premium upsell: Bookings
                package.
              </p>
            </div>
          </div>
        </section>

        {/* Quote CTA */}
        <section
          id="quote"
          className="section-pad section-y border-t border-line"
        >
          <div className="mx-auto max-w-2xl border border-ink bg-ink px-6 py-12 text-paper sm:px-10">
            <h2 className="display text-4xl font-bold text-highlight sm:text-5xl">
              Ready for a fixed quote?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper/80">
              Send your scope through the estimator and you get a fixed price in
              writing within 1 business day. 50% starts the build clock once
              content is in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#estimate"
                className="btn-primary !bg-highlight !text-ink no-underline hover:!bg-signal-bright hover:!text-white"
              >
                Build your estimate
              </a>
              <a
                href={`mailto:${brand.contactEmail}`}
                className="btn-secondary !border-paper/40 !text-paper no-underline hover:!bg-paper hover:!text-ink"
              >
                Or email direct
              </a>
            </div>
            <p className="mt-6 text-sm text-paper/60">{brand.payment}</p>
          </div>
        </section>
      </main>
      <footer className="section-pad border-t border-line py-8 text-sm text-muted">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="display text-lg font-bold text-ink">{brand.name}</p>
          <p>Fixed packages · Next.js + Vercel · Local small business</p>
        </div>
      </footer>
    </>
  );
}
