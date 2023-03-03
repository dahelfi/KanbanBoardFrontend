import React from 'react'

export interface Props{
    dashboardElement: any;
}

export const DashboardComponentWithImage = (props: Props) => {

  return (
    <div className='flex flex-column justify-content-center align-items-center' style={{boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",borderRadius: "10px", backgroundColor: "white", width: "47%", height: "90%"}}>
        <div className='flex'>
            <img style={{objectFit: "contain", marginRight: "1rem"}} src={props.dashboardElement.img}/>
            <div className='flex flex-column justify-content-center align-items-center'>
                <h1 style={{margin: "0px 0px -1rem 0px", fontSize: "55px"}}>{props.dashboardElement.number}</h1>
                <h5>{props.dashboardElement.text}</h5>
            </div>
        </div>
    </div>
  )
}
