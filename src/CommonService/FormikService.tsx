import {sp} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ListNames } from "../Enum/ListService";

export const FormikService=()=>{

    const createItems=async(body:any)=>{
        const createitem=await sp.web.lists.getByTitle(ListNames.FormikList)
        .items.add(body);
        return createitem;
    }
    return(
        {createItems}
    )
}