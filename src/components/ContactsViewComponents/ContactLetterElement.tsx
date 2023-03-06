import React from 'react'

export interface Props{
    letter: string; 
}


export const ContactLetterElement = (props: Props) => {
  return (
    <div style={{borderBottom: "1px solid #D1D1D1"}}>
        <h1 className='font-normal' style={{fontSize: "21px", margin: "0.5rem 0rem 0.5rem 0.5rem"}}>{props.letter}</h1>
    </div>
   
  )
}
