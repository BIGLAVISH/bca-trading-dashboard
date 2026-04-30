exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body || "{}");

    global.signals = data.signals || [];

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
