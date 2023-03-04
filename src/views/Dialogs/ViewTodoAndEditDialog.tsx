import React, { useContext } from 'react'
import { Dialog } from 'primereact/dialog';
import { DataContext } from '../../Provider/DataProvider';
import { CategoryElement } from '../../components/DesignStructure/CategoryElement';
import { PrioElementWithColor } from '../../components/PrioElement/PrioElementWithColor';

export interface Props{
 
}

export const ViewTodoAndEditDialog = (props: Props) => {
  const dataContext = useContext(DataContext)
  
  const hideElement= ()=>{
    dataContext.setVisibleDialog(false)
  }

  return (
    <Dialog visible={dataContext.visibleDialog} style={{ width: '40vw', height: "80vh", backgroundColor: "green", position: "relative"}} onHide={hideElement}>
      <i style={{position: "absolute", top: "1.5rem", right: "1.5rem", cursor: "pointer"}} onClick={hideElement} className="pi pi-times"/>
      <div style={{height: "8%"}}>
        <CategoryElement fontSize='20px' width='40%' height='100%' category={dataContext?.currentTodo?.category} />
      </div>
      <h1 style={{fontSize: "50px", margin: "1rem 0rem 0rem 0rem"}}>{dataContext?.currentTodo?.name}</h1>
      <span>{dataContext?.currentTodo?.description}</span>
      <div className='flex'>
          <h4 style={{marginRight: "1rem"}} className='font-bold'>Due Date:</h4> <h4 className='font-light'>{new Date(parseInt(dataContext?.currentTodo?.expire_date)).toLocaleDateString()}</h4>
      </div>
      <div className='flex align-items-center' style={{height: "7%"}}>
          <h4 style={{marginRight: "1rem"}} className='font-bold'>Priority:</h4> <PrioElementWithColor priority={dataContext?.currentTodo?.priority}/>
      </div>
    </Dialog>
  )
}
