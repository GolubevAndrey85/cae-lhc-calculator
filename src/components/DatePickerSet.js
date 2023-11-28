import React, { useState } from "react";
import DatePicker from "react-datepicker";
// import dayjs, { Dayjs } from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const ExampleSet = (props) => {
  const updateFirstDate = (date, i) => {
    setFirstDate(date);
    console.log('>> setFirstDate: ' + date);
    props.setFirstDate(date, i);
  }

  const updateSecondDate = (date, i) => {
    setSecondDate(date);
    console.log('>> setSecondDate: ' + date);
    props.setSecondDate(date, i);
  }

  const [firstDate, setFirstDate] = useState(props.startDate);
  const [secondDate, setSecondDate] = useState(props.endDate);

  return (
    <div key={props.i}>
      <DatePicker selected={firstDate} onChange={(date) => updateFirstDate(date, props.i)} showYearDropdown dateFormat="dd MMMM yyyy" yearDropdownItemNumber={50} scrollableYearDropdown/>
      <DatePicker selected={secondDate} onChange={(date) => updateSecondDate(date, props.i)} showYearDropdown dateFormat="dd MMMM yyyy" yearDropdownItemNumber={50} scrollableYearDropdown />
    </div>
  );
};

export default ExampleSet;