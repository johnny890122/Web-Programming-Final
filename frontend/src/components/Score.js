import { ScoreData } from "./ListData";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Score() {
  return (
    <NavLink to="/team/Score/detail">
      <div className="team-score">
        <h2>Team Score</h2>
        <List className="team-score-list">
          {ScoreData.map((score) => (
            <ListItem button key={score.id}>
              <ListItemText
                primary={`${score.date} : ${score.win}`}
                secondary={
                  <>
                    <Typography>
                      {" "}
                      {score.team} vs {score.opponent}{" "}
                    </Typography>
                    <Typography>
                      {" "}
                      {score.teamSet} : {score.oppoSet}{" "}
                    </Typography>
                  </>
                }
              />{" "}
            </ListItem>
          ))}
        </List>
      </div>
    </NavLink>
  );
}
