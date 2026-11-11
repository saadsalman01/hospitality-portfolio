## 2026-11-11 · The demo hotel is Saffron Lane Hotel, 14 rooms, George Town, Penang
- Decided by: Claude, default
- Why: Stripe serves businesses in Malaysia, so a working test checkout is honest for this market; a heritage shophouse hotel differs clearly from the Bali guesthouse demo.
- Rejected: Indonesia and Vietnam (Stripe coverage is limited there); a second Bali property (too close to the first demo).
- Rests on: plan section "Payments are swappable".

## 2026-11-11 · Booking starts from a date bar on Home, directly under the headline
- Decided by: Claude, default
- Why: the comparing guest leaves unless a price for their dates is visible fast; dates first makes every later price a total, not a "from".
- Rejected: a separate booking page (one more step before any price); room first, dates later (prices stay vague until late); a floating booking widget (covers content on a phone).
- Rests on: design/context-hotel.md, Users and Success.

## 2026-11-11 · No idea board was drawn; one mechanism went straight to full page wireframes
- Decided by: Claude, default
- Why: the first release ships in two days and the alternatives differ in step count, which the flow already shows.
- Rejected: a thumbnail board of the three mechanisms above.
- Rests on: design/journey-direct-booking.md.

## 2026-11-11 · Guests book without an account
- Decided by: Claude, default
- Why: an account adds a screen and a password to a one time purchase.
- Rejected: required sign up; optional sign up at the end (deferred, not rejected).
- Rests on: design/context-hotel.md, Success.

## 2026-11-11 · Taxes are inside every total shown from the first results screen
- Decided by: Claude, default
- Why: a fee that first appears at payment is drip pricing.
- Rejected: per night price before tax on cards with tax added at the details step.
- Rests on: design/context-hotel.md, Ethical stance.

## 2026-11-11 · Taken rooms stay in the results list with their next free dates
- Decided by: Claude, default
- Why: hiding them makes the hotel look smaller and gives the guest no path forward.
- Rejected: hiding unavailable rooms; a "notify me" form (collects data the booking does not need).
- Rests on: design/journey-direct-booking.md, Context variants.

## 2026-11-11 · Location and Questions are sections of Home, not pages
- Decided by: Claude, default
- Why: too little content for separate pages, and the date bar stays one scroll away.
- Rejected: separate pages for each.
- Rests on: design/sitemap-hotel.md.

## 2026-11-11 · Payment is taken in full at booking
- Decided by: Claude, default
- Why: one charge is simpler to build and to explain; free cancellation up to 3 days before arrival covers the guest's risk.
- Rejected: deposit with balance at the hotel (needs a second payment path).
- Rests on: open question in design/context-hotel.md.

## 2026-11-11 · Wireframes are drawn at phone width only
- Decided by: Claude, default
- Why: the primary user is on a phone; desktop is an adaptation of the same order of content.
- Rejected: drawing 1440 wide frames in the same pass.
- Rests on: design/context-hotel.md, Users.
