import Template from "../components/Template";
import { EventData } from '../components/ListData';
import { Chip, List, ListItem, ToggleButtonGroup, ToggleButton, Typography, Card, CardContent } from '@mui/material';
import { CardActionArea, CardMedia } from '@mui/material';
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
篩選並排序符合條件的活動
連結活動頁面
*/

function TeamEvent() {

    const ViewBox = styled.div`
        max-width: 800px;
    `;

    const teamevents = EventData.filter(event => event.type === 'team');
    const [viewmode, setViewmode] = useState("list"); // 預覽模式
    const [filtermode, setFiltermode] = useState("upcoming"); // 活動篩選模式
    const [events, setEvents ] = useState(teamevents) // 所有團隊活動資料
    const today = new Date();
    

    const handleViewChange = (view, newView) => {
        setViewmode(newView);
    };

    const handleFilterChange = (filter, newFilter) => {
      setFiltermode(newFilter);
      if (newFilter === 'upcoming') {
        setEvents(teamevents.filter(event => new Date(event.start) > today))
      } else if (newFilter === 'past') {
        setEvents(teamevents.filter(event => new Date(event.start) <= today))
      } else if (newFilter === 'unrespond') {
        setEvents(teamevents.filter(event => event.reply === false && new Date(event.start) > today))
      } else setEvents(teamevents)
      /* 篩選並排序符合條件的活動 */
    };


    const ListView = (() =>

        /* 點擊event進入detail頁面 */

        <List className = "team-event-list">
              {events.map(event => 
                    <ListItem className = "team-event-item" key = {event.id}
                              sx={{ m: 2, width: 450, height: 200 }}>
                        <Card sx={{ width: '100%' }}>
                            <CardActionArea sx={{ width: '100%', display: 'block' }}
                                                    
                                            href={`#${event.id}`}> 
                                            {/* 連結活動頁面 */}
        
                                <CardContent sx={{ p: 4 }}>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {event.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        <AccessTimeIcon sx={{ fontSize: "small" }} /> {event.start}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        <LocationOnIcon sx={{ fontSize: "small" }} /> {event.location}
                                    </Typography>
                                    {new Date(event.start) <= today ? 
                                        <Chip label="Finished" sx={{ my : 1 }} /> :
                                        (event.reply ? <Chip label="Replied" color='success' sx={{ my : 1 }} /> :
                                                       <Chip label="Ureplied" color='error' sx={{ my : 1 }} />)}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </ListItem>
                         )}
          </List>
    )

    const CalendarView = (() =>      
            <FullCalendar
                className = "team-event-calendar"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                locale="zh-tw" // 中文化
                events={events}

                /* 點擊date顯示當日event的list(或是空list: 本日無活動) */
                
                // dateClick={handleDateClick}
            />      
    )

    const eventlist = (

        <div className = "team-event">
          <h1>Events</h1>
          
          <div className = "team-event-viewtoggle">  
            <ToggleButtonGroup color="primary" value={viewmode} exclusive
                onChange={handleViewChange} // 切換預覽模式(列表、日曆)
                >
                <ToggleButton size ="small" value="list">List</ToggleButton>         
                <ToggleButton size ="small" value="calendar">Calendar</ToggleButton>
            </ToggleButtonGroup>
          </div>  

          {(viewmode === 'list') ? 
            <div className = "team-event-filtertoggle">
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

export default TeamEvent;