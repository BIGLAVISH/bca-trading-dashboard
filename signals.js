const { getStore } = require('@netlify/blobs');
exports.handler = async () => {
  const store = getStore('bca-signals');
  const data = await store.get('signals.json') || '[]';
  return { statusCode: 200, headers:{'content-type':'application/json','cache-control':'no-store'}, body: data };
};
