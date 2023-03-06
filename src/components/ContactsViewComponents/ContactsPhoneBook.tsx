import { Button } from 'primereact/button'
import {useContext, useEffect, ReactNode}from 'react'
import { DataContext } from '../../Provider/DataProvider'
import { ContactType } from '../../types/ContactType'
import { createTwoDimensionalArray } from '../../utils/createSortedArrayFromContactArray'
import { ContactPhoneArray } from './ContactPhoneArray'

export const ContactsPhoneBook = () => {
  const dataContext = useContext(DataContext);

  let firstLetter: string = "";
  let twoDimensionalArray: any[]=[];
  let showElement : ReactNode = null;
  
  if(dataContext.contacts.length > 0){
    twoDimensionalArray = createTwoDimensionalArray(dataContext?.contacts);
  }
  
  return (
    twoDimensionalArray.length > 0 ?
      <div style={{width: "35%", padding: "0rem 2rem 0.5rem 2rem ", overflowY: "scroll", height: "92vh", backgroundColor: "white",}}>
        {twoDimensionalArray.map((contactElementArray: ContactType[])=>{
        return(
          <ContactPhoneArray contactArray={contactElementArray} />
        )
      })
      }
      </div>: null
    
  )
}
