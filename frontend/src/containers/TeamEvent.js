import Template from "../components/Template";
import { EventData } from "../components/ListData";
import {
  Button,
  Chip,
  List,
  ListItem,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { CardActionArea, CardMedia, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Modal } from "antd";
import TeamEventDetail from "../components/TeamEventDetail";
import CreateTeamEvent from "../containers/CreateTeamEvent";
import { useQuery } from "@apollo/client";
import { TEAM_EVENT_INIT } from "../graphql";

/*
讀取、回傳 event資料
event, createEvent, editEvent, deleteEvent
篩選並排序符合條件的活動
連結活動頁面
*/

function TeamEvent(props) {
  const [viewmode, setViewmode] = useState("list"); // 預覽模式
  const [filtermode, setFiltermode] = useState("upcoming"); // 活動篩選模式
  const [events, setEvents] = useState([]); // 所有團隊活動資料

  const today = new Date();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleViewChange = (view, newView) => {
    setViewmode(newView);
  };
  const [componentInModal, setComponentInModal] = useState("");

  const handleFilterChange = (filter, newFilter) => {
    setFiltermode(newFilter);
    if (newFilter === "upcoming") {
      setEvents(
        data.initTeamEvent.filter((event) => new Date(event.start) > today)
      );
    } else if (newFilter === "past") {
      setEvents(
        data.initTeamEvent.filter((event) => new Date(event.start) <= today)
      );
    } else if (newFilter === "unrespond") {
      setEvents(
        data.initTeamEvent.filter(
          (event) => event.reply === false && new Date(event.start) > today
        )
      );
    } else setEvents(data.initTeamEvent);
    /* 篩選並排序符合條件的活動 */
  };
  const handleClose = () => {
    setIsModalVisible(false);
    setComponentInModal(null);
  };

  const { data, error, loading, subscribeToMore } = useQuery(TEAM_EVENT_INIT, {
    variables: { teamID: props.nowTeam },
  });

  const EventData = [];
  if (!loading) {
    data.initTeamEvent.map((i) =>
      EventData.push({
        id: i.eventID,
        title: i.eventTitle,
        description: i.eventDescription,
        start: i.eventStart,
        end: i.eventEnd,
        location: i.eventLocation,
        posttime: i.eventPostTime,
        creator: i.eventCreator
      })
    );
  }

  const ListView = () => (
    /* 點擊event進入detail頁面 */
    <List className="user-event-list" style={{ display: "flex" }}>
      {EventData.map((event) => (
        <Card
          style={{ width: "325px", flexDirection: "row" }}
          className="user-event-item"
          sx={{ m: 2 }}
          key={event.id}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography gutterBottom variant="h4" component="div">
              {event.title}
              <PeopleIcon sx={{ mx: 1 }} />
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              <AccessTimeIcon sx={{ fontSize: "small" }} />{" "}
              {new Date(parseInt(event.start)).toDateString()}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              <LocationOnIcon sx={{ fontSize: "small" }} /> {event.location}
            </Typography>

            {
              new Date(event.eventStart) <= today 
              ? <Chip label="Finished" sx={{ my: 1 }} /> 
              : <Chip label="Ongoing" color="success" sx={{ my: 1 }} />
            }

            <Box sx={{ textAlign: "right" }}>
              <Button
                size="large"
                data-index={event.id}
                key={event.id}
                onClick={(e) =>
                  setIsModalVisible(true) &
                  setComponentInModal(
                    <TeamEventDetail
                      me={props.me}
                      type="team"
                      id={e.target.getAttribute("data-index")}
                      onDelete={()=> setIsModalVisible(false)}
                      onEdit={()=> setIsModalVisible(false)} 
                    />
                  )
                }
              >
                More
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </List>
  );

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

              <Button variant="outlined" color="success" sx={{ m: 1 }} 
                  onClick={() => setIsModalVisible(true) & setComponentInModal(
                    <CreateTeamEvent 
                      nowTeam={props.nowTeam} me={props.me} mode="create" onCreate={()=>setIsModalVisible(false)} />)
                  }
              >
                  Create
              </Button> 
          </div>
                                                   
          <ListView/>

          <Modal
            visible={isModalVisible}
            onCancel={handleClose}
            width="600px"
            onOk={handleClose}
            style={{ zIndex: 1200 }}
            footer={[
              <Button key="close" onClick={handleClose}>
                Close
              </Button>,
            ]}
          >
            {componentInModal}
          </Modal>
    </div>
  );

  return (
    <div className="Wrapper">
      <Template content={eventlist} />
    </div>
  );
}

export default TeamEvent;
