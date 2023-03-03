import {useState, useContext} from 'react'
import { Card } from 'primereact/card';
import { CATEGORIES } from '../../types/CategoriesEnum';
import urgentIcon from "../../assets/urgent.png"
import mediumIcon from "../../assets/medium.png"
import lowIcon from "../../assets/low.png"
import { PRIORITY } from '../../types/PriorityEnum';

import { DataContext } from '../../Provider/DataProvider';
import { TodoType } from '../../types/TodoType';

export interface Props{
    todo: any;
    dragElement: (todo: TodoType)=> any;
}

export const TodoBoardCard = (props: Props) => {
    const [hover, setHover] = useState<boolean>(false);
    const dataContext = useContext(DataContext);
    
    const generateColor =(category: string)=>{
        let color: string= ""
        if(category === CATEGORIES.BUSINESS){
            color = "#52c9ff";
        }else if(category == CATEGORIES.PRIVATE){
            color = "#1446eb";
        }else{
            color = "gray"
        }

        return(
            <div className='flex justify-content-center' style={{backgroundColor: color, padding: "4px 16px 4px 16px", borderRadius: "5px", color: "white", width: "50%", marginLeft: "16px"}}>
                <span>{category}</span>
          </div>
        )
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
                    {generateColor(todo.category)}
                    <i className='pi pi-pencil' />
                    <i className='pi pi-trash' onClick={()=>dataContext.deleteTodo(todo)}/>
                </div>
                <div className='flex justify-content-between' style={{width: "95%", margin: "8px 8px 0px 8px"}}>
                    <div style={{margin: "0px 0px 0px 0rem"}}> 
                        <h2 style={{margin: "0rem 0px 0px 0px"}}>{todo.name}</h2>   
                    </div>
                   <div className='flex align-items-center' style={{margin: "0rem 0px 0px 0rem"}}>
                   <h5 style={{margin: "0rem 0px 0px 0rem"}}>{date.toLocaleDateString()}</h5>
                   </div>
                    
                </div>
            </div>
    
        )
    }

    const footer = (todo: any)=>{
        let date: Date = new Date(parseInt(todo.expire_date));
        return( 
            <div style={{width: "100%", cursor: "pointer"}}  className='flex flex-column justify-content-center' >
              
                <img style={{width: "24px", height: "24px", objectFit: "contain"}} src={returnPriorityImage(todo.priority)}/>
                {/* <div className='flex justify-content-around align-items-center' style={{width: "100%"}}>
                    {generateColor(todo.category)}
                    <img style={{width: "24px", height: "24px", objectFit: "contain"}} src={returnPriorityImage(todo.priority)}/>
                </div>

                <div className='flex justify-content-around' style={{width: "80%"}}>
                    <h2>{todo.name}</h2>   
                    <h5>{date.toLocaleDateString()}</h5>
                </div> */}
            </div>
    
        )
    }

    const dragTodoElement = (todo: TodoType)=>{
        console.log("hier dein element: ", todo);
        
        props.dragElement(todo);
    }

  return (
   <Card draggable={true} onDragStart={()=>dragTodoElement(props.todo)}  onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} footer={footer(props.todo)} header={header(props.todo)} style={{width : "80%", margin: "16px 0px 16px 0px "}}>
        {props.todo.description}
   </Card>
    
  )
}
