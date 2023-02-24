import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/DesignStructure/Header';
import { Navbar } from '../components/DesignStructure/Navbar';
import { DIRTYWHITE } from '../constants';
import { Authcontext } from '../Provider/AuthProvider';
import { TabType } from '../types/Tab';

interface Props{
  tabs: TabType[];
}

export const BoardView = (props: Props) => {
  const authenticationContext = useContext(Authcontext);
  const [selectedTabId, setSelectedTabId] = useState<string>("a2f5hT")

  return (
    <div className='flex' style={{width: "100%", height: "100%", backgroundColor: DIRTYWHITE}}>
      <Navbar liftSelectedTabId={(id: string)=>setSelectedTabId(id)} selectedTabId={selectedTabId} tabs={props.tabs}/>
      <div className='flex flex-column' style={{width: "90vw"}}>
        <Header/>
        <Outlet/>
      </div>
    </div>
  )
}
