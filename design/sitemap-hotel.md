# Site structure

## Site map

```
/                      Home
/rooms                 Rooms (browse, or rooms for chosen dates)
/rooms/[room]          Room
/book                  Your details
/book/confirmed        Booking confirmed
(Stripe)               Payment, hosted by Stripe
```

Home links to Rooms and to each Room. Rooms and Room both lead to Your details. Location and Questions are sections of Home, not pages: a 14 room hotel has too little content to fill them, and a guest comparing prices should not have to leave the page that holds the date bar.

## Navigation specification

**Pattern: flat global navigation, with a sequential booking flow.** Four destinations and one action is small enough to show in full; a hierarchy would add a level with nothing in it. Booking is linear and each step depends on the one before, so it runs as a sequence with a step indicator.

| Global navigation | Goes to |
|---|---|
| Rooms | /rooms |
| The hotel | Home, hotel section |
| Location | Home, location section |
| Questions | Home, questions section |
| **Check availability** (button) | Date bar |

- On a phone the four links collapse into the menu; "Check availability" stays visible in the bar.
- Inside the booking flow (Rooms for dates, Your details) the global links give way to the step indicator: Dates, Room, Details, Payment. The hotel name still returns to Home.
- The current page or step is marked in the navigation.

## Labeling guide

| Label | Rejected | Reason |
|---|---|---|
| Rooms | Accommodation, Stay | The word guests type and say |
| Check availability | Book now | Before dates are chosen there is nothing to book; the label says what happens next |
| Select / Book this room | Reserve | "Select" picks a room from a list; "Book" commits to one |
| Your details | Checkout, Guest information | Plain, and distinct from the payment step |
| Questions | FAQ, Help, Info | Says what is there without an acronym |
| Total for 3 nights | Price | States what the number covers |

## Wayfinding

- **Where am I:** page heading matches the label that led there; the step indicator marks the current step.
- **Where can I go:** one primary action per screen.
- **Am I on track:** chosen dates and guests are repeated at the top of every step and can be changed there.
- **Am I there:** the confirmation states the reference and the dates in its first lines.

## Open questions

- Does the hotel have a restaurant or tours worth their own section?
