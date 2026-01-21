import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';

const CounterApp:React.FC<{}>=()=>{
    const[count,updateCount]=React.useState<number>(0);
    return(
        <>
        <p>Count:{count}
            {/* 0 */}
        </p>
        <PrimaryButton
        text='Count' onClick={()=>updateCount(count+1)}
        />
        </>
    )
}
export default CounterApp;