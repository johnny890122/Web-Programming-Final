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
import { useMutation } from "@apollo/client";
import { CREATE_USER_EVENT } from "../graphql";

function CreateUserEvent(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [sDate, setSDate] = useState(null);
    const [sTime, setSTime] = useState(null);
    const [eDate, setEDate] = useState(null);
    const [eTime, setETime] = useState(null);

    const [addEvent] = useMutation(CREATE_USER_EVENT);

    const subbmitEvent = async () => {
        await addEvent({
            variables: {
                eventCreator: props.me,
                eventTitle: title,
                eventDescription: description,
                eventStart: Date.parse(sDate) + Date.parse(sTime),
                eventEnd: Date.parse(eDate) + Date.parse(eTime),
                eventLocation: location
          }
        });

        setTitle("");
        setDescription("");
        setLocation("");
        setSDate(null);
        setSTime(null);
        setEDate(null);
        setETime(null);

    }

    const CreatePage = ( 
      <div className = "create-event-page">
        <h2>Create My Event</h2>
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
                        value ={title}
                        />
            </div>
            <div>
                <TextField id="create-event-description"
                        value ={description}
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
                            required
                            onChange={(newValue) => {setSDate(newValue)}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            id="create-event-sTime"
                            sx={{ m: 5 }}
                            label="開始時間 *"
                            value={sTime}
                            required
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
                            label="結束日期 *"
                            value={eDate}
                            required
                            onChange={(newValue) => {setEDate(newValue)}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            id="create-event-eDime"
                            sx={{ m: 5 }}
                            label="結束時間 *"
                            value={eTime}
                            required
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
                        value={location}
                        onChange={e => setLocation(e.target.value)}/>
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

export default CreateUserEvent;