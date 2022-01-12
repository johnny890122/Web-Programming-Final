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
import { CREATE_USER_EVENT, UPDATE_USER_EVENT } from "../graphql";

function CreateUserEvent(props) {

    let now = new Date(), twoHoursLater = new Date(now);
    twoHoursLater.setHours ( now.getHours() + 2 )

    let initTitle = props.title ? props.title : null;
    let initDescription = props.description ? props.description : null;
    let initLocation = props.location ? props.location : null;
    let initSDate = props.sDate ? new Date(parseInt(props.sDate)) : now;
    let initSTime = props.sTime ? new Date(parseInt(props.sTime)) : now;
    let initEDate = props.eDate ? new Date(parseInt(props.eDate)) : twoHoursLater;
    let initETime = props.eTime ? new Date(parseInt(props.eTime)) : twoHoursLater;


    let clickedDate = props.date ? props.date.dateStr : null;

    const [title, setTitle] = useState(initTitle);
    const [description, setDescription] = useState(initDescription);
    const [location, setLocation] = useState(initLocation);

    // const [props.mode, setMode] = useState("edit");
    const [sDate, setSDate] = useState(initSDate);
    const [sTime, setSTime] = useState(initSTime);
    const [eDate, setEDate] = useState(initEDate);
    const [eTime, setETime] = useState(initETime);
    
    const [addEvent] = useMutation(CREATE_USER_EVENT);
    const [updateEvent] = useMutation(UPDATE_USER_EVENT);

    const submitCreateEvent = async () => {
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

    console.log(typeof Date.parse(sDate));

    const submitUpdateEvent = async () => {
        await updateEvent({
            variables: {
                eventID: props.eventID,
                eventTitle: title,
                eventDescription: description,
                eventStart: Date.parse(sDate),
                eventEnd: Date.parse(eDate),
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
        <h2> {props.mode === "create" ? "Create" : "Edit" } </h2>
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
                            onChange={(newValue) => {setSDate(newValue) }}
                            // onChange={(newValue) =>  console.log(newValue) }

                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            id="create-event-sTime"
                            sx={{ m: 5 }}
                            label="開始時間 *"
                            value={ sTime }
                            required
                            onChange={(newValue) => {setSTime(newValue)} }
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
                {
                    props.mode === "create" 
                    ? <Button sx={{ m: 2 }} color= "success" variant="contained" size="large"
                        onClick={submitCreateEvent}>
                        Create </Button >
                    : 
                    <>
                        <Button sx={{ m: 2 }} color= "error" variant="contained" size="large"
                        onClick={submitUpdateEvent}>
                        Save </Button >
                    </>
                }
                
            </div>
        </Box>
      </div>
    )
    
    return(
        CreatePage
    )
}

export default CreateUserEvent;