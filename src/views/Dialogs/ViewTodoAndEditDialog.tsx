import React, { useContext } from 'react'
import { Dialog } from 'primereact/dialog';
import { DataContext } from '../../Provider/DataProvider';
import { CategoryElement } from '../../components/DesignStructure/CategoryElement';
import { PrioElementWithColor } from '../../components/PrioElement/PrioElementWithColor';
import { ContactType } from '../../types/ContactType';
import { ContactColorShortcutElement } from '../../components/ContactColorShotrcutElement/ContactColorShortcutElement';
import { BLACK, centerItems } from '../../constants';


export const ViewTodoAndEditDialog = () => {
  const dataContext = useContext(DataContext);
  let styleObject = {};

  if(dataContext.currentTodo.contacts.length > 3){
    styleObject = {
      height: "20vh",
      overflowY: "scroll"
    }
  }
  
  const hideElement= ()=>{
    dataContext.setVisibleTodoDialog(false)
  }

  return (
    <Dialog visible={dataContext.visibleTodoDialog} style={{ width: '35vw', height: "70vh", position: "relative",}} onHide={hideElement}>
      <div style={{padding: "1.5rem", position: "relative"}}>
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
        <div style={{width: "90%"}}>
          <h4 style={{marginRight: "1rem"}} className='font-bold'>Assigned To:</h4> 
              <div style={styleObject}>
              {
                dataContext.currentTodo.contacts.map((contactId: number)=>{
                  let contact: ContactType = dataContext.getContactById(contactId)
                  return(
                  <div className="flex align-items-center justify-content-between" style={{width: "100%", marginTop: "1rem"}}>
                    <div className='flex'>
                      <ContactColorShortcutElement width='64px' height='64px' contact={contact}/>
                      <h3 style={{marginLeft: "1rem"}}>{contact.prename + " " + contact.lastname}</h3>
                    </div>
                    <i className='pi pi-times' style={{cursor: "pointer"}}/>
                  {/* TODO: ADD DELETE FUNCTION AT EDITMODE */}
                  </div>
                  )
                })
              }
              </div>
        </div>
        </div>
        <div className={centerItems} style={{width: "64px", height: "64px", backgroundColor: BLACK, position: "absolute", bottom: "2.5rem", right: "2.5rem", borderRadius: "5px", cursor: "pointer"}}>
        <i style={{color: "white"}} className='pi pi-pencil'/>
        </div>
    </Dialog>
  )
}
