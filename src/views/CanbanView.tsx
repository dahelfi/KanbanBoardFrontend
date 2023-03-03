import {useEffect, useContext, useState} from 'react'
import { TodoBoardCard } from '../components/TodoBoardCard/TodoBoardCard';
import { DataContext } from '../Provider/DataProvider'
import { DEVELOPMENTSTATE } from '../types/DevelopmentState';
import { TodoType } from '../types/TodoType';
import { ProgressSpinner } from 'primereact/progressspinner';
import { centerItems } from '../constants';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { findSearchedElement } from '../utils/findSearchedElements';

export const CanbanView = () => {
  const dataContext = useContext(DataContext);
  let navigate = useNavigate();
  const [currentTodo, setCurrentTodo] = useState<TodoType|undefined>(undefined)
  const [searchValue, setSearchValue] = useState<string>("")

  useEffect(()=>{
    
    dataContext.getTodosByUser();
  },[])

  const allowDrop = (event: any)=>{
    event.preventDefault();
}



const onDragTodo = (development_state: DEVELOPMENTSTATE) =>{

  if(currentTodo !== undefined ){
      let updateTodo : TodoType = {
        id: currentTodo.id,
        created_at: currentTodo.created_at,
        description: currentTodo.description,
        priority: currentTodo.priority,
        development_state: development_state,
        name: currentTodo.name,
        expire_date: currentTodo.expire_date,
        category: currentTodo.category
      }
      dataContext.updateTodo(updateTodo)
  }
}

  return (
    <>
    {dataContext.loading.loading ? 
    <div className={centerItems} style={{position: "absolute", left: "0px", right: "0px", top: "0px", bottom: "0px", backgroundColor: "rgba(0,0,0,0.5)", zIndex: "1000"}}>
      <div className={centerItems} style={{width: "100vw", height: "100vh"}}>
      <ProgressSpinner/>
      </div>
    </div>: null}
    <div  className='flex flex-column' style={{width: "100%", height: "100%"}}>
          <div className='flex justify-content-between' style={{padding: "2rem 0px 0px 3rem"}}>
            <h1 style={{fontSize: "55px", margin: "0px"}}>Board</h1>
            <div className='flex align-items-center' style={{paddingRight: "5rem"}}> 
              <span  className="p-input-icon-right">
              <i className="pi pi-search" />
              <InputText value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}  placeholder="Search" />
            </span>

            </div>
           
          </div>
      
        <div className='flex justify-content-around align-items-center' style={{width: "100%", height: "100%"}}>
          <div onDragOver={(event: any)=>allowDrop(event)} onDrop={()=>onDragTodo(DEVELOPMENTSTATE.TODO)} className='flex flex-column align-items-center' style={{ height: "90%", width: "23%", overflowY: "scroll"}}>
              <div style={{width: "80%"}} className='flex justify-content-start'>
                <h2>TODO</h2>
              </div>
              {dataContext.todos.filter((todo:any) => findSearchedElement(todo, searchValue)).map((todo: any)=>{
                if(todo.development_state === DEVELOPMENTSTATE.TODO){
                  return(
                    <TodoBoardCard dragElement={()=>setCurrentTodo(todo)} todo={todo}/>
                  )
                }
              })}

          </div>
          <div onDragOver={(event: any)=>allowDrop(event)} className='flex flex-column align-items-center' onDrop={()=>onDragTodo(DEVELOPMENTSTATE.INPROGRESS)} style={{ height: "90%", width: "23%", overflowY: "scroll"}}>
            <div style={{width: "80%"}} className='flex justify-content-start'>
              <h2>IN PROGRESS</h2>
              </div>
              {dataContext.todos.filter((todo:any) => findSearchedElement(todo, searchValue)).map((todo: any)=>{
                if(todo.development_state === DEVELOPMENTSTATE.INPROGRESS){
                  return(
                    <TodoBoardCard dragElement={()=>setCurrentTodo(todo)} todo={todo}/>
                  )
                }
              })}
          </div>
          <div onDragOver={(event: any)=>allowDrop(event)}  className='flex flex-column align-items-center' onDrop={()=>onDragTodo(DEVELOPMENTSTATE.FEEDBACK)} style={{ height: "90%", width: "23%", overflowY: "scroll"}}>
              <div style={{width: "80%"}} className='flex justify-content-start'>
                <h2>FEEDBACK</h2>
              </div>
              {dataContext.todos.filter((todo:any) => findSearchedElement(todo, searchValue)).map((todo: any)=>{
                if(todo.development_state === DEVELOPMENTSTATE.FEEDBACK){
                  return(
                    <TodoBoardCard dragElement={()=>setCurrentTodo(todo)} todo={todo}/>
                  )
                }
              })}
          </div>
          <div onDragOver={(event: any)=>allowDrop(event)} className='flex flex-column align-items-center' onDrop={()=>onDragTodo(DEVELOPMENTSTATE.DONE)} style={{ height: "90%", width: "23%", overflowY: "scroll"}}>
              <div style={{width: "80%"}} className='flex justify-content-start'>
                <h2>DONE</h2>
              </div>
              {dataContext.todos.filter((todo:any) => findSearchedElement(todo, searchValue)).map((todo: any)=>{
                if(todo.development_state === DEVELOPMENTSTATE.DONE){
                  return(
                    <TodoBoardCard dragElement={()=>setCurrentTodo(todo)} todo={todo}/>
                  )
                }
              })}
          </div>

        </div>
    </div>
    </>
  )
}
