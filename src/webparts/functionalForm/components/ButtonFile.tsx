import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
const ButtonFile:React.FC<{}>=()=>{
    return(
        <>
        {/* Primary Button */}
        <PrimaryButton
        text='Save'
        onClick={()=>alert('I am save button')}
        iconProps={{iconName:'save'}}
        />
        &nbsp; &nbsp;
        {/* Default Button */}
        <DefaultButton
        text='Cancel'
        onClick={()=>alert('I am cancel button')}
        iconProps={{iconName:'cancel'}}
        />
        </>
    )
}
export default ButtonFile;