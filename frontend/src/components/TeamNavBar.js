import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@material-ui/core";
import {
  CottageOutlined,
  TodayOutlined,
  PostAddOutlined,
  PeopleAltOutlined,
  SportsScoreOutlined,
  HowToVoteOutlined,
  CollectionsOutlined,
  AccountTreeOutlined,
} from "@mui/icons-material";

const drawerWidth = 190;
const useStyles = makeStyles({
  paper: {
    background: "white",
  },
});

const TeamNavBar = () => {
  const iconList = [
    <CottageOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <TodayOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <PostAddOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <PeopleAltOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <SportsScoreOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <HowToVoteOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <CollectionsOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <AccountTreeOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
  ];
  const functionList = [
    "Home",
    "Calendar",
    "Posts",
    "Member",
    "Score",
    "Vote",
    "Gallery",
    "Gantt",
  ];

  const styles = useStyles();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          position: "absolute",
          left: 220,
          zIndex: 1301,
        },
        position: "relative",
        // zIndex: (theme) => theme.zIndex.drawer + 1,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      classes={{ paper: styles.paper }}
      //   position="static"
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", padding: "1rem 1.25rem" }}>
        <List>
          {functionList.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{iconList[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default TeamNavBar;
