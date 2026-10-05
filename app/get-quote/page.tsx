import PageHeroBanner from "../components/PageHeroBanner";
import QuoteForm from "../components/QuoteForm";
import { siteAssets } from "@/lib/site-assets";

export default function GetQuotePage() {
  return (
    <>
      <PageHeroBanner
        title="Get Free Moving Quote"
        subtitle="Share your details and our team will call you shortly with a transparent estimate."
        breadcrumb="Get Quote"
        backgroundImage={siteAssets.pages.getQuote.heroBanner}
        heightClassName="min-h-[62vh]"
      />

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:px-8">
          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-2xl shadow-slate-900/15">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">Why ask for a quote?</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Fast pricing, careful planning, and no surprises</h2>
            <p className="mt-4 text-slate-300">
              We help you estimate packing, labor, transport, and delivery so you can plan your move with confidence.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Household, office, and vehicle moving support",
                "Local Ranchi and intercity Jharkhand routes",
                "Transparent quote with quick follow-up",
                "Optional loading, storage, and unpacking help",
                "Fast pickup and on-time delivery assistance",
                "Professional packing materials for extra safety",
                "Trusted relocation service for homes and businesses",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/5 px-4 py-4 text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
