import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faMedal,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;
const useStyles = makeStyles({
  paper: {
    background: "#f2f2f2",
  },
});

const Navbar = () => {
  const iconList = [
    <FontAwesomeIcon class="navbarIcon" icon={faChartLine} />,
    <FontAwesomeIcon class="navbarIcon" icon={faUsers} />,
    <FontAwesomeIcon class="navbarIcon" icon={faCalendarAlt} />,
    <FontAwesomeIcon class="navbarIcon" icon={faMedal} />,
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
