import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Template from "../components/Template";
import { Typography } from "@mui/material";
import { MilitaryTech } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { USER_ACHEIEVEMENT_INIT } from "../graphql";
import { useState, useEffect } from "react";

const UserAchievement = (props) => {
  const cardStyle = {
    width: "95%",
    margin: "1em",
    padding: "1rem",
    textAlign: "center",
    display: "inline-block",
  };

  const { data, error, loading, subscribeToMore } = useQuery(
    USER_ACHEIEVEMENT_INIT,
    {
      variables: { userID: props.me },
    }
  );

  const achieveTitle = [];
  const achieveContent = [];
  if (!loading) {
    if (data) {
      data.initUserAchievement.map((i) =>
        achieveTitle.push(i.userAchievementTitle)
      );
      data.initUserAchievement.map((i) =>
        achieveContent.push(i.userAchievementContent)
      );
    }
  }

  let cardContent = [];
  for (let i = 0; i < achieveTitle.length; i++) {
    cardContent.push(
      <div className="card-content">
        <MilitaryTech sx={{ fontSize: "5rem" }} />
        <Typography variant="h4">{achieveTitle[i]}</Typography>
        <br />
        <Typography>{achieveContent[i]}</Typography>
      </div>
    );
  }

  const achievement = (
    <div className="box-container" style={{ display: "flex", width: "80vw" }}>
      {cardContent.map((aCard) => (
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined" style={cardStyle}>
            {aCard}
          </Card>
        </Box>
      ))}
    </div>
  );

  return (
    <div className="Wrapper">
      <Template content={achievement} />
    </div>
  );
};

export default UserAchievement;
