'use client'
import { useState } from 'react'
export default function Force(){
 const [msg,setMsg]=useState('')
 const clear = async()=>{
   // @ts-ignore
   const Pi = window.Pi
   Pi.init({version:"2.0", sandbox:false})
   const auth = await Pi.authenticate(['payments'], (p:any)=>{})
   const res = await fetch('/api/pi/cancel-all',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({accessToken: auth.accessToken})})
   const data = await res.json()
   setMsg(JSON.stringify(data))
 }
 return (<div style={{padding:20}}><h1>FORCE CLEAR</h1><button onClick={clear} style={{background:'red',color:'white',padding:20,fontSize:20}}>🔴 FORCE CLEAR PENDING</button><pre>{msg}</pre></div>)
}