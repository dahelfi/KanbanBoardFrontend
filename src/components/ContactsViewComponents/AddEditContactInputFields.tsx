import {useContext, ReactNode, useEffect, useState} from 'react'
import { BLACK, centerItems, DARKBLACK, LIGHTGREY } from '../../constants';
import { DataContext } from '../../Provider/DataProvider'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ContactType } from '../../types/ContactType';
import { colorArray } from '../../data/ColorArray';

export const AddEditContactInputFields = () => {
  const dataContext = useContext(DataContext);
  const [prename, setPrename] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  let logoElement: ReactNode = null;

  useEffect(()=>{
    if(dataContext.editModeContact){
      setPrename(dataContext.currentContact.prename);
      setLastname(dataContext.currentContact.lastname);
      setEmail(dataContext.currentContact.email);
      setPhonenumber(dataContext.currentContact.phonenumber);
      setId(dataContext.currentContact.id);
    }

  },[dataContext.editModeContact])

  if(dataContext.editModeContact){
    logoElement = <div className={centerItems} style={{width: "120px", height: "120px", backgroundColor: dataContext.currentContact.color, borderRadius: "100%"}}><h1 style={{color: "white", fontSize: "40px"}}>{dataContext.currentContact.prename.charAt(0) + dataContext.currentContact.lastname.charAt(0)}</h1></div>
  }else{
    logoElement = <div className={centerItems} style={{width: "120px", height: "120px", backgroundColor: LIGHTGREY, borderRadius: "100%"}}><i style={{color: "white", fontSize: "40px"}} className="pi pi-user"/></div>
  }

  const createOrEditContact =()=>{
    if(dataContext.editModeContact){
      let updateContact: ContactType ={
        id: id,
        lastname: lastname, 
        prename: prename,
        email: email,
        phonenumber: phonenumber,
        color: dataContext.currentContact.color
      }
      dataContext.updateContact(updateContact);

    }else{
      let newContact: ContactType ={
        lastname: lastname, 
        prename: prename,
        email: email,
        phonenumber: phonenumber,
        color: colorArray[Math.floor(Math.random() * colorArray.length)]
      }
      dataContext.postContactPerUser(newContact);
    }
  }

  return (
    <div className='flex' style={{width: "60%", height: "100%"}}>
      <div className='flex align-items-center' style={{padding: "0rem 2.5rem 0rem 2.5rem"}}>
        {logoElement}
      </div>
      <div className='flex flex-column justify-content-center align-items-start' style={{width: "100%"}}>
        <div className='flex justify-content-center'>
        <span  className="p-input-icon-right mb-4">
          <i className="pi pi-user" />
          <InputText value={prename} onChange={(e)=>setPrename(e.target.value)}  style={{width: "25vw"}} placeholder="Prename" />
        </span>
          
        </div>
        <div className='flex justify-content-center'>
        <span  className="p-input-icon-right mb-4">
          <i className="pi pi-user" />
          <InputText value={lastname} onChange={(e)=>setLastname(e.target.value)} style={{width: "25vw"}} placeholder="Name" />
        </span>
          
        </div>
        <div className='flex justify-content-center'>
        <span  className="p-input-icon-right mb-4">
            <i className="pi pi-envelope" />
            <InputText value={email} onChange={(e)=>setEmail(e.target.value)} style={{width: "25vw"}} placeholder="Email" />
        </span>
        </div>
        <div className='flex justify-content-center'>
        <span  className="p-input-icon-right mb-4">
            <i className="pi pi-phone" />
            <InputText value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} style={{width: "25vw"}} placeholder="Phone" />
        </span>
        </div>
        <div className='flex justify-content-start' style={{width: "100%"}}>
       
        <Button onClick={()=> dataContext.setVisibleContactDialog(false)} className='font-normal' style={{backgroundColor: "white", color: "black", marginRight: "8px"}} label="Cancel" icon="pi pi-times" iconPos="right"/>
        <Button disabled={(prename.length < 1 && lastname.length < 1 && email.length < 1 && phonenumber.length < 1)} onClick={()=>createOrEditContact()} style={{backgroundColor: BLACK,  marginLeft: "8px"}} label={dataContext.editModeContact ? "Edit Contact" : "Create Contact"} icon={dataContext.editModeContact ? "pi pi-pencil" : "pi pi-check"} iconPos="right"/>
      </div>
      </div>


    </div>
  )
}
