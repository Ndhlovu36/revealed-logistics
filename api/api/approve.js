export default async function handler(req, res) {
  const { paymentId } = req.body;
  const PI_API_KEY = process.env.PI_API_KEY; // get from develop.pi
  
  const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: 'POST',
    headers: { 'Authorization': `Key ${PI_API_KEY}` }
  });
  
  if(response.ok){ res.status(200).json({ok:true}); }
  else{ const err=await response.text(); res.status(500).json({error:err}); }
}