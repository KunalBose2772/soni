"use client";

import { X, Sparkles } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";
import QuoteForm from "./QuoteForm";

export default function QuoteModal() {
  const { isOpen, closeQuoteModal, defaultMoveType } = useQuoteModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={closeQuoteModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/90 my-8 animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuoteModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8">
          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-950 leading-tight">
            Get Your Free Moving Quote
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
            Share your shifting details below. Our Ranchi team will calculate the estimate and call you within 15 minutes.
          </p>
        </div>

        {/* Embedded Quote Form */}
        <QuoteForm isInModal={true} onSuccess={closeQuoteModal} defaultMoveType={defaultMoveType} />
      </div>
    </div>
  );
}
