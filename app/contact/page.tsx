import { MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PageHeroBanner from "../components/PageHeroBanner";
import QuoteForm from "../components/QuoteForm";
import SectionHeader from "../components/ui/SectionHeader";
import { siteAssets } from "@/lib/site-assets";
import { companyInfo } from "@/lib/company-info";

const cities = [
  "Ranchi", "Dhanbad", "Jamshedpur", "Bokaro", "Hazaribagh", "Deoghar",
  "Patna", "Gaya", "Muzaffarpur", "Delhi NCR", "Noida", "Kolkata",
  "Mumbai", "Pune", "Ahmedabad", "Surat", "Bangalore", "Hyderabad",
  "Chennai", "Lucknow", "Jaipur", "Bhubaneswar",
];

export default function ContactPage() {
  return (
    <main className="overflow-x-clip bg-white">
      <PageHeroBanner
        title="Contact Sony Packers and Movers"
        subtitle="Speak with our Ranchi dispatch coordinators for instant booking, free on-site survey, and transparent relocation quotes."
        breadcrumb="Contact Support"
        backgroundImage={siteAssets.pages.contact.heroBanner}
        heightClassName="min-h-[50vh] sm:min-h-[58vh]"
      />

      {/* =========================================================================
          SECTION 1: CONTACT DETAILS & INSTANT QUOTE FORM
          ========================================================================= */}
      <section className="section-spacing bg-white border-b border-slate-100">
        <div className="site-container">
          <div className="grid items-stretch gap-8 lg:grid-cols-12">
            {/* Left Column: Office Information in Deep Midnight Navy */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#0B132B] p-6 sm:p-8 text-white shadow-xl border border-white/10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight mb-2">
                  Reach Us for Bookings &amp; Inquiries
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                  Available around the clock for household moves, corporate office relocations, car/bike carrier services, and warehouse storage.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 text-slate-200">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">Office Address</p>
                      <p className="text-xs sm:text-sm font-sans mt-0.5">{companyInfo.address.full}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 text-slate-200">
                    <Phone size={18} className="shrink-0 text-brand" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">Phone Helpline</p>
                      <a href={companyInfo.telLink} className="text-xs sm:text-sm font-sans font-bold hover:text-brand transition-colors">
                        {companyInfo.formattedPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 text-slate-200">
                    <FaWhatsapp size={19} className="shrink-0 text-emerald-400" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">WhatsApp Booking</p>
                      <a
                        href={companyInfo.whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-sans font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        {companyInfo.formattedPhone} (Chat 24x7)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 text-slate-200">
                    <Mail size={18} className="shrink-0 text-sky-400" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">Official Email</p>
                      <a href={`mailto:${companyInfo.email}`} className="text-xs sm:text-sm font-sans hover:text-sky-300 transition-colors">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 text-slate-200">
                    <Clock size={18} className="shrink-0 text-amber-400" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">Working Hours</p>
                      <p className="text-xs sm:text-sm font-sans">{companyInfo.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Quote Form Card */}
            <div className="lg:col-span-7 rounded-3xl bg-slate-50 border border-slate-200/90 p-5 sm:p-8 shadow-xs">
              <QuoteForm />
            </div>
          </div>

          {/* Service Cities Pill Matrix */}
          <div className="mt-8 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold font-heading text-slate-950 mb-3">
              Cities We Directly Serve Across India
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {cities.map((city) => (
                <span
                  key={city}
                  className="rounded-full bg-slate-50 border border-slate-200/70 px-3.5 py-1 text-xs font-semibold font-sans text-slate-700 hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  {city}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-sans">
              Safe, reliable, and insured relocations connecting Jharkhand, Bihar, and all major Indian metropolitan cities.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE OFFICE LOCATION MAP
          ========================================================================= */}
      <section className="section-spacing bg-slate-50/70 border-b border-slate-100">
        <div className="site-container">
          <SectionHeader
            badge="Office Location"
            title="Visit Our Ranchi Central"
            highlight="Headquarters"
            description="Centrally located opposite Nirvachan Bhawan on Ratu Road. Feel free to walk in for direct booking consultations, route planning, and vehicle inspections."
            align="center"
          />

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2.5 shadow-xl">
            <iframe
              src={companyInfo.mapEmbedUrl}
              title="Sony Packers and Movers Ratu Road Ranchi Location"
              className="h-[400px] sm:h-[480px] w-full rounded-2xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
