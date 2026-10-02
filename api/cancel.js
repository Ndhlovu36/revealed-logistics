export default async function handler(req, res) {
  const { paymentId } = req.body;
  const key = process.env.PI_API_KEY;
  if (!key) return res.status(500).json({ error: "PI_API_KEY missing in Vercel" });
  
  const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/cancel`, {
    method: "POST",
    headers: { Authorization: `Key ${key}` }
  });
  const data = await r.json();
  res.json(data);
}