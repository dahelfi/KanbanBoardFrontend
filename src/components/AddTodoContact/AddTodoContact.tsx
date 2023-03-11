import React from 'react'
import { centerItems } from '../../constants';
import { ContactType } from '../../types/ContactType'

export interface Props{
  selectedContacts: ContactType[];
  deleteContactFromSelectedContacts:(selectedContact: ContactType)=> void;
}

export const AddTodoContact = (props: Props) => {
 let styleObject = {}
  if(props.selectedContacts.length > 3){
    styleObject = {height: "15vh",
    overflowY: "scroll"}
  }
  
  return (
    <div style={styleObject}>
      {
      props.selectedContacts.map((selectedContact: ContactType)=>{
        return(
          <div className='flex justify-content-between align-items-center' style={{width: "25vw",  padding: "0.25rem 0.25rem 1rem 0.25rem"}}>
            <div className='flex align-items-center'> 
            <div className={centerItems} style={{height: "32px", width: "32px", color: "white", borderRadius: "100%", backgroundColor: selectedContact.color, marginRight: "1rem"}}>{selectedContact.prename.charAt(0)+selectedContact.lastname.charAt(0)}</div>
              {selectedContact.prename+ " "+ selectedContact.lastname}
            </div>
           
              <i style={{cursor: "pointer"}} className="pi pi-times" onClick={()=>props.deleteContactFromSelectedContacts(selectedContact)}/>
          </div>
        )
      })
      
      }
      </div>
  )
}
