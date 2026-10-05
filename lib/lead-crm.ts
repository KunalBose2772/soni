const KOLKATA_TIME_ZONE = "Asia/Kolkata";
const KOLKATA_OFFSET_MINUTES = 330;
const KOLKATA_OFFSET_MS = KOLKATA_OFFSET_MINUTES * 60 * 1000;

function toDate(value: string | Date | null | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDateTime(value: string | Date | null | undefined) {
  const date = toDate(value);
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: KOLKATA_TIME_ZONE,
  }).format(date);
}

export function truncateText(value: string | null | undefined, maxLength = 20) {
  if (!value) return "-";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

function formatKolkataDateParts(reference: string | Date | null | undefined) {
  const date = toDate(reference);
  if (!date) return null;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: KOLKATA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";

  return {
    date: `${getPart("year")}-${getPart("month")}-${getPart("day")}`,
    hour: getPart("hour"),
    minute: getPart("minute"),
  };
}

export function getKolkataDateInputValue(reference = new Date()) {
  const parts = formatKolkataDateParts(reference);
  return parts?.date ?? "";
}

export function getKolkataDateTimeParts(reference: string | Date | null | undefined) {
  const date = toDate(reference);
  if (!date) return null;

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: KOLKATA_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const parts = formatter.formatToParts(date);

  const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  const hour24 = Number(formatKolkataDateParts(date)?.hour ?? "0");
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return {
    date: formatKolkataDateParts(date)?.date ?? "",
    hour: String(hour12).padStart(2, "0"),
    minute: getPart("minute"),
    period: getPart("dayPeriod").toUpperCase() as "AM" | "PM",
  };
}

export function buildKolkataDateTimeLocalValue(date: string, hour12: string, minute: string, period: "AM" | "PM") {
  if (!date || !hour12 || !minute || !period) return "";

  const hour = Number(hour12);
  if (Number.isNaN(hour) || hour < 1 || hour > 12) return "";

  const normalizedHour =
    period === "AM" ? (hour === 12 ? 0 : hour) : hour === 12 ? 12 : hour + 12;

  return `${date}T${String(normalizedHour).padStart(2, "0")}:${minute}`;
}

export function toDateTimeLocalValue(value: string | Date | null | undefined) {
  const date = toDate(value);
  if (!date) return "";

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: KOLKATA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";

  return `${getPart("year")}-${getPart("month")}-${getPart("day")}T${getPart("hour")}:${getPart("minute")}`;
}

export function parseKolkataDateTimeLocalValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const [datePart, timePart] = trimmed.split("T");
  if (!datePart || !timePart) return null;

  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  if ([year, month, day, hour, minute].some((part) => Number.isNaN(part))) return null;

  return new Date(Date.UTC(year, month - 1, day, hour, minute) - KOLKATA_OFFSET_MS);
}

export function getKolkataDayRange(reference = new Date()) {
  const ist = new Date(reference.getTime() + KOLKATA_OFFSET_MS);
  const startOfDayUtc = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate());

  return {
    start: new Date(startOfDayUtc - KOLKATA_OFFSET_MS),
    end: new Date(startOfDayUtc + 24 * 60 * 60 * 1000 - KOLKATA_OFFSET_MS),
  };
}

export function isFollowUpOverdue(nextFollowUpAt: string | Date | null | undefined, status?: string | null) {
  if (status !== "Follow-up") return false;
  const date = toDate(nextFollowUpAt);
  if (!date) return false;
  return date.getTime() < Date.now();
}

export function isKolkataDateTimeInPastOrNow(value: string) {
  const date = parseKolkataDateTimeLocalValue(value);
  if (!date) return true;
  return date.getTime() <= Date.now();
}
