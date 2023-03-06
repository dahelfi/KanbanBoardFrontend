export interface ContactType{
    id?: string;
    prename: string;
    lastname: string; 
    email: string;
    phonenumber: string;
    color: string;
}

export interface ContactObjectType{
    letter: string;
    contactObject: ContactType;
}

export interface ContactObjectTypeBig{
    [key: string]: ContactObjectType[];
}