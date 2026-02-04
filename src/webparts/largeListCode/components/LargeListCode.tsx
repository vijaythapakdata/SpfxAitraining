import * as React from 'react';
// import styles from './LargeListCode.module.scss';
import type { ILargeListCodeProps } from './ILargeListCodeProps';
import { useState,useMemo,useEffect } from 'react';
import { IDropdownOption ,PrimaryButton,DetailsList,Dropdown} from '@fluentui/react';
import { ILargeListServiceState } from '../../../CommonMethods/ISharePointFormState';
import { ServiceLargeListClass } from '../../../CommonService/LargeListServiceFile';
const pageSizeOptions:IDropdownOption[]=[
  {key:5,text:"5 items"},
  {key:10,text:"10 items"},
  {key:15,text:"15 items"},
  {key:20,text:"20 items"},
]

const LargeListCode:React.FC<ILargeListCodeProps>=(props)=>{
  const [pageObject,setPageObject]=useState<any>(null);
  const [previousPageStack,setPreviousPageStack]=useState<any[]>([]);
  const [pageSize,setPageSize]=useState<number>(10);
  const [loading,setLoading]=useState<boolean>(false);
  const [items,setItems]=useState<ILargeListServiceState[]>([]);

  const service=useMemo(()=>{
return new ServiceLargeListClass(props.context);
  },[props.context]);


  //load first page

  useEffect(()=>{
    loadPage();
  },[pageSize]);
//real pagination
  const loadPage=async(paged?:any)=>{
    setLoading(true);
    const res=await service.getLargeListItemsUsingOdata(pageSize,paged);
    setItems(res.items);
    setPageObject(res.pageObject);
    setLoading(false);
  } 

  //next page
  const nextPage=async()=>{
    if(!pageObject) return;
    setPreviousPageStack(prev=>[...prev,pageObject]);
    loadPage(pageObject);
  }

  //previous page
  const prevouisPage=async()=>{
    if(previousPageStack.length===0) return;
    const lastPageIndex=previousPageStack[previousPageStack.length-1];
    const updated=[...previousPageStack];
    updated.pop();
    setPreviousPageStack(updated);
    loadPage(lastPageIndex);
  }
  return(
    <>
    {/* Page size */}
    <Dropdown
    label='Page Size'
    options={pageSizeOptions}
    selectedKey={pageSize}
    onChange={(_,opt)=>setPageSize(opt?.key as any)}
    style={{width:200,marginBottom:20}}
    />
    {/* Pagination buttion */}
    
    <div style={{display:"flex",gap:10,marginBottom:20}}>
      <PrimaryButton
      text='Previous'
      iconProps={{iconName:'back'}}
      disabled={previousPageStack.length===0}
      onClick={prevouisPage}
      />
      <PrimaryButton
      text='Next'
      iconProps={{iconName:'next'}}
      disabled={!pageObject}
      onClick={nextPage}
      />

    </div>
    <DetailsList
    items={items}
    compact

    />
    {loading&&<p>loading ......</p>}
    </>
  )
}
export default LargeListCode