import * as React from 'react';
import { IFunctionalFormProps } from './IFunctionalFormProps';
import ButtonFile from './ButtonFile';
import { PrimaryButton } from '@fluentui/react';

const FunctionalForm :React.FC<IFunctionalFormProps>=(props)=>{

  // var understaning

  const num2=10;
  let num4=25;
  const varUnderstandting=():void=>{
    // we have three ways to declare the variable in javasrcipt or you can say react
    
    // first way
    const num1=5;
    // const is non volatile variable we can not chane the value after decalring
  console.log(num1); //5
  console.log(num2);

  let num3=15;
  //let is volatile variable we can change the value after declaring
  console.log(num3);//15
  num3 =20;
  console.log(num3);//20
  console.log(num4);//

  var name="Vijay thapak"
  console.log(name);//"viay thapak"

  const fruits=["Mango","Apple","Grapes","Banana"];//lent=4 , 0=Mango, 1=Apple, 2=Grapes, 3=Banana
  console.log(fruits);

  fruits.forEach((items,index)=>{
    console.log(items+" at index "+index);
  })

  for(let i=0;i<=fruits.length;i++){
    console.log(fruits[i]); //Mango Apple,grapes
  }


  let i=1;
  do{
    console.log(i);//1
    i++
  }
  while(i<=10);

  let age=18;
  if(age<=18){
    console.log("You are eligible for voting");
  }
  else if(age>18 && age<=60){
    console.log("You are adult");
  }
  else{
    console.log("You are senior citizen");
  }
let day=3;
switch(day){
  case 1:
    console.log("Sunday");
    break;
  case 2:
    console.log("Monday");
    break;
  case 3:
    console.log("Tuesday");
    break;
    default:
    console.log("Invalid day");

    //spread operator
    const numbers=[1,2,3,4,5];
    const newNumbers=[...numbers,6,7,8,9,10];
    console.log(newNumbers);

    const person=["Aman","Kabir"];
    const person2=["Vijay","Ravi"]

    const neewpersion=[...person,...person2];
    console.log(neewpersion);

    //==, ===
   

}

  }
 
  return(
    <>
    <p>I am spfx webpart</p>
    {props.userDisplayName}
    <ButtonFile/>
    <PrimaryButton text="Click Here" onClick={varUnderstandting}/>
    </>
  )
}
export default FunctionalForm ;