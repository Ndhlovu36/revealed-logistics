// /api/complete.js - REVEALED LOGISTICS
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error: 'Use POST'});

  try {
    const { paymentId, txid, clientEmail, clientName } = req.body;
    if (!paymentId) return res.status(400).json({error: 'paymentId missing'});

    const PI_API_KEY = process.env.PI_API_KEY;
    if (!PI_API_KEY) return res.status(500).json({error: 'PI_API_KEY not set in Vercel'});

    // If no txid (clearing pending), just return OK to unblock user
    if (!txid) {
      console.log('COMPLETE without txid - clearing pending', paymentId);
      return res.status(200).json({success: true, message: 'Pending cleared without txid', paymentId});
    }

    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });

    const data = await piRes.json();
    console.log('COMPLETE:', paymentId, txid, piRes.status, data);

    if (!piRes.ok) {
      return res.status(piRes.status).json({error: 'Pi complete failed', details: data, paymentId, txid});
    }

    // TODO: Send invoice to revealed.logistics@gmail.com + clientEmail here
    // You can add email logic later

    return res.status(200).json({success: true, data, invoiceTo: clientEmail || 'client'});

  } catch (e) {
    console.error('Complete error', e);
    return res.status(500).json({error: e.message});
  }
}