import {useState} from 'react'
import { Button } from 'primereact/button';
import { PRIORITY } from '../../types/PriorityEnum';
import { SKYBLUE } from '../../constants';

export interface Props{
  selected: boolean;
  image: any;
  name: PRIORITY;
  liftSelectedPriorityEnum: (priorityEnumId: string)=>void;
  id: string;
}

export const PrioButton = (props: Props) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Button onClick={()=>props.liftSelectedPriorityEnum(props.id)} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} 
    style={{color: "black", backgroundColor: (props.selected || hover ? SKYBLUE: "white"), border: "1px solid gray"}}>
    <div className={"button-hover"}>{props.name}<img style={{marginLeft: "8px"}} src={props.image}/></div>
    </Button>
  )
}
