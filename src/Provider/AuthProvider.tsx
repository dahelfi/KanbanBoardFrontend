import React, { PropsWithChildren, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const Authcontext = React.createContext<any>(undefined); 

export const AuthProvider = (props: PropsWithChildren) => {
    let navigate = useNavigate();
    const [authToken, setAuthToken] = useState<any>(undefined);
    const [user, setUser] = useState<any>(undefined);

    const loginUser =async (username: string, password: string) => {
        let response = await fetch('http://localhost:8000/api/token/',{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"username": username, "password": password}) 
        });

        let data = await response.json();
        console.log("data ", data)
        if(response.status === 200){
            setAuthToken(data);
            setUser(jwtDecode(data.access))
            navigate("/");
        }else{
            alert("error");
        }
        
    } 

  return (
    <Authcontext.Provider value={{loginUser: loginUser, user: user}}>
        {props.children}
    </Authcontext.Provider>
  )
}
