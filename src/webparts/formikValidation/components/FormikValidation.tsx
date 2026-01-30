import * as React from 'react';
import styles from './FormikValidation.module.scss';
import type { IFormikValidationProps } from './IFormikValidationProps';

import { FormikService } from '../../../CommonService/FormikService';
import { useState,useEffect } from 'react';
import {sp} from "@pnp/sp/presets/all";
import * as Yup from 'yup';
import { Formik,FormikProps } from 'formik';
import { Dialog } from '@microsoft/sp-dialog';
import { DatePicker, Dropdown, Label, PrimaryButton, Stack, TextField } from '@fluentui/react';
import {  PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DateFormate, DatePickerStrings } from '../../../CommonMethods/DateFormattting';
const stackTokens={
  childrenGap:10
}
const  FormikValidation:React.FC<IFormikValidationProps>=(props)=>{
  const [service,setService]=useState<ReturnType<typeof FormikService>|null>(null);

  useEffect(()=>{
sp.setup({ 
  spfxContext:props.context as any
});
setService(FormikService());
  },[props.context,props.siteurl]);

const ValidationSchema=Yup.object().shape({
  name:Yup.string().required("Task Name is required"),
  details:Yup.string().min(15,"Minimum 15 or more than 15 characters are required").required("Task details are required"),
  startDate:Yup.date().required("Start Date is required"),
  endDate:Yup.date().required("End Date is required"),
  projectName:Yup.string().required("Project name is required"),
  phoneNumber:Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/,"phone number must be 10 digits"),
  // emailAddress:Yup.string().email("Invalid email").required("Email address is required") hotmail.com,gmail.com,
  //  yahoo.com , onmicrosoft.com

  emailAddress:Yup.string().email("Invalid email format").required("Email is required")
  .test("Invalid=-domains","Personal email domains (hotmail.com,gmail.com, yahoo.com , onmicrosoft.com) are not allowed",

    (value)=>{
      if(!value) return false;
      const email=value.toLowerCase()

      //block these domain hotmail.com,gmail.com, yahoo.com , onmicrosoft.com
      const blockedDomains=["gmail.com","hotmail.com","yahoo.com","onmicrosoft.com"];
      return !blockedDomains.some(domain=>email.endsWith(domain))
    }
  )
});

//common field props

const getFieldProps=(formik:FormikProps<any>,field:string)=>({
  ...formik.getFieldProps(field),errorMessage:formik.errors[field] as string
});

//create itmes

const createrecord=async(record:any)=>{
  try{
if(!service) return;
const item=await service.createItems({
  Title:record.name,
  TaskDetails:record.details,
  StartDate:record.startDate,
  EndDate:record.endDate,
  ProjectName:record.projectName,
  PhoneNumber:record.phoneNumber,
  EmailAddress:record.emailAddress
});
Dialog.alert("Saved Successfullly");
console.log(item);
  }
  catch(err){
console.error(err);
  }
}
  return(
    <>
    <Formik
    initialValues={{
      name:"",
      details:"",
      emailAddress:"",
      startDate:null,
      endDate:null,
      phoneNumber:"",
      projectName:""
    }}
    validationSchema={ValidationSchema}
    onSubmit={(values,helper)=>{
      createrecord(values).then(()=>helper.resetForm())
    }}
    
    >
{(formik:FormikProps<any>)=>(
  <form onSubmit={formik.handleSubmit}>
<div className={styles.formikValidation }>
<Stack
tokens={stackTokens}>

  <Label className={styles.lbl}>User Name</Label>
     <PeoplePicker
      context={props.context as any}
     
      personSelectionLimit={1}
      showtooltip={true}
     disabled={true}
      principalTypes={[PrincipalType.User]}
      resolveDelay={1000} 
      ensureUser={true}
      defaultSelectedUsers={[props.context.pageContext.user.displayName]}
      webAbsoluteUrl={props.siteurl}
      />
        <Label className={styles.lbl}>Task Name</Label>
        <TextField
        {...getFieldProps(formik,'name')}
        />
         <Label className={styles.lbl}>Phone Number</Label>
        <TextField
        {...getFieldProps(formik,'phoneNumber')}
        />
         <Label className={styles.lbl}>Email Address</Label>
        <TextField
        {...getFieldProps(formik,'emailAddress')}
        />
         

           <Label className={styles.lbl}>Project Name</Label>
           <Dropdown
           options={[
            {key:'Project A',text:'Project A'},
            {key:'Project B',text:'Project B'}
           ]}
           onChange={(_,e)=>formik.setFieldValue('projectName',e?.key as string)}
           errorMessage={formik.errors.projectName as string}
           />

              <Label className={styles.lbl}>Start Date</Label>

              <DatePicker
              value={formik.values.startDate}
              textField={{...getFieldProps(formik,'startDate')}}
              onSelectDate={(date)=>formik.setFieldValue('startDate',date)}
              strings={DatePickerStrings}
              formatDate={DateFormate}
              />
               <Label className={styles.lbl}>End Date</Label>

              <DatePicker
              value={formik.values.endDate}
              textField={{...getFieldProps(formik,'endDate')}}
              onSelectDate={(date)=>formik.setFieldValue('endDate',date)}
              strings={DatePickerStrings}
              formatDate={DateFormate}
              />
         <Label className={styles.lbl}>Task Details</Label>
        <TextField
        {...getFieldProps(formik,'details')}
        multiline
        rows={5}
        />
</Stack>
<PrimaryButton
className={styles.btn}
type='submit'
text='Submit'
iconProps={{iconName:'save'}}
/>
<PrimaryButton
className={styles.btn}

text='Cancel'
iconProps={{iconName:'cancel'}}
onClick={formik.handleReset as any}
/>
</div>
  </form>
)}

    </Formik>
    </>
  )
}
export default  FormikValidation;
