import React, { useContext } from 'react'
import { DataContext } from '../../Provider/DataProvider';

export interface Props{
    element: any;
}

export const DashboardComponent = (props: Props) => {

  return (
    <div className='flex flex-column justify-content-center align-items-center' style={{boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",borderRadius: "10px", backgroundColor: "white", width: "30%", height: "90%"}}>
        <h1 style={{fontSize: "55px", margin: "0px"}}>{props.element.number}</h1>
        <h3 style={{fontSize: "15px"}}>{props.element.text}</h3>
    </div>
  )
}
