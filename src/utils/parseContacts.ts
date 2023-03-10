import { ContactType } from "../types/ContactType";

export const parseContactsToDropdownFormat =(contacts: ContactType[])=>{
    let dropdownFormatArray:any[] = [];

    contacts.forEach((contact: ContactType)=>{
        let dropdownContactElement: any = {};
        dropdownContactElement.value = contact;
        dropdownContactElement.label = contact.prename + " " + contact.lastname;
        dropdownFormatArray.push(dropdownContactElement);
    })
    
    return dropdownFormatArray;
}

export const returnIdArrayOfSelectedContacts = (selectedContacts: ContactType[])=>{
    let idsOnlyArray: number[] = [];
    selectedContacts.forEach((selectedContact: ContactType)=>{
        if(selectedContact.id){
            idsOnlyArray.push(parseInt(selectedContact.id));
          }
    })

    return idsOnlyArray;
}

export const returnContactsArrayAsMap =(contacts: ContactType[])=>{
    let contactsMap = new Map();
    contacts.forEach((contacts: ContactType)=>{
        contactsMap.set(contacts.id ,contacts);
    })
  
    console.log("hier deine map: ", contactsMap);
    
    return contactsMap;
}