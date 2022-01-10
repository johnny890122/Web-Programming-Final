import Template from "../components/Template";
import "antd/dist/antd.css";
import "./App.css";
import { useState } from "react";
import Notification from "../components/Notification";
import Block from "../components/Block";
import Todo from "../components/Todo/App";
import DashboardEvent from "../components/DashboardEvent";
import { Modal } from "antd";
import { Button, Chip, List, Icon, ToggleButtonGroup, ToggleButton, Typography, Card, CardContent } from '@mui/material';
import { CardActionArea, CardMedia } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useQuery } from "@apollo/client";
import { USER_EVENT_INIT } from "../graphql";
import styled from "styled-components";

const UserDashboard = (props) => {
  const today = new Date();
  const [events, setEvents] = useState([]); // 所有活動資料
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

  const ViewBox = styled.div`max-width: 800px;`;

  const [filtermode, setFiltermode] = useState("upcoming"); // 活動篩選模式
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


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentInModal, setComponentInModal] = useState("");
  const showModalWithNotification = () => {
    setIsModalVisible(true);
    setComponentInModal("Notification");
  };

  const showModalWithEvent = () => {
    setIsModalVisible(true);
    setComponentInModal("Event");
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setComponentInModal("");
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

  const eventlist = (
  <div className = "user-event">
      <h1>Test</h1>  

      <div className = "user-event-filtertoggle">
          <ToggleButtonGroup color="primary" value={filtermode} exclusive
              onChange={handleFilterChange} 
              // 切換篩選模式: All(新發布到舊)、Upcoming(時間進到遠)、Past(時間進到遠)、Unrespond(未回應, 新發布到舊)
              >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="upcoming">Upcoming</ToggleButton>
              <ToggleButton value="past">Past</ToggleButton>
              <ToggleButton value="unrespond">Unrespond</ToggleButton>
              <Button variant="outlined" color="success" sx={{ m: 1 }} href = '/user/CreateUserEvent'>
                  Create
              </Button>
          </ToggleButtonGroup>
      </div> 
                                               
      <ViewBox >
          <ListView/>
      </ViewBox>
  </div>)

  const dashboard = (
    <div style={{ display: "flex"}}>
      <div style={{ width:"70vw", height:"70vh", "flex-direction": "row"}}>
        {eventlist}
      </div>

      <div style={{ width:"30vw", height:"70vh", "flex-direction": "row"}}>
        <Block
          enlarge={showModalWithEvent}
          component={<DashboardEvent me={props.me}/>}
          fullscreen={isModalVisible}
        />

        <Block
          enlarge={showModalWithNotification}
          component={<Notification me={props.me} />}
          fullscreen={isModalVisible}
        />

        <Modal
          title="Testing"
          visible={isModalVisible}
          onOk={handleOk}
          style={{ zIndex: 1200 }}
          footer={[
              <Button key="ok" onClick={handleOk}>
                Ok
              </Button>,
            ]}
        >
          {componentInModal === "Notification" ? <Notification me={props.me}/> : []}
          {componentInModal === "Event" ? <DashboardEvent me={props.me}/> : []}
        </Modal>
      </div>
    </div>
  );

  return (
    <div className="Wrapper">
      <Template content={dashboard} />
    </div>
  );
};

export default UserDashboard;
