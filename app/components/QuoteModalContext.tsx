"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type QuoteModalContextType = {
  isOpen: boolean;
  openQuoteModal: (defaultMoveType?: string) => void;
  closeQuoteModal: () => void;
  defaultMoveType: string;
};

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultMoveType, setDefaultMoveType] = useState("household");

  const openQuoteModal = (moveType = "household") => {
    setDefaultMoveType(moveType);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
  };

  // Intercept global clicks on elements with href="/#quote", href="#quote", or data-open-quote-modal
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href");
      const isQuoteTrigger =
        target.getAttribute("data-open-quote-modal") === "true" ||
        href === "#quote" ||
        href === "/#quote" ||
        href === "/get-quote";

      if (isQuoteTrigger) {
        e.preventDefault();
        openQuoteModal();
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => document.removeEventListener("click", handleGlobalClick, { capture: true });
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeQuoteModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <QuoteModalContext.Provider value={{ isOpen, openQuoteModal, closeQuoteModal, defaultMoveType }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}
