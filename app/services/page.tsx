import { redirect } from "next/navigation";
import { defaultServiceSlug } from "../components/serviceData";

export default function ServicesIndexPage() {
  redirect(`/services/${defaultServiceSlug}`);
}
