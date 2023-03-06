import {ReactNode} from 'react'
import { ContactType } from '../../types/ContactType'
import { ContactLetterElement } from './ContactLetterElement'
import { ContactPhoneElement } from './ContactPhoneElement'

export interface Props{
  contactArray: ContactType[]
}

export const ContactPhoneArray = (props: Props) => {
  let showElement: ReactNode = null;
  
  if(props.contactArray.length > 0){
    showElement =  <><ContactLetterElement letter={props.contactArray[0].prename.charAt(0)}/>
    {props.contactArray.map((contactElement: ContactType)=>{
      return (
        <ContactPhoneElement contactElement={contactElement}/>
      )
    })
    }
    </>
  }

  return (
    <>
      {showElement}
    </>
  )
}
