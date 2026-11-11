import hero from "@/public/hostel/hero.jpg";
import roomDorm from "@/public/hostel/room-dorm.jpg";
import roomSmall from "@/public/hostel/room-small.jpg";
import roomPrivate from "@/public/hostel/room-private.jpg";
import common from "@/public/hostel/common.jpg";
import rooftop from "@/public/hostel/rooftop.jpg";
import coffee from "@/public/hostel/coffee.jpg";
import street from "@/public/hostel/street.jpg";
import type { SimpleProperty } from "@/content/properties/guesthouse";

// Same page as the guesthouse: only this file and the photos are new.
export const hostel: SimpleProperty = {
  name: "Lantern House",
  place: "Old Quarter, Hanoi",
  theme: {
    "--surface": "#fff8ef",
    "--raised": "#ffffff",
    "--ink": "#1c1917",
    "--muted": "#57534e",
    "--accent": "#b93a0b",
    "--on-accent": "#ffffff",
    "--line": "#eadfce",
  },

  hero: {
    photo: { src: hero, alt: "Scooters passing old shophouses on a corner of Hanoi's Old Quarter" },
    headline: ["A hostel in the middle", "of Hanoi's Old Quarter"],
    sub: "Dorm beds and a private room for groups above a quiet lane, three minutes on foot from Hoan Kiem Lake. Message us your dates and we reply the same day.",
    proof: "Book direct and save 10% against booking sites. No booking fee.",
  },

  tagline: ["Drop your bag,", "the city starts at the door."],

  copy: {
    roomsTitle: "Beds and rooms",
    roomsBody:
      "Every bed has a curtain, a reading light, a socket and a locker that fits a full backpack. Dorm prices are per bed, per night. Breakfast is included.",
    askLabel: "Ask about this one",
    directTitle: "Why travellers message us directly",
    stepsTitle: "Booked in three messages",
    locationTitle: "Everything in the Old Quarter is a walk away",
    locationBody:
      "The house is on Ngo Hang Hanh, a lane just wide enough for one scooter. Street food, the lake and the night market are around the corner, and the lane itself is quiet after ten.",
    faqTitle: "Questions travellers ask",
    ctaTitle: "Tell us your dates and we will keep a bed for you",
    ctaBody: "Lowest price, breakfast included, free cancellation up to 2 days before arrival.",
  },

  rooms: [
    {
      name: "Mixed dorm",
      photo: { src: roomDorm, alt: "Long dorm with built in bunks, each with its own light and curtain" },
      size: "8 beds",
      sleeps: "1 guest per bed",
      bed: "Bunk with curtain and locker",
      price: "₫ 190.000 a bed",
    },
    {
      name: "Small dorm",
      photo: { src: roomSmall, alt: "Bunk bed with fresh towels beside a tall window" },
      size: "4 beds",
      sleeps: "1 guest per bed",
      bed: "Bunk with curtain and locker",
      price: "₫ 240.000 a bed",
    },
    {
      name: "Private room",
      photo: { src: roomPrivate, alt: "Bright private room with four neatly made single beds" },
      size: "22 m²",
      sleeps: "Sleeps up to 4",
      bed: "Four single beds",
      price: "₫ 980.000 a room",
    },
  ],

  benefits: [
    {
      title: "The lowest price, every night",
      body: "Booking sites add 15 to 25% commission. Message us directly and that saving stays in your travel budget.",
    },
    {
      title: "Breakfast and coffee included",
      body: "Eggs, fruit, baguette and Vietnamese coffee from 7 until 10. Tea and drinking water are free all day.",
    },
    {
      title: "Free cancellation",
      body: "Plans change on the road. Cancel up to 2 days before arrival and you pay nothing.",
    },
    {
      title: "People who know the city",
      body: "Linh and Duc grew up nearby. Ask them where to eat, how to reach Ha Long Bay and which bus to trust.",
    },
  ],

  steps: [
    { title: "Send your dates", body: "Tell us when you arrive, how many nights, and how many beds or rooms." },
    { title: "We confirm your bed", body: "You get availability and the exact price, with no hidden fees." },
    { title: "Pay when you arrive", body: "Cash or card at the desk. No deposit for stays under 5 nights." },
  ],

  gallery: [
    { src: common, alt: "Common room with string lights, armchairs and a long shared table" },
    { src: rooftop, alt: "Rooftop terrace with wooden tables and lanterns in the evening" },
    { src: coffee, alt: "Vietnamese coffee on a wooden table" },
    { src: street, alt: "Old Quarter street at dusk with scooters and shop lights" },
  ],

  nearby: [
    { place: "Hoan Kiem Lake", time: "3 min walk" },
    { place: "Weekend night market", time: "4 min walk" },
    { place: "Hanoi railway station", time: "10 min by taxi" },
    { place: "Noi Bai airport", time: "40 min by car" },
  ],

  faq: [
    {
      q: "How do I book?",
      a: "Send us a WhatsApp message with your dates and how many beds you need. We confirm availability and price, and your bed is held as soon as you reply yes.",
    },
    {
      q: "Is it cheaper than booking sites?",
      a: "Yes. Direct prices are 10% lower because we pay no commission, and breakfast is always included.",
    },
    {
      q: "What time can I arrive and leave?",
      a: "Beds are ready from 2 pm and check out is at 11 am. The desk is open all night, and you can leave your bag before or after your stay for free.",
    },
    {
      q: "Is there a dorm for women only?",
      a: "Yes. One of the small dorms is kept for women. Ask for it when you message us.",
    },
    {
      q: "Is my bag safe?",
      a: "Every bed has its own locker, big enough for a 70 litre backpack. Bring a padlock or borrow one at the desk.",
    },
    {
      q: "Can you arrange airport pickup or tours?",
      a: "Yes. An airport car costs ₫ 350.000 one way. We also book Ha Long Bay, Ninh Binh and Sapa trips at the price the operator charges.",
    },
  ],
};
