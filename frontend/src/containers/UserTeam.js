import Template from "../components/Template";
import { TeamData } from "../components/ListData";
import { Typography, Box, Card, Button, CardContent } from "@mui/material";
import { CardActionArea, CardMedia } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

function UserTeam() {
  /*
    連結創建隊伍頁面、隊伍頁面 (下面改 href)
  */
  const cardStyle = {
    width: "95%",
    margin: "1em",
    padding: "1rem",
    display: "inline-block",
  };

  const teamlist = (
    <div className="user-team-list">
      <div
        className="createBox-container"
        style={{ display: "flex", width: "80vw" }}
      >
        <Link to="/team/Create">
          <Card style={cardStyle} key="0">
            <CardActionArea sx={{ width: 450, height: 100, display: "inline" }}>
              {/* 連結創建隊伍頁面 */}
              <CardContent sx={{ p: 4 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Create New Team
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>

      <div
        className="teamBox-container"
        style={{ display: "flex", width: "80vw" }}
      >
        {TeamData.map((team) => (
          <Link to={{ pathname: `/team/${team.teamname}/Home` }}>
            <Card style={cardStyle} key={team.id}>
              <CardActionArea
                sx={{ width: 450, height: 200, display: "inline" }}
              >
                {/* 連結隊伍頁面 */}

                <CardContent sx={{ p: 4 }}>
                  <Typography gutterBottom variant="h4" component="div">
                    {team.teamname}
                  </Typography>
                  <Typography variant="p" color="text.secondary">
                    身份 : {team.status}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    -- {team.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="Wrapper">
      <Template content={teamlist} />
    </div>
  );
}

export default UserTeam;
