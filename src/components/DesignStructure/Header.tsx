import {useContext} from 'react'
import imagePlaceholder from "../../assets/imagePlaceholder.png"
import { BLACK, centerItems } from '../../constants'
import { Authcontext } from '../../Provider/AuthProvider'

export const Header = () => {
  const authContext = useContext(Authcontext)

  return (
    <div className={centerItems} style={{width: "100%", height: "89px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)"}}>
        <div className={centerItems} style={{width: "60%"}}> 
            <h3>Kanban Project Management Tool</h3>
        </div>
      
       <div className={centerItems} style={{width: "40%"}}>

        <i onClick={authContext.logoutUser} style={{color: "gray", fontSize: "30px", marginRight: "16px", cursor: "pointer"}} className='pi pi-power-off'/>
       <div style={{borderRadius: "100%", border: "3px solid"+ BLACK, padding: "3px", marginLeft: "16px"}}>  

       <img style={{objectFit: "cover", width: "48px", height: "48px"}} src={imagePlaceholder}/>
       </div>
       </div>
    </div>
  )
}
