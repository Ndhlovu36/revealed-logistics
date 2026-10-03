export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'});
  const { paymentId, txid } = req.body;
  if (!paymentId || !txid) return res.status(400).json({error:'need paymentId txid'});
  try {
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method:'POST',
      headers:{
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ txid })
    });
    const data = await piRes.json();
    console.log('Complete result:', data);
    return res.status(200).json({success:true, data});
  } catch (e) {
    console.error(e);
    return res.status(500).json({error:e.message});
  }
}