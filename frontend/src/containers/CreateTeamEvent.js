import Template from "../components/Template";
import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import { Event } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import {
  CREATE_TEAM_EVENT,
  UPDATE_TEAM_EVENT,
  TEAM_EVENT_INIT,
  USER_EVENT_INIT,
  USER_NOTIFICATION_INIT,
  USER_TEAM_EVENT_INIT
} from "../graphql";

function CreateTeamEvent(props) {
  let now = new Date(),
    twoHoursLater = new Date(now);
  twoHoursLater.setHours(now.getHours() + 2);

  let initTitle = props.title ? props.title : null;
  let initDescription = props.description ? props.description : null;
  let initLocation = props.location ? props.location : null;

  let initSDate = props.sDate ? new Date(parseInt(props.sDate)) : now;
  let initSTime = props.sTime ? new Date(parseInt(props.sTime)) : now;
  let initEDate = props.eDate ? new Date(parseInt(props.eDate)) : twoHoursLater;
  let initETime = props.eTime ? new Date(parseInt(props.eTime)) : twoHoursLater;

  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [location, setLocation] = useState(initLocation);

  const [sDate, setSDate] = useState(null);
  const [sTime, setSTime] = useState(null);
  const [eDate, setEDate] = useState(null);
  const [eTime, setETime] = useState(null);

  const [addEvent] = useMutation(CREATE_TEAM_EVENT, {
    refetchQueries: [USER_NOTIFICATION_INIT, USER_TEAM_EVENT_INIT, TEAM_EVENT_INIT ],
  });
  const [updateEvent] = useMutation(UPDATE_TEAM_EVENT, {
    refetchQueries: [TEAM_EVENT_INIT, USER_TEAM_EVENT_INIT],
  });

  const submitCreateEvent = async () => {
    await addEvent({
      variables: {
        teamID: props.nowTeam,
        creatorID: props.me,
        eventTitle: title,
        eventDescription: description,
        eventStart: sDate === null ? initSDate.getTime() : sDate.getTime(),
        eventEnd: eDate === null ? initEDate.getTime() : eDate.getTime(),
        eventLocation: location,
      },
    });

    setTitle("");
    setDescription("");
    setLocation("");
    setSDate(null);
    setSTime(null);
    setEDate(null);
    setETime(null);

    props.onCreate();
  };

  const submitUpdateEvent = async () => {
    await updateEvent({
      variables: {
        eventID: props.eventID,
        eventTitle: title,
        eventDescription: description,
        eventStart: sDate || initSDate.getTime(),
        eventEnd: eDate || initEDate.getTime(),
        eventLocation: location,
      },
    });
    setTitle("");
    setDescription("");
    setLocation("");
    setSDate(null);
    setSTime(null);
    setEDate(null);
    setETime(null);

    props.onEdit();
  };

  const CreatePage = (
    <div className="create-event-page">
      <h2> {props.mode === "create" ? "Create" : "Edit"} </h2>
      <Box component="form" noValidate autoComplete="off">
        <div>
          <TextField
            id="create-event-title"
            sx={{ m: 2 }}
            required
            label="活動名稱"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        <div>
          <TextField
            id="create-event-description"
            value={description}
            sx={{ m: 2 }}
            label="活動內容"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Box sx={{ m: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                id="create-event-sDate"
                label="開始日期 *"
                value={sDate || initSDate}
                required
                onChange={(newValue) => {
                  setSDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                id="create-event-sTime"
                sx={{ m: 5 }}
                label="開始時間 *"
                value={sTime || initSTime}
                required
                onChange={(newValue) => {
                  setSTime(newValue);
                }}
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
                value={eDate || initEDate}
                required
                onChange={(newValue) => {
                  setEDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                id="create-event-eDime"
                sx={{ m: 5 }}
                label="結束時間 *"
                value={eTime || initETime}
                required
                onChange={(newValue) => {
                  setETime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </div>
        <div>
          <TextField
            id="create-event-location"
            sx={{ m: 2 }}
            label="活動地點"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          {title && description && location ? (
            props.mode === "create" ? (
              <Button
                sx={{ m: 2 }}
                color="success"
                variant="contained"
                size="large"
                onClick={submitCreateEvent}
              >
                Create{" "}
              </Button>
            ) : (
              <Button
                sx={{ m: 2 }}
                color="error"
                variant="contained"
                size="large"
                onClick={submitUpdateEvent}
              >
                Save{" "}
              </Button>
            )
          ) : (
            <></>
          )}
        </div>
      </Box>
    </div>
  );

  return CreatePage;
}

export default CreateTeamEvent;
