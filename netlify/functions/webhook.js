import { getStore } from "@netlify/blobs";

export default async (req) => {
  try {
    const store = getStore("signals");

    const body = await req.json();

    const signal = {
      id: Date.now(),
      action: body.action || "BUY",
      symbol: body.symbol || "EURUSD",
      lot: body.lot || "0.01",
      sl: body.sl || "",
      tp: body.tp || "",
      time: new Date().toISOString()
    };

    let existing = await store.get("data", { type: "json" }) || [];

    existing.unshift(signal);
    existing = existing.slice(0, 100);

    await store.set("data", existing);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500
    });
  }
};
