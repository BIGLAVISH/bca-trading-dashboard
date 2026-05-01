let signals = global.signals || [];

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    let body = {};

    if (event.body) {
      try { body = JSON.parse(event.body); } catch { body = {}; }
    }

    const data = { ...params, ...body };

    const signal = {
      id: Date.now(),
      time: new Date().toISOString(),
      action: String(data.action || data.signal || "TEST").toUpperCase(),
      symbol: data.symbol || data.ticker || "UNKNOWN",
      price: data.price || data.close || "",
      sl: data.sl || "",
      tp: data.tp || "",
      lot: data.lot || "0.01",
      pattern: data.pattern || "TradingView Signal",
      result: "OPEN",
      profit: Number(data.profit || 0)
    };

    signals.unshift(signal);
    global.signals = signals;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, signal })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
