import { IDatePickerStrings } from "@fluentui/react";

export const DatePickerStrings:IDatePickerStrings={
    months:["January","February","March","April","May","June","July","August","Septmber","October","November","December"],
    shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    goToToday:"go to today",
    prevMonthAriaLabel:"go to previous month",
    nextMonthAriaLabel:"next month",
    prevYearAriaLabel:"previous year",
    nextYearAriaLabel:"next year"
}

export const DateFormate=(date:any):string=>{
    let date1=new Date(date);

    //year
    let year=date1.getFullYear();

    //month
    let month=(1+date1.getMonth().toString());
    month=month.length>1?month:'0'+month;
    
    //day
    let day=date1.getDate().toString();
    day=day.length>1?day:'0'+day;

    return day+'-'+month+'-'+year
}