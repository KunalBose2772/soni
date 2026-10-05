"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, Phone } from "lucide-react";
import { companyInfo } from "@/lib/company-info";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log error to monitoring service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100 text-red-600 shadow-inner">
          <AlertCircle size={40} />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-600">Something Went Wrong</p>
        <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
          An Unexpected Error Occurred
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600">
          We apologize for the inconvenience. Our team has been notified. You can try refreshing the page or contact our support team directly.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-600/25 transition-all hover:-translate-y-0.5 hover:bg-orange-700"
          >
            <RotateCcw size={18} />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <a
            href={companyInfo.telLink}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <Phone size={18} className="text-orange-600" />
            {companyInfo.formattedPhone}
          </a>
        </div>
      </div>
    </div>
  );
}
