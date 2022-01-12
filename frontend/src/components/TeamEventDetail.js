import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShortTextIcon from '@mui/icons-material/ShortText';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Box, Button, Chip, List, Icon, ToggleButtonGroup, ToggleButton, Typography, Card, CardContent } from '@mui/material';
import {useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { TEAM_EVENT_DETAIL, DELETE_TEAM_EVENT } from "../graphql";
import CreateUserEvent from "../containers/CreateUserEvent"
import { Modal } from "antd";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PeopleIcon from "@mui/icons-material/People";

function TeamEventDetail(props) {

    const { data, error, loading, subscribeToMore } = 
    useQuery(TEAM_EVENT_DETAIL, {
        variables: { eventID: props.id },
    });

    const [deleteEvent] = useMutation(DELETE_TEAM_EVENT);
    
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeletedMode, setIsDeletedMode] = useState(false);

    const handelEventDeleted = async () => {
        await deleteEvent({
            variables: {
                eventID: props.id
            }
        });
        setIsDeletedMode(false);
    }

    const viewMode = (
        <CardContent 
            // sx={{ p: 5 }}
          >
            <Typography gutterBottom variant="h4" component="div">
            {
                isEditMode 
                ? <Button
                    onClick={ () => setIsEditMode(false) & setIsDeletedMode(false) } 
                    startIcon={<ArrowBackIosIcon sx={{ fontSize: "large" }}/> } />
                :<Button
                    onClick={ () => setIsEditMode(true) & setIsDeletedMode(false) } 
                    startIcon={<EditIcon sx={{ fontSize: "large" }}/> } />
            }
                <Button 
                    color= { isDeletedMode ? "error" : "primary"}
                    onClick={ () => !isDeletedMode ? setIsDeletedMode(true) : handelEventDeleted() } 
                    startIcon={<DeleteOutlineOutlinedIcon sx={{ fontSize: "large" }}/> }>
                        {!isDeletedMode ? "" : "Are you sure?" }
                </Button>

                <Button 
                    color="success"
                    style={{display: isDeletedMode ? "inline": "none" }} 
                    key="Cancel" 
                    onClick={() => setIsDeletedMode(false)} >
                        Cancel
                </Button>
            </Typography>

            {
                isEditMode 
                ? <CreateUserEvent 
                    title={data.teamEventDetail.eventTitle}
                    description={data.teamEventDetail.eventDescription}
                    location={data.teamEventDetail.eventLocation}
                    sDate={data.teamEventDetail.eventStart}
                    sTime={data.teamEventDetail.eventStart}
                    eDate={data.teamEventDetail.eventEnd}
                    eTime={data.teamEventDetail.eventEnd}
                    eventID={props.id}
                    mode="edit"
                / > 
                : <>
                    {!loading & !isEditMode ? data.teamEventDetail.eventTitle: ""}
                    <Typography variant="subtitle1" color="text.secondary">
                        <AccessTimeIcon sx={{ fontSize: "large" }} /> {!loading ? data.teamEventDetail.eventStart: ""}
                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary">
                        <AccessTimeFilledIcon sx={{ fontSize: "large" }} /> {!loading ? data.teamEventDetail.eventEnd: ""}
                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary"> 
                        <LocationOnIcon sx={{ fontSize: "large" }} /> {!loading ? data.teamEventDetail.eventLocation: ""}
                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary">
                        <ShortTextIcon sx={{ fontSize: "large" }} /> {!loading ? data.teamEventDetail.eventDescription: ""}
                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary">
                        <PeopleIcon sx={{ fontSize: "large" }} /> Team
                    </Typography>
                </>
            }
        </CardContent>
    )

    return (
        viewMode
    )
}

export default TeamEventDetail;