import {useState} from 'react'
import { BLACK, centerItems, DIRTYWHITE, SKYBLUE } from '../constants'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { categoriesOptions } from '../data/categories';
import { Calendar } from 'primereact/calendar';
import { PrioElement } from '../components/PrioElement/PrioElement';
import { PRIORITY } from '../types/PriorityEnum';
import { PriobuttonType } from '../types/PrioButtonType';
import { priorityButtonArray } from '../data/PrioButtons';
import { Button } from 'primereact/button';

export const AddTaskView = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<any>(undefined);
  const [date, setDate] = useState<any>(null);
  const [selectedPriorityEnumId, setSelectedPriorityEnumId] = useState<string|undefined>(undefined);
  const [priorityArray, setPriorityArray] = useState<PriobuttonType[]>(priorityButtonArray);

  const calculateColorForCategory = (category: string)=>{
    if(category === "BUSINESS"){
      return "#52c9ff";
    }else if(category === "PRIVATE"){
      return "#1446eb";
    }else{
      return "gray"
    }
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

const categoryOptionTemplate = (option: any) => {
    return (
        <div className="flex align-items-center justify-content-between" style={{width: "90%"}}>
            <div>{option.label}</div>
            <div style={{height: "16px", width: "16px", borderRadius: "100%", backgroundColor: calculateColorForCategory(option.value)}}/>
        </div>
    );
};

  return (
    <div className={centerItems} style={{width: "100%", height: "100%"}}>
      <div style={{width: "85%", height: "90%"}} className="flex flex-column">
        <h1>Add Task</h1>
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
                      <h4>Prio</h4>
                        <div style={{width: "25vw"}}>
                          <PrioElement priorityArray={priorityArray} selectedPriorityEnumId ={selectedPriorityEnumId} liftSelectedPriorityEnum1={(priorityEnumId: string)=>{setSelectedPriorityEnumId(priorityEnumId)}}  />
                        </div>
                    </div>

                    </div>
                  </div>
                    <div className="flex justify-content-center" style={{width: "25vw"}}>
                        <Button style={{marginRight: "8px", backgroundColor: DIRTYWHITE, color: "black", border: "1px solid black"}}>Clear</Button>
                        <Button style={{marginLeft: "8px", backgroundColor: BLACK, border: "1px solid"+ BLACK}}>Create</Button>
                    </div>
            
                </div>
             
          </div>
      </div>
    </div>
  )
}
