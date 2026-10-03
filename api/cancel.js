export default async function handler(req,res){
 const {paymentId}=req.body;
 try{
  const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/cancel`,{method:'POST',headers:{'Authorization':`Key ${process.env.PI_API_KEY}`}});
  const d=await r.json();
  res.status(200).json(d);
 }catch(e){res.status(500).json({error:e.message})}
}