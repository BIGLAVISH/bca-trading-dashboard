exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const signal = {
      id: Date.now(),
      time: new Date().toISOString(),
      action: body.action || body.signal || "",
      symbol: body.symbol || body.ticker || "",
      price: body.price || "",
      sl: body.sl || "",
      tp: body.tp || "",
      result: "OPEN"
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
