import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import DateTimePicker from 'react-datetime-picker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
    typography: {
      fontSize: 12,
      fontFamily: "Segoe UI, Helvetica, Arial, sans-serif",
    },
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

function Calendar() {
    const [value, setValue] = React.useState(new Date());

    const onChange = (newValue) => {
        setValue(newValue);
    };

    const storeDate = () => {
        console.log("Confirmed!");
    };

    return (
        <ThemeProvider theme={theme}>
        <div style={{margin: "5% 40%"}}>
            <Stack spacing={3}>
            <DateTimePicker
                label="Date&Time picker"
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
            />
            <button onClick={storeDate(value)}>Confirm</button>
            </Stack>

        </div>
        </ThemeProvider>
    );
}

export default Calendar;