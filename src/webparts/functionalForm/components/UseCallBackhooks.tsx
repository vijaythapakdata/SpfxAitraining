import { TextField } from "@fluentui/react";
import * as React from "react";

const UseCallBackHooks:React.FC<{}>=()=>{
    const [name,setName]=React.useState<string>('');
    //use callback used for stable funtion

    const handleChange=React.useCallback((_:any,val?:string)=>{
        console.log("usecallback exexuted");
        setName(val||'')
    },[]);// no depednecies function=funtion never recreated
    return(
        <>
        <h3>use Callback hooks</h3>
        <TextField
        label="My Name"
        value={name}
        onChange={handleChange}
        />
        <p>hello{name}</p>
        </>
    )
}
export default UseCallBackHooks;