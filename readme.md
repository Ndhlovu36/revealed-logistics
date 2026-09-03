<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>REVEALED LOGISTICS</title>
<script src="https://sdk.minepi.com/pi-sdk.js"></script>
<script>Pi.init({version:"2.0",sandbox:true});</script>
<style>
body{margin:0;font-family:Arial;background:#0a1931;color:#fff;text-align:center}
.h{padding:20px;border-bottom:3px solid #d4af37}
.logo{font-size:24px;font-weight:bold;color:#d4af37}
.card{background:#fff;color:#0a1931;margin:15px auto;max-width:400px;border-radius:15px;padding:20px;text-align:left}
select,input{width:100%;padding:12px;margin-top:5px;border-radius:8px;border:1px solid #ccc}
.btn{width:100%;padding:14px;margin-top:12px;border:none;border-radius:10px;font-weight:bold}
.btn-pi{background:#d4af37;color:#0a1931}
.btn-pay{background:#0a1931;color:#d4af37;border:2px solid #d4af37}
</style>
</head>
<body>
<div class="h">
<div class="logo">REVEALED LOGISTICS</div>
<div>PiOS Logistics - Pay with Pi Only</div>
</div>
<div class="card">
<label>Service</label>
<select id="service">
<option>Tautliner 15 Pi</option>
<option>Reefer 20 Pi</option>
<option>Side Tipper 18 Pi</option>
</select>
<label>From</label><input id="from">
<label>To</label><input id="to">
<label>Name</label><input id="name">
<button class="btn btn-pi" onclick="login()">Login with Pi</button>
<div id="user" style="color:green;text-align:center"></div>
<button class="btn btn-pay" onclick="pay()">Pay with Pi - Book</button>
<div id="status" style="text-align:center"></div>
</div>
<script>
let u=null;
function login(){
Pi.authenticate(['username','payments'],()=>{}).then(a=>{
u=a.user;
document.getElementById('user').innerText="Welcome @"+a.user.username;
});
}
function pay(){
if(!u){alert("Login first");return;}
let s=document.getElementById('service').value;
let amt=15;
Pi.createPayment({amount:amt,memo:s},{onReadyForServerApproval:id=>{fetch('/api/approve-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({paymentId:id})})},onReadyForServerCompletion:(id,txid)=>{fetch('/api/complete-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({paymentId:id,txid:txid})}).then(()=>{document.getElementById('status').innerText="Paid "+amt+" Pi Success"})}});
}
</script>
</body>
</html>
