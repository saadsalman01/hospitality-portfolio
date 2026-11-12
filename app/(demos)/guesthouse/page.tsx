import type { Metadata } from "next";
import { Noto_Serif, Oswald, Sansita } from "next/font/google";
import { SimpleSite } from "@/components/simple-site";
import { guesthouse as g } from "@/content/properties/guesthouse";

const display = Sansita({ subsets: ["latin"], weight: "800", style: "italic", variable: "--font-skin-display" });
const label = Oswald({ subsets: ["latin"], weight: "700", variable: "--font-skin-label" });
const body = Noto_Serif({ subsets: ["latin"], variable: "--font-skin-body" });

export const metadata: Metadata = {
  title: `${g.name} guesthouse in ${g.place} | Book direct`,
  description:
    "Six garden rooms five minutes from central Ubud. Book direct by WhatsApp for the lowest rate, with breakfast included and free cancellation.",
  openGraph: {
    title: `${g.name} guesthouse, ${g.place}`,
    description: "Six garden rooms five minutes from central Ubud. Book direct for the lowest rate.",
    images: ["/guesthouse/hero.jpg"],
  },
};

export default function GuesthousePage() {
  return <SimpleSite p={g} skin={`skin-city ${display.variable} ${label.variable} ${body.variable}`} />;
}
