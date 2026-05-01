import { getStore } from "@netlify/blobs";

export default async () => {
  try {
    const store = getStore("signals");

    const data = await store.get("data", { type: "json" }) || [];

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500
    });
  }
};
