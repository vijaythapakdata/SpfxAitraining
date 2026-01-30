import * as React from 'react';
import type { IPaginatedtableProps } from './IPaginatedtableProps';
import { Dropdown, IDropdownOption, PrimaryButton } from '@fluentui/react';
import { useState,useEffect } from 'react';
import {sp} from "@pnp/sp/presets/all";
import PaginatedServiceClass from '../../../CommonService/PaginatedServiceApi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Input,Table } from 'antd';
const pageSizeOptions:IDropdownOption[]=[
  {key:5,text:"5 items"},
  {key:10,text:"10 items"},
  {key:15,text:"15 items"},
  {key:20,text:"20 items"},
]

const Paginatedtable:React.FC<IPaginatedtableProps>=(props)=>{
  const [allItems,setAllItems]=useState<any[]>([]);
  const [searchText,setSearchText]=useState<string>("");
  const [loading,setLoading]=useState<boolean>(false);
  
  const [pageSize,setPageSize]=useState<number>(5);
  const [page,setPage]=useState<number>(1);

useEffect(()=>{
sp.setup({
  spfxContext:props.context as any
});
const loadList=async()=>{
  setLoading(true);
  const response=await PaginatedServiceClass.getPaginatedItems();
  setAllItems(response);
  setLoading(false);
}
loadList();
},[props.context]);

//search filter
const filteredItems=allItems.filter((item)=>
item?.Title?.toLowerCase().includes(searchText.toLowerCase())||
item?.EmailAddress?.toLowerCase().includes(searchText.toLowerCase())||
item?.Admin?.toLowerCase().includes(searchText.toLowerCase())||
item?.City?.toLowerCase().includes(searchText.toLowerCase())||
item?.Age?.toString().includes(searchText)
);

//pagination slicing
const paginatedItems=filteredItems.slice((page-1)* pageSize, page * pageSize);

//columns
const columns=[
  {
    title:"Name",
    dataIndex:"Title",
    key:"Title",
    sorter:(a:any,b:any)=>(a.Title||"").localeCompare(b.Title||"")
  },
  {
    title:"Email Address",
    dataIndex:"EmailAddress",
    key:"EmailAddress",
    sorter:(a:any,b:any)=>(a.EmailAddress||"").localeCompare(b.EmailAddress||"")
  },
  {
    title:"Age",
    dataIndex:"Age",
    key:"Age",
    sorter:(a:any,b:any)=>(a.Age||0)-(b.Age||0)
  },
  {
    title:"Admin",
    dataIndex:"Admin",
    key:"Admin",
    sorter:(a:any,b:any)=>(a.Admin||"").localeCompare(b.Admin||"")
  },
  {
    title:"City",
    dataIndex:"City",
    key:"City",
    sorter:(a:any,b:any)=>(a.City||"").localeCompare(b.City||"")
  }
];

//search boc
const handleSearch=(e:any)=>setSearchText(e.target.value);

//Export to excel
const exportToExcel=()=>{
  const workSheet=XLSX.utils.json_to_sheet(filteredItems);
  const workbook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook,workSheet,"SPListData");
  XLSX.writeFile(workbook,"SPListData.xlsx");
}

//export to pdf
const exportToPDF=()=>{
  const doc=new jsPDF();
  doc.text("SharePoint lis data",10,10);
  const tableRows:any[]=[];

  filteredItems.forEach((item)=>{
    tableRows.push([item.Title,item.EmailAddress,item.Age,item.Admin,item.City]);
  });
 autoTable(doc,{
    head:[["Name","Email Address","Age","Admin","City"]],
    body:tableRows,
    startY:20
  });
  doc.save("SPListData.pdf");
}
  return(
    <>
    {/* Search box */}
    <Input
    placeholder="search here.."
    style={{marginBottom:20,width:"300px"}}
    value={searchText}
    onChange={handleSearch}
    />

    {/* Page Size */}
    <Dropdown
    label='Page Size'
    options={pageSizeOptions}
    selectedKey={pageSize}
    onChange={(_,options)=>{
      setPageSize(options?.key as any);
      setPage(1);
    }}
    style={{width:200,marginBottom:20}}
    />
    {/* Export button */}
    <div style={{marginBottom:20,display:"flex",gap:"10px"}}>
      <PrimaryButton
      text='Export to Excel'
      onClick={exportToExcel}
      iconProps={{iconName:'excel'}}
      />
      <PrimaryButton
      text='Export to PDF'
      onClick={exportToPDF}
      iconProps={{iconName:'pdf'}}
      styles={{root:{background:"red",borderColor:"red"}}}
      />

    </div>
    {/* Table */}
    <Table
    columns={columns}
    dataSource={paginatedItems}
    loading={loading}
    pagination={{
      current:page,
      pageSize:pageSize,
      total:filteredItems.length,
      onChange:(p)=>setPage(p)
    }}
    rowKey="Key"
    />
    </>
  )
}
export default Paginatedtable;
