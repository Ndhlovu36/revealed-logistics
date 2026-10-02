export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
 res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS') return res.status(200).end();
 const {paymentId}=req.body;
 if(!paymentId) return res.status(400).json({error:"paymentId missing"});
 try{
  const piRes=await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{
   method:"POST",
   headers:{Authorization:`Key ${process.env.PI_API_KEY}`,"Content-Type":"application/json"}
  });
  const data=await piRes.json();
  console.log("APPROVE:",data);
  if(!piRes.ok) return res.status(piRes.status).json(data);
  return res.json(data);
 }catch(e){return res.status(500).json({error:e.message})}
}