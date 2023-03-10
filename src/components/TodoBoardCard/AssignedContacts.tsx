import React, { useContext } from 'react'
import { DataContext } from '../../Provider/DataProvider';
import { ContactType } from '../../types/ContactType';
import { ContactColorShortcutElement } from '../ContactColorShotrcutElement/ContactColorShortcutElement';

export interface Props{
  assignedContacts: number[];
}

export const AssignedContacts = (props: Props) => {
  const dataContect = useContext(DataContext);


  return (
  <div className='flex'>
    {
    props.assignedContacts.map((assignedContactId: number)=>{
      let contact: ContactType = dataContect.getContactById(assignedContactId);
      
      return(
        <ContactColorShortcutElement contact={contact} height={"32px"} width={"32px"}/>
      )
      
    })
    
    }  
  </div>  
  )
}
