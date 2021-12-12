import { EventData } from './ListData';
import { List, ListItem, ListItemText, ListItemIcon, ListItemButton, Checkbox, Button } from '@mui/material';


function DashboardEvent() {
    
    return(
        <div className = "dashboard-event">
          <h2>Upcoming Events</h2>
          <List className = "dashboard-event-list">
              {EventData.filter(event => event.type === "user")
                        .map(event => <ListItem   button key = {event.id}>
                                          <ListItemText primary = {event.title}
                                                        secondary = {event.start}/>
                                      </ListItem> )}
          </List>
      </div>
    )
}

export default DashboardEvent;