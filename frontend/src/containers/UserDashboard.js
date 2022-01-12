import Template from "../components/Template";
import "antd/dist/antd.css";
import "./App.css";
import { useState, useEffect } from "react";
import Notification from "../components/Notification";
import Block from "../components/Block";
import Todo from "../components/Todo/App";
import DashboardEvent from "../components/DashboardEvent";
import UserEventDetail from "./UserEventDetail";
import { Modal } from "antd";
import {
  Box,
  Button,
  Chip,
  List,
  Icon,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { CardActionArea, CardMedia } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useQuery } from "@apollo/client";
import { USER_EVENT_INIT } from "../graphql";
import styled from "styled-components";
import { Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CreateUserEvent from "../containers/CreateUserEvent";

const ViewBox = styled.div`
  max-width: 800px;
`;

const UserDashboard = (props) => {
  const today = new Date();
  const [events, setEvents] = useState(null); // 所有活動資料
  const [firstInit, setFirstInit] = useState(true);
  const { data, error, loading, subscribeToMore } = useQuery(USER_EVENT_INIT, {
    variables: { userID: props.me },
  });

<<<<<<< HEAD
  const EventData = [];
  if (!loading) {
    data.initUserEvent.map((i) =>
      EventData.push({
        id: i.eventID,
        title: i.eventTitle,
        description: i.eventDescription,
        start: new Date(i.eventStart),
        end: new Date(i.eventEnd),
        location: i.eventLocation,
        posttime: new Date(i.eventPostTime),
      })
    );

    // 這邊不能這樣寫，會 too many re-render
    // if (events.length === 0) {
    //   setEvents(EventData);
    // }
  }

  // console.log(events);

  const [filtermode, setFiltermode] = useState("all"); // 活動篩選模式
  const handleFilterChange = (filter, newFilter) => {
    setFiltermode(newFilter);
    if (newFilter === "upcoming") {
      setEvents(EventData.filter((event) => new Date(event.start) > today));
    } else if (newFilter === "past") {
      setEvents(EventData.filter((event) => new Date(event.start) <= today));
    } else if (newFilter === "unrespond") {
      setEvents(
        EventData.filter(
          (event) => event.reply === false && new Date(event.start) > today
        )
      );
    } else {
      setEvents(EventData);
    }
    /* 篩選並排序符合條件的活動 */
  };
=======
  // const EventData = [];

  // if (!loading & ) {
  //     setEvents(data.initUserEvent);
  //     // data.initUserEvent.map(
  //     //   i=>EventData.push(
  //     //     {
  //     //       "id": i.eventID,
  //     //       "title": i.eventTitle, "description": i.eventDescription, "eventStart": new Date(i.eventStart),
  //     //       "end": new Date(i.eventEnd), "location": i.eventLocation, "posttime": new Date(i.eventPostTime)
  //     //     }
  //     //   )
  //     // )
  // }
  //   if (firstInit === true) {
  //     setEvents(EventData)
  //   }
      
  //     setFirstInit(false);
  // }

  // console.log(events);

  const ViewBox = styled.div`max-width: 800px;`;

  const [filtermode, setFiltermode] = useState("all"); // 活動篩選模式
  const handleFilterChange = (filter, newFilter) => {
      setFiltermode(newFilter);
      if (newFilter === 'upcoming') {
        setEvents(data.initUserEvent.filter(event => new Date(event.eventStart) > today))
      } else if (newFilter === 'past') {
        setEvents(data.initUserEvent.filter(event => new Date(event.eventStart) <= today))
      } else if (newFilter === 'unrespond') {
        setEvents(data.initUserEvent.filter(event => event.reply === false && new Date(event.eventStart) > today))
      } else {
        setEvents(data.initUserEvent);
      }
      /* 篩選並排序符合條件的活動 */
    };

>>>>>>> Johnny

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentInModal, setComponentInModal] = useState("");
  const showModalWithNotification = () => {
    setIsModalVisible(true);
    setComponentInModal(<Notification me={props.me} />);
  };

  const showModalWithEvent = () => {
    setIsModalVisible(true);
    setComponentInModal(<DashboardEvent me={props.me} />);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setComponentInModal(null);
  };

<<<<<<< HEAD
  const ListView = () => (
    /* 點擊event進入detail頁面 */
    <List className="user-event-list">
      {events.map((event) => (
        <Card
          className="user-event-item"
          sx={{ m: 2, width: 450, height: 200 }}
          key={events.id}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography gutterBottom variant="h4" component="div">
              {/*{event.id}*/}
              {event.title}
              {event.type === "team" ? (
                <PeopleIcon sx={{ mx: 1 }} />
              ) : (
                <PersonIcon sx={{ mx: 1 }} />
              )}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              <AccessTimeIcon sx={{ fontSize: "small" }} />{" "}
              {event.start.toDateString()}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              <LocationOnIcon sx={{ fontSize: "small" }} /> {event.location}
            </Typography>

            {new Date(event.start) <= today ? (
              <Chip label="Finished" sx={{ my: 1 }} />
            ) : event.type === "team" ? (
              event.reply ? (
                <Chip label="Replied" color="success" sx={{ my: 1 }} />
              ) : (
                <Chip label="Unreplied" color="error" sx={{ my: 1 }} />
              )
            ) : (
              <></>
            )}
            <Box sx={{ textAlign: "right" }}>
              <Button
                size="large"
                data-index={event.id}
                key={event.id}
                onClick={(e) =>
                  setIsModalVisible(true) &
                  setComponentInModal(
                    <UserEventDetail id={e.target.getAttribute("data-index")} />
                  ) &
                  console.log(e.target.getAttribute("data-index"))
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

  const eventlist = (
    <div className="user-event">
      <div className="user-event-filtertoggle">
        <ToggleButtonGroup
          color="primary"
          value={filtermode}
          exclusive
          onChange={handleFilterChange}
          // 切換篩選模式: All(新發布到舊)、Upcoming(時間進到遠)、Past(時間進到遠)、Unrespond(未回應, 新發布到舊)
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="upcoming">Upcoming</ToggleButton>
          <ToggleButton value="past">Past</ToggleButton>
          <ToggleButton value="unrespond">Unrespond</ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="outlined"
          color="success"
          sx={{ m: 1 }}
          onClick={() =>
            setIsModalVisible(true) &
            setComponentInModal(<CreateUserEvent me={props.me} />)
          }
        >
          Create
        </Button>
      </div>

      <ViewBox>
        <ListView />
=======
  const ListView = (() => /* 點擊event進入detail頁面 */
    <List className = "user-event-list">
      {events.map(event => 
      <Card 
        className = "user-event-item"
        sx={{ m: 2, width: 450, height: 200 }}
        key={events.id}>
                
      <CardContent 
        sx={{ p: 4 }}
      >
        <Typography gutterBottom variant="h4" component="div">
          {/*{event.id}*/}
          {event.eventTitle}   
          {
              event.type === "team"
              ? <PeopleIcon sx={{ mx : 1 }} /> 
              : <PersonIcon sx={{ mx : 1 }} />
          } 
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
            <AccessTimeIcon sx={{ fontSize: "small" }} /> {new Date(event.eventStart).toDateString()}
            {/*{event.eventStart.toDateString()}*/}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
            <LocationOnIcon sx={{ fontSize: "small" }} /> {event.eventLocation}
        </Typography>

          {
              new Date(event.eventStart) <= today 
              ? <Chip label="Finished" sx={{ my : 1 }} /> 
              : (event.type === 'team' ? (event.reply 
                                    ? <Chip label="Replied" color='success' sx={{ my : 1 }} /> 
                                    : <Chip label="Unreplied" color='error' sx={{ my : 1 }} />) : (<></>))
          }
          <Box sx ={{textAlign: "right"}}>
            <Button 
              size="large"
              data-index= {event.eventID}
              key={event.eventID}
              onClick={(e) => setIsModalVisible(true) & 
                              setComponentInModal(<UserEventDetail id={e.target.getAttribute("data-index")}/>) 
                              & console.log(e.target.getAttribute("data-index"))
                      }
              > 
                              More
            </Button>
          </Box>

      </CardContent>
    </Card> )}
  </List>)

  const eventlist = (
  <div className = "user-event">
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
          <Button 
                variant="outlined" color="success" sx={{ m: 1 }} 
                onClick={ () => setIsModalVisible(true) & setComponentInModal(< CreateUserEvent me={props.me} />) }
              >
                  Create
          </Button>
      </div> 
                                               
      <ViewBox >
          {events ? <ListView/> : []}
>>>>>>> Johnny
      </ViewBox>
    </div>
  );

  const dashboard = (
    <div style={{ display: "flex" }}>
      <div style={{ width: "70vw", height: "70vh", flexDirection: "row" }}>
        {eventlist}
      </div>

      <div style={{ width: "30vw", height: "70vh", flexDirection: "row" }}>
        <Block
          enlarge={showModalWithEvent}
          component={<DashboardEvent me={props.me} />}
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
          {componentInModal}
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
