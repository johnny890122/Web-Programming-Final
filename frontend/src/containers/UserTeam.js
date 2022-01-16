import Template from "../components/Template";
import { TeamData } from "../components/ListData";
import { Typography, Box, Card, Button, CardContent } from "@mui/material";
import ButtonBase from "@material-ui/core/ButtonBase";
import { CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TEAM_INIT } from "../graphql";
import { useQuery } from "@apollo/client";

const cardStyle = {
  width: "95%",
  margin: "1em",
  padding: "1rem",
  display: "inline-block",
};

function UserTeam(props) {
  const { data, error, loading, subscribeToMore } = useQuery(TEAM_INIT, {
    variables: { userID: props.me },
  });

  const AllTeamData = [];
  try {
    console.log(data);
    data.initTeam.map((i) =>
      AllTeamData.push({
        id: i.teamID,
        name: i.teamName,
        description: i.teamDescription,
        type: i.teamType,
      })
    );
  } catch (e) {}

  const TEAM_KEY = "nowTeam";

  const teamlist = (
    <div className="user-team-list">
      <div
        className="createBox-container"
        style={{
          display: "flex",
          width: "80vw",
          marginLeft: "1rem",
        }}
      >
        <Link to="/team/Create">
          <Button variant="outlined" color="success">
            Create
          </Button>
        </Link>
      </div>

      <div
        className="teamBox-container"
        style={{
          display: "flex",
          width: "90vw",
          marginTop: "1rem",
          flexWrap: "wrap",
        }}
      >
        {AllTeamData.map((team) => (
          <Link
            to={{ pathname: `/team/${team.name}/Home` }}
            onClick={() => {
              console.log("now in team:", team.id);
              localStorage.setItem(TEAM_KEY, team.id);
            }}
          >
            <Card style={cardStyle} key={team.id}>
              <CardActionArea
                sx={{ width: 300, height: 150, display: "inline" }}
              >
                {/* 連結隊伍頁面 */}
                <CardContent>
                  <Typography variant="h4">{team.name}</Typography>
                  {/* <Typography variant="p" color="text.secondary">
                    身份 : {team.status}
                  </Typography> */}
                  <br />
                  <p style={{ color: "#808080" }}>
                    {team.description}
                    <br />
                    {team.type}
                  </p>
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
