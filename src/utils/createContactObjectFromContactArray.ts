import { ContactObjectType, ContactType } from "../types/ContactType";

export const createContactObjectFromContactArray =(contactArray: ContactType[])=>{
    let contactObject: ContactObjectType = {

    }

    contactArray.forEach((contactElement: ContactType)=>{
        let firstLetterFromPrename :string = contactElement.prename.charAt(0);

     

        if(contactObject.firstLetterFromPrename.length > 0){
            let contactArray: ContactType[] = [...contactObject.firstLetterFromPrename];
            contactArray.push(contactElement);
            contactObject.firstLetterFromPrename = contactArray;
        }else{
            let contactArray: ContactType[] = [];
            contactArray.push(contactElement);
            contactObject.firstLetterFromPrename = contactArray;
        }

    })

    return contactObject;
}