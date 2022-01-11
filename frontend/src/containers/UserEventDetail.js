import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShortTextIcon from '@mui/icons-material/ShortText';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Chip, List, Icon, ToggleButtonGroup, ToggleButton, Typography, Card, CardContent } from '@mui/material';
import {useState} from "react";
import { useQuery } from "@apollo/client";
import { EVENT_DETAIL } from "../graphql";
import CreateUserEvent from "../containers/CreateUserEvent"

function UserEventDetail(props) {
	const { data, error, loading, subscribeToMore } = useQuery(EVENT_DETAIL, {
	variables: { eventID: props.id },
	});

	const [isEditMode, setIsEditMode] = useState(false);

	const viewMode = (
		<CardContent 
	        sx={{ p: 4 }}
	      >
	        <Typography gutterBottom variant="h4" component="div">
	          {!loading ? data.eventDetail.eventTitle: ""} 
	          <Button onClick={ () => setIsEditMode(true) }>
	          	<EditIcon sx={{ fontSize: "large" }} /> 
	          </Button>
	          
	        </Typography>

	        <Typography variant="subtitle1" color="text.secondary">
	            <AccessTimeIcon sx={{ fontSize: "large" }} /> {!loading ? data.eventDetail.eventStart: ""}
	        </Typography>

	        <Typography variant="subtitle1" color="text.secondary"> 
	            <LocationOnIcon sx={{ fontSize: "large" }} /> {!loading ? data.eventDetail.eventLocation: ""}
	        </Typography>

	        <Typography variant="subtitle1" color="text.secondary">
	            <ShortTextIcon sx={{ fontSize: "large" }} /> {!loading ? data.eventDetail.eventDescription: ""}
	        </Typography>

	        <Typography variant="subtitle1" color="text.secondary">
	            
	        </Typography>
	    </CardContent>
	)

	return (
		isEditMode ? <CreateUserEvent / > : viewMode
    )
}


export default UserEventDetail;