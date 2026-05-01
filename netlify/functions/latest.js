const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    const store = getStore("bca-signals");
    const signals = JSON.parse((await store.get("signals")) || "[]");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(signals)
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: e.message })
    };
  }
};
