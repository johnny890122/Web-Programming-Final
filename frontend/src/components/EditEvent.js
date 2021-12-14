import { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import DateFnsUtils from '@date-io/date-fns'; 
import { EventData } from './ListData';

function EditEvent() {

    const [event, setEvent] = useState({id: "4",
                                        title: "練球",
                                        description: "好想回家嗚嗚嗚", 
                                        start: "2021-12-15 18:00",
                                        end: null,
                                        type: "team",
                                        location: "台大",
                                        posttime: "2021-12-15 03:00",
                                        author: {id: "0",
                                                name: "Yoga"},
                                        reply: [{id: "0",
                                                name: "Yoga",
                                                attend: true,
                                                content: null},
                                                {id: "0",
                                                name: "Yoga2",
                                                attend: null,
                                                content: null},
                                                {id: "0",
                                                name: "Yoga3",
                                                attend: false,
                                                content: "很累"},]
   })

    const [eTitle, setETitle] = useState(null);
    const [eDes, setEDes] = useState(null);
    const [eDate, setEDate] = useState(null);
    const [eTime, setETime] = useState(null);
    const [eLocation, setELocation] = useState(null);

    const eTitleChange = (newValue) => {setETitle(newValue)};
    const eDesChange = (newValue) => {setEDes(newValue)};                                    
    const eDateChange = (newValue) => {setEDate(newValue)};
    const eTimeChange = (newValue) => {setETime(newValue)};
    const eLocationChange = (newValue) => {setELocation(newValue)};

    return(
    <>
        <h2>Edit Event</h2>
        <Box component="form"
             noValidate
             autoComplete="off">

          <div>
            <TextField id="create-event-title"
                       required
                       label="Title"
                       onChange={eTitleChange}
                       defaultValue={event.title} />
          </div>
          <div>
            <TextField id="create-event-description"
                       label="Description"
                       onChange={eDesChange}
                       defaultValue={event.description} />
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    //id="create-event-date"
                    label="Date"
                    inputFormat="yyyy-MM-dd"
                    //value={"2021-11-28"}
                    onChange={eDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    //id="create-event-time"
                    label="Time"
                    //value={"18:30"}
                    onChange={eTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </div>
          <div>
            <TextField id="create-event-location"
                       label="Location"
                       onChange={eLocationChange}
                       defaultValue={event.location} />
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

export default EditEvent;