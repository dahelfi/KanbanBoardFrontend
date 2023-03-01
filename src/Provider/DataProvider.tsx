import React, { PropsWithChildren, useState, useContext, useEffect } from 'react'
import { TodoType } from '../types/TodoType';
import { getCookie } from '../utils/getCookie';
import { Authcontext } from './AuthProvider';

export const DataContext = React.createContext<any|undefined>(undefined)

export const DataProvider = (props: PropsWithChildren) => {
  const authContext = useContext(Authcontext);
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getTodosByUser = async ()=>{
    let csrftoken = getCookie('csrftoken');
      console.log("token: ", authContext.authToken.access);
      
      let response = await fetch('http://localhost:8000/api/getTodos/',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ String(authContext.authToken.access),
          'X-CSRFToken': csrftoken === null ? "" :  csrftoken,
        }
      })
      
      let data = await response.json();
    
      
      if(response.status === 200){
        setTodos([...data]);
      }else if(response.status === 401){
        authContext.logoutUser();
      }
  }

  const postTodoPerUser =async (todo: any) => {
    let csrftoken = getCookie('csrftoken');
    console.log("hier dein token: ",authContext.authToken.access);
    console.log("hier dein csrf: ",csrftoken);
        
    let response = await fetch('http://localhost:8000/api/createTodo/',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ String(authContext.authToken.access),
        'X-CSRFToken': csrftoken === null ? "" :  csrftoken,
      },
      body: JSON.stringify(todo)
    })
    
    if(response.status === 200){
      console.log("success: ", response);
      
    }else{ 
      console.log("error: ", response);
      
    }

  }
  

  return (
   <DataContext.Provider value={{todos: todos, getTodosByUser: getTodosByUser, postTodoPerUser: postTodoPerUser}}>
        {props.children}
   </DataContext.Provider>
  )
}
