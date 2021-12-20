import { ScoreData } from "./ListData";
import {
  Box,
  Button,
  Grid, 
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Link from '@material-ui/core/Link';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ChangeHistoryTwoToneIcon from '@mui/icons-material/ChangeHistoryTwoTone';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { NavLink } from "react-router-dom";

/* 連結detail頁面 */

function Score() {

  const myTeam = "ECON"

  const winScore = ((score) =>
    <Typography display="inline" variant="h4" component="div" sx= {{width: '30%', textAlign: "center"}}>
        <CircleOutlinedIcon /> {score.teamSet} - {score.oppoSet} <CircleIcon /> 
    </Typography>
  )

  const loseScore = ((score) =>
    <Typography display="inline" variant="h4" component="div" sx= {{width: '30%', textAlign: "center"}}>
        <CircleIcon /> {score.teamSet} - {score.oppoSet} <CircleOutlinedIcon /> 
    </Typography>
  )

  const tieScore = ((score) =>
    <Typography display="inline" variant="h4" component="div" sx= {{width: '30%', textAlign: "center"}}>
        <ChangeHistoryTwoToneIcon /> {score.teamSet} - {score.oppoSet} <ChangeHistoryTwoToneIcon /> 
    </Typography>
  )

  return (
    //<NavLink to="/team/Score/detail">
      <Box className="team-score"
           sx={{ m: 4, width: '100%', maxWidth: 700 }}>
        <Typography display= 'inline' variant="h3" component="div" sx={{ width: '100%', textAlign: "left" }}>
            <SportsScoreIcon sx={{ mx: 1 }} fontSize="large"/>Score
            <Grid container justifyContent="flex-end">
              <Button variant="contained" color="success" >
                Add Score
              </Button>
            </Grid>
        </Typography>
        <List className="team-score-list" sx = {{m: 2, width: '100%', display: "block"}}>
          {ScoreData.map((score) => (
            <ListItem button key={score.id} sx = {{my: 1, width: '100%', height: 80 }}

            /* 連結detail頁面 */
            
                      component={Link} to="/somelink">
              <Typography display="inline" variant="h4" component="div" sx= {{width: '20%', textAlign: "center"}}>
                {myTeam} 
              </Typography>
              {score.win === "win" ? winScore(score) :
                  (score.win === "lose" ? loseScore(score) :
                                          tieScore(score))}
              <Typography display="inline" variant="h4" component="div" sx= {{width: '20%', textAlign: "center"}}>
                {score.opponent} 
              </Typography>
              <Typography display="inline" variant="subtitle1" component="div" sx= {{width: '30%', textAlign: "right"}}>
                <EventNoteIcon sx={{ mx: 1 , my: 0}} /> {score.date} 
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    //</NavLink>
  );
}

export default Score;