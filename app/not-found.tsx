import Link from "next/link";
import { ArrowLeft, Home, Phone, MapPin, Truck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { companyInfo } from "@/lib/company-info";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-100 text-orange-600 shadow-inner">
          <Truck size={40} className="animate-pulse" />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-600">404 Error</p>
        <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-600">
          The page you are looking for might have been relocated, renamed, or is temporarily unavailable. Let us help you find the right track!
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-600/25 transition-all hover:-translate-y-0.5 hover:bg-orange-700"
          >
            <Home size={18} />
            Back to Homepage
          </Link>
          <a
            href={companyInfo.telLink}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <Phone size={18} className="text-orange-600" />
            Call Support ({companyInfo.formattedPhone})
          </a>
          <a
            href={companyInfo.whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:-translate-y-0.5 hover:bg-green-600"
          >
            <FaWhatsapp size={18} />
            Chat on WhatsApp
          </a>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm text-left">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Popular Moving Services</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 text-sm">
            <Link href="/services/household" className="rounded-lg p-2 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-700">
              Household Shifting
            </Link>
            <Link href="/services/office" className="rounded-lg p-2 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-700">
              Office Relocation
            </Link>
            <Link href="/services/vehicle" className="rounded-lg p-2 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-700">
              Vehicle Transport
            </Link>
            <Link href="/packers-movers-jharkhand" className="rounded-lg p-2 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-700">
              Jharkhand Routes
            </Link>
            <Link href="/packers-movers-bihar" className="rounded-lg p-2 hover:bg-orange-50 hover:text-orange-600 font-medium text-slate-700">
              Bihar Routes
            </Link>
            <Link href="/get-quote" className="rounded-lg p-2 hover:bg-orange-50 hover:text-orange-600 font-semibold text-orange-600">
              Instant Quote →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
