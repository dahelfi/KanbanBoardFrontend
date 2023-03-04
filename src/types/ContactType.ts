export interface ContactType{
    id?: string;
    prename: string;
    lastname: string; 
    email: string;
    phonenumber: string;
}

export interface ContactObjectType{
    [key: string]: ContactType[];
}