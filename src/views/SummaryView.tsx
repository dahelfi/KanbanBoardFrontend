import { Button } from 'primereact/button'
import {useEffect, useContext} from 'react'
import { DataContext } from '../Provider/DataProvider'

export const SummaryView = () => {
  const dataContext = useContext(DataContext)

  useEffect(()=>{
    
    dataContext.getTodosByUser();
  },[])



  return (
    <div className='flex' style={{width: "100%", height: "100%"}}>

      
   
     
      
    </div>
  )
}
