let latestSignal = null;

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(latestSignal ? [latestSignal] : [])
      };
    }

    const data = JSON.parse(event.body || "{}");

    latestSignal = {
      id: Date.now().toString(),
      time: new Date().toISOString(),
      action: data.action || "BUY",
      symbol: data.symbol || data.ticker || "XRPUSD",
      price: data.price || data.close || "",
      sl: data.sl || "10",
      tp: data.tp || "20",
      lot: data.lot || "0.01",
      pattern: data.pattern || "TradingView",
      result: "OPEN",
      profit: 0
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ ok: true, signal: latestSignal })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: e.message })
    };
  }
};
