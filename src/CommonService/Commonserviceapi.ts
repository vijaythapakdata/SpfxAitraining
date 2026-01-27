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
Score:formData.Score,
AdminId:formData.AdminId,
ManagerId:{results:formData.ManagerId},
Department:formData.Department,
Gender:formData.Gender,
Skills:{results:formData.Skills},
CityId:formData.City,
DOB:new Date(formData.DOB)
});
return items;
    }
    catch(err)
    {
console.log("Error occurred while creating items",err);
    }
}
//attachment

public async uploadAttachments(itemId:number,Attachments:File[]):Promise<void>{
    if(!Attachments||Attachments.length===0) return;

    const list=this.web.lists.getByTitle(ListNames.FirstList);
    
    for(const file of Attachments){
        await list.items.getById(itemId).attachmentFiles.add(file.name,file)
    }
}
}