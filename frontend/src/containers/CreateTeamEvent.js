import Template from "../components/Template";
import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import DateFnsUtils from '@date-io/date-fns'; 
import moment from "moment";
import { EventData } from '../components/ListData';
import { Event } from "@mui/icons-material";

function CreateTeamEvent() {

    const [event, setEvent] = useState({
        eventTitle: null,
        eventDescription: null,
        eventLocation: null
    })

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [location, setlocation] = useState(null);
    const [sDate, setSDate] = useState(null);
    const [sTime, setSTime] = useState(null);
    const [eDate, setEDate] = useState(null);
    const [eTime, setETime] = useState(null);

    const subbmitEvent = () => {
        const eventInput = {
            eventTitle: title,
            eventDescription: description,
            eventStart: sDate+ sTime,
            eventEnd: eDate+ eTime,
            eventLocation: location
        };
        setEvent(eventInput); // 送出表單
        console.log(eventInput);

    }
    const CreatePage = ( 
      <div className = "create-event-page">
        <h2>Create Team Event</h2>
        <Box component="form"
                noValidate
                autoComplete="off">

            <div>
                <TextField id="create-event-title"
                        sx={{ m: 2 }}
                        required
                        label="活動名稱"
                        placeholder="Title" 
                        onChange={e => setTitle(e.target.value)}
                        //ref={titleRef}
                        />
            </div>
            <div>
                <TextField id="create-event-description"
                        sx={{ m: 2 }}
                        label="活動內容"
                        placeholder="Description" 
                        onChange={e => setDescription(e.target.value)}/>
            </div>
            <div>
                <Box sx={{ m: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <MobileDatePicker
                            id="create-event-sDate"
                            label="開始日期 *"
                            value={sDate}
                            onChange={(newValue) => {setSDate(newValue)}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            id="create-event-sTime"
                            sx={{ m: 5 }}
                            label="開始時間"
                            value={sTime}
                            onChange={(newValue) => {setSTime(newValue)}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            </div>
            <div>
            <Box sx={{ m: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            id="create-event-eDate"
                            sx={{ m: 5 }}
                            label="結束日期"
                            value={eDate}
                            onChange={(newValue) => {setEDate(newValue)}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            id="create-event-eDime"
                            sx={{ m: 5 }}
                            label="結束時間"
                            value={eTime}
                            onChange={(newValue) => {setETime(newValue)}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            </div>
            <div>
                <TextField id="create-event-location"
                        sx={{ m: 2 }}
                        label="活動地點"
                        placeholder="Location" 
                        onChange={e => setlocation(e.target.value)}/>
            </div>    
            <div>
                <Button sx={{ m: 2 }} color= "success" variant="contained" size="large"
                        onClick={subbmitEvent}>
                    Create!
                </Button >
            </div>
        </Box>
      </div>
    )
    
    return(
        <div className="Wrapper">
            <Template content={CreatePage} />
        </div>
    )
}

export default CreateTeamEvent;