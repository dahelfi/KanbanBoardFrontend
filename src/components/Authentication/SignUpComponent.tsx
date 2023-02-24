import { Card } from 'primereact/card';
import { BLACK, BRIGHTWHITE, SKYBLUE } from '../../constants';
import { InputText } from 'primereact/inputtext';
import {Button} from 'primereact/button'
import { Link } from 'react-router-dom';

export const SignUpComponent = () => {
  return (
    <Card style={{backgroundColor: BRIGHTWHITE, width: "100%", maxWidth: "500px", height: "100%", maxHeight: "500px", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Link to={"/auth/signin"}> <i className="pi pi-arrow-left" style={{color: SKYBLUE, cursor: "pointer"}}/>
      </Link>

    <div className='p-card-title' style={{display: "flex", justifyContent: "center", borderBottom: "2px solid"+ SKYBLUE, marginBottom: "16px", }}>
        <h1 style={{height: "50px"}}>Signup</h1>
    </div>
  
   <div style={{width: "100%"}} className='flex flex-column align-items-center' >
   <span className="p-input-icon-right mb-3">
        <i className="pi pi-user" />
        <InputText placeholder="Name" />
    </span>
   <span className="p-input-icon-right mb-3">
        <i className="pi pi-envelope" />
        <InputText placeholder="Email" />
    </span>
    <span className="p-input-icon-right mb-3">
        <i className="pi pi-lock" />
        <InputText  type={"password"} placeholder="Password" />
    </span>
    <Link to="" className="mb-2" style={{color: SKYBLUE}}>Forgot my password</Link>
    <Button className='flex justify-content-center align-items-center' style={{backgroundColor: BLACK, color: "white", width: "145px", height: "51px"}}>Signup</Button>
   </div>
</Card>
  )
}
