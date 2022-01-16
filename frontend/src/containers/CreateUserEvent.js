import Template from "../components/Template";
import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { EventData } from "../components/ListData";
import { Event } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import {
  CREATE_USER_EVENT,
  UPDATE_USER_EVENT,
  USER_EVENT_INIT,
} from "../graphql";

function CreateUserEvent(props) {
  let now = new Date(), twoHoursLater = new Date(now);
  // twoHoursLater.setHours(now.getHours() + 2);

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

  const [addEvent] = useMutation(CREATE_USER_EVENT, {
    refetchQueries: [USER_EVENT_INIT, "initUserEvent"],
  });

  const [updateUserEvent] = useMutation(UPDATE_USER_EVENT, {
    refetchQueries: [USER_EVENT_INIT, "initUserEvent"],
  });

  const submitCreateEvent = async () => {
    await addEvent({
      variables: {
        eventCreator: props.me,
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

  const submitUpdateUserEvent = async () => {
    await updateUserEvent({
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
      <h3> {props.mode === "create" ? "Create Event" : "Edit Event"} </h3>
      <Box component="form" noValidate autoComplete="off">
        <div>
          <TextField
            id="create-event-title"
            sx={{ m: 2 }}
            required
            label="Event Title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            size="small"
          />
        </div>
        <div>
          <TextField
            id="create-event-description"
            value={description}
            required
            sx={{ m: 2 }}
            label="Event Description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            size="small"
          />
        </div>
        <div>
          <Box sx={{ m: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                id="create-event-sDate"
                label="Start Time *"
                value={sDate || initSDate}
                required
                onChange={(newValue) => {
                  setSDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
              <TimePicker
                id="create-event-sTime"
                sx={{ m: 5 }}
                label="Start Time *"
                value={sTime || initSTime}
                required
                onChange={(newValue) => {
                  setSTime(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ marginLeft: "1rem" }}
                  />
                )}
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
                label="End Time *"
                value={eDate || initEDate}
                required
                onChange={(newValue) => {
                  setEDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
              <TimePicker
                id="create-event-eDime"
                sx={{ m: 5 }}
                label="End Time *"
                value={eTime || initETime}
                required
                onChange={(newValue) => {
                  setETime(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ marginLeft: "1rem" }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </div>
        <div>
          <TextField
            id="create-event-location"
            sx={{ m: 2 }}
            label="Event Location"
            placeholder="Location"
            value={location}
            required
            onChange={(e) => setLocation(e.target.value)}
            size="small"
          />
        </div>
        <div>
          {title && description && location ? (
            props.mode === "create" ? (
              <Button
                sx={{ m: 2 }}
                color="success"
                variant="contained"
                onClick={submitCreateEvent}
              >
                Create{" "}
              </Button>
            ) : (
              <>
                <Button
                  sx={{ m: 2 }}
                  color="error"
                  variant="contained"
                  size="large"
                  onClick={submitUpdateUserEvent}
                >
                  Save{" "}
                </Button>
              </>
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

export default CreateUserEvent;
