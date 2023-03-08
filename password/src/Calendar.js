import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import DateTimePicker from 'react-datetime-picker';

function Calendar() {
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
   
    const onChange = (newValue) => {
      setValue(newValue);
    };

    return (
        <div style={{margin: "5% 40%"}}>
            <Stack spacing={3}>
            <DatePicker
                label="Date"
                value={value}
                onChange={onChange}
            />
            <TimePicker
                label="Time"
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
                label="Date&Time picker"
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
            />
            </Stack>
        </div>
    );
}

export default Calendar;