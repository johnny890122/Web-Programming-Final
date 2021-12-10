<<<<<<< HEAD
// UserAchievement 要再調整(我不知道要放什麼...)
// TeamVote 會跳Warning 但是不會修 QQ

import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { TeamData, EventData, ScoreData, VoteData, BirthData, PostData } from './ListData';


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


function TeamHP() {
  return (
    <div className = "team-home">
      <h1>Home</h1>
      <div className = "teamHp-event">
          <h2>Upcoming Events</h2>
          <List className = "teamHp-event-list">
              {EventData.map(event => <ListItem   button key = {event.id}>
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


function TeamPost() {
    return (
      <div className = "team-post">
        <h2>Team Post</h2>
        <List className = "team-post-list">
            <ListItem button key = "0">
                <ListItemText primary = "=> New Post"/>
            </ListItem>
            {PostData.map(post => <ListItem button key = {post.id}>
                                    <ListItemText primary = {post.title}
                                                  secondary = {<>
                                                    <Typography> {post.author} </Typography>
                                                    <Typography> {post.time} </Typography>
                                                    <Typography> {post.content} </Typography>
                                                  </>} />
                                  </ListItem> )}
        </List>
      </div>
    );
};

function TeamScore() {
    return (
      <div className = "team-score">
        <h2>Team Score</h2>
        <List className = "team-score-list">
        {ScoreData.map(score => <ListItem button key = {score.id}>
                                    <ListItemText primary = {`${score.date} : ${score.win}`}
                                                  secondary = {<>
                                                    <Typography> {score.team} vs {score.opponent} </Typography>
                                                    <Typography> {score.teamSet} : {score.oppoSet} </Typography>
                                                  </>}/>
                                </ListItem>)}
        </List>
      </div>
    );
};

function TeamVote() {

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

=======
// UserAchievement 要再調整(我不知道要放什麼...)
// TeamVote 會跳Warning 但是不會修 QQ

import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { TeamData, EventData, ScoreData, VoteData, BirthData, PostData } from './ListData';


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


function TeamHP() {
  return (
    <div className = "team-home">
      <h1>Home</h1>
      <div className = "teamHp-event">
          <h2>Upcoming Events</h2>
          <List className = "teamHp-event-list">
              {EventData.map(event => <ListItem   button key = {event.id}>
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


function TeamPost() {
    return (
      <div className = "team-post">
        <h2>Team Post</h2>
        <List className = "team-post-list">
            <ListItem button key = "0">
                <ListItemText primary = "=> New Post"/>
            </ListItem>
            {PostData.map(post => <ListItem button key = {post.id}>
                                    <ListItemText primary = {post.title}
                                                  secondary = {<>
                                                    <Typography> {post.author} </Typography>
                                                    <Typography> {post.time} </Typography>
                                                    <Typography> {post.content} </Typography>
                                                  </>} />
                                  </ListItem> )}
        </List>
      </div>
    );
};

function TeamScore() {
    return (
      <div className = "team-score">
        <h2>Team Score</h2>
        <List className = "team-score-list">
        {ScoreData.map(score => <ListItem button key = {score.id}>
                                    <ListItemText primary = {`${score.date} : ${score.win}`}
                                                  secondary = {<>
                                                    <Typography> {score.team} vs {score.opponent} </Typography>
                                                    <Typography> {score.teamSet} : {score.oppoSet} </Typography>
                                                  </>}/>
                                </ListItem>)}
        </List>
      </div>
    );
};

function TeamVote() {

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

>>>>>>> main
export { UserTeam, UserAchievement, TeamHP, TeamPost, TeamScore, TeamVote };