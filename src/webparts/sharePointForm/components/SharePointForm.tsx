import * as React from 'react';
import { useState } from 'react';
// import styles from './SharePointForm.module.scss';
import type { ISharePointFormProps } from './ISharePointFormProps';
import { ISharePointFormState } from '../../../CommonMethods/ISharePointFormState';
import { CommonServiceApiClass } from '../../../CommonService/Commonserviceapi';
import {Dialog} from'@microsoft/sp-dialog';
import {sp} from'@pnp/sp/presets/all';
import { PrimaryButton, Slider, TextField, Toggle } from '@fluentui/react';
const SharePointForm :React.FC<ISharePointFormProps>=(props)=>{
  const [formdata,setFormData]=useState<ISharePointFormState>({
    Name:"",
    Age:"",
    Email:"",
    FullAddress:"",
    Salary:"",
    Score:1,
    Permission:false
  });
  React.useEffect(()=>{
    sp.setup({
      spfxContext:props.context as any
    })
  },[]);
// Create function
const createFormData=async()=>{
  try{
const _service =new CommonServiceApiClass(props.siteurl);
const result=await _service.addItems(formdata);
Dialog.alert(`Item created with id :${result.data.Id}`);
console.log(result);
setFormData({
  Name:"",
    Age:"",
    Email:"",
    FullAddress:"",
    Salary:"",
    Score:1,
    Permission:false
});
  }
  catch(err){
console.log("Error while creating item",err);
Dialog.alert("Error while creating item");
  }
}
//form handler event

const handleSubmit=React.useCallback((field:keyof ISharePointFormState,value:string|boolean|number):void=>{
  setFormData(event=>({...event,[field]:value}))
},[]);
  return(
    <>
    <TextField
    label='Name'
    value={formdata.Name}
    onChange={(_,e)=>handleSubmit("Name",e||'')}
    />
     <TextField
    label='Email Address'
    value={formdata.Email}
    onChange={(_,e)=>handleSubmit("Email",e||'')}
    iconProps={{iconName:'mail'}}
    />
     <TextField
    label='Age'
    value={formdata.Age}
    onChange={(_,e)=>handleSubmit("Age",e||'')}
    />
     <TextField
    label='Salary'
    value={formdata.Salary}
    onChange={(_,e)=>handleSubmit("Salary",e||'')}
    prefix='$' suffix='#'
    />
    <Slider
    label='Score'
    value={formdata.Score}
    min={1}
    max={100}
    step={1}
    onChange={(val)=>handleSubmit("Score",val||"")}
    />
    <Toggle
    label="Permission"
    checked={formdata.Permission}
    onChange={(_,checked)=>handleSubmit("Permission",checked!!)}
    />
     <TextField
    label='Full Address'
    value={formdata.FullAddress}
    onChange={(_,e)=>handleSubmit("FullAddress",e||'')}
    multiline
    rows={5}
    iconProps={{iconName:'home'}}
    />
    <br/>
    <PrimaryButton
    text='Save'
    onClick={createFormData}
    iconProps={{iconName:'save'}}
    />
    </>
  )
}
export default SharePointForm;
