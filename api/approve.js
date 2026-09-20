export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { paymentId } = req.body;
  const apiKey = process.env.PI_API_KEY;
  if (!apiKey) return res.status(500).json({error:'PI_API_KEY missing'});
  const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method:'POST', headers:{'Authorization':`Key ${apiKey}`,'Content-Type':'application/json'}
  });
  const data = await r.json(); return res.status(200).json(data);
}
