import {useEffect, useContext} from 'react'
import { TodoBoardCard } from '../components/TodoBoardCard/TodoBoardCard';
import { DataContext } from '../Provider/DataProvider'
import { DEVELOPMENTSTATE } from '../types/DevelopmentState';

export const CanbanView = () => {
  const dataContext = useContext(DataContext);

  useEffect(()=>{
    
    dataContext.getTodosByUser();
  },[])

  return (
    <div className='flex justify-content-around align-items-center' style={{width: "100%", height: "100%"}}>
      <div className='flex flex-column align-items-center' style={{ height: "90%", width: "20%", overflowY: "scroll"}}>
          <div style={{width: "80%"}} className='flex justify-content-start'>
            <h2>TODO</h2>
          </div>
          {dataContext.todos.map((todo: any)=>{
            if(todo.development_state === DEVELOPMENTSTATE.TODO){
              return(
                <TodoBoardCard todo={todo}/>
              )
            }
          })}
      </div>
      <div className='flex flex-column align-items-center' style={{backgroundColor: "green", height: "90%", width: "20%"}}>
        <div style={{width: "80%"}} className='flex justify-content-start'>
          <h2>IN PROGRESS</h2>
          </div>
          {dataContext.todos.map((todo: any)=>{
            if(todo.development_state === DEVELOPMENTSTATE.INPROGRESS){
              return(
                <TodoBoardCard todo={todo}/>
              )
            }
          })}
      </div>
      <div className='flex flex-column align-items-center' style={{backgroundColor: "blue", height: "90%", width: "20%"}}>
          <div style={{width: "80%"}} className='flex justify-content-start'>
            <h2>FEEDBACK</h2>
          </div>
          {dataContext.todos.map((todo: any)=>{
            if(todo.development_state === DEVELOPMENTSTATE.VALIDATION){
              return(
                <TodoBoardCard todo={todo}/>
              )
            }
          })}
      </div>
      <div className='flex flex-column align-items-center' style={{backgroundColor: "grey", height: "90%", width: "20%"}}>
          <div style={{width: "80%"}} className='flex justify-content-start'>
            <h2>DONE</h2>
          </div>
          {dataContext.todos.map((todo: any)=>{
            if(todo.development_state === DEVELOPMENTSTATE.DONE){
              return(
                <TodoBoardCard todo={todo}/>
              )
            }
          })}
      </div>

    </div>
  )
}
