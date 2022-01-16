import { EventData } from "./ListData";
import { useQuery } from "@apollo/client";
import { USER_EVENT_INIT, USER_TEAM_EVENT_INIT } from "../graphql";
import { useState } from "react";

import { List, ListItem, ListItemText } from "@mui/material";

function DashboardEvent(props) {
  let now = new Date();
  let threeDaysAfter = now.setDate(now.getDate() + 3);
  const userEvent = useQuery(USER_EVENT_INIT, {
    variables: { userID: props.me },
  });

  const teamEvent = useQuery(USER_TEAM_EVENT_INIT, {
    variables: { userID: props.me },
  });

  const [events, setEvents] = useState(); // 所有活動資料

  let data = [];
  if (!userEvent.loading && !teamEvent.loading) {
    if (userEvent.data) {
      data = userEvent.data.initUserEvent;
      if (teamEvent.data) {
        data = data.concat(teamEvent.data.initUserTeamEvent);
      }
    }
  }

  const eventData = [];
  if (!userEvent.loading && !teamEvent.loading) {
    data.map((i) =>
      eventData.push({
        title: i.eventTitle,
        description: i.eventDescription,
        start: new Date(parseInt(i.eventStart)),
        end: new Date(parseInt(i.eventEnd)),
        location: i.eventLocation,
        posttime: new Date(parseInt(i.eventPostTime)),
      })
    );
  }

  return (
    <div
      className="dashboard-event"
      style={{ height: "250px", overflow: "auto" }}
    >
      <h2 style={{ display: "inline-block" }}>Upcoming Events</h2>

      <List className="dashboard-event-list">
        {eventData
          .filter((e) => Date.parse(e.start) < threeDaysAfter)
          .map((event) => (
            <ListItem>
              <ListItemText
                primary={event.title}
                secondary={event.start.toDateString()}
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default DashboardEvent;
