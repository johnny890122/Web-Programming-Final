import { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import DateFnsUtils from '@date-io/date-fns'; 
import { EventData } from '../components/ListData';

function CreateEvent() {

    const [event, setEvent] = useState({})
    const [title, setTitle] = useState(null)
    const [description, setSDescription] = useState(null)
    const [location, setLocation] = useState(null)
    const [sDate, setSDate] = useState(null)
    const [sTime, setSTime] = useState(null)             
    const [eDate, setEDate] = useState(null)
    const [eTime, setETime] = useState(null)

    const ValueChange = (setValue, newValue) => {setValue(newValue)};
    
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
                       placeholder="活動名稱" 
                       onChange={ValueChange(setTitle, title)}/>
          </div>
          <div>
            <TextField id="create-event-description"
                       label="Description"
                       placeholder="活動內容" 
                       onChange={ValueChange(setSDescription, description)}/>
          </div>
          <div>
            <Typography gutterBottom variant="h5" component="div">
                開始時間
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    //id="create-event-date"
                    label="Date"
                    inputFormat="yyyy-MM-dd"
                    //value={"2021-11-28"}
                    onChange={ValueChange(setSDate, sDate)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    //id="create-event-time"
                    label="Time"
                    //value={"18:30"}
                    onChange={ValueChange(setSTime, sTime)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </div>
          <div>
            <Typography gutterBottom variant="h5" component="div">
                結束時間
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    //id="create-event-date"
                    label="Date"
                    inputFormat="yyyy-MM-dd"
                    //value={"2021-11-28"}
                    onChange={ValueChange(setEDate, eDate)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    //id="create-event-time"
                    label="Time"
                    //value={"18:30"}
                    onChange={ValueChange(setETime, eTime)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </div>
          <div>
            <TextField id="create-event-location"
                       label="Location"
                       placeholder="活動地點" 
                       onChange={ValueChange(setLocation, location)}/>
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