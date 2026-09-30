// /api/approve.js - REVEALED LOGISTICS
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error: 'Use POST'});

  try {
    const { paymentId } = req.body;
    if (!paymentId) return res.status(400).json({error: 'paymentId missing'});
    
    const PI_API_KEY = process.env.PI_API_KEY;
    if (!PI_API_KEY) return res.status(500).json({error: 'PI_API_KEY not set in Vercel'});

    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await piRes.json();
    console.log('APPROVE:', paymentId, piRes.status, data);

    if (!piRes.ok) {
      return res.status(piRes.status).json({error: 'Pi approve failed', details: data, paymentId});
    }

    return res.status(200).json({success: true, data});

  } catch (e) {
    console.error('Approve error', e);
    return res.status(500).json({error: e.message});
  }
}