import * as React from 'react';
import { IFunctionalFormProps } from './IFunctionalFormProps';
import ButtonFile from './ButtonFile';

const FunctionalForm :React.FC<IFunctionalFormProps>=(props)=>{
  return(
    <>
    <p>I am spfx webpart</p>
    {props.userDisplayName}
    <ButtonFile/>
    </>
  )
}
export default FunctionalForm ;