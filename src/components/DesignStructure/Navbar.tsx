import Joinlogo from '../../assets/join_logo_white.png'; 
import React, { useContext } from 'react';
import {DataContext} from "../../Provider/DataProvider"
import { BLACK } from '../../constants';
import { TabType } from '../../types/Tab';
import {Tab} from "./Tab"

export interface Props{
    tabs: TabType[];
    selectedTabId: string;
    liftSelectedTabId: (id: string)=> void;
}

export const Navbar=(props: Props) => {
  const dataContext = useContext(DataContext);
    
  return (
   <div className='flex justify-content-start align-items-center flex-column' style={{width: "15vw", maxWidth: "232px", backgroundColor: BLACK, height: "100vh"}}>
    <div className='flex justify-content-center align-items-center' style={{width: "100%", height: "20%"}}>
      <img src={Joinlogo} style={{width: "100px", height: "120px"}}/>
    </div>
      <div className='flex align-items-center flex-column justify-content-center' style={{width: "100%"}}>
        {
          props.tabs.map((tab: TabType)=>{
            return(
              <li style={{textDecoration: "none", width: "100%", listStyle: "none"}} key={tab.id}>
                <Tab id={tab.id} link={tab.link} setSelectedTabId={(id: string)=>props.liftSelectedTabId(id)} selected={tab.id === props.selectedTabId} name={tab.name} img={tab.img} />
                </li>
            )
          })
        }
      </div>

   </div>
  )
}
