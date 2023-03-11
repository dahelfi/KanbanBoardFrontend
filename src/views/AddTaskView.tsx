import {useState, useContext, useEffect} from 'react'
import { BLACK, centerItems, DARKBLUE, DIRTYWHITE, PINK, SKYBLUE } from '../constants'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { categoriesOptions } from '../data/categories';
import { Calendar } from 'primereact/calendar';
import { PrioElement } from '../components/PrioElement/PrioElement';
import { PriobuttonType } from '../types/PrioButtonType';
import { priorityButtonArray } from '../data/PrioButtons';
import { Button } from 'primereact/button';
import { DataContext } from '../Provider/DataProvider';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';
import {  parseContactsToDropdownFormat, returnIdArrayOfSelectedContacts } from '../utils/parseContacts';
import { ContactType } from '../types/ContactType';
import { AddTodoContact } from '../components/AddTodoContact/AddTodoContact';
import { TodoType } from '../types/TodoType';
import { PRIORITY } from '../types/PriorityEnum';

export const AddTaskView = () => {
  let navigate = useNavigate();
  const dataContext = useContext(DataContext)
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<any>(undefined);
  const [selectedContact, setSelectedContact] = useState<any>(undefined)
  const [date, setDate] = useState<any>(null);
  const [selectedPriorityEnumId, setSelectedPriorityEnumId] = useState<string|undefined>(undefined);
  const [priorityArray, setPriorityArray] = useState<PriobuttonType[]>(priorityButtonArray);
  const [selectedContacts, setSelectedContacts] = useState<ContactType[]>([]);

  useEffect(()=>{
    if(selectedContact){
      let temporaryArray: ContactType[] = [...selectedContacts];
      temporaryArray.push(selectedContact);
      setSelectedContacts([...temporaryArray]);
    }
    setSelectedContact(undefined);
  },[selectedContact])

  useEffect(()=>{ 
    dataContext.getContactsPerUser();
  },[])

  useEffect(()=>{
    if(dataContext.editModeTodo){
      setTitle(dataContext.currentTodo.name);
      setDescription(dataContext.currentTodo.description);
      setCategories(dataContext.currentTodo.category);
      setDate(new Date(parseInt(dataContext.currentTodo.date)));
      setSelectedContacts([...returnContactObjectArray(dataContext.currentTodo.contacts)]);
      setPriorityIdByPriorityString(dataContext.currentTodo.priority)
    }

  },[dataContext.editModeTodo])

const setPriorityIdByPriorityString =(priorityString: PRIORITY)=>{
    priorityButtonArray.forEach((priorityElement: any)=>{
      if(priorityElement.name === priorityString){
        setSelectedPriorityEnumId(priorityElement.id);
      }
    })
}
  
const returnContactObjectArray =(contacts: number[])=>{
  let contactArray: ContactType[] = [];
  contacts.forEach((contactId: number)=>{
   let contact: ContactType = dataContext.getContactById(contactId);
   contactArray.push(contact);
  })
  
  return contactArray;
} 

 const calculateColorForCategory = (category: string)=>{
    if(category === "BUSINESS"){
      return DARKBLUE;
    }else if(category === "PRIVATE"){
      return SKYBLUE;
    }else{
      return PINK;
    }
  }


  const deleteContactFromSelectedContacts =(contact: ContactType)=>{
    let temporaryArray: ContactType[] = [...selectedContacts];
    temporaryArray.forEach((contactElement: ContactType, index: number)=>{
      if(contactElement.id === contact.id){
        temporaryArray.splice(index, 1);
      }
    })
  
    setSelectedContacts([...temporaryArray]);
  }

  const selectedCategoryTemplate = (option: any, props: any) => {
    if (option) {
        return (
            <div className="flex align-items-center justify-content-between" style={{width: "100%"}}>
                <div>{option.label}</div>
                <div style={{height: "16px", width: "16px", borderRadius: "100%", backgroundColor: calculateColorForCategory(option.value)}}/>
            </div>
        );
    }

    return <span>{props.placeholder}</span>;
};

const contactsOptionTemplate = (option: any) => {
  return (
      <div className="flex align-items-center justify-content-start" style={{width: "90%", }}>
          <div className={centerItems} style={{height: "32px", width: "32px",marginRight: "1rem", color: "white", borderRadius: "100%", backgroundColor: option.value.color}}>{option.value.prename.charAt(0)+option.value.lastname.charAt(0)}</div>
          <div>{option.label}</div>
      </div>
  );
};


const categoryOptionTemplate = (option: any) => {
    return (
        <div className="flex align-items-center justify-content-between" style={{width: "90%"}}>
            <div>{option.label}</div>
            <div style={{height: "16px", width: "16px", borderRadius: "100%", backgroundColor: calculateColorForCategory(option.value)}}/>
        </div>
    );
};

const returnPriorityValue=()=>{
  let returnValue;
  priorityButtonArray.forEach((priorityElement: any)=>{
    if(priorityElement.id === selectedPriorityEnumId){
      console.log("priority value: ", priorityElement.name);
      
       returnValue = priorityElement.name;
    }
  })
  return returnValue;
}

const resetInputfields =()=>{
  setDate(null);
  setTitle("");
  setDescription("")
  setCategories(undefined);
  setSelectedPriorityEnumId(undefined);
  setSelectedContact(undefined);
  setSelectedContacts([]);
}

const postTodo = ()=>{

if(dataContext.editModeTodo){
  let updateTodo ={

  }

}else{
  let newtodo = {
    name: title,
    description: description,
    created_at: (new Date().getTime()).toString(),
    category: categories,
    priority: returnPriorityValue(),
    development_state: "TODO",
    expire_date: date.getTime(),
    contacts: returnIdArrayOfSelectedContacts(selectedContacts)
  }

  dataContext.postTodoPerUser(newtodo);
} 

resetInputfields();
}

  return (
    <>
      {dataContext.loading.loading ? 
    <div className={centerItems} style={{position: "absolute", left: "0px", right: "0px", top: "0px", bottom: "0px", backgroundColor: "rgba(0,0,0,0.5)", zIndex: "1000"}}>
      <div className={centerItems} style={{width: "100vw", height: "100vh"}}>
      <ProgressSpinner/>
      </div>
    
    </div>: null}
    <div className={centerItems} style={{width: "100%", height: "100%"}}>
      <div style={{width: "85%", height: "90%"}} className="flex flex-column">
        <h1>{dataContext.editModeTodo ?  "Edit Task": "Add Task"}</h1>
        <div className='flex' style={{width: "100%", height: "100%"}}>
              <div className="flex flex-column align-items-center" style={{width: "50%", height: "100%", borderRight: "1px solid #cdcdcd"}}>
                <div>
                  <h4>Title</h4>
                <InputText style={{width: "25vw"}} value={title} onChange={(e)=>setTitle(e.target.value)} />
                </div>
                <div>
                  <h4>Description</h4>
                <InputTextarea style={{width: "25vw", height: "20vh"}} value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div>
                  <h4>Category</h4>
                <Dropdown placeholder='Select Category' itemTemplate={categoryOptionTemplate}  valueTemplate={selectedCategoryTemplate} style={{width: "25vw"}} value={categories} onChange={(e)=>setCategories(e.value)} options={categoriesOptions} />
                </div>
              
              </div>

              <div className="flex flex-column align-items-center" style={{width: "50%", height: "100%"}}>
                <div className="flex flex-column align-items-center" style={{height: "80%"}}>

            
                <div>
                  <div>
                      <h4>Calendar</h4>
                      <Calendar style={{width: "25vw"}} value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" />
                  </div>
              
                  <div>
                      <h4>Priority</h4>
                        <div style={{width: "25vw"}}>
                          <PrioElement priorityArray={priorityArray} selectedPriorityEnumId ={selectedPriorityEnumId} liftSelectedPriorityEnum1={(priorityEnumId: string)=>{setSelectedPriorityEnumId(priorityEnumId)}}  />
                        </div>
                    </div>
                    <div>
                      <h4>Assigned To</h4>
                      <AddTodoContact deleteContactFromSelectedContacts={deleteContactFromSelectedContacts} selectedContacts={selectedContacts}/>
                      <Dropdown placeholder='Select assigned people'style={{width: "25vw"}}  itemTemplate={contactsOptionTemplate} value={selectedContact} onChange={(e)=>setSelectedContact(e.value)} options={parseContactsToDropdownFormat(dataContext.contacts)} />
                    </div>

                    </div>
                  </div>
                    <div className="flex justify-content-center" style={{width: "25vw"}}>
                        <Button style={{marginRight: "8px", backgroundColor: DIRTYWHITE, color: "black", border: "1px solid black"}}>Clear</Button>
                        <Button 
                        onClick={postTodo} style={{marginLeft: "8px", backgroundColor: BLACK, border: "1px solid"+ BLACK}}>{dataContext.editModeTodo ? "Update": "Create"}</Button>
                    </div>
            
                </div>
             
          </div>
      </div>
    </div>
    </>
  )
}
