import "../containers/App.css";
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
  DashboardCustomizeOutlined,
  GroupsOutlined,
  TodayOutlined,
  EmojiEventsOutlined,
} from "@mui/icons-material";

const drawerWidth = 230;
const useStyles = makeStyles({
  paper: {
    background: "#f2f2f2",
  },
  icon: {
    fill: "#2e4c6d",
    fontSize: "1.5rem",
  },
});

const Navbar = () => {
  const styles = useStyles();
  const iconList = [
    <DashboardCustomizeOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <GroupsOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <TodayOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
    <EmojiEventsOutlined sx={{ fill: "#2e4c6d", fontSize: "1.5rem" }} />,
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      classes={{ paper: styles.paper }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", padding: "1rem 1.25rem" }}>
        <List>
          {["Dashboard", "Team", "Calendar", "Achievement"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{iconList[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Navbar;
