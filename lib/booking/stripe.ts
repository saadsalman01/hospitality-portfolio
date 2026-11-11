// Server only. Talks to Stripe over plain HTTPS so the payment layer stays small and swappable.

async function stripe<T>(path: string, params?: Record<string, string>): Promise<T> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY must be set");
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: params ? "POST" : "GET",
    headers: { Authorization: `Bearer ${key}` },
    body: params ? new URLSearchParams(params) : undefined,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Stripe ${path.split("/")[0]} failed: ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

/** Opens a Stripe payment page for the deposit and returns its address. */
export async function createDepositCheckout(o: {
  publicId: string;
  reference: string;
  email: string;
  depositSen: number;
  title: string;
  description: string;
  minutes: number;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  const session = await stripe<{ url: string }>("checkout/sessions", {
    mode: "payment",
    client_reference_id: o.publicId,
    customer_email: o.email,
    expires_at: String(Math.floor(Date.now() / 1000) + o.minutes * 60 + 30), // Stripe needs at least 30 minutes
    success_url: o.successUrl,
    cancel_url: o.cancelUrl,
    "metadata[reference]": o.reference,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "myr",
    "line_items[0][price_data][unit_amount]": String(o.depositSen),
    "line_items[0][price_data][product_data][name]": o.title,
    "line_items[0][price_data][product_data][description]": o.description,
  });
  return session.url;
}

/** The booking a payment page belongs to, and whether it was paid. Null for an unknown id. */
export async function getCheckout(sessionId: string): Promise<{ publicId: string; paid: boolean } | null> {
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  try {
    const s = await stripe<{ client_reference_id: string | null; payment_status: string }>(
      `checkout/sessions/${sessionId}`,
    );
    return s.client_reference_id ? { publicId: s.client_reference_id, paid: s.payment_status === "paid" } : null;
  } catch {
    return null;
  }
}
