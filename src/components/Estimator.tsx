"use client";

import { useState } from "react";
import {
  addOns,
  brand,
  estimate,
  formatRange,
  formatUsd,
  packages,
  type PackageId,
} from "@/lib/offer";

const selectableAddOns = addOns.filter((a) => a.kind !== "perPage");

export function Estimator() {
  const [packageId, setPackageId] = useState<PackageId>("business");
  const [selected, setSelected] = useState<string[]>([]);
  const [extraPages, setExtraPages] = useState(0);

  const pkg = packages.find((p) => p.id === packageId) ?? packages[0];
  const result = estimate(packageId, selected, extraPages);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const chosen = selectableAddOns.filter((a) => selected.includes(a.id));
  const mailtoBody = [
    "Business name:",
    "Phone / IG:",
    "",
    `Project type: ${pkg.name} (${pkg.scopeLabel})`,
    extraPages > 0 ? `Extra pages: ${extraPages}` : null,
    chosen.length > 0
      ? `Add-ons: ${chosen.map((a) => a.name).join(", ")}`
      : "Add-ons: none",
    "",
    `Estimated range: ${formatRange(result.min, result.max, "openEnded" in pkg && pkg.openEnded)}`,
    `Typical for this scope: ${formatUsd(result.typical)}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const mailto = `mailto:${brand.contactEmail}?subject=${encodeURIComponent(
    `QueStudio estimate — ${pkg.name}`,
  )}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="space-y-8">
        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-wider text-muted">
            1 · What kind of site?
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {packages.map((option) => (
              <label
                key={option.id}
                className="cursor-pointer border border-line bg-screen/70 p-4 transition hover:border-ink/40 has-[:checked]:border-signal has-[:checked]:bg-screen has-[:checked]:ring-2 has-[:checked]:ring-signal"
              >
                <input
                  type="radio"
                  name="packageId"
                  value={option.id}
                  checked={packageId === option.id}
                  onChange={() => setPackageId(option.id)}
                  className="sr-only"
                />
                <span className="display block text-xl font-bold">
                  {option.name}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {option.scopeLabel}
                </span>
                <span className="mt-3 block text-sm font-semibold text-signal">
                  {formatRange(
                    option.priceMin,
                    option.priceMax,
                    "openEnded" in option && option.openEnded,
                  )}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-wider text-muted">
            2 · What does it need?
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {selectableAddOns.map((addOn) => (
              <label
                key={addOn.id}
                className="cursor-pointer border border-line bg-screen/70 px-3 py-2 text-sm transition hover:border-ink/40 has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-highlight"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(addOn.id)}
                  onChange={() => toggle(addOn.id)}
                  className="sr-only"
                />
                {addOn.name}
                <span className="ml-2 font-semibold opacity-70">
                  {addOn.price}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <label htmlFor="extraPages" className="text-sm text-ink-soft">
              Extra pages beyond the package
              <span className="ml-2 text-muted">$150 each</span>
            </label>
            <input
              id="extraPages"
              type="number"
              min={0}
              max={20}
              value={extraPages}
              onChange={(e) =>
                setExtraPages(
                  Math.max(0, Math.min(20, Number(e.target.value) || 0)),
                )
              }
              className="w-20 border border-line bg-screen px-3 py-2 text-sm tabular-nums"
            />
          </div>
        </fieldset>
      </div>

      <aside className="sticky top-0 z-10 order-first border border-ink bg-ink p-5 text-paper sm:p-6 lg:order-none lg:top-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-paper/60">
          Estimated range
        </p>
        <p
          className="display mt-2 text-4xl font-extrabold text-highlight"
          aria-live="polite"
        >
          {formatRange(
            result.min,
            result.max,
            "openEnded" in pkg && pkg.openEnded,
          )}
        </p>
        <dl className="mt-4 space-y-2 border-t border-paper/20 pt-3 text-sm sm:mt-5 sm:pt-4">
          <div className="flex justify-between gap-3">
            <dt className="text-paper/70">Typical for this scope</dt>
            <dd className="font-semibold tabular-nums">
              {formatUsd(result.typical)}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-paper/70">50% to start</dt>
            <dd className="font-semibold tabular-nums">
              {formatUsd(result.deposit)}
            </dd>
          </div>
          <div className="hidden justify-between gap-3 sm:flex">
            <dt className="text-paper/70">Turnaround</dt>
            <dd className="font-semibold">{pkg.turnaround}</dd>
          </div>
        </dl>
        <a
          href={mailto}
          className="btn-primary mt-4 w-full !bg-highlight !text-ink no-underline hover:!bg-signal-bright hover:!text-white sm:mt-6"
        >
          Email this estimate
        </a>
        <p className="mt-3 text-xs leading-relaxed text-paper/60 sm:mt-4">
          Estimate, not a quote. After a short scope chat you get one fixed
          price in writing.
        </p>
      </aside>
    </div>
  );
}
