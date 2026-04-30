const { getStore } = require('@netlify/blobs');
exports.handler = async () => {
  const store = getStore('bca-signals');
  const latest = await store.get('latest.json') || '{}';
  return { statusCode: 200, headers:{'content-type':'application/json','cache-control':'no-store'}, body: latest };
};
