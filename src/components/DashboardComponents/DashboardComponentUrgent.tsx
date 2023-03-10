import urgentImage from "../../assets/urgentImage.png"
import { DataContext } from "../../Provider/DataProvider"
import { calculateLatestUrgentTodo, getTasksInState } from "../../utils/calculateDataForDashboard"
import {useContext} from "react"
import { PRIORITY } from "../../types/PriorityEnum"
import { LIGHTGREY } from "../../constants"

export const DashboardComponentUrgent = () => {
  const dataContext = useContext(DataContext)
  let urgentElement = calculateLatestUrgentTodo(dataContext.todos);
  let date: Date = new Date(parseInt(urgentElement.dateLatestUrgentElement));
  
  
  return (
    <div className='flex align-items-center' style={{boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",borderRadius: "10px", backgroundColor: "white", width: "100%", height: "90%"}}>
        <div className='flex justify-content-center' style={{borderRight: "2px solid "+LIGHTGREY, width: "50%"}}>
            <img style={{objectFit: "contain", marginRight: "1rem"}} src={urgentImage}/>
            <div className='flex flex-column justify-content-cemter align-items-center'>
                <h1 style={{margin: "0px 0px -1rem 0px", fontSize: "55px"}}>{getTasksInState(dataContext.todos, PRIORITY.URGENT)}</h1>
                <h5>{PRIORITY.URGENT}</h5>
            </div>
        </div>
        <div style={{width: "50%"}} className='flex flex-column justify-content-center align-items-center'>
            <h2 style={{margin: "0px 0px 0.5rem 0px", fontSize: "25px" }}><b>{date.toLocaleDateString()}</b></h2>
            <h4 style={{margin: "0.5rem 0px 0px 0px"}}>{urgentElement.textUrgentElement}</h4>
        </div>

   </div>
  )
}
