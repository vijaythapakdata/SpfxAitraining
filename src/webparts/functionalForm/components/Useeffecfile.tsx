import * as React from 'react';
import { TextField } from '@fluentui/react';

const UseEffectHooks:React.FC<{}>=()=>{
    const [name,setName]=React.useState<string>('');

   React.useEffect(()=>{
console.log("componet loaded");
    },[]);// Empty dependency array means this effect runs once on mount
    return(
        <>
        <p>Hello: {name}</p>
        <TextField
        value={name}
        onChange={(e:any)=>setName(e.target.value)}
        />
        </>
    )
}
export default UseEffectHooks;