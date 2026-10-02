export default async function handler(req, res) {
  const { paymentId, txid } = req.body;
  const apiKey = process.env.PI_API_KEY;
  if (!apiKey) return res.status(500).json({error:"PI_API_KEY missing"});
  if (!txid) return res.status(400).json({error:"txid missing"});

  try{
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: { "Authorization": `Key ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ txid: txid })
    });
    const data = await piRes.json();
    console.log("Complete result:", data);
    return res.status(piRes.status).json(data);
  }catch(e){
    return res.status(500).json({error:e.message});
  }
}