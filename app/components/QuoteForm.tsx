"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

export type QuoteData = {
  name: string;
  email: string;
  phone: string;
  movingFrom: string;
  movingTo: string;
  moveDate: string;
  moveType: string;
  message: string;
};

type QuoteFormProps = {
  isInModal?: boolean;
  onSuccess?: () => void;
  defaultMoveType?: string;
};

export default function QuoteForm({ isInModal = false, onSuccess, defaultMoveType = "household" }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const todayIso = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteData>({
    mode: "onTouched",
    defaultValues: {
      moveType: defaultMoveType,
      moveDate: todayIso,
      message: "Quote request via website",
    },
  });

  const onSubmit = async (data: QuoteData) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: { success?: boolean; message?: string } = await response.json().catch(() => ({}));

      if (!response.ok || result.success !== true) {
        setSubmitError(result.message ?? "Unable to submit quote. Please call us directly.");
        return;
      }

      setSubmitted(true);
      reset();
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2200);
      }
    } catch {
      setSubmitError("Network error. Please call our helpline at +91 9835983331.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-sans text-slate-900 bg-white placeholder:text-slate-400 outline-none transition-all ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-slate-200 hover:border-slate-350 focus:border-brand focus:ring-2 focus:ring-brand/15"
    }`;

  const labelClass = "mb-1 block text-xs font-bold font-heading text-slate-800";

  return (
    <div className="relative w-full">
      {/* Success Notification */}
      {submitted && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center animate-fade-up">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-base font-bold font-heading text-slate-950 mb-1">
            Quote Request Received!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-sm mx-auto">
            Our moving coordinator will call you within 15 minutes with a verified estimate.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 text-xs font-semibold text-emerald-700 hover:text-emerald-800 font-sans underline cursor-pointer"
          >
            Submit another query
          </button>
        </div>
      )}

      {/* Error Alert */}
      {submitError && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 flex items-center gap-2 mb-4 font-sans">
          <AlertCircle size={16} className="shrink-0 text-red-600" />
          <span>{submitError}</span>
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor={isInModal ? "modal-name" : "quote-name"} className={labelClass}>
                Full Name *
              </label>
              <input
                id={isInModal ? "modal-name" : "quote-name"}
                className={inputClass(!!errors.name)}
                placeholder="e.g. Ramesh Kumar"
                autoComplete="name"
                {...register("name", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Enter at least 2 characters" },
                })}
              />
              {errors.name && <p className="text-[11px] text-red-600 mt-1 font-sans">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor={isInModal ? "modal-phone" : "quote-phone"} className={labelClass}>
                Phone Number *
              </label>
              <input
                id={isInModal ? "modal-phone" : "quote-phone"}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                className={inputClass(!!errors.phone)}
                placeholder="10-digit mobile number"
                {...register("phone", {
                  required: "Phone number is required",
                  setValueAs: (v) => String(v ?? "").replace(/\D/g, "").slice(0, 10),
                  validate: (v) => (v.length === 10 ? true : "Enter a valid 10-digit number"),
                })}
              />
              {errors.phone && <p className="text-[11px] text-red-600 mt-1 font-sans">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Row 2: Moving From & Moving To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor={isInModal ? "modal-from" : "quote-from"} className={labelClass}>
                Pickup City / Area *
              </label>
              <input
                id={isInModal ? "modal-from" : "quote-from"}
                className={inputClass(!!errors.movingFrom)}
                placeholder="e.g. Ratu Road, Ranchi"
                {...register("movingFrom", { required: "Pickup location is required" })}
              />
              {errors.movingFrom && <p className="text-[11px] text-red-600 mt-1 font-sans">{errors.movingFrom.message}</p>}
            </div>

            <div>
              <label htmlFor={isInModal ? "modal-to" : "quote-to"} className={labelClass}>
                Destination City / Area *
              </label>
              <input
                id={isInModal ? "modal-to" : "quote-to"}
                className={inputClass(!!errors.movingTo)}
                placeholder="e.g. Patna / Bangalore"
                {...register("movingTo", { required: "Destination is required" })}
              />
              {errors.movingTo && <p className="text-[11px] text-red-600 mt-1 font-sans">{errors.movingTo.message}</p>}
            </div>
          </div>

          {/* Row 3: Move Type & Move Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor={isInModal ? "modal-type" : "quote-type"} className={labelClass}>
                Shifting Type *
              </label>
              <select
                id={isInModal ? "modal-type" : "quote-type"}
                className={inputClass(!!errors.moveType)}
                {...register("moveType", { required: "Please select shifting type" })}
              >
                <option value="household">Household (1 / 2 / 3+ BHK)</option>
                <option value="office">Office / Commercial Move</option>
                <option value="vehicle">Car / Bike Transportation</option>
                <option value="storage">Storage &amp; Warehousing</option>
                <option value="loading">Loading &amp; Labor Support</option>
                <option value="domestic">Intercity Domestic Shifting</option>
              </select>
            </div>

            <div>
              <label htmlFor={isInModal ? "modal-date" : "quote-date"} className={labelClass}>
                Preferred Shifting Date *
              </label>
              <input
                id={isInModal ? "modal-date" : "quote-date"}
                type="date"
                min={todayIso}
                className={inputClass(!!errors.moveDate)}
                {...register("moveDate", { required: "Select your preferred date" })}
              />
            </div>
          </div>

          {/* Row 4: Email */}
          <div>
            <label htmlFor={isInModal ? "modal-email" : "quote-email"} className={labelClass}>
              Email Address *
            </label>
            <input
              id={isInModal ? "modal-email" : "quote-email"}
              type="email"
              className={inputClass(!!errors.email)}
              placeholder="name@example.com"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="text-[11px] text-red-600 mt-1 font-sans">{errors.email.message}</p>}
          </div>

          {/* Optional Message */}
          <div>
            <label htmlFor={isInModal ? "modal-msg" : "quote-msg"} className={labelClass}>
              Items / Special Notes (Optional)
            </label>
            <input
              id={isInModal ? "modal-msg" : "quote-msg"}
              className={inputClass(false)}
              placeholder="e.g. 2 BHK, 2nd floor with lift, needs packing for fridge and sofa"
              {...register("message")}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-brand-primary w-full rounded-xl py-3.5 px-6 font-semibold font-sans text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 shadow-xs disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Sending Your Details…</span>
              </>
            ) : (
              <>
                <span>Get Free Moving Quote</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-sans pt-1">
            <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
            <span>100% Free &amp; Confidential • No Spam Guarantee</span>
          </div>
        </form>
      )}
    </div>
  );
}
