import { Button } from 'primereact/button'
import {useContext}from 'react'
import { DataContext } from '../../Provider/DataProvider'

export const ContactsPhoneBook = () => {
  const dataContext = useContext(DataContext);

  return (
    <div style={{width: "35%", height: "100%", backgroundColor: "green", overflowY: "scroll"}}>
      <Button onClick={()=>{dataContext.getContactsPerUser(); console.log(dataContext.contactObject)}}/>
    </div>
  )
}
