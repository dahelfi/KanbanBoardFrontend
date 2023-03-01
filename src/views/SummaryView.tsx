import { Button } from 'primereact/button'
import {useEffect, useContext} from 'react'
import { DashboardComponent } from '../components/DashboardComponents/DashboardComponents'
import { SKYBLUE } from '../constants'
import { Authcontext } from '../Provider/AuthProvider'
import { DataContext } from '../Provider/DataProvider'
import { DEVELOPMENTSTATE } from '../types/DevelopmentState'
import { getTasksInProgress } from '../utils/calculateDataForDasbboard'

export const SummaryView = () => {
  const dataContext = useContext(DataContext)
  const authContext = useContext(Authcontext)
  let dashboardElementsArray = [{
    text: "Tasks in Board",
    number: dataContext.todos.length
  },
  {
    text: "Tasks in Progress",
    number: getTasksInProgress(dataContext.todos, DEVELOPMENTSTATE.INPROGRESS)
  },
  {
    text: "Awaiting Feedback",
    number: getTasksInProgress(dataContext.todos, DEVELOPMENTSTATE.FEEDBACK)
  },

]

  useEffect(()=>{
    
    dataContext.getTodosByUser();
  },[])

  return (
    <div className='flex flex-column' style={{width: "100%", height: "100%"}}>
      <div className='flex' style={{width: "100%"}}>
        <h1 style={{margin: "3rem 0rem 3rem 10rem", fontSize: "50px"}}>Summary</h1>
        <div className={"flex justify-content-start align-items-center"} style={{borderLeft: "2px solid" +SKYBLUE, height: "80%"}}>
          <h5 style={{marginLeft: "1rem"}}>Everything in a nutshell!</h5>
        </div>
      </div>
      <div className='flex' style={{height: "80%", width: "100%"}}>
        <div className='flex flex-column' style={{width: "100%", height: "100%"}}>
          <div className='flex justify-content-between' style={{width: "100%", height: "25%"}}>
            {dashboardElementsArray.map((dashboardElement: any)=>{
              return <DashboardComponent element={dashboardElement}/>
            })}
            
            </div>

        </div>

        <div style={{width: "100%", height: "100%"}} className={"flex justify-content-start align-items-center"}>
            <h4>Good morning</h4><br/>
            <h5 style={{color: SKYBLUE, marginLeft: "8px"}}>{authContext.user.username} </h5>
        </div>

      </div>
      
  
    </div>
  )
}
