import { TabType } from "../types/Tab";

export const calculateSelectedRoute =(tabs: TabType[], selectedTabId: string)=>{
    let returnString: string = "";
    tabs.forEach((tab: TabType)=>{
        if(tab.id === selectedTabId){
            returnString = tab.link
        }
    })

    return returnString;
}