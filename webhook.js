const { getStore } = require('@netlify/blobs');

function parseSignal(body){
  if(!body) return { raw:'', action:'' };
  let raw = typeof body === 'string' ? body.trim() : JSON.stringify(body);
  let obj = {};
  try { obj = typeof body === 'string' ? JSON.parse(body) : body; } catch(e) {}
  const action = (obj.action || obj.signal || raw.split('|')[0] || '').toString().trim().toUpperCase();
  return {
    id: Date.now().toString()+Math.random().toString(16).slice(2),
    ts: new Date().toISOString(),
    action,
    symbol: obj.symbol || obj.ticker || '',
    price: obj.price || obj.close || '',
    sl: obj.sl || '',
    tp: obj.tp || '',
    lot: obj.lot || '',
    pattern: obj.pattern || '',
    rr: obj.rr || '',
    raw
  };
}

exports.handler = async (event) => {
  if(event.httpMethod !== 'POST') return { statusCode: 405, body: 'POST only' };
  const store = getStore('bca-signals');
  const signal = parseSignal(event.body || '');
  if(!['BUY','SELL','CLOSE','CLOSEBUY','CLOSESELL'].includes(signal.action)) {
    return { statusCode: 400, body: JSON.stringify({ok:false,error:'Bad action', signal}) };
  }
  const listRaw = await store.get('signals.json') || '[]';
  let list = [];
  try { list = JSON.parse(listRaw); } catch(e) {}
  list.unshift(signal);
  list = list.slice(0, 500);
  await store.set('latest.json', JSON.stringify(signal));
  await store.set('signals.json', JSON.stringify(list));
  return { statusCode: 200, headers:{'content-type':'application/json'}, body: JSON.stringify({ok:true, signal}) };
};
