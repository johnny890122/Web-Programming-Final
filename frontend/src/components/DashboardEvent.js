import { EventData } from "./ListData";
import { useQuery } from "@apollo/client";
import { USER_EVENT_INIT } from "../graphql";

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Checkbox,
  Button,
} from "@mui/material";

function DashboardEvent(props) {
  const { data, error, loading, subscribeToMore } = useQuery(USER_EVENT_INIT, {
    variables: { userID: props.me },
  });

  const eventData = [];

  if (!loading) {
    data.initUserEvent.map(
      (i) =>
      eventData.push({
        title: i.eventTitle,
        description: i.eventDescription,
        start: new Date(i.eventStart),
        end: new Date(i.eventEnd),
        location: i.eventLocation,
        posttime: new Date(i.eventPostTime),
      })
    )
  }

  return (
    <div className="dashboard-event" style={{height: "250px"}}>
      <h2 style={{ display: "inline-block" }}>Upcoming Events</h2>

      <List className="dashboard-event-list">
        {eventData.map((event) => (
          <ListItem button key={event.id}>
            <ListItemText 
              primary={event.title} 
              secondary={event.start.toDateString()} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DashboardEvent;
