import {VoteData} from "./ListData";
import { List, ListItem, ListItemText, Typography } from '@mui/material';


function EndVote(vote) { 
  return(  
      <ListItemText primary = {vote.title}
                    secondary = {<>
                      <Typography>已結束</Typography>
                      <Typography>結果 : {vote.result.name} {vote.result.count}票</Typography>
                     </>}/>
  );
};


function ActVote(vote) {
  return(
      <ListItemText primary = {vote.title}
                    secondary = {<>
                      <Typography>{!vote.limit ? "一人多票": `一人${vote.limit}票`}</Typography>
                      <Typography>截止時間 : {vote.end}</Typography>
                      {vote.options.map(option => 
                          <Typography key = {option.id}> {option.select ? `o`: `x`} {option.name} {option.count} 票</Typography>)}
                      </>}/>
  );
};

export default function TeamVote() {

  return (
    <div className = "team-vote">
      <h2>Team Vote</h2>
      <List className = "team-vote-list">
          {VoteData.map(vote => <ListItem button key = {vote.id} component="div">
                                  {vote.act ? ActVote(vote): EndVote(vote)}
                                </ListItem>)}
      </List>
    </div>
  );
};