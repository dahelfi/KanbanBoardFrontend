import React from 'react'
import { GREENOK, ORGANGEMIDDLEURGENT, URGENTRED } from '../../constants';
import { PRIORITY } from '../../types/PriorityEnum';

export interface Props{
   priority: string;
}

export const PrioElementWithColor = (props: Props) => {
    let color: string ="";
    let icon: string = "";

    if(props.priority === PRIORITY.URGENT){
        color = URGENTRED;
        icon = "pi pi-chevron-up" 
    }else if (props.priority === PRIORITY.LOW){
        color = GREENOK;
        icon = "pi pi-chevron-down";
    }else{
        color = ORGANGEMIDDLEURGENT;

    }

  return (
    <div className='flex align-items-center' style={{ padding: "0.25rem 2rem 0.25rem 2rem", backgroundColor: color, color: "white", borderRadius: "8px", height: "100%"}} >
        <p style={{margin: "0px 8px 0px 0px"}}>{props.priority}</p>
        {props.priority === PRIORITY.MEDIUM ? <span>=</span> : <i style={{fontSize: "25px"}} className={icon}/>}
    </div>
  )
}
