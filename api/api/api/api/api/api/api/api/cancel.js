export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'});
  const { paymentId } = req.body;
  try {
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/cancel`, {
      method:'POST',
      headers:{'Authorization': `Key ${process.env.PI_API_KEY}` }
    });
    const data = await piRes.json();
    return res.status(200).json({success:true, data});
  } catch (e) {
    return res.status(500).json({error:e.message});
  }
}