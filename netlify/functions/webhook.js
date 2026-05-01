import { getStore } from "@netlify/blobs";

export const handler = async (event) => {
  try {
    const store = getStore({
      name: "signals",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN
    });

    let data = {};

    if (event.httpMethod === "POST" && event.body) {
      data = JSON.parse(event.body);
    } else {
      data = event.queryStringParameters || {};
    }

    const signal = {
      id: Date.now().toString(),
      time: new Date().toISOString(),
      action: data.action || "BUY",
      symbol: data.symbol || "EURUSD",
      price: data.price || "",
      lot: data.lot || "0.01",
      sl: data.sl || "",
      tp: data.tp || "",
      pattern: data.pattern || "TradingView",
      result: "OPEN",
      profit: 0
    };

    let existing = await store.get("data", { type: "json" });
    if (!Array.isArray(existing)) existing = [];

    existing.unshift(signal);
    existing = existing.slice(0, 100);

    await store.setJSON("data", existing);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ ok: true, signal })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
