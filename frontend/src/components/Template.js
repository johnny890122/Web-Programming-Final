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
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
  Collections,
  StackedLineChart,
  Edit,
  NavigateNext,
} from "@mui/icons-material";
import { NavLink, Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useQuery } from "@apollo/client";
import { USER_ACCOUNT } from "../graphql";


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
  const { data, error, loading, subscribeToMore } = useQuery(USER_ACCOUNT, {
    variables: { userID: localStorage.getItem(ME_KEY) },
  });

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isTeam, setIsTeam] = React.useState(false);

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

  const pages = ["Dashboard", "Team", "Calendar", "Achievement"];
  const iconList = [
    <DashboardCustomizeOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <GroupsOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <TodayOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <EmojiEventsOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
  ];
  const teamPages = [
    "Home",
    "Calendar",
    "Posts",
    "Member",
    "Score",
    "Vote",
    "Gallery",
    "Gantt",
  ];
  const teamIconList = [
    <Cottage sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <EventNote sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <PostAdd sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <PeopleAlt sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <SportsScore sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <HowToVote sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <Collections sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <StackedLineChart sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
  ];
  const settings = ["USERNAME", "2000/11/25"];
  let breadItem = window.location.href
    .replace("http://localhost:3000", "")
    .split("/");
  breadItem.shift();

  React.useEffect(() => {
    if (breadItem[0] === "team") {
      setIsTeam(true);
    } else {
      setIsTeam(false);
    }
  }, [breadItem]);

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
            Hello {loading ? "" : data.myUserAccount}
          </Typography>
          <Box
            sx={{ flexGrow: 0 }}
            style={{ position: "absolute", right: "1.5rem" }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://live.staticflickr.com/65535/51540870993_055876bd65_k.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <img
                  src="https://live.staticflickr.com/65535/51540870993_055876bd65_k.jpg"
                  style={{
                    width: "7rem",
                    height: "7rem",
                    borderRadius: "10rem",
                  }}
                />
              </MenuItem>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  style={{
                    position: "relative",
                    display: "flex",
                    padding: "0 1rem",
                  }}
                >
                  <div className="text-container" style={{ margin: "0.4rem" }}>
                    <Typography>{setting}</Typography>
                  </div>
                  <div
                    className="icon-container"
                    style={{
                      position: "absolute",
                      left: "8rem",
                      margin: "0.4rem 0",
                    }}
                  >
                    <Edit sx={{ fontSize: "0.75rem" }} />
                  </div>
                </MenuItem>
              ))}
            </Menu>
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
            <NavLink to={"/user/" + text}>
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
            </NavLink>
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
          {breadItem.map((item) => (
            <Typography sx={{ color: "black" }}>
              {decodeURI(item).toUpperCase()}
            </Typography>
          ))}
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
