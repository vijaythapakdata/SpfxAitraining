import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ISharePointFormState } from "../CommonMethods/ISharePointFormState";
import { ListNames } from "../Enum/ListService";
export class CommonServiceApiClass{
    private web;
    constructor(siteurl:string){
        this.web=Web(siteurl);
    }

public async addItems(formData:ISharePointFormState):Promise<any>{
    try{
const list=this.web.lists.getByTitle(ListNames.FirstList);
const items=await list.items.add({
Title:formData.Name,
EmailAddress:formData.Email,
Age:parseInt(formData.Age),
Address:formData.FullAddress,
Salary:parseFloat(formData.Salary),
Permission:formData.Permission,
Score:formData.Score
});
return items;
    }
    catch(err)
    {
console.log("Error occurred while creating items",err);
    }
}
}