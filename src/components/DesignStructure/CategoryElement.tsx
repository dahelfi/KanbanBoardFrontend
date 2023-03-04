import React from 'react'
import { DARKBLUE, PINK, SKYBLUE } from '../../constants';
import { CATEGORIES } from '../../types/CategoriesEnum';

export interface Props{
    category: string;
    width: string;
    height: string;
    fontSize: string;
}

export const CategoryElement = (props: Props) => {
    let color: string= ""
    if(props.category === CATEGORIES.BUSINESS){
        color = DARKBLUE;
    }else if(props.category == CATEGORIES.PRIVATE){
        color = SKYBLUE;
    }else{
        color = PINK;
    }
  return (
    <div className='flex justify-content-center align-items-center' style={{backgroundColor: color, padding: "4px 16px 4px 16px", borderRadius: "5px", color: "white", width: props.width, height: props.height, marginLeft: "16px"}}>
        <span style={{fontSize: props.fontSize}}>{props.category}</span>
    </div>
  )
}
