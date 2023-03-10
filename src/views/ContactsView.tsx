import {useEffect, useContext}from 'react'
import { ContactHeader } from '../components/ContactsViewComponents/ContactHeader';
import { ContactsPhoneBook } from '../components/ContactsViewComponents/ContactsPhoneBook'
import { ShowSelectedContact } from '../components/ContactsViewComponents/ShowSelectedContact';
import { DataContext } from '../Provider/DataProvider'
import { CreateEditContactDialog } from './Dialogs/CreateEditContactDialog';



export const ContactsView = () => {
  const dataContext = useContext(DataContext);

  useEffect(()=>{ 
    dataContext.getContactsPerUser();      
  },[])

    
  return (
    <div className='flex' style={{width: "100%", height: "100%"}}>
      <ContactsPhoneBook/>
      <div style={{width: "65%", height: "100%"}}>
        <ContactHeader/>
        <ShowSelectedContact/>
      </div>
     <CreateEditContactDialog/>
    </div>
  )
}
