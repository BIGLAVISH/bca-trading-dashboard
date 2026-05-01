import { getStore } from "@netlify/blobs";

export const handler = async () => {
  try {
    const store = getStore({
      name: "signals",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN
    });

    let data = await store.get("data", { type: "json" });
    if (!Array.isArray(data)) data = [];

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
