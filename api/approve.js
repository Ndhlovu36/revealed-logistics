// api/approve.js - SAFE VERSION FOR ALL 6 APPS
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  
  const { paymentId } = req.body;
  if(!paymentId) return res.status(400).json({error: "no paymentId"});

  try {
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await piRes.json();
    return res.status(200).json(data);
  } catch(e){
    return res.status(500).json({error: e.message});
  }
}
