"use client";

import { X } from "lucide-react";
import { useQuoteModal } from "./QuoteModalContext";
import QuoteForm from "./QuoteForm";

export default function QuoteModal() {
  const { isOpen, closeQuoteModal, defaultMoveType } = useQuoteModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-xs transition-opacity duration-200 animate-fade-in"
      onClick={closeQuoteModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl border-t sm:border border-slate-200/90 max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom sm:slide-in-from-bottom-2 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Swipe / Sheet Handle Indicator */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto mb-3 sm:hidden" />

        {/* Close Button with Safe Touch Target */}
        <button
          type="button"
          onClick={closeQuoteModal}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
          aria-label="Close quote modal"
        >
          <X size={17} />
        </button>

        {/* Modal Header */}
        <div className="mb-3.5 sm:mb-4 pr-9">
          <h3 className="text-lg sm:text-2xl font-extrabold font-heading text-slate-950 leading-tight">
            Get Your Free Moving Quote
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans mt-0.5 sm:mt-1">
            Fill in your 2-step shifting details. Our Ranchi team will calculate the estimate and call you within 15 minutes.
          </p>
        </div>

        {/* Embedded Step-By-Step Quote Form */}
        <QuoteForm
          isInModal={true}
          onSuccess={closeQuoteModal}
          defaultMoveType={defaultMoveType}
        />
      </div>
    </div>
  );
}
