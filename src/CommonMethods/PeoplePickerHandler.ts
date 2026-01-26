import { ISharePointFormState } from "./ISharePointFormState";

//single selected people picker

export const handleAdminPicker=(items:any[],setFormData:React.Dispatch<React.SetStateAction<ISharePointFormState>>)=>{
    if(items.length>0){
        setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}))
    }
    else{
        setFormData(prev=>({...prev,Admin:"",AdminId:0}))
    }

};

export const handleManagerPicker=(items:any[],setFormData:React.Dispatch<React.SetStateAction<ISharePointFormState>>)=>{
    setFormData(prev=>({...prev,Manager:items.map(i=>i.text),
        ManagerId:items.map(i=>i.id)


    }))

};