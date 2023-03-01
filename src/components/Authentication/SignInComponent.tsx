import { Card } from 'primereact/card';
import { BLACK, BRIGHTWHITE, SKYBLUE } from '../../constants';
import { InputText } from 'primereact/inputtext';
import {Button} from 'primereact/button'
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Authcontext } from '../../Provider/AuthProvider';
import { Password } from 'primereact/password';
import './login.scss'

export const SignInComponent = () => {
  const authenticationContext = useContext(Authcontext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
   
  return (
    <Card  style={{backgroundColor: BRIGHTWHITE, width: "100%", maxWidth: "500px", height: "100%", maxHeight: "450px", display: "flex", flexDirection: "column", alignItems: "center"}}>
  
        <div className='p-card-title' style={{display: "flex", justifyContent: "center", borderBottom: "2px solid"+ SKYBLUE, marginBottom: "16px"}}>
            <h1>Log in</h1>
        </div>
      
       <div className='p-card-content flex flex-column align-items-center' >
       <span className="p-input-icon-right mb-3">
            <i className="pi pi-user" />
            <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </span>
        <span className="p-input-icon-right mb-3">
            <i className="pi pi-lock" />
            <InputText value={password} onChange={(e) => setPassword(e.target.value)} type={"password"} placeholder="Password" />
            {/* <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} /> */}
        </span>
        <Link to="" className="mb-2" style={{color: SKYBLUE, textDecoration: "none"}}>Forgot my password</Link>
        <Button className='flex justify-content-center align-items-center' onClick={()=>authenticationContext.loginUser(username, password)} style={{backgroundColor: BLACK, color: "white", width: "145px", height: "51px"}}>Login</Button>
       </div>
    </Card>
  )
}
