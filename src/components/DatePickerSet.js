import React, { useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const ExampleSet = (props) => {
  const updateFirstDate = (date, i) => {
    setFirstDate(date);
    console.log('>> setFirstDate: ' + date);
    props.setFirstDate(new Date(date), i);
  }

  const updateSecondDate = (date, i) => {
    setSecondDate(date);
    console.log('>> setSecondDate: ' + date);
    props.setSecondDate(new Date(date), i);
  }

  const [firstDate, setFirstDate] = useState(props.startDate);
  const [secondDate, setSecondDate] = useState(props.endDate);

  return (
    <div key={props.i} style={{margin: '10px'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label={props.labelFirst} onChange={(date) => updateFirstDate(date, props.i)} defaultValue={dayjs(firstDate)}/>
          <DatePicker label={props.labelSecond} onChange={(date) => updateSecondDate(date, props.i)} defaultValue={dayjs(secondDate)}/>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default ExampleSet;