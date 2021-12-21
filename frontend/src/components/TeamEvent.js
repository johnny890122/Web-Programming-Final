import { EventData } from './ListData';
import { Chip, List, ListItem, ListItemText, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";

/*
[state]
viewmode 列表模式或日曆模式
filtermode 活動篩選模式
*/
/*
[ Event 資料欄位]
 總覽: 
 id, title, start, location, (!respond.attend ?)
 Detail:
  id, title, start, location,
  posttime, end, author, posttime, content,  
  author: {name, (photo)}
  respond: {{id, attend, content, respondime}, {}, {}} (成員...)
 */

function TeamEvent() {

    const ViewBox = styled.div`
        max-width: 800px;
    `;

    const teamEventData = EventData.filter(event => event.type === "team"); // 所有團隊活動資料
    const [viewmode, setViewmode] = useState("list"); // 預覽模式
    const [filtermode, setFiltermode] = useState("upcoming"); // 活動篩選模式
    const [events, setEvents] = useState(teamEventData);

    const replied = true; //user是否有回應出席(待刪)
    

    const handleViewChange = (view, newView) => {
        setViewmode(newView);
    };

    const handleFilterChange = (filter, newFilter) => {
      setFiltermode(newFilter);

      /* 篩選並排序符合條件的活動 */
      
    };


    const ItemText = ((event) => 
        <>
            <h2 className = "team-event-title">{event.title}</h2>
            <p className = "team-event-start">{event.start}</p>
            <p className = "team-event-location">{event.location}</p>

            {/* 判斷是否有回覆過活動(replied) */}

            {replied ? <Chip label="Replied" color='success' size = 'small'/> :
                      <Chip label="Ureplied" color='error' size = 'small'/> }
        </>
    )

    const ListView = (

        /* 點擊event進入detail頁面 */

        <List className = "team-event-list">
              {events.map(event => 
                    <ListItem  className = "team-event-item"
                               button key = {event.id}>
                        <ListItemText primary = {ItemText(event)}/>
                    </ListItem> )}
        </List>
    )

    const CalendarView = (      
            <FullCalendar
                className = "team-event-calendar"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                locale="zh-tw" // 中文化
                events={teamEventData}

                /* 點擊date顯示當日event的list(或是空list: 本日無活動) */
                
                // dateClick={handleDateClick}
            />      
    )
    
    return(
        
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
}

export default TeamEvent;