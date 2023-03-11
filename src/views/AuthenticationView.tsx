import JoinLogo from '../assets/join_logo_black.png'
import {Button} from 'primereact/button'
import { BLACK, BRIGHTWHITE } from '../constants';
import { Link, Outlet } from 'react-router-dom';

export const AuthenticationView = () => {

  return (
    <>
      <div id="authentication-main-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start"}} > 
  
      <img src={JoinLogo} style={{minWidth: "5vw", minHeight:"8vh", objectFit: "contain", marginLeft: "4rem", marginTop: "2rem"}} />
      
         
         <div style={{display: "flex"}} className="pr-8 pt-4 flex align-items-center">
          <h4 className='mr-3'>Not a Join user?</h4>
         <Link className='flex justify-content-center align-items-center' to={"/auth/signup"} style={{backgroundColor: BLACK, color: "white", height: "51px", width: "145px", textDecoration: "none", borderRadius: "7px"}}>Sign up</Link>
         </div>
      
      </div>
      <div style={{display: "flex", justifyContent: "center", alignItems: "flex-start", height: "87vh", width:"100%", paddingTop: "8rem"}}>
       <Outlet/>
      </div>    
    </>
  )
}
