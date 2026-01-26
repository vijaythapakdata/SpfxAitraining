import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ListNames } from "../Enum/ListService";

export default class GetChoiceValueClassApi{
    private context:WebPartContext;

    constructor(context:WebPartContext){
        this.context=context;

    }
//read choices values 

public async getChoiceValues(siteurl:string,fieldValue:string):Promise<any>{
    try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListNames.FirstList}')/fields?$filter=EntityPropertyName eq '${fieldValue}'`,
{
    method:'GET',
    headers:{
        'Accept':'application/json;odata=nometadata'

    }
}

) ;

if(!response.ok){
    throw new Error(`Error found while fetching choice value ${response.text}-${response.statusText}`);
};
const data=await response.json();
const choices=data.value[0].Choices;
return choices.map((items:any)=>({
    key: items,
    text:items//[A,B,C]
}));
    }
    catch(err){
console.error(err);
return [];
    }
}


//get lookup

public async getLookupChoices():Promise<any>{
    try{
const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${ListNames.Cities}')/items?$select=Title,ID`,
    {
        method:'GET',
        headers:{
              'Accept':'application/json;odata=nometadata'
        }
    }
);
if(!response.ok){
    throw new Error(`Error found while fetching lookup value ${response.text}-${response.statusText}`);
};
const data=await response.json();
return data.value.map((city:{Title:string,ID:string})=>({
    key:city.ID,
    text:city.Title
}));
    }
    catch(err){
console.error(err);
return [];
    }
}
}