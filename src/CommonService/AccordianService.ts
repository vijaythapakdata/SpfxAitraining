import { Web } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { AccordianState } from "../CommonMethods/ISharePointFormState";
import { ListNames } from "../Enum/ListService";

export default class AccordianService{
    private web:any;

    constructor(siteurl:string){
        this.web=Web(siteurl);
    }

public async getAccordianItems():Promise<AccordianState[]>{
    try{
const items=await this.web.lists.getByTitle(ListNames.FAQList).items.select("Title","Question","Response","Langue/Title")
.expand("Langue").orderBy("Created",false).get();
return items;

    }
    catch(err){
console.error("Error while fetching the items",err);
throw err;
    }
}
}