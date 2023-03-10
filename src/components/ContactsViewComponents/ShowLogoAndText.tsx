import {useContext}from 'react'
import { BLACK, DARKBLACK, LIGHTBLUE, SKYBLUE } from '../../constants';
import { DataContext } from '../../Provider/DataProvider'
import joinLogoWhite from "../../assets/join_logo_white.png"


export const ShowLogoAndText = () => {
    const dataContext = useContext(DataContext);

  return (
    <div className='flex align-items-center' style={{width: "40%", height: "100%", backgroundColor: BLACK, padding: "0rem 0rem 0rem 2rem"}}>
        <div className='flex flex-column align-items-start'>
            <img style={{width: "55px", height: "66px"}} src={joinLogoWhite}/>
            <h1 style={{margin: "0.5rem 0rem 0.5rem 0rem", color: "white", fontSize: "61px"}}>{dataContext.editModeContact ? "Edit contact" : "Add contact"}</h1>
            {dataContext.editModeContact ? null : <h4 style={{margin: "0.5rem 0rem 0.5rem 0rem", color: "white", fontSize: "27px"}}>Tasks are better with a team!</h4>}
            <div style={{width: "20%", height: "5%", borderTop: "2px solid"+SKYBLUE}}></div>
        </div>
    </div>
  )
}
