import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Template from "../components/Template";
import { Typography } from "@mui/material";
import { MilitaryTech } from "@mui/icons-material";

const UserAchievement = () => {
  const cardStyle = {
    width: "95%",
    margin: "1em",
    padding: "1rem",
    textAlign: "center",
    display: "inline-block",
  };

  let achieveTitle = ["練球一年全勤", "連續30天登入"];
  let achieveContent = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci vero quis consectetur ratione voluptate pariatur possimus nam aliquid. Velit,quae.",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate ad repellat dolor quae eum ullam qui laudantium ut accusamus rem?",
  ];
  let cardContent = [null, null];
  for (let i = 0; i < achieveTitle.length; i++) {
    cardContent[i] = (
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
