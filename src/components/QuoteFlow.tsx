"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitInquiry } from "@/app/actions";
import {
  contactPreferences,
  initialInquiryState,
  timelines,
} from "@/lib/inquiry";
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

const fieldClass =
  "mt-1 w-full border border-line bg-screen px-3 py-2 text-sm text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal/40";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs font-semibold text-[#b3261e]">{message}</p>
  );
}

export function QuoteFlow() {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initialInquiryState,
  );

  const [packageId, setPackageId] = useState<PackageId>("business");
  const [selected, setSelected] = useState<string[]>([]);
  const [extraPages, setExtraPages] = useState(0);

  // The tall form collapses into a short confirmation, which can leave the
  // viewport parked on a later section.
  const confirmationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status === "success") {
      confirmationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [state.status]);

  const pkg = packages.find((p) => p.id === packageId) ?? packages[0];
  const result = estimate(packageId, selected, extraPages);
  const openEnded = "openEnded" in pkg && pkg.openEnded;
  const values = state.values;

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  if (state.status === "success") {
    return (
      <div
        ref={confirmationRef}
        className="border border-ink bg-ink p-8 text-paper sm:p-12"
      >
        <h3 className="display text-3xl font-bold text-highlight sm:text-4xl">
          Message sent.
        </h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/80">
          {state.message}
        </p>
        <p className="mt-6 text-sm text-paper/60">
          Need me sooner? Email{" "}
          <a href={`mailto:${brand.contactEmail}`} className="text-highlight">
            {brand.contactEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

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
                  name="addOns"
                  value={addOn.id}
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
              name="extraPages"
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

        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-wider text-muted">
            3 · Where do I send it?
          </legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Your name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                defaultValue={values?.name}
                className={fieldClass}
              />
              <FieldError message={state.errors?.name} />
            </div>
            <div>
              <label htmlFor="business" className="text-sm font-semibold">
                Business name
              </label>
              <input
                id="business"
                name="business"
                autoComplete="organization"
                defaultValue={values?.business}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-semibold">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                defaultValue={values?.phone}
                className={fieldClass}
              />
              <FieldError message={state.errors?.phone} />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                defaultValue={values?.email}
                className={fieldClass}
              />
              <FieldError message={state.errors?.email} />
            </div>
            <div>
              <label
                htmlFor="contactPreference"
                className="text-sm font-semibold"
              >
                Best way to reach you
              </label>
              <select
                id="contactPreference"
                name="contactPreference"
                defaultValue={values?.contactPreference}
                className={fieldClass}
              >
                {contactPreferences.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="text-sm font-semibold">
                When do you want it live?
              </label>
              <select
                id="timeline"
                name="timeline"
                defaultValue={values?.timeline}
                className={fieldClass}
              >
                {timelines.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="text-sm font-semibold">
                Anything else?
                <span className="ml-2 font-normal text-muted">Optional</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                defaultValue={values?.message}
                placeholder="What the business does, pages you want, sites you like…"
                className={fieldClass}
              />
            </div>
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
          {formatRange(result.min, result.max, openEnded)}
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

        <button
          type="submit"
          disabled={pending}
          className="btn-primary mt-4 w-full !bg-highlight !text-ink hover:!bg-signal-bright hover:!text-white disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6"
        >
          {pending ? "Sending…" : "Send my estimate"}
        </button>

        {state.errors?.form ? (
          <p className="mt-3 text-xs font-semibold text-highlight">
            {state.errors.form}
          </p>
        ) : null}
        {state.status === "error" && !state.errors?.form ? (
          <p className="mt-3 text-xs font-semibold text-highlight">
            Check the highlighted fields.
          </p>
        ) : null}

        <p className="mt-3 text-xs leading-relaxed text-paper/60 sm:mt-4">
          Estimate, not a quote. You get a fixed price in writing within 1
          business day.
        </p>
      </aside>

      {state.status === "fallback" ? (
        <div className="border border-line bg-screen p-5 lg:col-span-2">
          <p className="text-sm font-semibold">{state.message}</p>
          <textarea
            readOnly
            rows={10}
            value={state.fallbackText}
            className="mt-3 w-full border border-line bg-paper/40 p-3 font-mono text-xs"
          />
          <p className="mt-3 text-sm">
            Send it to{" "}
            <a href={`mailto:${brand.contactEmail}`} className="font-semibold">
              {brand.contactEmail}
            </a>
            .
          </p>
        </div>
      ) : null}
    </form>
  );
}
