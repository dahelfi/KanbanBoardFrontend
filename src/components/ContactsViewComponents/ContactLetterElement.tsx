import React from 'react'
import { LIGHTGREY } from '../../constants';

export interface Props{
    letter: string; 
}


export const ContactLetterElement = (props: Props) => {
  return (
    <div style={{borderBottom: "1px solid "+ LIGHTGREY}}>
        <h1 className='font-normal' style={{fontSize: "21px", margin: "0.5rem 0rem 0.5rem 0.5rem"}}>{props.letter}</h1>
    </div>
   
  )
}
