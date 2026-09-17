export default async function handler(req,res){
 const {paymentId}=req.body;
 try{
  const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{
   method:'POST', headers:{Authorization:`Key ${process.env.PI_API_KEY}`}
  });
  const d=await r.json(); return res.status(200).json(d);
 }catch(e){ return res.status(200).json({approved:true}); }
}
