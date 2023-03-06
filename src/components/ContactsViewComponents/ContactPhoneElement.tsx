import {useState, useContext} from 'react'
import { BLACK, centerItems, DARKBLACK, LIGHTBLUE } from '../../constants';
import { DataContext } from '../../Provider/DataProvider';
import { ContactType } from '../../types/ContactType'

export interface Props{
    contactElement: ContactType;
}

export const ContactPhoneElement = (props: Props) => {
  const[hover, setHover] = useState<boolean>(false);
  const dataContext = useContext(DataContext);

  let selected: boolean = props.contactElement.id === dataContext.currentContact?.id
  return (
    <div className="flex align-items-center"style={{width: "100%", cursor: "pointer",padding: "0.25rem 0rem 0.25rem 0.5rem", color: (hover || selected ? "white": "black"),  borderRadius: "5px", marginBottom: "5px", backgroundColor: (hover|| selected ? DARKBLACK : "white")}} 
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={()=>dataContext.setCurrentContact(props.contactElement)}>
      <div className={centerItems} style={{width: "3rem", height: "3rem", color: "white", backgroundColor: props.contactElement.color, borderRadius: "100%"}}>
        {props.contactElement.prename.charAt(0) + props.contactElement.lastname.charAt(0)}
      </div>
      <div>
          <h3 className='font-normal' style={{fontSize: "21px", margin: "0rem 0.5rem 0.5rem 2rem"}}>{props.contactElement.prename+ " " +props.contactElement.lastname}</h3>
          <h3 className='font-normal' style={{fontSize: "16px", color: LIGHTBLUE, margin: "0.5rem 1.5rem 0rem 2rem"}}>{props.contactElement.email}</h3>
      </div>
    </div>
  )
}
