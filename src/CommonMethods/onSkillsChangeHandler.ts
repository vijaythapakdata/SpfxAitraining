import { ISharePointFormState } from "./ISharePointFormState";
import { IDropdownOption } from "@fluentui/react";

export const handleSkillsChange=
(options:IDropdownOption,formData:ISharePointFormState,setFormData:
    React.Dispatch<React.SetStateAction<ISharePointFormState>>)=>{
    //[a,b,c,d]= a,d ...

    const selectedkeys=options.selected?[...formData.Skills, options?.key as string]:
    formData.Skills.filter((key:any)=>key!==options.key);
    setFormData(prev=>({...prev,Skills:selectedkeys}))
}