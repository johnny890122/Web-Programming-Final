import { TeamData } from './ListData';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import styled from "styled-components";

function UserTeam() {
    return (
      <List className = "user-team-list">
            {TeamData.map(team => (
                <ListItem

                  /* 點擊 =>TeamHP */

                  button 
                  key = {team.id}>
                    <ListItemText primary = {team.teamname} 
                                  secondary={
                                    <>
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
                                    </>
                                  }/>
                </ListItem>
            ))}
        </List>
    );
};

export default UserTeam;