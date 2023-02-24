import { PriobuttonType } from '../../types/PrioButtonType';
import { PrioButton } from './PrioButton';

export interface Props{
    selectedPriorityEnumId: string | undefined;
    liftSelectedPriorityEnum1: (priorityEnumId: string)=>void;
    priorityArray: PriobuttonType[];
}

export const PrioElement = (props: Props) => {


  return (
    <div className="flex justify-content-between">
      {props.priorityArray.map((priorityElement: PriobuttonType)=>{
        return(
          <PrioButton liftSelectedPriorityEnum={()=>props.liftSelectedPriorityEnum1(priorityElement.id)} id={priorityElement.id} selected={props.selectedPriorityEnumId === priorityElement.id} image={priorityElement.img} name={priorityElement.name} />
        )
      })}
    </div>
 
  )
}
