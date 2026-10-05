"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHeroBanner from "../components/PageHeroBanner";
import { siteAssets } from "@/lib/site-assets";

type GalleryItem = {
  src: string;
  type: string;
  title: string;
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/gallery/public");
        const data = await res.json();
        if (res.ok && data.success) {
          setGallery(data.items ?? []);
          setCategories(["All", ...(data.categories ?? [])]);
        }
      } catch {
        // Keep empty gallery on error
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredItems = useMemo(() => {
    return filter === "All" ? gallery : gallery.filter((item) => item.type === filter);
  }, [filter, gallery]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / 12));
  const displayPage = Math.min(page, totalPages);
  const pagedItems = filteredItems.slice((displayPage - 1) * 12, displayPage * 12);

  const activeItem = activeIndex === null ? null : (pagedItems[activeIndex] ?? null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (activeIndex === null) {
        return;
      }

      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current + 1) % pagedItems.length;
        });
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current - 1 + pagedItems.length) % pagedItems.length;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, pagedItems.length]);

  return (
    <>
      <PageHeroBanner
        title="Gallery"
        subtitle="Visual highlights from recent residential, office, packing, and transport projects."
        breadcrumb="Gallery"
        backgroundImage={siteAssets.pages.gallery.heroBanner}
        heightClassName="min-h-[58vh]"
      />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sticky top-[88px] z-30 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setPage(1);
                    setActiveIndex(null);
                  }}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    filter === cat ? "bg-orange-600 text-white shadow-lg shadow-orange-500/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="mt-10 text-center text-slate-500">Loading gallery...</p>
          ) : filteredItems.length === 0 ? (
            <p className="mt-10 text-center text-slate-500">No gallery images yet.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pagedItems.map((item, idx) => (
                <button
                  key={`${item.src}-${idx}`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">{item.type}</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">{item.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          )}

          {filteredItems.length > 12 ? (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={displayPage === 1}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-all disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPage(idx + 1)}
                    className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition-all ${
                      displayPage === idx + 1 ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={displayPage === totalPages}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-all disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {activeItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-black shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) => {
                  if (current === null) return current;
                  return (current - 1 + pagedItems.length) % pagedItems.length;
                })
              }
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) => {
                  if (current === null) return current;
                  return (current + 1) % pagedItems.length;
                })
              }
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight size={24} />
            </button>

            <img src={activeItem.src} alt={activeItem.title} className="max-h-[85vh] w-full object-contain" />
            <div className="border-t border-white/10 bg-black px-6 py-4 text-white">
              <p className="text-sm uppercase tracking-[0.22em] text-orange-300">{activeItem.type}</p>
              <h3 className="mt-1 text-xl font-bold">{activeItem.title}</h3>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
