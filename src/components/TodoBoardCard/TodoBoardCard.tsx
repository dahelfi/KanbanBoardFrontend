import {useState, useContext} from 'react'
import { Card } from 'primereact/card';
import { CATEGORIES } from '../../types/CategoriesEnum';
import urgentIcon from "../../assets/urgent.png"
import mediumIcon from "../../assets/medium.png"
import lowIcon from "../../assets/low.png"
import { PRIORITY } from '../../types/PriorityEnum';
import "./../../style/changes.scss"
import { DataContext } from '../../Provider/DataProvider';
import { TodoType } from '../../types/TodoType';
import { CategoryElement } from '../DesignStructure/CategoryElement';
import { AssignedContacts } from './AssignedContacts';
import { useNavigate } from 'react-router-dom';

export interface Props{
    todo: any;
    dragElement: (todo: TodoType)=> any;
    setCurrentTodo: (todo: TodoType)=> any;
}

export const TodoBoardCard = (props: Props) => {
    const [hover, setHover] = useState<boolean>(false);
    const dataContext = useContext(DataContext);
    let navigate = useNavigate();

    const controlLongDescription =(description: string)=>{
        if(description.length > 35){
            return description.slice(0,35) + "...";
        } else{
            return description;
        }
    }

    const controlLongName =(name: string)=>{
        if(name.length > 20){
            return name.slice(0,20) + "...";
        }else{
            return name;
        }
    }

    const returnPriorityImage= (priority: PRIORITY)=>{
        let returnImageSource: string = "";
        if(priority === PRIORITY.URGENT){
            returnImageSource = urgentIcon;
        }else if(priority === PRIORITY.MEDIUM){
            returnImageSource = mediumIcon;
        }else{
            returnImageSource = lowIcon
        }

        return returnImageSource;
    }

  
    const header = (todo: any)=>{
        let date: Date = new Date(parseInt(todo.expire_date));
        return( 
            <div style={{width: "100%", cursor: "pointer"}}  className='flex flex-column justify-content-center' >
                <div className='flex justify-content-around align-items-center' style={{width: "100%"}}>
                    <CategoryElement fontSize='14px' width='50%' height='100%' category={todo.category}/>
                    <i className='pi pi-pencil' onClick={(e)=>{e.stopPropagation(); dataContext.setEditModeTodo(true); dataContext.setCurrentTodo(props.todo); dataContext.setSelectedTabId("Hn4!l1"); navigate("/addTask/")}}/>
                    <i className='pi pi-trash' onClick={(e)=>{e.stopPropagation();dataContext.deleteTodo(todo)}}/>
                </div>
                <div className='flex justify-content-between' style={{width: "95%", margin: "8px 8px 0px 8px"}}>
                    <div style={{margin: "0px 0px 0px 0rem"}}> 
                        <h2 style={{margin: "0rem 0px 0px 0px"}}>{controlLongName(todo.name)}</h2>   
                    </div>
                   <div className='flex align-items-center' style={{margin: "0rem 0px 0px 0rem"}}>
                   <h5 style={{margin: "0rem 0px 0px 0rem"}}>{date.toLocaleDateString()}</h5>
                   </div>
                    
                </div>
            </div>
    
        )
    }

    const footer = (todo: any)=>{
        return( 
            <div style={{width: "100%", cursor: "pointer", padding: "0rem"}}  className='flex justify-content-between' >
              
                <AssignedContacts assignedContacts={todo.contacts}/>
                <img style={{width: "24px", height: "24px", objectFit: "contain"}} src={returnPriorityImage(todo.priority)}/>
            </div>
    
        )
    }

    const dragTodoElement = (todo: TodoType)=>{
        props.dragElement(todo);
    }

  return (
   <Card onClick={()=>{dataContext.setVisibleTodoDialog(true); dataContext.setCurrentTodo(props.todo); dataContext.setEditModeTodo(false)}} draggable={true} onDragStart={()=>dragTodoElement(props.todo)}  onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} footer={footer(props.todo)} header={header(props.todo)} style={{width : "80%", margin: "16px 0px 16px 0px", cursor: "pointer"}}>
        {hover ? 
         controlLongDescription(props.todo.description): null}
   </Card>
    
  )
}
