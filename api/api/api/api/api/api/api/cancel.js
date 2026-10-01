export default async function handler(req,res){
 const {paymentId} = req.body;
 const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/cancel`,{
  method:'POST',
  headers:{'Authorization':'Key '+process.env.PI_API_KEY}
 });
 const data = await r.json();
 res.json(data);
}