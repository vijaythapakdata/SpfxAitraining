import {sp} from "@pnp/sp/presets/all";
import { IPaginatedItemsState } from "../CommonMethods/ISharePointFormState";
import { ListNames } from "../Enum/ListService";
export default class PaginatedServiceClass{
public static async getPaginatedItems():Promise<IPaginatedItemsState[]>{
try{
let allItems:any[]=[];
let paged=await sp.web.lists.getByTitle(ListNames.FirstList)
.items
.select("Id","Title","EmailAddress","Age","Admin/Title","City/Title")
.expand("Admin","City")
.top(4999)
.getPaged(); //max batched 4999

//first batch
allItems.push(...paged.results);
console.log(`fetched first batch ${paged.results.length}`);
//continue fetching next batches
while(paged.hasNext){
    paged=await paged.getNext();//next page call
    allItems.push(...paged.results);
    console.log(`fetched next batch ${paged.results.length}`);
}
console.log(`total batch ${allItems.length}`);

//return same structure thst what sare expecting
return allItems.map((e:any)=>({
    Key:e.Id,
    Title:e.Title,
    EmailAddress:e.EmailAddress,
    Age:e.Age,
    Admin:e.Admin?.Title,
    City:e.City?.Title
}));
}
catch(err){
console.log("Error while fetchhing the items ...",err);
return[];
}
}
}