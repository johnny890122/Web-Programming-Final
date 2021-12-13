import { EventData, ScoreData, VoteData, BirthData } from "./ListData";
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';

function TeamHP() {

    return (
      <div className = "team-home">
        <h1>Home</h1>
        <div className = "teamHp-event">
            <h2>Upcoming Events</h2>
            <List className = "teamHp-event-list">
                {EventData.filter(event => event.type === "team")
                          .map(event => <ListItem   button key = {event.id}>
                                            <ListItemText primary = {event.title}
                                                          secondary = {event.start}/>
                                        </ListItem> )}
            </List>
        </div>
        <div className = "teamHp-score">
            <h2>Score</h2>
            <List className = "teamHp-score-list">
                  {ScoreData.map(score => <ListItem button key = {score.id}>
                                              <ListItemText primary = {score.date}
                                                            secondary = {<>
                                                              <Typography sx={{ display: 'inline' }}> {score.team} </Typography>
                                                              <Typography sx={{ display: 'inline' }}> {score.teamSet} : {score.oppoSet} </Typography>
                                                              <Typography sx={{ display: 'inline' }}> {score.opponent} </Typography>
                                                            </>}/>
                                          </ListItem> )}
            </List>
        </div>
        <div className = "teamHp-vote">
            <h2>Vote</h2>
            <List className = "teamHp-vote-list">
                {VoteData.map(vote => <ListItem  button key = {vote.id}>
                                            <ListItemText primary = {vote.title}
                                                          secondary = {<>
                                                                <Typography>結束時間: {vote.end}</Typography>
                                                                <Typography>{vote.act ? '投票中': '已結束'}</Typography>
                                                              </>}/>
                                            </ListItem> )}
            </List>
        </div>
        <div className = "teamHp-birth">
            <h2>Birthday</h2>
            <List className = "teamHp-birth-ilst">
                {BirthData.map(birth => <ListItem key = {birth.id}>
                                            <ListItemText primary = {birth.name}
                                                          secondary = {birth.date}/>
                                        </ListItem> )}
            </List>
        </div>
      </div>
    );
  };
  

export default TeamHP