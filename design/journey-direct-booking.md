# Direct booking flow

## Problem statement

A guest wants to know what their dates cost at this hotel and to secure the room. Today that happens on a booking site, where the hotel pays 15 to 25% commission. The flow succeeds when a guest on a phone reaches a paid booking in four screens or fewer.

## User context and variations

| Arrives from | Lands on | Carries |
|---|---|---|
| Search, Maps, Instagram | Home | No dates chosen |
| A booking site, comparing price | Home or a room page | Dates and a price to beat |
| A shared link to one room | Room page | Interest in one room, no dates |

## Screen by screen flow

1. **Home.** The date bar sits directly under the headline: arrival, departure, guests, "Check availability". Rooms are previewed below with a "from" price for guests who want to browse first.
2. **Rooms for your dates.** Every room, each with the total for the stay including taxes. Available rooms carry "Select". A room that is taken stays in the list with its next free dates.
3. **Room.** Photos, what is included, the price breakdown and the cancellation terms. A bar at the bottom holds the total and "Book this room". Guests who chose from the list can skip this screen.
4. **Your details.** Stay summary, three required fields, two optional ones, the price breakdown, the cancellation terms, then "Continue to payment".
5. **Payment.** Stripe's hosted page. The room is held for 15 minutes from this point.
6. **Booking confirmed.** Reference, stay summary, add to calendar, message the hotel, directions.

## Context variants

- **No dates yet.** Rooms show a "from" price per night and the date bar; choosing dates turns the same page into step 2.
- **Dates unavailable for every room.** The page offers the nearest free dates before and after, and a WhatsApp link to the hotel.
- **Payment abandoned or failed.** The guest returns to Your details with everything still filled in. The hold lapses after 15 minutes and the dates become available again.
- **Returning to a confirmed booking.** The confirmation email links to the confirmation page.

## Copy specifications

| Place | String |
|---|---|
| Date bar button | Check availability |
| Room card, available | Select |
| Room card, taken | Not available for these dates. Next free: 16 to 19 Dec |
| Room page bar | Book this room |
| Details button | Continue to payment |
| Under the details button | You pay RM 1,222.32 on the next screen. Secure payment by Stripe. |
| Confirmation heading | Booking confirmed |
| Field error, email | Enter an email address, like name@example.com |
| Hold expired | Your hold on this room ended. It is still available, so you can continue. |

## Interaction specifications

- Choosing an arrival date moves focus to departure. Departure cannot precede arrival; past dates cannot be chosen.
- Field errors appear when the guest leaves a field and clear as soon as the value is valid.
- Dates, guests and room travel in the page address, so refreshing or sharing a page keeps them.
- The step indicator (Dates, Room, Details, Payment) shows on steps 2 to 4. Earlier steps are links.
- Back from Stripe returns to Your details, never to Home.

## Flow metrics and success criteria

- Share of visits that choose dates and then reach payment.
- Drop off at each step.
- Time from choosing dates to a paid booking.

## Open questions

- When every room is taken, should nearby dates be offered automatically or only on request?
