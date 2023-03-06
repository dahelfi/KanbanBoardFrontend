import React from 'react'
import { centerItems, LIGHTBLUE } from '../../constants'


export const ContactHeader = () => {
    
  return (
    <div className="flex align-items-center" style={{width: "100%", height: "20%", padding: "3rem 0rem 3rem 4rem"}}>
     
     
        <h1 style={{margin: "0rem 3rem 0rem 0rem", paddingRight: "4rem", fontSize: "55px", borderRight: "2px solid" +LIGHTBLUE}}>Contacts</h1>
        <h2 style={{marginLeft: "1rem", width: "50%", fontWeight: "normal"}}>Better with a Team!</h2>
   
      
    </div>
  )
}



