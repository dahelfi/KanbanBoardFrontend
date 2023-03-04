import React, { PropsWithChildren, useState, useContext, useEffect } from 'react'
import { TodoType } from '../types/TodoType';
import { getCookie } from '../utils/getCookie';
import { Authcontext } from './AuthProvider';
import { ContactType } from '../types/ContactType';
import { createContactObjectFromContactArray } from '../utils/createContactObjectFromContactArray';


export const DataContext = React.createContext<any|undefined>(undefined)

export const DataProvider = (props: PropsWithChildren) => {
  const authContext = useContext(Authcontext);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<any>({loading: false});
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<TodoType|undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [contactObject, setContactObject] = useState<any>(createContactObjectFromContactArray(contacts))

  
  const getTodosByUser = async ()=>{
    setLoading({...loading, loading: true})
    let csrftoken = getCookie('csrftoken');
      let response = await fetch("http://localhost:8000/api/getTodos/",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ String(authContext.authToken.access),
        'X-CSRFToken': csrftoken === null ? "" :  csrftoken,
      },
    })
      
      let data = await response.json();
    
      if(response.status === 200){
        setLoading({...loading, loading: false})
        setTodos([...data]);
      }else if(response.status === 401){
        authContext.logoutUser();
      }
  }

  const updateTodo= async(todo: TodoType)=>{
   
        setLoading({...loading, loading: true})
        console.log("hier dein todo: ", todo);
   let response = await postDataToServer("PUT", "http://localhost:8000/api/"+ todo.id +"/updateTodo/", todo)
    
    if(response.status === 200){
      console.log("success: ", response);
      getTodosByUser();
      setLoading({...loading, loading: false})
    }else{ 
      setLoading({...loading, loading: false})
      console.log("error: ", response);
      
    }
  }

  const getContactsPerUser=async()=>{
    setLoading({...loading, loading: true})
    let csrftoken = getCookie('csrftoken');
      let response = await fetch("http://localhost:8000/api/getContacts/",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ String(authContext.authToken.access),
        'X-CSRFToken': csrftoken === null ? "" :  csrftoken,
      },
    })
      
      let data = await response.json();
    
      if(response.status === 200){
        setLoading({...loading, loading: false})
        setContacts([...data]);
      }else if(response.status === 401){
        authContext.logoutUser();
      }
  }

  const deleteTodo =async (todo: TodoType) => {
    setLoading({...loading, loading: true})
    let csrftoken = getCookie('csrftoken');
      let response = await fetch("http://localhost:8000/api/"+ todo.id +"/deleteTodo/",{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ String(authContext.authToken.access),
        'X-CSRFToken': csrftoken === null ? "" :  csrftoken,
      },
    })
      
    if(response.status === 200){
      console.log("success: ", response);
      getTodosByUser();
      setLoading({...loading, loading: false})
    }else{ 
      setLoading({...loading, loading: false})
      console.log("error: ", response);
      
    }
  }

  const postTodoPerUser =async (todo: any) => {
    let csrftoken = getCookie('csrftoken');
    console.log("hier dein token: ",authContext.authToken.access);
    console.log("hier dein csrf: ",csrftoken);
    setLoading({...loading, loading: true})    

    let response = await postDataToServer("POST", "http://localhost:8000/api/createTodo/", todo)
    
    if(response.status === 200){
      console.log("success: ", response);
      setLoading({...loading, loading: false})
      getTodosByUser();
    }else{ 
      console.log("error: ", response);
      setLoading({...loading, loading: false})
      
    }

  }

  const postDataToServer = async(method: string, url: string, postDataObject?: any)=>{
    let csrftoken = getCookie('csrftoken');
    console.log("hier dein token: ",authContext.authToken.access);
    console.log("hier dein csrf: ",csrftoken);
    let response = await fetch(url,{
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ String(authContext.authToken.access),
        'X-CSRFToken': csrftoken === null ? "" :  csrftoken,
      },
      body: postDataObject ? JSON.stringify(postDataObject): ""
    })

    return response;
  }
  
  const setVisibleValue = (visiblevalue: boolean)=>{
    console.log("triggerd: ", visiblevalue);
    
    setVisibleDialog(visiblevalue);
  }

  const setCurrentTodoValue = (todo: TodoType)=>{
    setCurrentTodo({...todo});
  }

  const setEditModeValue = (editModeBoolean: boolean)=>{
    setEditMode(editModeBoolean);
  }
  
  return (
   <DataContext.Provider value={{todos: todos, deleteTodo: deleteTodo, 
                        getTodosByUser: getTodosByUser, postTodoPerUser: postTodoPerUser, 
                        updateTodo: updateTodo, loading: loading, visibleDialog: visibleDialog, 
                        setVisibleDialog: setVisibleValue, currentTodo: currentTodo, setCurrentTodo: 
                        setCurrentTodoValue, editMode: editMode, setEditMode: setEditModeValue,
                        getContactsPerUser: getContactsPerUser, contactObject: contactObject,
                        }}>
        {props.children}
   </DataContext.Provider>
  )
}
