import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISharePointFormProps {
 context:WebPartContext;
 siteurl:string;
 dropdownoptions:any;
 skillsoptions:any;
 genderoptions:any;
 citiesoptions:any;

}
