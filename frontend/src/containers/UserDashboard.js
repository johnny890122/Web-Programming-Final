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
import KeyboardReturnTwoToneIcon from '@mui/icons-material/KeyboardReturnTwoTone';

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

  const handleClose = () => {
    setIsModalVisible(false);
    setComponentInModal(null);
  };

  const ListView = (() => /* 點擊event進入detail頁面 */
    <List className = "user-event-list" style={{ display: "flex", flexWrap: "wrap", width: "750px"}}>
      {events.map(event =>
      <Card
        style={{width: "325px", flexDirection: "row", }}
        className = "user-event-item"
        sx={{ m: 2}}
        key={events.id} >

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
                      }
              > More
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
                onClick={ () => setIsModalVisible(true) & setComponentInModal(< CreateUserEvent me={props.me} mode="create" />) }
              >
                  Create
          </Button>
      </div>

      <ViewBox >
          {events ? <ListView/> : []}
      </ViewBox>
    </div>
  );

  const dashboard = (
    <>
    <div style={{ display: "flex" }}>
      <div style={{ width: "70vw", flexDirection: "row"}}>
        {eventlist}
      </div>

      <div style={{ width: "30vw", flexDirection: "row" }}>
        <Block
          style={{height: "100vh"}}
          enlarge={showModalWithEvent}
          component={<DashboardEvent me={props.me} />}
          fullscreen={isModalVisible}
        >
        </Block>

        <Block
          enlarge={showModalWithNotification}
          component={<Notification me={props.me} />}
          fullscreen={isModalVisible}
        />
      </div>
    </div>

    <Modal
      visible={isModalVisible}
      onCancel={handleClose}
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
    </>
  );

  return (
    <div className="Wrapper">
      <Template content={dashboard} />
    </div>
  );
};

export default UserDashboard;
