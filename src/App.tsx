//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";   
import "/node_modules/primeflex/primeflex.css"

import './App.scss';
import { Routes, Route } from 'react-router-dom';
import {useState} from "react";
import { AuthenticationView } from './views/AuthenticationView';
import { SignInComponent } from "./components/Authentication/SignInComponent";
import { SignUpComponent } from "./components/Authentication/SignUpComponent";
import { BoardView } from "./views/BoardView";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { AuthProvider } from "./Provider/AuthProvider";
import { DataProvider } from "./Provider/DataProvider";
import { tabsArray } from "./data/tabs";
import { TabType } from "./types/Tab";
import { SummaryView } from "./views/SummaryView";
import { CanbanView } from "./views/CanbanView";
import { AddTaskView } from "./views/AddTaskView";
import { ContactsView } from "./views/ContactsView";

function App() {
  const [tabs, setTabs] = useState<TabType[]>(tabsArray);

  return (
    <div className="main-container">
      <AuthProvider>
      <DataProvider>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path={"/"}  element={<BoardView tabs={tabs}/>}>
            <Route path={"summary/"} element={<SummaryView/>}/>
            <Route path={"canban/"} element={<CanbanView/>}/>
            <Route path={"addTask/"} element={<AddTaskView/>}/>
            <Route path={"contacts/"} element={<ContactsView/>}/>
          </Route>
        </Route>
        <Route path={"/auth/"}  element={<AuthenticationView/>}>
          <Route path={"signin/"}  element={<SignInComponent/>}/>
          <Route path={"signup/"}  element={<SignUpComponent/>}/>
          
        </Route>
      </Routes>
      </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
