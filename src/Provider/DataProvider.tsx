import { PropsWithChildren, useState, useContext, useRef, createContext, useEffect } from 'react'
import { TodoType } from '../types/TodoType';
import { getCookie } from '../utils/getCookie';
import { Authcontext } from './AuthProvider';
import { ContactType } from '../types/ContactType';
import { createSortedArrayFromContactArray } from '../utils/createSortedArrayFromContactArray';
import { returnContactsArrayAsMap } from '../utils/parseContacts';
import { devBASEURL, prodBASEURL } from '../constants';

export const DataContext = createContext<any|undefined>(undefined)

export const DataProvider = (props: PropsWithChildren) => {
  const authContext = useContext(Authcontext);
  const url = prodBASEURL === "" ? devBASEURL : prodBASEURL;
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<any>({loading: false});
  const [visibleTodoDialog, setVisibleTodoDialog] = useState<boolean>(false);
  const [visibleContactDialog, setVisibleContactDialog] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<TodoType|undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [currentContact, setCurrentContact] = useState<ContactType|undefined>(undefined);
  const [editModeContact, setEditModeContact] = useState<boolean>(true);
  const [contactsAsMap, setContactsAsMap] = useState<any>()
  const toast = useRef<any>(undefined); 
  
useEffect(()=>{
  if(contacts.length > 0){
    setContactsAsMap(returnContactsArrayAsMap(contacts));
  }
},[contacts])


const showToast = ( severity: string,summary: string,  detail: string,)=>{
  if(toast.current){
    toast.current.show({severity: severity, summary: summary, detail: detail, life: 3000})
  }
}

  const getTodosByUser = async ()=>{
    setLoading({...loading, loading: true})
    let csrftoken = getCookie('csrftoken');
      let response = await fetch(url+"getTodos/",{
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

  const updateTodo = async(todo: TodoType, showToastBoolean: boolean)=>{
    setLoading({...loading, loading: true})
    console.log("hier dein todo: ", todo);
    let response = await postDataToServer("PUT", url+ todo.id +"/updateTodo/", todo)
    
    if(response.status === 200 && !showToastBoolean){
      console.log("success: ", response);
      getTodosByUser();
      setLoading({...loading, loading: false})

    }else if(response.status === 200 && showToastBoolean){
      getTodosByUser();
      setLoading({...loading, loading: false})
      showToast("success", "Success", "Todo was successfully created");
    }else{ 
      setLoading({...loading, loading: false})
      console.log("error: ", response);
    }
  }

  const getContactById = (id: number)=>{
    let contactsMap = new Map(contactsAsMap);
    return contactsMap.get(id);
  }

  const getContactsPerUser=async()=>{
    setLoading({...loading, loading: true})
    let csrftoken = getCookie('csrftoken');
      let response = await fetch(url + "getContacts/",{
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
        setContacts([...createSortedArrayFromContactArray(data)]);
      }else if(response.status === 401){
        authContext.logoutUser();
      }
      
  }

  const deleteTodo =async (todo: TodoType) => {
    setLoading({...loading, loading: true})
    let csrftoken = getCookie('csrftoken');
      let response = await fetch(url+ todo.id +"/deleteTodo/",{
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
      showToast("success", "Success", "Todo successfully deleted");
    }else{ 
      setLoading({...loading, loading: false})
      console.log("error: ", response);
      showToast("error", "Error", "Todo was not sucessfully deleted");
    }
  }

  const deleteContact =async (contact: ContactType) => {
    setLoading({...loading, loading: true})
    let csrftoken = getCookie('csrftoken');
      let response = await fetch(url+ contact.id +"/deleteContact/",{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ String(authContext.authToken.access),
        'X-CSRFToken': csrftoken === null ? "" :  csrftoken,
      },
    })
      
    if(response.status === 200){
      console.log("success: ", response);
      getContactsPerUser();
      setLoading({...loading, loading: false})
      showToast("success", "Success", "Contact successfully deleted");
      setCurrentContact(undefined);
    }else{ 
      setLoading({...loading, loading: false})
      console.log("error: ", response);
      showToast("error", "Error", "Contact was not sucessfully deleted");
    }
  }

  const postTodoPerUser =async (todo: any) => {
    let csrftoken = getCookie('csrftoken');
    console.log("hier dein token: ",authContext.authToken.access);
    console.log("hier dein csrf: ",csrftoken);
    setLoading({...loading, loading: true})    

    let response = await postDataToServer("POST", url + "createTodo/", todo)
    
    if(response.status === 200){
      console.log("success: ", response);
      setLoading({...loading, loading: false})
      getTodosByUser();
      showToast("success", "Success", "Contact successfully created");
    }else{ 
      console.log("error: ", response);
      setLoading({...loading, loading: false})
      showToast("error", "Error", "Todo was not sucessfully created");      
    }

  }

  const postContactPerUser =async(contact: ContactType)=>{
    let csrftoken = getCookie('csrftoken');
    console.log("hier dein token: ",authContext.authToken.access);
    console.log("hier dein csrf: ",csrftoken);
    setLoading({...loading, loading: true})    

    let response = await postDataToServer("POST", url +"createContact/", contact)
    
    if(response.status === 200){
      console.log("success: ", response);
      setLoading({...loading, loading: false})
      getContactsPerUser();
      showToast("success", "Success", "Contact successfully created")
      setVisibleContactValue(false);
    }else{ 
      console.log("error: ", response);
      showToast("error", "Error", "Contact was not successfully created")
      setLoading({...loading, loading: false}) 
    }
  }

  const updateContact =async(contact: ContactType)=>{
    let csrftoken = getCookie('csrftoken');
    console.log("hier dein token: ",authContext.authToken.access);
    console.log("hier dein csrf: ",csrftoken);
    setLoading({...loading, loading: true})    

    let response = await postDataToServer("PUT", url+ contact.id +"/updateContact/", contact)
    
    if(response.status === 200){
      console.log("success: ", response);
      setLoading({...loading, loading: false})
      showToast("success", "Success", "Contact successfully updated")
      getContactsPerUser();
    }else{ 
      console.log("error: ", response);
      setLoading({...loading, loading: false}) 
      showToast("error", "Error", "Updating didn`t work. Please try again")
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
  
  const setVisibleTodoValue = (visiblevalue: boolean)=>{
    
    setVisibleTodoDialog(visiblevalue);
  }

  const setVisibleContactValue = (visiblevalue: boolean)=>{
    setVisibleContactDialog(visiblevalue);
  }

  const setCurrentTodoValue = (todo: TodoType)=>{
    setCurrentTodo({...todo});
  }

  const setEditModeValue = (editModeBoolean: boolean)=>{
    setEditMode(editModeBoolean);
  }

  const setEditModeContactValue = (editModeBoolean: boolean)=>{
    setEditModeContact(editModeBoolean);
  }

  const setCurrentContactValue =(currentContact: ContactType)=>{
    setCurrentContact(currentContact);
  }
  
  return (
   <DataContext.Provider value={{todos: todos, deleteTodo: deleteTodo, 
                        getTodosByUser: getTodosByUser, postTodoPerUser: postTodoPerUser, 
                        updateTodo: updateTodo, loading: loading, visibleTodoDialog: visibleTodoDialog, 
                        setVisibleTodoDialog: setVisibleTodoValue, currentTodo: currentTodo, setCurrentTodo: 
                        setCurrentTodoValue, editMode: editMode, setEditMode: setEditModeValue,
                        getContactsPerUser: getContactsPerUser, 
                        contacts: contacts, setCurrentContact: setCurrentContactValue, currentContact: currentContact,
                        setVisibleContactDialog: setVisibleContactValue, visibleContactDialog: visibleContactDialog,
                        setEditModeContact: setEditModeContactValue, editModeContact: editModeContact,
                        updateContact: updateContact, postContactPerUser: postContactPerUser, toastRef: toast, 
                        getContactById: getContactById, deleteContact: deleteContact, 
                        }}>
        {props.children}
   </DataContext.Provider>
  )
}
