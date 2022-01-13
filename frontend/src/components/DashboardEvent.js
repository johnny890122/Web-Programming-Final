import { EventData } from "./ListData";
import { useQuery } from "@apollo/client";
import { USER_EVENT_INIT, USER_TEAM_EVENT_INIT } from "../graphql";

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

  const userEvent = useQuery(USER_EVENT_INIT, {
    variables: { userID: props.me },
  });

  const teamEvent = useQuery(USER_TEAM_EVENT_INIT, {
    variables: { userID: props.me  }
  });

  let data = [];
  if (!userEvent.loading && !teamEvent.loading) {
      data = userEvent.data.initUserEvent.concat(teamEvent.data.initUserTeamEvent);
  }

  const eventData = [];
  if (!userEvent.loading && !teamEvent.loading) {
    data.map(
      (i) => eventData.push({
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
    <div className="dashboard-event" style={{height: "250px", overflow: "auto"}}>
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
