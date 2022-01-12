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
import { EVENT_DETAIL, DELETE_USER_EVENT } from "../graphql";
import CreateUserEvent from "../containers/CreateUserEvent"
import { Modal } from "antd";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function UserEventDetail(props) {
	const { data, error, loading, subscribeToMore } = useQuery(EVENT_DETAIL, {
	variables: { eventID: props.id },
	});
	const [deleteEvent] = useMutation(DELETE_USER_EVENT);
	
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
	        		title={data.eventDetail.eventTitle}
	        		description={data.eventDetail.eventDescription}
	        		location={data.eventDetail.eventLocation}
	        		sDate={data.eventDetail.eventStart}
	        		sTime={data.eventDetail.eventStart}
	        		eDate={data.eventDetail.eventEnd}
	        		eTime={data.eventDetail.eventEnd}
	        		eventID={props.id}
	        		mode="edit"
	        	/ > 
	        	: <>
	        		{!loading & !isEditMode ? data.eventDetail.eventTitle: ""}
			        <Typography variant="subtitle1" color="text.secondary">
			            <AccessTimeIcon sx={{ fontSize: "large" }} /> {!loading ? data.eventDetail.eventStart: ""}
			        </Typography>

			       	<Typography variant="subtitle1" color="text.secondary">
			            <AccessTimeFilledIcon sx={{ fontSize: "large" }} /> {!loading ? data.eventDetail.eventEnd: ""}
			        </Typography>

			        <Typography variant="subtitle1" color="text.secondary"> 
			            <LocationOnIcon sx={{ fontSize: "large" }} /> {!loading ? data.eventDetail.eventLocation: ""}
			        </Typography>

			        <Typography variant="subtitle1" color="text.secondary">
			            <ShortTextIcon sx={{ fontSize: "large" }} /> {!loading ? data.eventDetail.eventDescription: ""}
			        </Typography>

			        <Typography variant="subtitle1" color="text.secondary">
			        	<PersonOutlineOutlinedIcon sx={{ fontSize: "large" }} /> Personal
			        </Typography>
			    </>
			}
	    </CardContent>
	)

	return (
		viewMode
    )
}

export default UserEventDetail;