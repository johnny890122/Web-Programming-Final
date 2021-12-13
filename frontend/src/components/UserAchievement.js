import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';

function UserAchievement() {
  return (
    <List className = "user-arch-list">
          <ListItem key = {0}>
                <ListItemText primary = 'Exercise'
                              secondary= '有啥呢'/>
          </ListItem>
          <ListItem key = {1}>
                <ListItemText primary = 'Habbit'
                              secondary= '有啥呢'/>
          </ListItem>
          <ListItem key = {2}>
                <ListItemText primary = 'Productivity'
                              secondary= '有啥呢'/>
          </ListItem>
      </List>
  );
};

export default UserAchievement