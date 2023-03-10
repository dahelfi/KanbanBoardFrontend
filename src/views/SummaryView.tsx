import {useEffect, useContext} from 'react'
import { DashboardComponent } from '../components/DashboardComponents/DashboardComponents'
import { SKYBLUE } from '../constants'
import { Authcontext } from '../Provider/AuthProvider'
import { DataContext } from '../Provider/DataProvider'
import { DEVELOPMENTSTATE } from '../types/DevelopmentState'
import { getTasksInState } from '../utils/calculateDataForDashboard'
import pencilImage from '../assets/pencilImage.png'
import okImage from '../assets/okImage.png'
import { DashboardComponentWithImage } from '../components/DashboardComponents/DashboardComponentWithImage'
import { DashboardComponentUrgent } from '../components/DashboardComponents/DashboardComponentUrgent'

export const SummaryView = () => {
  const dataContext = useContext(DataContext)
  const authContext = useContext(Authcontext)
  let dashboardElementsArray = [{
    text: "Tasks in Board",
    number: dataContext.todos.length
  },
  {
    text: "Tasks in Progress",
    number: getTasksInState(dataContext.todos, DEVELOPMENTSTATE.INPROGRESS)
  },
  {
    text: "Awaiting Feedback",
    number: getTasksInState(dataContext.todos, DEVELOPMENTSTATE.FEEDBACK)
  },
]

let dashboardElementsArrayWithImage = [{
  text: DEVELOPMENTSTATE.TODO,
  number: getTasksInState(dataContext.todos, DEVELOPMENTSTATE.TODO),
  img: pencilImage
},
{
  text: DEVELOPMENTSTATE.DONE,
  number: getTasksInState(dataContext.todos, DEVELOPMENTSTATE.DONE),
  img: okImage
},
]

  useEffect(()=>{
    
    dataContext.getTodosByUser();
  },[])

  return (
    <div className='flex flex-column' style={{width: "100%", height: "100%"}}>
      <div className='flex' style={{width: "100%", padding: "3rem 0rem 3rem 8rem"}}>
        <h1 style={{margin: "0rem 3rem 0rem 0rem", paddingRight: "4rem", fontSize: "50px", borderRight: "2px solid" +SKYBLUE}}>Summary</h1>
        <h2 style={{marginLeft: "1rem", width: "50%", fontWeight: "normal"}}>Everything in a nutshell!</h2>
      </div>
      <div className='flex' style={{height: "80%", width: "100%", padding: "2rem 0px 0px 8rem"}}>
        <div className='flex flex-column' style={{width: "100%", height: "100%"}}>
          <div className='flex justify-content-between' style={{width: "100%", height: "25%", marginBottom: "1rem"}}>
            {dashboardElementsArray.map((dashboardElement: any)=>{
              return <DashboardComponent element={dashboardElement}/>
            })} 
            </div>
            <div className='flex justify-content-between' style={{width: "100%", height: "25%", marginBottom: "1rem"}}>
                <DashboardComponentUrgent/>
            </div>
            <div className='flex justify-content-between' style={{width: "100%", height: "25%"}}>
            {dashboardElementsArrayWithImage.map((dashboardElement: any)=>{
              return <DashboardComponentWithImage dashboardElement={dashboardElement}/>
            })}
            </div>
        </div>
        <div style={{width: "100%", height: "100%", padding: "0px 0px 15rem 4rem"}} className={"flex flex-column justify-content-center align-items-start"}>
            <h1 style={{fontSize: "55px"}}>Good morning,</h1>
            <h1 style={{color: SKYBLUE, margin: "0px", fontSize: "55px"}}>{authContext.user.username} </h1>
        </div>
      </div>
    </div>
  )
}
