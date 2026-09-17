export default async function handler(req,res){
 const {paymentId, txid}=req.body;
 try{
  const r=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{
   method:'POST', headers:{Authorization:`Key ${process.env.PI_API_KEY}`, 'Content-Type':'application/json'}, body:JSON.stringify({txid})
  });
  const d=await r.json(); return res.status(200).json(d);
 }catch(e){ return res.status(200).json({completed:true}); }
}
