import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import {TeamData} from "./ListData";

function UserTeam() {
  return (
    <List className = "user-team-list">
          {TeamData.map(team => (
              <ListItem 
                button
                key = {team.id}>
                  <ListItemText primary = {team.teamname} 
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body3"
                                      color="text.secondary"
                                    >{team.status} </Typography>
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body3"
                                      color="#bbbbbb"
                                    >-- {team.description}</Typography>
                                  </React.Fragment>
                                }/>
              </ListItem>
          ))}
      </List>
  );
};
  
export default UserTeam;