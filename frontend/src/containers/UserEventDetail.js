import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShortTextIcon from '@mui/icons-material/ShortText';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TopicIcon from '@mui/icons-material/Topic';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Box, Button, Chip, List, Icon, ToggleButtonGroup, ToggleButton, Typography, Card, CardContent } from '@mui/material';
import {useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { USER_EVENT_DETAIL, DELETE_USER_EVENT, USER_EVENT_INIT, UPDATE_USER_EVENT } from "../graphql";
import CreateUserEvent from "../containers/CreateUserEvent"
import { Modal } from "antd";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function UserEventDetail(props) {
	const { data, error, loading, subscribeToMore } = useQuery(USER_EVENT_DETAIL, {
	variables: { eventID: props.id },
	});
	const [deleteEvent] = useMutation(DELETE_USER_EVENT, {refetchQueries: [ USER_EVENT_INIT ]});
    const [updateUserEvent] = useMutation(UPDATE_USER_EVENT, {refetchQueries: [ USER_EVENT_INIT]});

	const [isEditMode, setIsEditMode] = useState(false);
	const [isDeletedMode, setIsDeletedMode] = useState(false);

	const handelEventDeleted = async () => {
		await deleteEvent({
			variables: {
				eventID: props.id
			}
		});
		setIsDeletedMode(false);
		props.onDelete();
	}

	const viewMode = (
		<CardContent 
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
	        		title={data.userEventDetail.eventTitle}
	        		description={data.userEventDetail.eventDescription}
	        		location={data.userEventDetail.eventLocation}
	        		sDate={data.userEventDetail.eventStart}
	        		sTime={data.userEventDetail.eventStart}
	        		eDate={data.userEventDetail.eventEnd}
	        		eTime={data.userEventDetail.eventEnd}
	        		eventID={props.id}
	        		mode="edit"
	        		onEdit={ ()=>props.onEdit() }
	        	/ > 
	        	: <>

			        <Typography style={{margin: "0.5em"}} variant="h3" color="textPrimary">
			            {!loading ? data.userEventDetail.eventTitle: ""}
			        </Typography>

			        <Typography style={{margin: "0.5em"}}  variant="h5" color="text.secondary">
			        	<PersonOutlineOutlinedIcon style={{transform: "scale(1.2)"}} sx={{ fontSize: "large" }} /> Personal
			        </Typography>

			       	<Typography style={{margin: "0.5em"}} variant="h5" color="text.secondary">
			            <AccessTimeFilledIcon style={{transform: "scale(1.2)"}} sx={{ fontSize: "large" }} /> {!loading ? new Date(parseInt(data.userEventDetail.eventEnd)).toDateString(): ""}
			        </Typography>

			        <Typography style={{margin: "0.5em"}} variant="h5" color="text.secondary"> 
			            <LocationOnIcon style={{transform: "scale(1.2)"}} sx={{ fontSize: "large" }} /> {!loading ? data.userEventDetail.eventLocation: ""}
			        </Typography>

			        <Typography style={{margin: "0.5em"}} variant="h5" color="text.secondary">
			            <ShortTextIcon style={{transform: "scale(1.2)"}} sx={{ fontSize: "large" }} /> {!loading ? data.userEventDetail.eventDescription: ""}
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