import type { StaticImageData } from "next/image";
import hero from "@/public/guesthouse/hero.jpg";
import roomGarden from "@/public/guesthouse/room-garden.jpg";
import roomFamily from "@/public/guesthouse/room-family.jpg";
import roomTerrace from "@/public/guesthouse/room-terrace.jpg";
import breakfast from "@/public/guesthouse/breakfast.jpg";
import courtyard from "@/public/guesthouse/courtyard.jpg";
import garden from "@/public/guesthouse/garden.jpg";
import sunset from "@/public/guesthouse/sunset.jpg";

/** WhatsApp link with a prefilled message. No number: this is a concept project, not a real business. */
export const whatsapp = (message: string) =>
  `https://wa.me/?text=${encodeURIComponent(message)}`;

export type Photo = { src: StaticImageData; alt: string };

export const guesthouse = {
  name: "Kebun Tiga",
  place: "Ubud, Bali",
  theme: {
    "--surface": "#f5f0e6",
    "--raised": "#fffdf8",
    "--ink": "#1b1f1a",
    "--muted": "#5a6058",
    "--accent": "#1f4d3a",
    "--on-accent": "#ffffff",
    "--line": "#ddd5c5",
  } as Record<string, string>,

  hero: {
    photo: {
      src: hero,
      alt: "Green rice terraces and coconut palms under a bright sky near Ubud",
    } as Photo,
    headline: ["A quiet garden guesthouse", "five minutes from Ubud"],
    sub: "Six rooms around a frangipani garden, breakfast on your terrace, and rice fields past the back gate. Message us your dates and we reply the same day.",
    proof: "Book direct and save 12% against booking sites. No booking fee.",
  },

  tagline: ["Six rooms, one garden,", "and nowhere you need to be."],

  rooms: [
    {
      name: "Garden room",
      photo: { src: roomGarden, alt: "Calm grey bedroom with a king bed and a door to the garden" },
      size: "24 m²",
      sleeps: "Sleeps 2",
      bed: "King bed",
      price: "Rp 485.000",
    },
    {
      name: "Terrace room",
      photo: { src: roomTerrace, alt: "Bright bedroom with white linen and a private terrace" },
      size: "28 m²",
      sleeps: "Sleeps 2",
      bed: "Queen bed",
      price: "Rp 560.000",
    },
    {
      name: "Family room",
      photo: { src: roomFamily, alt: "Teak bed with rattan headboard and woven wall baskets" },
      size: "36 m²",
      sleeps: "Sleeps 4",
      bed: "King bed and two singles",
      price: "Rp 745.000",
    },
  ],

  benefits: [
    {
      title: "The lowest rate, every night",
      body: "Booking sites add 15 to 25% commission. Message us directly and that saving stays with you.",
    },
    {
      title: "Breakfast on your terrace",
      body: "Fresh fruit, banana pancakes and Balinese coffee, served from 7 until 10.30 at no extra cost.",
    },
    {
      title: "Free cancellation",
      body: "Plans change. Cancel up to 3 days before arrival and you pay nothing.",
    },
    {
      title: "A real person replies",
      body: "Wayan and Komang run the house and answer every message themselves, usually within 2 hours.",
    },
  ],

  steps: [
    { title: "Send your dates", body: "Tell us when you arrive, how many nights, and how many guests." },
    { title: "We confirm the room", body: "You get availability and the exact price, with no hidden fees." },
    { title: "Pay when you arrive", body: "Cash or card at the house. No deposit for stays under 5 nights." },
  ],

  gallery: [
    { src: courtyard, alt: "View from a bed through open doors to the garden and a terracotta roof" },
    { src: breakfast, alt: "Wooden table set with breakfast plates and fresh fruit" },
    { src: garden, alt: "Fountain surrounded by palms in the guesthouse garden" },
    { src: sunset, alt: "Rice fields glowing at sunset" },
  ] as Photo[],

  nearby: [
    { place: "Ubud Palace and market", time: "5 min by scooter" },
    { place: "Campuhan Ridge walk", time: "9 min by scooter" },
    { place: "Tegallalang rice terraces", time: "22 min by car" },
    { place: "Ngurah Rai airport", time: "75 min by car" },
  ],

  faq: [
    {
      q: "How do I book?",
      a: "Send us a WhatsApp message with your dates and number of guests. We confirm availability and price, and your room is held as soon as you reply yes.",
    },
    {
      q: "Is it cheaper than booking sites?",
      a: "Yes. Direct rates are 12% lower because we pay no commission, and breakfast is always included.",
    },
    {
      q: "What time can we arrive and leave?",
      a: "Rooms are ready from 2 pm and we ask you to leave by 11 am. Arriving early? Leave your bags and use the garden and showers.",
    },
    {
      q: "Can you arrange an airport transfer?",
      a: "Yes. A private car from Ngurah Rai airport costs Rp 420.000 one way for up to 4 guests. Tell us your flight number when you book.",
    },
    {
      q: "Is there wifi and air conditioning?",
      a: "Every room has air conditioning, a ceiling fan, hot water and fibre wifi at around 80 Mbps.",
    },
    {
      q: "Can we rent a scooter?",
      a: "We arrange scooters for Rp 85.000 a day, delivered to the house with two helmets.",
    },
  ],
};
