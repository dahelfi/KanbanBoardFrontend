import React, { PropsWithChildren, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { url } from '../constants';

export const Authcontext = React.createContext<any>(undefined); 

export const AuthProvider = (props: PropsWithChildren) => {
    let navigate = useNavigate();
    const [authToken, setAuthToken] = useState<any>(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') as string) : undefined);
    const [loading, setLoading] = useState<any>({loading: true})   
    const [user, setUser] = useState<any>(()=>localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens') as string) : undefined);
    
    const loginUser =async (username: string, password: string) => {
        
        let response = await fetch(url+'token/',{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"username": username, "password": password}) 
        });

        let data = await response.json();
    
        if(response.status === 200){
            setAuthToken(data);
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate("/");
        }else{
            alert("error");
        }
    } 

    useEffect(()=>{
        if(loading.loading){
            console.log("loading getriggert");
            
            updateToken();
        }
        let interval = setInterval(()=>{
            if(authToken){
                console.log("update getriggert");
                updateToken();
            }  
        }, 1*60*1000)
        return ()=> clearInterval(interval)
    },[authToken, loading])

    const updateToken =async ()=>{
        console.log("dein updatetoken: ", authToken?.refresh);
        
        let response = await fetch(url+ 'token/refresh/',{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"refresh": authToken?.refresh}) 
        });

        let data = await response.json();
        if(response.status === 200){
            console.log("ich wurde korrekt ausgeführt");
            
            setAuthToken(data);
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate("/");
        }else{
           logoutUser();
           console.log("logout wird getriggert")
        }

        if(loading.loading){
            setLoading({...loading, loading: false});
        }
    }

    const logoutUser = ()=>{
        setAuthToken(undefined);
        setUser(undefined);
        localStorage.removeItem('authTokens');
        navigate('/auth/signin')
    }

  return (
    <Authcontext.Provider value={{loginUser: loginUser, user: user, logoutUser: logoutUser, authToken: authToken}}>
        {loading.loading  ? null : props.children}
    </Authcontext.Provider>
  )
}
