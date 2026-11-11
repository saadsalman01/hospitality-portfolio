import type { StaticImageData } from "next/image";
import courtyard from "@/public/hotel/courtyard.jpg";
import hallway from "@/public/hotel/hallway.jpg";
import street from "@/public/hotel/street.jpg";
import roomCourtyard from "@/public/hotel/room-courtyard.jpg";
import roomDeluxe from "@/public/hotel/room-deluxe.jpg";
import roomFamily from "@/public/hotel/room-family.jpg";

export type Room = {
  slug: string; // must match room_units.room_slug in the database
  name: string;
  rateSen: number; // per night, before tax
  bed: string;
  sleeps: number;
  size: string;
  photo: { src: StaticImageData; alt: string };
  description: string;
  features: string[];
};

export const hotel = {
  name: "Saffron Lane Hotel",
  place: "George Town, Penang",
  address: "42 Lebuh Armenian, George Town",
  theme: {
    "--surface": "#ffffff",
    "--raised": "#f1f4f1",
    "--ink": "#141c14",
    "--muted": "#566056",
    "--accent": "#3a4d39",
    "--on-accent": "#ffffff",
    "--line": "#d9e0d9",
  } as Record<string, string>,

  hero: {
    photo: { src: courtyard, alt: "Open air courtyard with palms between the hotel's two wings" },
    headline: ["A 1920s shophouse hotel", "in old George Town"],
    sub: "Fourteen rooms around an open air courtyard. Book here and pay no booking fee: the direct rate is 12% lower than on booking sites.",
  },

  tagline: ["Shutters open to the lane.", "The city is five steps away."],

  rooms: [
    {
      slug: "courtyard",
      name: "Courtyard room",
      rateSen: 29800,
      bed: "Queen bed",
      sleeps: 2,
      size: "22 m²",
      photo: { src: roomCourtyard, alt: "Room with a queen bed, striped headboard and a window to the courtyard" },
      description:
        "A ground floor room that opens onto the courtyard. Cool tiled floor, a queen bed and a rain shower.",
      features: ["Queen bed", "Sleeps 2", "22 m²", "Air conditioning", "Fibre wifi", "Breakfast included"],
    },
    {
      slug: "heritage-deluxe",
      name: "Heritage deluxe",
      rateSen: 36800,
      bed: "King bed",
      sleeps: 2,
      size: "28 m²",
      photo: { src: roomDeluxe, alt: "Large room with a king bed, parquet floor and a sitting corner" },
      description:
        "A first floor room with original timber shutters, a king bed and a sitting corner. Faces the quiet side lane.",
      features: ["King bed", "Sleeps 2", "28 m²", "Air conditioning", "Fibre wifi", "Breakfast included"],
    },
    {
      slug: "family-loft",
      name: "Family loft",
      rateSen: 51200,
      bed: "King bed and 2 singles",
      sleeps: 4,
      size: "41 m²",
      photo: { src: roomFamily, alt: "Wide room with two beds, a writing desk and patterned floor tiles" },
      description:
        "The largest room in the house, under the carved ceiling of the old upper hall. A king bed, two singles and a writing desk.",
      features: ["King bed and 2 singles", "Sleeps 4", "41 m²", "Air conditioning", "Fibre wifi", "Breakfast included"],
    },
  ] as Room[],

  about: {
    body: "The house was built in 1926 for a spice trader and still has its air well, timber stairs and carved screens. Breakfast comes from the kopitiam next door, and the rooftop terrace is open until 11 pm.",
    photos: [
      { src: hallway, alt: "Covered five foot way with arches outside the hotel" },
      { src: street, alt: "Heritage shophouses on the corner of the lane at dusk" },
    ],
  },

  // Invented for the concept, like the hotel itself.
  story: {
    intro:
      "Saffron Lane began as one family's house and shop. Almost a hundred years later you can still read its history in the walls.",
    chapters: [
      {
        year: "1926",
        title: "A spice trader builds a house",
        body: "Lim Boon Teck traded pepper, clove and saffron from the ground floor and raised his family on the floor above. He built the house around an open air well, so that light and rain could reach the middle of a long, narrow building.",
        photo: { src: hallway, alt: "Covered five foot way with arches outside the hotel" },
      },
      {
        year: "1950s to 1990s",
        title: "Three generations under one roof",
        body: "The shop became a sundry store, then a tailor, then a store room. The family stayed upstairs. The timber stairs, the carved screens and the patterned floor tiles were never replaced, mostly because nobody saw a reason to.",
        photo: { src: street, alt: "Heritage shophouses on the corner of the lane at dusk" },
      },
      {
        year: "2019",
        title: "Two years of careful repair",
        body: "When the house changed hands, the new owners kept what was there. Local craftsmen repaired the shutters and lime plaster by hand. The air well became the courtyard, and the old store rooms became the first guest rooms.",
        photo: { src: courtyard, alt: "Open air courtyard with palms between the hotel's two wings" },
      },
      {
        year: "Today",
        title: "Fourteen rooms, one front door",
        body: "The hotel is still small enough that the same people greet you, make your coffee and tell you where to eat. Breakfast comes from the kopitiam next door, as it has for the lane since before the house was built.",
        photo: { src: roomDeluxe, alt: "Large room with a king bed, parquet floor and a sitting corner" },
      },
    ],
  },

  nearby: [
    { place: "Khoo Kongsi clan house", time: "3 min walk" },
    { place: "Chew Jetty", time: "8 min walk" },
    { place: "Penang airport", time: "35 min by car" },
  ],

  faq: [
    {
      q: "Is it cheaper to book here?",
      a: "Yes. The rate here is 12% lower than on booking sites because the hotel pays no commission, and breakfast is always included.",
    },
    {
      q: "What do I pay now?",
      a: "A 30% deposit when you book. The balance is paid at the hotel when you arrive, by card or cash.",
    },
    {
      q: "Can I cancel?",
      a: "Yes. Cancel up to 3 days before arrival and your deposit is refunded in full. After that the deposit is kept.",
    },
    {
      q: "What time can we arrive?",
      a: "Rooms are ready from 2 pm and departure is by 11 am. You can leave bags at reception before and after.",
    },
    {
      q: "Is breakfast included?",
      a: "Yes, for every guest, every morning from 7.30 to 10.30.",
    },
  ],
};

export const findRoom = (slug: string) => hotel.rooms.find((r) => r.slug === slug);
