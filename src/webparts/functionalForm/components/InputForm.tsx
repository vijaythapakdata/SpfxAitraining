// import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';

const InputForms:React.FC<{}>=()=>{
    const[name,setName]=React.useState<string>('');
    return(
        <>
   <p> Hello:{name}
            {/* 0 */}
        </p>
       <input
       value={name}
       onChange={(e:any)=>setName(e.target.value)}
       />
        </>
    )
}
export default InputForms;