'use client';

import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';

interface DistrictServiceAreaMapProps {
  districtName: string;
  districtSlug?: string;
  stateName?: string;
  mapQuery?: string;
  mapHeading?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  popularRoutes?: string[];
  pincodeCoverage?: string[];
}

const districtCoordinates: { [key: string]: { lat: number; lng: number } } = {
  ranchi: { lat: 23.3441, lng: 85.3096 },
  bokaro: { lat: 23.8103, lng: 86.1537 },
  ramgarh: { lat: 23.5833, lng: 85.55 },
  hazaribagh: { lat: 24.1542, lng: 85.3757 },
  dhanbad: { lat: 23.7957, lng: 86.4304 },
  jamshedpur: { lat: 22.8046, lng: 86.2029 },
  deoghar: { lat: 24.5128, lng: 86.6641 },
  dumka: { lat: 24.2679, lng: 87.2553 },
  giridih: { lat: 24.1844, lng: 86.1868 },
  godda: { lat: 24.3667, lng: 87.1667 },
  gumla: { lat: 23.4306, lng: 85.0125 },
  chatra: { lat: 24.2028, lng: 84.9392 },
  garhwa: { lat: 24.0916, lng: 83.4625 },
  jamtara: { lat: 24.4136, lng: 87.2639 },
  khunti: { lat: 22.7639, lng: 85.4125 },
  koderma: { lat: 24.5, lng: 85.5667 },
  latehar: { lat: 24.2375, lng: 84.5625 },
  lohardaga: { lat: 23.9833, lng: 84.6833 },
  pakur: { lat: 25.3139, lng: 87.7631 },
  palamu: { lat: 24.0833, lng: 84.6333 },
  sahebganj: { lat: 25.2333, lng: 87.55 },
  'seraikela-kharsawan': { lat: 22.3858, lng: 86.8075 },
  simdega: { lat: 23.4564, lng: 84.0739 },
  'west-singhbhum': { lat: 22.3833, lng: 85.3167 },
  'east-singhbhum': { lat: 22.8046, lng: 86.2029 },
  patna: { lat: 25.5941, lng: 85.1376 },
  gaya: { lat: 24.7969, lng: 85.0039 },
  muzaffarpur: { lat: 26.1209, lng: 85.3647 },
  bhagalpur: { lat: 25.2425, lng: 86.9842 },
  darbhanga: { lat: 26.1542, lng: 85.8918 },
  purnia: { lat: 25.7771, lng: 87.4753 },
  begusarai: { lat: 25.4182, lng: 86.1272 },
  munger: { lat: 25.3748, lng: 86.4735 },
  nalanda: { lat: 25.2049, lng: 85.5206 },
  samastipur: { lat: 25.862, lng: 85.781 },
  rohtas: { lat: 24.7471, lng: 84.0167 },
  vaishali: { lat: 25.75, lng: 85.1333 },
  'west-champaran': { lat: 27.154, lng: 84.3542 },
  madhubani: { lat: 26.348, lng: 86.071 },
  siwan: { lat: 26.2196, lng: 84.356 },
  saran: { lat: 25.95, lng: 84.75 },
  aurangabad: { lat: 24.752, lng: 84.374 },
  jehanabad: { lat: 25.2138, lng: 85.0179 },
  nawada: { lat: 24.877, lng: 85.539 },
  katihar: { lat: 25.552, lng: 87.559 },
  sitamarhi: { lat: 26.595, lng: 85.49 },
  'east-champaran': { lat: 26.65, lng: 84.9167 },
  kishanganj: { lat: 26.095, lng: 87.956 },
  jamui: { lat: 24.917, lng: 86.224 },
  sheikhpura: { lat: 25.15, lng: 85.85 },
  lakhisarai: { lat: 25.183, lng: 86.1 },
  khagaria: { lat: 25.5, lng: 86.4667 },
  supaul: { lat: 26.126, lng: 86.605 },
  araria: { lat: 26.15, lng: 87.5167 },
  banka: { lat: 24.887, lng: 86.924 },
  buxar: { lat: 25.5647, lng: 83.9777 },
  kaimur: { lat: 25.05, lng: 83.6 },
  sheohar: { lat: 26.5167, lng: 85.3 },
  bhojpur: { lat: 25.55, lng: 84.6667 },
  saharsa: { lat: 25.88, lng: 86.6 },
};

export default function DistrictServiceAreaMap({
  districtName,
  districtSlug,
  stateName = "Jharkhand",
  mapQuery,
  mapHeading,
  coordinates,
  popularRoutes = [],
  pincodeCoverage = [],
}: DistrictServiceAreaMapProps) {
  const slug = districtSlug ?? districtName.toLowerCase().replace(/\s+/g, '-');
  const coords = coordinates || districtCoordinates[slug];
  const uniquePopularRoutes = Array.from(new Set(popularRoutes));
  const uniquePincodeCoverage = Array.from(new Set(pincodeCoverage));

  const effectiveMapQuery = mapQuery ?? `${districtName}, ${stateName}`;
  const googleMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(effectiveMapQuery)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  const routeEntries = uniquePopularRoutes
    .map((route) => {
      const normalized = route
        .replace(/\s+to\s+/i, " -> ")
        .replace(/\s*\u2192\s*/g, " -> ");
      const [from, ...rest] = normalized.split("->").map((part) => part.trim());
      const to = rest.join(" -> ").trim();

      if (!from || !to) {
        return null;
      }

      return { from, to, key: route };
    })
    .filter((item): item is { from: string; to: string; key: string } => item !== null);

  const mapsLink = `https://www.google.com/maps/search/${encodeURIComponent(effectiveMapQuery)}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-md animate-pop-in">
      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100 p-2">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '1rem' }}
          src={googleMapUrl}
          loading="lazy"
          title={`Sony Packers service map for ${districtName}`}
        />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-heading text-slate-950">
              {mapHeading ?? `Our Service Hub in ${districtName}`}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              We cover all local sectors, neighborhoods, and delivery pincodes across {effectiveMapQuery}.
            </p>
            <p className="mt-1 text-[11px] text-slate-400 font-sans">
              {coords ? "GPS coordinate reference verified for direct dispatch." : "Google Maps query view enabled."}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4 flex items-center justify-between">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-red-600 text-white px-5 py-2.5 text-xs font-semibold font-sans transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
          >
            <MapPin size={14} />
            <span>Open in Google Maps</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="mt-6 space-y-4">
          {routeEntries.length > 0 && (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-heading mb-3">
                Frequent Regional Routes
              </p>
              <ul className="space-y-2 text-xs leading-5 text-slate-600">
                {routeEntries.map((route, index) => (
                  <li
                    key={`${route.key}-${index}`}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200/60 bg-white px-3 py-2 text-slate-800 shadow-xs hover:border-red-200 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <MapPin size={11} />
                    </div>
                    <span className="min-w-0 flex-1 truncate text-xs font-medium font-sans text-slate-700">{route.from}</span>
                    <ArrowRight size={12} className="shrink-0 text-red-500" />
                    <span className="min-w-0 flex-1 truncate text-xs font-bold font-sans text-slate-950">{route.to}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {uniquePincodeCoverage.length > 0 && (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-heading mb-3">
                Covered Pincode Zones
              </p>
              <div className="flex flex-wrap gap-1.5">
                {uniquePincodeCoverage.map((code, index) => (
                  <span
                    key={`${code}-${index}`}
                    className="inline-flex rounded-full bg-white border border-slate-200/80 px-2.5 py-1 text-[11px] font-medium font-sans text-slate-700 shadow-xs"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
