import React, { useContext } from 'react'
import { DataContext } from '../../Provider/DataProvider';

export interface Props{
    element: any;
}

export const DashboardComponent = (props: Props) => {


  return (
    <div className='flex flex-column justify-content-center align-items-center' style={{borderRadius: "10px", backgroundColor: "white", width: "25%", height: "90%"}}>
        <h1>{props.element.number}</h1>
        <h3>{props.element.text}</h3>
    </div>
  )
}
