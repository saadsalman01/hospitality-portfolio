import type { Metadata } from "next";
import { SimpleSite } from "@/components/simple-site";
import { guesthouse as g } from "@/content/properties/guesthouse";

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
  return <SimpleSite p={g} />;
}
