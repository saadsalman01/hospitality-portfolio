import type { Metadata } from "next";
import { SimpleSite } from "@/components/simple-site";
import { hostel as h } from "@/content/properties/hostel";

export const metadata: Metadata = {
  title: `${h.name} hostel in ${h.place} | Book direct`,
  description:
    "Dorm beds and private rooms three minutes from Hoan Kiem Lake. Book direct by WhatsApp for the lowest price, with breakfast included and free cancellation.",
  openGraph: {
    title: `${h.name} hostel, ${h.place}`,
    description: "Dorm beds and private rooms in Hanoi's Old Quarter. Book direct for the lowest price.",
    images: ["/hostel/hero.jpg"],
  },
};

export default function HostelPage() {
  return <SimpleSite p={h} />;
}
