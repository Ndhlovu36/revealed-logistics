'use client'
import { useState } from 'react'

export default function ForcePage(){
  const [log,setLog]=useState('Ready. Tap button...')

  const forceClear = async()=>{
    try{
      setLog('Opening Pi SDK...')
      // @ts-ignore
      const Pi = window.Pi
      if(!Pi){ setLog('ERROR: Open this in Pi Browser only!'); return }
      Pi.init({version:"2.0", sandbox:false})
      
      const onIncomplete = async(payment:any)=>{
        setLog('Found pending: '+payment.identifier+'\nCancelling...')
        const res = await fetch('/api/pi/cancel',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({paymentId: payment.identifier})})
        const data = await res.json()
        setLog('CANCEL RESULT: '+JSON.stringify(data,null,2))
        return data
      }

      setLog('Authenticating...')
      await Pi.authenticate(['payments'], onIncomplete)
      setLog('No pending found or already cleared! Close and reopen app.')
      
    }catch(e:any){
      setLog('ERROR: '+e.message)
    }
  }

  return(
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>FORCE CLEAR PENDING</h1>
      <p>Tap button in Pi Browser</p>
      <button onClick={forceClear} style={{background:'red', color:'white', padding:'20px', fontSize:'22px', fontWeight:'bold', borderRadius:'10px', width:'100%'}}>🔴 FORCE CLEAR NOW</button>
      <pre style={{background:'#eee', padding:15, marginTop:20, whiteSpace:'pre-wrap'}}>{log}</pre>
    </div>
  )
}