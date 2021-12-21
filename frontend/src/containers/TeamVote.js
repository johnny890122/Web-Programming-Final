import React from "react";
import Template from "../components/Template";
import {VoteData} from "../components/ListData";
import { List, ListItem, ListItemText, Typography, Card, Box, Button, Grid, CardContent, Chip } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { CardActionArea } from '@mui/material';

/* 點擊vote進入detail頁面 */

function TeamVote() {

  const votes = VoteData;

  const EndVote = ((vote) => 
    <Card sx={{ p:1, width: '100%' }}
          key = {vote.id}>
        <CardActionArea sx={{ width: '100%' }}
                              href={`#vote-detail`}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ m:1, p: 1 }}>
                <Typography gutterBottom variant="h4" component="div" >
                    {vote.title}
                </Typography>
                <Chip label="已結束" size = 'large' sx={{ m : 1 }} />
              </Box>
              <Box sx={{ m:1, p: 1 }}>
                <Typography gutterBottom variant="subtitle1" component="div">
                    結果 : {vote.result.name} {vote.result.count} 票
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    <AccessTimeFilledIcon sx={{ fontSize: "small" }} /> {vote.end}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
      </Card>
  )
  
  const ActVote = ((vote) =>

    <Card sx={{ p:1, width: '100%' }} >
        <CardActionArea sx={{ width: '100%' }}
                              href={`#vote-detail`}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ m:1, p: 1 }}>
              <Typography gutterBottom variant="h4" component="div" >
                  {vote.title}
              </Typography>
              <Chip label="投票中" color='success' variant="outlined" size = 'large' sx={{ m : 1 }} />
              {vote.replied ?  <Chip label="Replied" color='success' sx={{ m : 1 }} /> :
                               <Chip label="Ureplied" color='error' sx={{ m : 1 }} />}
            </Box>
            <Box sx={{ m:1, p: 1 }}>
              <Typography gutterBottom variant="subtitle1" component="div">
                  {!vote.limit ? "一人多票": `一人${vote.limit}票`}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                <AccessTimeFilledIcon sx={{ fontSize: "small" }} /> {vote.end}
              </Typography>
            </Box>
            {/*<Box sx={{ m:1, p: 1 }}>
              {vote.options.map(option => 
                  <Typography gutterBottom variant="body1" component="div" key = {option.id}>
                    {option.select ? <CheckBoxOutlineBlankIcon sx={{ fontSize: "small" }} />: <CheckBoxIcon sx={{ fontSize: "small" }} />} {option.name} : {option.count} 票
                  </Typography>)}
            </Box>*/}
          </CardContent>
        </CardActionArea>
    </Card>
  )

  const votelist = (
    <Box className = "team-vote"
         sx={{ m: 4, width: '100%', maxWidth: 700 }}>
        <Typography display= 'inline' variant="h3" component="div" sx={{ width: '100%', textAlign: "left" }}>
            <HowToVoteIcon sx={{ mx: 1 }} fontSize="large"/> Vote
            <Grid container justifyContent="flex-end">
              <Button variant="contained" color="success" >
                Create Vote
              </Button>
            </Grid>
        </Typography>
        <List className = "team-vote-list" sx = {{m: 2, width: '100%', display: "block"}}>
            {votes.map(vote => <ListItem button key = {vote.id} component="div" sx = {{width: '100%', maxHeight: 400 }}>
                                    {vote.act ? ActVote(vote): EndVote(vote)}
                                  </ListItem>)}
        </List>
      </Box>
  )

  return (
    <div className="Wrapper">
        <Template content={votelist} />
     </div>
  );

};

export default TeamVote