export interface ISharePointFormState{
    Name:string;
    Email:string;
    Age:any;
    Salary:any;
    Permission:boolean;
    FullAddress:string;
    Score:number;
    Admin:string;
    AdminId:number;
    Manager:any[];
    ManagerId:any[];
    Department:string;
    Gender:string;
    City:any;
    Skills:any
    DOB?:any;
    Attachments?:any;
   
}

//state for table 

export interface IPaginatedItemsState{
    Key:number;
    Title:string;
    EmailAddress:string;
    Age:number;
    Admin:string;
    City:string;
}

export interface ILargeListServiceState{
    Title:string;
}

export interface IUserInfo{
    id:string;
    displayName:string;
    mail:string;
    jobTitle?:string;
    department?:string;
}
export interface AccordianState{
    Title:string;
    Question:string;
    Response:string;
    Langue:{
        Title:string
    }
}
