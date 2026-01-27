import * as React from 'react';
import { useState } from 'react';
// import styles from './SharePointForm.module.scss';
import type { ISharePointFormProps } from './ISharePointFormProps';
import { ISharePointFormState } from '../../../CommonMethods/ISharePointFormState';
import { CommonServiceApiClass } from '../../../CommonService/Commonserviceapi';
import {Dialog} from'@microsoft/sp-dialog';
import {sp} from'@pnp/sp/presets/all';
import {  ChoiceGroup, DatePicker, Dropdown, PrimaryButton, Slider, TextField, Toggle } from '@fluentui/react';
import {  PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { handleAdminPicker,handleManagerPicker } from '../../../CommonMethods/PeoplePickerHandler';
import { handleSkillsChange } from '../../../CommonMethods/onSkillsChangeHandler';
import { DateFormate, DatePickerStrings } from '../../../CommonMethods/DateFormattting';
import { handleAttachment } from '../../../CommonMethods/AttachmentHandler';
const SharePointForm :React.FC<ISharePointFormProps>=(props)=>{
  const [formdata,setFormData]=useState<ISharePointFormState>({
    Name:"",
    Age:"",
    Email:"",
    FullAddress:"",
    Salary:"",
    Score:1,
    Permission:false,
    Admin:"",
    AdminId:0,
    Manager:[],
    ManagerId:[],
    Skills:[],
    Department:"",
    Gender:"",
    City:"",
    DOB:""
  });
  const [attachments,setAttachments]=React.useState<File[]>([]);
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
const itemId=result.data.Id;
await _service.uploadAttachments(itemId,attachments)

Dialog.alert(`Item created with id :${result.data.Id}`);
console.log(result);
setFormData({
  Name:"",
    Age:"",
    Email:"",
    FullAddress:"",
    Salary:"",
    Score:1,
    Permission:false,
     Admin:"",
    AdminId:0,
    Manager:[],
    ManagerId:[],
    Skills:[],
    Department:"",
    Gender:"",
    City:"",
    DOB:""
});
setAttachments([]);
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

    <PeoplePicker
    context={props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true}
    onChange={(item)=>handleAdminPicker(item,setFormData)}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} 
    ensureUser={true}
    defaultSelectedUsers={[formdata.Admin?formdata.Admin:'']}
    webAbsoluteUrl={props.siteurl}
    />
     <PeoplePicker
    context={props.context as any}
    titleText="Manager"
    personSelectionLimit={3}
    showtooltip={true}
    onChange={(item)=>handleManagerPicker(item,setFormData)}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} 
    ensureUser={true}
    defaultSelectedUsers={formdata.Manager}
    webAbsoluteUrl={props.siteurl}
    />
    <Dropdown
    label='Department'
    options={props.dropdownoptions}
    placeholder='--select--'
    selectedKey={formdata.Department}
    onChange={(_,options)=>handleSubmit("Department",options?.key as string)}
    />
    <ChoiceGroup
    label='Gender'
    options={props.genderoptions}
    selectedKey={formdata.Gender}
        onChange={(_,options)=>handleSubmit("Gender",options?.key as string)}
    />
    <Dropdown
    label='City'
    options={props.citiesoptions}
    placeholder='--select--'
    selectedKey={formdata.City}
    onChange={(_,options)=>handleSubmit("City",options?.key as string)}
    />
     <Dropdown
    label='SKills'
    options={props.skillsoptions}
    placeholder='--select--'
 defaultSelectedKeys={formdata.Skills}
    onChange={(_,opt)=>handleSkillsChange(opt!,formdata,setFormData)}
    multiSelect
    />
    {/* DatePicker */}
    <DatePicker
    label="DOB"
    
    formatDate={DateFormate}
    strings={DatePickerStrings}
    onSelectDate={(date)=>setFormData(prev=>({...prev,DOB:date}))}
    />
    <input
    type='file'
    multiple
  title='Upload file'
    onChange={(e)=>handleAttachment(e,setAttachments)}
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
