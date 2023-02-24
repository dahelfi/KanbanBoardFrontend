import React from 'react'
import imagePlaceholder from "../../assets/imagePlaceholder.png"
import { BLACK, centerItems } from '../../constants'

export const Header = () => {
  return (
    <div className={centerItems} style={{width: "100%", height: "89px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)"}}>
        <div className={centerItems} style={{width: "60%"}}> 
            <h3>Kanban Project Management Tool</h3>
        </div>
      
       <div className={centerItems} style={{width: "40%"}}>

        <div style={{color: "gray", fontSize: "30px", marginRight: "16px"}} className='pi pi-question-circle'/>
       <div style={{borderRadius: "100%", border: "3px solid"+ BLACK, padding: "3px", marginLeft: "16px"}}>  

       <img style={{objectFit: "cover", width: "48px", height: "48px"}} src={imagePlaceholder}/>
       </div>
       </div>
    </div>
  )
}
