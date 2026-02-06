import * as React from 'react';
import { TextField } from '@fluentui/react';
import { useState } from 'react';

const FormPage:React.FC<{}>=()=>{
    const [name,setName]=useState<string>('');

    return(
        <>
        <div style={{padding:30}}>
            <h2>Form Page</h2>
            <TextField
            label='Name'
            value={name}
            onChange={(_,e)=>setName(e||'')}
            style={{padding:8,margin:10,width:500}}
            />
{name&&(
    <p style={{marginTop:20}}>Hello:{name}

    </p>
)}
        </div>
        </>
    )
}
export default FormPage;