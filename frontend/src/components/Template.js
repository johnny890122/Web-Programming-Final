import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "antd";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { Modal } from "antd";
import { Input, DatePicker, Tag } from "antd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { makeStyles } from "@material-ui/core";
import {
  DashboardCustomizeOutlined,
  GroupsOutlined,
  TodayOutlined,
  EmojiEventsOutlined,
  Cottage,
  EventNote,
  PostAdd,
  PeopleAlt,
  SportsScore,
  HowToVote,
  NavigateNext,
  TipsAndUpdatesOutlined,
} from "@mui/icons-material";
import { NavLink, Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useQuery, useMutation } from "@apollo/client";
import {
  USER_ACCOUNT,
  UPDATE_USER,
  USER_ACHEIEVEMENT_UPDATE,
} from "../graphql";

const drawerWidth = 210;
const useStyles = makeStyles({
  customWidth: {
    "& div": {
      width: "10rem",
    },
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Template({ content }) {
  const ME_KEY = "me";
  const userAccount = useQuery(USER_ACCOUNT, {
    variables: { userID: localStorage.getItem(ME_KEY) },
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [addAchievement] = useMutation(USER_ACHEIEVEMENT_UPDATE);

  const [name, setName] = React.useState(
    !userAccount.loading ? userAccount.data.myUserAccount.userName : ""
  );

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isTeam, setIsTeam] = React.useState(false);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  React.useEffect(() => {
    if (!userAccount.loading) {
      if (!userAccount.data.myUserAccount.userName) {
        setIsModalVisible(true);
      }
    }
  }, [userAccount.loading]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const submitChange = async () => {
    await updateUser({
      variables: {
        userID: localStorage.getItem(ME_KEY),
        userName: name,
      },
    });

    await addAchievement({
      variables: {
        userID: localStorage.getItem(ME_KEY),
        title: "Newbie Medal",
        content: "Welcome!",
      },
    });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = ["Dashboard", "Calendar", "Achievement", "Team"];
  const iconList = [
    <DashboardCustomizeOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <TodayOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <EmojiEventsOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <GroupsOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
  ];

  const teamPages = [
    "Home",
    "Event",
    "Posts",
    "Member",
    "Score",
    "Vote",
    // "Gallery",
    // "Gantt",
  ];
  const teamIconList = [
    <Cottage sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <EventNote sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <PostAdd sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <PeopleAlt sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <SportsScore sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <HowToVote sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    // <Collections sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    // <StackedLineChart sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
  ];
  let breadItem = window.location.href
    .replace("http://localhost:3000", "")
    .split("/");
  breadItem.shift();

  React.useEffect(() => {
    if (breadItem[0] === "team" && breadItem[1] !== "Create") {
      setIsTeam(true);
    } else {
      setIsTeam(false);
    }
  }, [breadItem]);
  const concatBread = (item) => {
    let href = "";
    let stopIndex = breadItem.indexOf(item);
    for (let i = 0; i <= stopIndex; i++) href = href + "/" + breadItem[i];
    return href;
  };

  const dateFormat = "YYYY/MM/DD";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "#2e4c6d" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hello{" "}
            {userAccount.loading
              ? ""
              : userAccount.data.myUserAccount.userAccount}
          </Typography>
          <Box
            sx={{ flexGrow: 0 }}
            style={{ position: "absolute", right: "1.5rem" }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={showModal} sx={{ p: 0 }}>
                <Avatar
                  size="large"
                  src={`https://joeschmoe.io/api/v1/${userAccount}`}
                />
              </IconButton>
            </Tooltip>
            <Modal
              title="User Settings"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={[
                <Button
                  variant="contained"
                  key="ok"
                  color="success"
                  onClick={submitChange}
                  style={{ marginRight: "0.5rem" }}
                >
                  Update
                </Button>,
                <Link to="/">
                  <Button
                    variant="contained"
                    color="error"
                    key="logout"
                    style={{ marginRight: "0.75rem" }}
                  >
                    Log Out
                  </Button>
                </Link>,
              ]}
            >
              <div className="container" style={{ display: "flex" }}>
                <Avatar
                  size={150}
                  src={`https://joeschmoe.io/api/v1/${userAccount}`}
                />
                <div
                  className="text-block"
                  style={{ marginLeft: "2rem", marginTop: "1.5rem" }}
                >
                  <div className="row" style={{ display: "flex" }}>
                    <Tag color="geekblue">
                      <Typography>Account</Typography>
                    </Tag>
                    <Input
                      disabled={true}
                      defaultValue={
                        userAccount.loading
                          ? ""
                          : userAccount.data.myUserAccount.userAccount
                      }
                      style={{ width: "70%" }}
                      size="small"
                    />
                  </div>
                  <br />
                  <div className="row" style={{ display: "flex" }}>
                    <Tag color="geekblue">
                      <Typography>Email</Typography>
                    </Tag>
                    <Input
                      disabled={true}
                      defaultValue={
                        userAccount.loading
                          ? ""
                          : userAccount.data.myUserAccount.userEmail
                      }
                      style={{ width: "76%" }}
                      size="small"
                    />
                  </div>
                  <br />
                  <div className="row" style={{ display: "flex" }}>
                    <Tag color="geekblue">
                      <Typography>Display Name</Typography>
                    </Tag>
                    <Input
                      defaultValue={
                        userAccount.loading
                          ? name
                          : userAccount.data.myUserAccount.userName
                      }
                      style={{ width: "58%" }}
                      size="small"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </Modal>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{ style: { background: "#F2F2F2" } }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map((text, index) => (
            <Link to={"/user/" + text}>
              <ListItem button key={text}>
                <ListItemIcon
                  onClick={() => {
                    if (text === "Team") {
                      setIsTeam(true);
                    } else {
                      setIsTeam(false);
                    }
                  }}
                >
                  {iconList[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: "black" }} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {isTeam
            ? teamPages.map((text, index) => (
                <Link to={"/team/" + breadItem[1] + "/" + text}>
                  <ListItem button key={text}>
                    <ListItemIcon>{teamIconList[index]}</ListItemIcon>
                    <ListItemText primary={text} sx={{ color: "black" }} />
                  </ListItem>
                </Link>
              ))
            : null}
        </List>
        <List style={{ marginTop: "auto" }}>
          <Link to="/About">
            <ListItem button key="About Us">
              <ListItemIcon>
                <TipsAndUpdatesOutlined
                  sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }}
                />
              </ListItemIcon>
              <ListItemText primary="About Us" sx={{ color: "black" }} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          marginLeft: "2.5rem",
          marginTop: "2rem",
        }}
      >
        <DrawerHeader />
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNext fontSize="small" />}
        >
          {breadItem.length === 1
            ? null
            : breadItem.map((item) =>
                item !== "user" &&
                item !== "team" &&
                (pages.includes(item) || teamPages.includes(item)) ? (
                  <NavLink to={concatBread(item)}>
                    <Typography sx={{ color: "black" }}>
                      {decodeURI(item).toUpperCase()}
                    </Typography>
                  </NavLink>
                ) : (
                  <Typography sx={{ color: "#727272" }}>
                    {decodeURI(item).toUpperCase()}
                  </Typography>
                )
              )}
        </Breadcrumbs>
        <br />
        <div className="main" style={{ width: "95%" }}>
          {content}
        </div>
        <br />
        <br />
      </Box>
    </Box>
  );
}
