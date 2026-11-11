# Saffron Lane Hotel: direct booking website

## Users

**The comparing guest.** Found the hotel on a booking site, Google Maps or Instagram, and opens the hotel's own site on a phone to see whether booking direct is cheaper. Has the booking site open in another tab. Is on mobile data, often abroad, often reading English as a second language. Leaves within seconds if a price for their dates is not visible.

**The returning or referred guest.** Already wants this hotel. Needs dates, a room and a confirmation with as few steps as possible.

**The owner.** Runs a 14 room heritage hotel in George Town, Penang, with no technical staff. Still lists rooms on booking sites, so the same room must never sell twice.

## Product

A new website for one hotel, on the web, mobile first. The hotel earns from room nights; every direct booking keeps the 15 to 25% a booking site would take. This is the first release: browse rooms, check live availability, pay, receive a confirmation.

## Constraints

- First release ships in two days.
- Built on Next.js, a Postgres database (Supabase) and Stripe.
- Card details are entered on Stripe's hosted page and never reach the site's server (PCI).
- Guest data falls under Malaysia's PDPA: collect only what a booking needs.
- Rooms stay listed on booking sites; availability syncs both ways by iCal.
- Guests book without creating an account.
- A 30% deposit is paid at booking. The balance is paid at the hotel on arrival.

## Ethical stance

- The total for the stay, including taxes, is shown before the guest enters any details. No fee appears for the first time at payment.
- Availability shown is the real inventory. No countdown timers, no invented "only 1 left".
- Nothing is selected on the guest's behalf: no prechecked extras, no prechecked marketing consent.
- Cancellation terms are stated beside the price, before payment.
- A booking asks for a name, an email and a phone number. Arrival time and requests are optional.

## Success

- A guest on a phone goes from landing to a paid booking in four screens or fewer.
- The total price for chosen dates is visible on the first screen after choosing them.
- A first time visitor completes a test booking without help.

## Open questions

- Does the hotel want guests to be able to change or cancel a booking themselves from a link?
