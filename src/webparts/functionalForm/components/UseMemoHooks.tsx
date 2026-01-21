import { TextField } from '@fluentui/react';
import * as React from 'react';
import { useMemo,useState } from 'react';
const UseMemoHooks:React.FC<{}>=()=>{
    const [name,setName]=useState<string>('');

    //use memp used for computed values
    const greetings=useMemo(()=>{
        console.log("usememo executed");
        return `hello ${name}`;
    },[name]);//re-run only when name changes
    return(
        <>
        <TextField
        label='Name'
        onChange={(_,val)=>setName(val||'')}
        />
        <p>{greetings}</p>
        </>
    )
}
export default UseMemoHooks;