import Template from "../components/Template";
import { useQuery } from "@apollo/client";
import { USER_EVENT_INIT } from "../graphql";

import { Button, Chip, List, Icon, ToggleButtonGroup, ToggleButton, Typography, Card, CardContent } from '@mui/material';
import { CardActionArea, CardMedia } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";

/*
讀取、回傳 event資料
event, createEvent, editEvent, deleteEvent
*/

function UserEvent(props) {

    const ViewBox = styled.div`
        max-width: 800px;
    `;

    const [viewmode, setViewmode] = useState("list"); // 預覽模式
    const [filtermode, setFiltermode] = useState("upcoming"); // 活動篩選模式
    const [events, setEvents] = useState([]); // 所有活動資料
    const today = new Date();
    

    const { data, error, loading, subscribeToMore } = useQuery(USER_EVENT_INIT, {
      variables: { userID: props.me },
    });

    const EventData = [];
    if (!loading) {
        data.initUserEvent.map( 
          i=>EventData.push(
            {
              "title": i.eventTitle, "description": i.eventDescription, "start": i.eventStart,
              "end": i.eventEnd, "location": i.eventLocation, "posttime": i.eventPostTime
            }
          )
        )
        if (!events) {
            setEvents(EventData)
        }
    }

    const handleViewChange = (view, newView) => {
        setViewmode(newView);
    };

    const handleFilterChange = (filter, newFilter) => {
      setFiltermode(newFilter);
      if (newFilter === 'upcoming') {
        setEvents(EventData.filter(event => new Date(event.start) > today))
      } else if (newFilter === 'past') {
        setEvents(EventData.filter(event => new Date(event.start) <= today))
      } else if (newFilter === 'unrespond') {
        setEvents(EventData.filter(event => event.reply === false && new Date(event.start) > today))
      } else {
        setEvents(EventData);
      }
      /* 篩選並排序符合條件的活動 */
    };

    const ListView = (() => /* 點擊event進入detail頁面 */
        <List className = "user-event-list">
            {events.map(event => 
            <Card 
                className = "user-event-item"
                sx={{ m: 2, width: 450, height: 250 }}
                key = {event.id}>
                <CardActionArea 
                    sx={{ width: 450, height: 250, display: 'block' }}
                    href={`#${event.id}`}> 
                    
                    {/*連結活動頁面*/}
                    <CardContent sx={{ p: 4 }}>
                        <Typography gutterBottom variant="h4" component="div">
                            {event.title}   
                            {
                                event.type === "team"
                                ? <PeopleIcon sx={{ mx : 1 }} /> 
                                : <PersonIcon sx={{ mx : 1 }} />
                            } 
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary">
                            <AccessTimeIcon sx={{ fontSize: "small" }} /> {event.start}
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary">
                            <LocationOnIcon sx={{ fontSize: "small" }} /> {event.location}
                        </Typography>

                        {
                            new Date(event.start) <= today 
                            ? <Chip label="Finished" sx={{ my : 1 }} /> 
                            : (event.reply 
                                ? <Chip label="Replied" color='success' sx={{ my : 1 }} /> 
                                : <Chip label="Ureplied" color='error' sx={{ my : 1 }} />)
                        }
                    </CardContent>
                </CardActionArea>
            </Card> )}
        </List>)

    const CalendarView = (() =>      
            <FullCalendar
                className = "user-event-calendar"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                locale="zh-tw" // 中文化
                events={EventData}

                /* 點擊date顯示當日event的list(或是空list: 本日無活動) */
                
                // dateClick={handleDateClick}
            />      
    )

    const eventlist = (

        <div className = "user-event">
          <h1>Events</h1>
          
          <div className = "user-event-viewtoggle">  
            <ToggleButtonGroup color="primary" value={viewmode} exclusive
                onChange={handleViewChange} // 切換預覽模式(列表、日曆)
                >
                <ToggleButton size ="small" value="list">List</ToggleButton>         
                <ToggleButton size ="small" value="calendar">Calendar</ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outlined" color="success" sx={{ m: 1 }} href = '/user/CreateUserEvent'>
                Create
            </Button>
          </div>  

          {(viewmode === 'list') ? 
            <div className = "user-event-filtertoggle">
                <ToggleButtonGroup color="primary" value={filtermode} exclusive
                    onChange={handleFilterChange} 
                    // 切換篩選模式: All(新發布到舊)、Upcoming(時間進到遠)、Past(時間進到遠)、Unrespond(未回應, 新發布到舊)
                    >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="upcoming">Upcoming</ToggleButton>
                    <ToggleButton value="past">Past</ToggleButton>
                    <ToggleButton value="unrespond">Unrespond</ToggleButton>
                </ToggleButtonGroup>
            </div> : 
            <></>}
                                                   

          <ViewBox >
              {(viewmode === 'list') ? <ListView/> : <CalendarView/>}
          </ViewBox>
      </div>
    )
    
    return(

        <div className="Wrapper">
            <Template content={eventlist} />
        </div>        
    )
}

export default UserEvent;