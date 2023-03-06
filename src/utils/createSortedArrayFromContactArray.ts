import { ContactObjectType, ContactType, ContactObjectTypeBig } from "../types/ContactType";

export const createSortedArrayFromContactArray =(contactArray: any[])=>{

    contactArray.sort((a: ContactType, b: ContactType)=>{
        if(a.prename < b.prename){
            return -1;
        }else if(a.prename > b.prename){
            return 1;
        }else{
            return 0;
        }
    })
    
    
    
    return contactArray;
}


export const createTwoDimensionalArray=(contactArray: ContactType[])=>{
    let twoDimensionalArray: any[] = [];
    let firstLayerArray: ContactType[] = [];
    let firstLetter: string = contactArray[0].prename.charAt(0)
    contactArray.forEach((contactElement: ContactType, index)=>{
        if(contactElement.prename.charAt(0) === firstLetter){
            firstLayerArray.push(contactElement);
        }else{
            twoDimensionalArray.push(firstLayerArray);
            firstLayerArray = [];
            firstLetter = contactElement.prename.charAt(0);
            firstLayerArray.push(contactElement);
        }

    });

return twoDimensionalArray;
    
}