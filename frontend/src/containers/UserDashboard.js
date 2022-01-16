import Template from "../components/Template";
import "antd/dist/antd.css";
import "./App.css";
import { useState, useEffect } from "react";
import Notification from "../components/Notification";
import Block from "../components/Block";
import Todo from "../components/Todo/App";
import DashboardEvent from "../components/DashboardEvent";
import UserEventDetail from "./UserEventDetail";
import TeamEventDetail from "../components/TeamEventDetail";
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
import { USER_EVENT_INIT, USER_TEAM_EVENT_INIT } from "../graphql";
import styled from "styled-components";
import { Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CreateUserEvent from "../containers/CreateUserEvent";
import KeyboardReturnTwoToneIcon from "@mui/icons-material/KeyboardReturnTwoTone";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const ViewBox = styled.div`
  max-width: 800px;
`;

const UserDashboard = (props) => {
  const today = new Date();
  const [events, setEvents] = useState([]); // 所有活動資料
  const [filtermode, setFiltermode] = useState("all"); // 活動篩選模式
  const [filterMainMode, setFilterMainMode] = useState("Role");

  const userEvent = useQuery(USER_EVENT_INIT, {
    variables: { userID: props.me },
    fetchPolicy: "cache-and-network",
  });

  const teamEvent = useQuery(USER_TEAM_EVENT_INIT, {
    variables: { userID: props.me },
    fetchPolicy: "cache-and-network",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentInModal, setComponentInModal] = useState("");

  let data = [];
  try {
    userEvent.data.initUserEvent.map((i) => data.push(i));
    teamEvent.data.initUserTeamEvent.map((i) => data.push(i));

    if (filtermode === "upcoming") {
      data = data.filter(
        (event) => new Date(parseInt(event.eventStart)) > today
      );
    } else if (filtermode === "past") {
      data = data.filter(
        (event) => new Date(parseInt(event.eventStart)) <= today
      );
    } else if (filtermode === "unrespond") {
      data = data.filter(
        (event) =>
          event.reply === false && new Date(parseInt(event.eventStart)) > today
      );
    } else if (filtermode === "user") {
      data = data.filter((event) => event.type === "user");
    } else if (filtermode === "team") {
      data = data.filter((event) => event.type === "team");
    }
  } catch {}

  const handleFilterChange = (filter, newFilter) => {
    setFiltermode(newFilter);

    if (newFilter === "upcoming") {
      setEvents(
        data.filter((event) => new Date(parseInt(event.eventStart)) > today)
      );
    } else if (newFilter === "past") {
      setEvents(
        data.filter((event) => new Date(parseInt(event.eventStart)) <= today)
      );
    } else if (newFilter === "unrespond") {
      setEvents(
        data.filter(
          (event) =>
            event.reply === false &&
            new Date(parseInt(event.eventStart)) > today
        )
      );
    } else if (newFilter === "user") {
      setEvents(data.filter((event) => event.type === "user"));
    } else if (newFilter === "team") {
      setEvents(data.filter((event) => event.type === "team"));
    } else {
      setEvents(data);
    }
  };

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

  const ListView = () => (
    /* 點擊event進入detail頁面 */
    <List
      className="user-event-list"
      style={{ display: "flex", flexWrap: "wrap", width: "750px" }}
    >
      {data.map((event) => (
        <Card
          style={{ width: "325px", flexDirection: "row" }}
          className="user-event-item"
          sx={{ m: 2 }}
          key={event.id}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography gutterBottom variant="h4" component="div">
              {/*{event.id}*/}
              {event.eventTitle}
              {event.type === "team" ? (
                <PeopleIcon sx={{ mx: 1 }} />
              ) : (
                <PersonIcon sx={{ mx: 1 }} />
              )}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              <AccessTimeIcon sx={{ fontSize: "small" }} />{" "}
              {new Date(parseInt(event.eventStart)).toDateString()}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              <LocationOnIcon sx={{ fontSize: "small" }} />{" "}
              {event.eventLocation}
            </Typography>

            {new Date(event.eventStart) <= today ? (
              <Chip label="Finished" sx={{ my: 1 }} />
            ) : (
              <Chip label="Ongoing" color="success" sx={{ my: 1 }} />
            )}

            <Box sx={{ textAlign: "right" }}>
              <Button
                size="large"
                data-index={event.eventID}
                key={event.eventID}
                onClick={(e) =>
                  setIsModalVisible(true) &
                  setComponentInModal(
                    event.type === "team" ? (
                      <TeamEventDetail
                        onDelete={() => setIsModalVisible(false)}
                        onEdit={() => setIsModalVisible(false)}
                        id={e.target.getAttribute("data-index")}
                      />
                    ) : (
                      <UserEventDetail
                        onDelete={() => setIsModalVisible(false)}
                        onEdit={() => setIsModalVisible(false)}
                        id={e.target.getAttribute("data-index")}
                      />
                    )
                  )
                }
              >
                {" "}
                More
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </List>
  );
  const handleFilterMainModeChange = () => {
    filterMainMode === "Role"
      ? setFilterMainMode("Time")
      : setFilterMainMode("Role");
  };
  const eventlist = (
    <div className="user-event">
      <Button color="primary" onClick={handleFilterMainModeChange}>
        <FilterAltIcon sx={{ fontSize: "large" }} />
        {filterMainMode}
      </Button>

      <div className="user-event-filtertoggle">
        {filterMainMode === "Role" ? (
          <ToggleButtonGroup
            color="primary"
            value={filtermode}
            exclusive
            onChange={handleFilterChange}
          >
            <ToggleButton value="all">all</ToggleButton>
            <ToggleButton value="user">user</ToggleButton>
            <ToggleButton value="team">team</ToggleButton>
          </ToggleButtonGroup>
        ) : (
          <ToggleButtonGroup
            color="primary"
            value={filtermode}
            exclusive
            onChange={handleFilterChange}
            // 切換篩選模式: All(新發布到舊)、Upcoming(時間進到遠)、Past(時間進到遠)、Unrespond(未回應, 新發布到舊)
          >
            <ToggleButton value="upcoming">Upcoming</ToggleButton>
            <ToggleButton value="past">Past</ToggleButton>
            <ToggleButton value="unrespond">Unrespond</ToggleButton>
          </ToggleButtonGroup>
        )}

        <Button
          variant="outlined"
          color="success"
          sx={{ m: 1 }}
          onClick={() =>
            setIsModalVisible(true) &
            setComponentInModal(
              <CreateUserEvent
                me={props.me}
                mode="create"
                onCreate={() => setIsModalVisible(false)}
              />
            )
          }
        >
          Create
        </Button>
      </div>

      <ViewBox>{events ? <ListView /> : []}</ViewBox>
    </div>
  );

  const dashboard = (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "70vw", flexDirection: "row" }}>{eventlist}</div>

        <div style={{ width: "30vw", flexDirection: "row" }}>
          <Block
            style={{ height: "100vh", overflow: "auto" }}
            enlarge={showModalWithEvent}
            component={<DashboardEvent me={props.me} />}
            fullscreen={isModalVisible}
          ></Block>

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
        width="600px"
        style={{ zIndex: 1200 }}
        footer={[
          <Button key="close" onClick={handleClose}>
            Cancel
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
