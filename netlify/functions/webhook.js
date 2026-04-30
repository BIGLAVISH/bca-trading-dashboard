exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const body = event.body ? JSON.parse(event.body) : {};

    const data = { ...params, ...body };

    const signal = {
      id: Date.now(),
      time: new Date().toISOString(),
      action: (data.action || data.signal || "").toUpperCase(),
      symbol: data.symbol || data.ticker || "",
      price: data.price || "",
      sl: data.sl || "",
      tp: data.tp || "",
      result: "OPEN",
      pattern: data.pattern || "N/A"
    };

    global.signals = global.signals || [];
    global.signals.unshift(signal);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, signal })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
