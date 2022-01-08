import { EventData } from './ListData';
import { useQuery } from "@apollo/client";
import { USER_EVENT_INIT } from "../graphql";

import { List, ListItem, ListItemText, ListItemIcon, ListItemButton, Checkbox, Button } from '@mui/material';


function DashboardEvent(props) {

  const { data, error, loading, subscribeToMore } = useQuery(USER_EVENT_INIT, {
      variables: { userID: props.me },
  });

  const eventData = [];


  if (!loading) {
    data.initUserEvent.map( 
      i=> eventData.push(
        {
          "title": i.eventTitle,
          "description": i.eventDescription,
          "start": i.eventStart,
          "end": i.eventEnd,
          "location": i.eventLocation,
          "posttime": i.eventPostTime
        }
      )
    )
  }
  console.log(data)
  console.log(eventData);

  return(
      <div className = "dashboard-event">
        <h2>Upcoming Events</h2>
        <List className = "dashboard-event-list">
            {eventData.map(event => <ListItem  key = {event.id}>
                                        <ListItemText primary = {event.title}
                                                      secondary = {event.start}/>
                                    </ListItem> )}
        </List>
    </div>
  )
}

export default DashboardEvent;