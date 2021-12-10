import { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import DateFnsUtils from '@date-io/date-fns'; 
import { EventData } from './ListData';

function CreateEvent() {

    const [event, setEvent] = useState({id: "5",
                                       title: "打疫苗",
                                       description: null,
                                       start: null,
                                       end: null, 
                                       type: null,
                                       location: null})

    return(
    <>
        <h2>Create New Event</h2>
        <Box component="form"
             noValidate
             autoComplete="off">

          <div>
            <TextField id="create-event-title"
                       required
                       label="Title"
                       placeholder="打疫苗" />
          </div>
          <div>
            <TextField id="create-event-description"
                       label="Description"
                       placeholder="Eg. 打針 QQ" />
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    //id="create-event-date"
                    label="Date"
                    inputFormat="yyyy-MM-dd"
                    value={"2021-11-28"}
                    onChange={console.log('date')}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    //id="create-event-time"
                    label="Time"
                    value={"18:30"}
                    onChange={console.log('time')}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </div>
          <div>
            <TextField id="create-event-location"
                       label="Location"
                       placeholder="Eg. 台大醫院" />
          </div>    
          <div>
             <Button color= "success" variant="contained" size="large">
                Create!
             </Button>
           </div>
        </Box>
    </>
    )
}

export default CreateEvent;