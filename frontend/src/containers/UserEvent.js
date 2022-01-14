import Template from "../components/Template";
import { useQuery } from "@apollo/client";
import { USER_EVENT_INIT, USER_TEAM_EVENT_INIT } from "../graphql";
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
import { Modal } from "antd";
import CreateUserEvent from "../containers/CreateUserEvent";
import KeyboardReturnTwoToneIcon from '@mui/icons-material/KeyboardReturnTwoTone';


/*
讀取、回傳 event資料
event, createEvent, editEvent, deleteEvent
*/
const ViewBox = styled.div`
    max-width: 800px;
`;

function UserEvent(props) {
    const [viewmode, setViewmode] = useState("list"); // 預覽模式
    const [filtermode, setFiltermode] = useState("upcoming"); // 活動篩選模式
    const [events, setEvents] = useState(); // 所有活動資料
    const today = new Date();

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

    const EventData = [];
    if (!userEvent.loading && !teamEvent.loading) {
        data.map( 
          i=>EventData.push(
            {
              "title": i.eventTitle, 
              "description": i.eventDescription, 
              "start": parseInt(i.eventStart),
              "end": parseInt(i.eventEnd), "location": i.eventLocation, "posttime": i.eventPostTime,
              "color": i.type === "user" ? "#378006" : "#12345"
            }
          )
        )
        if (!events) {
            setEvents(EventData)
        }
    }

    const CalendarView = (() =>      
        <FullCalendar
            className = "user-event-calendar"
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            locale="zh-tw" // 中文化
            events= {EventData}
            selectable= {true}
            dateClick={ (info) => setDateClicked(info.date.getTime()) & setIsModalVisible(true)}
        />      
    )

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dateClicked, setDateClicked] = useState(null);

    let createEvent = < CreateUserEvent me={props.me} sDate={dateClicked} eDate={dateClicked} mode={"create"} />;

    const eventlist = (
        <div className = "user-event">
            <ViewBox >
                <CalendarView/>           
            </ViewBox>

            <Modal
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false) }
                style={{ zIndex: 1200 }}
                footer={ [<Button key="ok" onClick={() => setIsModalVisible(false) }> Ok </Button>] }
            >   
                {createEvent}
            </Modal>

        </div>
    )
    
    return(
        <div className="Wrapper">
            <Template content={eventlist} />
        </div>        
    )
}

export default UserEvent;