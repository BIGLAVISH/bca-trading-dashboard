exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    global.signals = body.signals || [];

    return {
      statusCode: 200,
      body: JSON.stringify({ saved: true })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
