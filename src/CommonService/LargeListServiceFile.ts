import { WebPartContext } from "@microsoft/sp-webpart-base";
import {sp} from "@pnp/sp/presets/all";
import { ListNames } from "../Enum/ListService";
export class ServiceLargeListClass{
    constructor(context:WebPartContext){
        sp.setup({
            spfxContext:context as any
        });
    }

    public async getLargeListItemsUsingOdata(pageSize:number,pageObject:any){
        let paged;
        if(pageObject){
            //load next batch
            paged=await pageObject.getNext();
        }
        else{
            //load first batch
            paged=await sp.web.lists.getByTitle(ListNames.FirstList).items.select("Id","Title").top(pageSize).getPaged();
        }
        return{
            items:paged.results.map((i:any)=>({
                Id:i.Id,
                Title:i.Title
            })),
            pageObject:paged.hasNext?paged:null
        }
    }
}