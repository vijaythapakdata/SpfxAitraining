import * as React from 'react';
// import styles from './AccordianWebPart.module.scss';
import type { IAccordianWebPartProps } from './IAccordianWebPartProps';
import { useState ,useEffect} from 'react';
import { AccordianState } from '../../../CommonMethods/ISharePointFormState';
import AccordianService from '../../../CommonService/AccordianService';
import { Accordion } from '@pnp/spfx-controls-react';


const  AccordianWebPart:React.FC<IAccordianWebPartProps>=(props)=>{
  const [items,setItems]=useState<AccordianState[]>([]);
  const [loading,setLoading]=useState<boolean>(true);

  useEffect(()=>{
    const service=new AccordianService(props.siteurl);
    const loadData=async()=>{
      try{
        const res=await service.getAccordianItems();
        setItems(res);

      }
      catch(err){
console.error(err);
      }
      finally{
        setLoading(false);
      }
    };
    loadData();

  },[props.siteurl]);
  if(loading)<div>Loading ....</div>
  return(
    <>
    {items.map((item,index)=>(
      <Accordion
      key={index}
      title={item.Question}
      defaultCollapsed={true}
      className='itemCell'
      collapsedIcon={"Rocket"} expandedIcon={"InkingTool"}

>
  <div className='itemContent'>
<div className='itemResponse'>{item.Response}</div>
{item.Langue?.Title&&(
  <div className='itemIndex'>
{`Langue:${item.Langue.Title}`}
  </div>
)}
  </div>

      </Accordion>
    ))}
    </>
  )
}
export default  AccordianWebPart;

