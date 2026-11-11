import assert from "node:assert/strict";
import { test } from "node:test";
import { addDays, formatDay, formatRM, parseStay, quote } from "./pricing.ts";

test("quote matches the figures in the wireframes", () => {
  // Heritage deluxe, 3 nights at RM 368
  assert.deepEqual(quote(36800, 3), {
    nights: 3,
    room: 110400,
    serviceTax: 8832,
    tourismTax: 3000,
    total: 122232,
    deposit: 36670,
    balance: 85562,
  });
  // Family loft, 3 nights at RM 512
  assert.equal(quote(51200, 3).total, 168888);
});

test("deposit and balance always add up to the total", () => {
  for (const rate of [29800, 36800, 51200, 33333]) {
    for (let nights = 1; nights <= 30; nights++) {
      const q = quote(rate, nights);
      assert.equal(q.deposit + q.balance, q.total);
    }
  }
});

test("parseStay accepts a valid stay and counts nights", () => {
  assert.deepEqual(parseStay({ checkIn: "2026-12-12", checkOut: "2026-12-15", guests: "2" }, "2026-11-11"), {
    checkIn: "2026-12-12",
    checkOut: "2026-12-15",
    guests: 2,
    nights: 3,
  });
  // Arriving today is allowed; guests default to 2
  assert.equal(parseStay({ checkIn: "2026-11-11", checkOut: "2026-11-12" }, "2026-11-11").guests, 2);
});

test("parseStay returns null with no dates and errors on bad input", () => {
  const today = "2026-11-11";
  assert.equal(parseStay({}, today), null);
  const bad = [
    { checkIn: "2026-12-12" }, // no departure
    { checkIn: "2026-12-15", checkOut: "2026-12-12" }, // reversed
    { checkIn: "2026-12-12", checkOut: "2026-12-12" }, // zero nights
    { checkIn: "2026-11-10", checkOut: "2026-11-12" }, // past
    { checkIn: "2026-02-31", checkOut: "2026-03-02" }, // not a real date
    { checkIn: "12/12/2026", checkOut: "15/12/2026" }, // wrong format
    { checkIn: "2026-12-01", checkOut: "2027-01-15" }, // too long
    { checkIn: "2026-12-12", checkOut: "2026-12-15", guests: "9" },
    { checkIn: "2026-12-12", checkOut: "2026-12-15", guests: "abc" },
  ];
  for (const input of bad) assert.ok("error" in parseStay(input, today), JSON.stringify(input));
});

test("formatting", () => {
  assert.equal(formatRM(122232), "RM 1,222.32");
  assert.equal(formatRM(3000), "RM 30.00");
  assert.equal(formatDay("2026-12-12"), "Sat 12 Dec");
  assert.equal(addDays("2026-12-30", 3), "2027-01-02");
});
