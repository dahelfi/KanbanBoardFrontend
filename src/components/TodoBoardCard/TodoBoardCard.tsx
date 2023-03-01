import {useState} from 'react'
import { Card } from 'primereact/card';
import { CATEGORIES } from '../../types/CategoriesEnum';
import urgentIcon from "../../assets/urgent.png"
import mediumIcon from "../../assets/medium.png"
import lowIcon from "../../assets/low.png"
import { PRIORITY } from '../../types/PriorityEnum';

export interface Props{
    todo: any;
}

export const TodoBoardCard = (props: Props) => {
    const [hover, setHover] = useState<boolean>(false);

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
            <div style={{width: "100%"}}  className='flex flex-column justify-content-center'>
                <div className='flex justify-content-around align-items-center' style={{width: "100%"}}>
                    {generateColor(todo.category)}
                    <img style={{width: "24px", height: "24px", objectFit: "contain"}} src={returnPriorityImage(todo.priority)}/>
                </div>

                <div className='flex justify-content-around' style={{width: "80%"}}>
                    <h2>{todo.name}</h2>   
                    <h5>{date.toLocaleDateString()}</h5>
                </div>
            </div>
    
        )
    }

  return (
   <Card onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} header={header(props.todo)} style={{width : "80%", margin: "16px 0px 16px 0px "}}>
        {hover ? 
        <div>
            {props.todo.description}
        </div>: null    
    }
   </Card>
    
  )
}
