import { Button } from 'primereact/button';
import {useContext} from 'react'
import { BLACK, centerItems, DARKBLACK, LIGHTBLUE } from '../../constants';
import { DataContext } from '../../Provider/DataProvider'


export const ShowSelectedContact = () => {
  const dataContext = useContext(DataContext);

  return (
    <div className='flex flex-column' style={{width: "100%", height: "80%", padding: "0rem 0rem 0rem 3rem"}}>
      <div style={{width: "100%", height: "80%"}}>
      {dataContext.currentContact ? 
        <>

          <div className='flex' >
                  <div className={centerItems} style={{ fontSize: "50px",color: "white", backgroundColor: dataContext.currentContact.color, borderRadius: "100%", width: "7rem", height:"7rem" }}>{dataContext.currentContact.prename.charAt(0)+ dataContext.currentContact.lastname.charAt(0)}</div>
                      <div className='flex flex-column'>
                      <h1 style={{margin: "1rem 0rem 0rem 3rem", fontSize: "47px"}}>{dataContext.currentContact.prename+ " " +dataContext.currentContact.lastname}</h1>
                      <div className='flex justify-content-between align-items-center'>
                        <div className='flex justify-content-start align-items-center' style={{color: LIGHTBLUE, cursor: "pointer", margin: "0.5rem 0rem 0rem 3rem"}}>+ Add Task</div>
                        <i onClick={()=>dataContext.deleteContact(dataContext.currentContact)} style={{color: "red", fontSize: "20px", cursor: "pointer"}} className='pi pi-trash'/>
                      </div>
                       
                      </div>
                    </div>
                  <div>

                  <div className='flex'>
                    <div className='flex flex-column' style={{}}>
                      <h3 style={{margin: "1.5rem 0rem 1.5rem 0rem"}}>Contact Information</h3>
                      <div className='flex flex-column'>
                        <h4 style={{margin: "0.5rem 0rem 0.5rem 0rem"}}>Email</h4>
                        <h4 style={{margin: "0.5rem 0rem 0.5rem 0rem", color: LIGHTBLUE}}>{dataContext.currentContact.email}</h4>
                      </div>
                      <div className='flex flex-column'>
                        <h4 style={{margin: "0.5rem 0rem 0.5rem 0rem"}}>Phone</h4>
                        <h4 style={{margin: "0.5rem 0rem 0.5rem 0rem"}}>{dataContext.currentContact.phonenumber}</h4>
                      </div>
                    </div> 
                    <div>
                      <div onClick={()=>{dataContext.setEditModeContact(true); dataContext.setVisibleContactDialog(true)}} style={{color: BLACK, cursor: "pointer", margin: "1.6rem 0rem 0rem 4rem"}}><i className="pi pi-pencil"/> Edit Contact</div>
                    </div>
                  </div>
          </div> 
        </>
        :null
      }
      </div>
      <div className='flex justify-content-end' style={{width: "80%"}}>
        <Button onClick={()=>{dataContext.setEditModeContact(false);dataContext.setVisibleContactDialog(true)}} style={{backgroundColor: BLACK}} label="New Contact" icon="pi pi-user" iconPos="right" />
      </div>
    </div>
  )
}
