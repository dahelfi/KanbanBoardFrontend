import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../Provider/DataProvider';
import { Dialog } from 'primereact/dialog';
import { ShowLogoAndText } from '../../components/ContactsViewComponents/ShowLogoAndText';
import { AddEditContactInputFields } from '../../components/ContactsViewComponents/AddEditContactInputFields';
import { centerItems } from '../../constants';
import { ProgressSpinner } from 'primereact/progressspinner';

export const CreateEditContactDialog = () => {
  const dataContext = useContext(DataContext)
  
  const hideElement= ()=>{
    dataContext.setVisibleContactDialog(false)
  }

  useEffect(()=>{

  },[dataContext.response])

  return (
    <>
    {dataContext.loading.loading ? 
      <div className={centerItems} style={{position: "absolute", left: "0px", right: "0px", top: "0px", bottom: "0px", backgroundColor: "rgba(0,0,0,0.5)", zIndex: "1000"}}>
        <div className={centerItems} style={{width: "100vw", height: "100vh"}}>
        <ProgressSpinner/>
        </div>
      </div>: null}
    <Dialog visible={dataContext.visibleContactDialog} style={{ width: '70vw', height: "60vh", position: "relative"}} onHide={hideElement}>
      <i style={{position: "absolute", top: "1.5rem", right: "1.5rem", cursor: "pointer"}} onClick={hideElement} className="pi pi-times"/>
      <div className='flex' style={{width: "100%", height: "100%"}}>  
        <ShowLogoAndText />
      <AddEditContactInputFields/>
      </div>
    </Dialog>
    </>
  )
}
