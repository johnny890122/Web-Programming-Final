import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Template from "../components/Template";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const UserTeam = () => {
  const cardStyle = {
    width: "95%",
    margin: "1em",
    padding: "1rem",
    display: "inline-block",
  };

  let teamName = [
    "Web Programming 110-1 Project",
    "NTU ECON Volley",
    "DSSI 110-1 Project",
  ];
  let teamDes = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci vero quis consectetur ratione voluptate pariatur possimus nam aliquid. Velit,quae.",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate ad repellat dolor quae eum ullam qui laudantium ut accusamus rem?",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius rerum reiciendis asperiores. Expedita quae accusantium earum porro nostrum. Totam, provident res.",
  ];
  let cardContent = [null, null, null];
  for (let i = 0; i < teamName.length; i++) {
    cardContent[i] = (
      <div className="card-content">
        <Typography variant="h5">{teamName[i]}</Typography>
        <br />
        <Typography>{teamDes[i]}</Typography>
      </div>
    );
  }

  const team = (
    <NavLink to="/team/Home">
      <div className="box-container" style={{ display: "flex", width: "85vw" }}>
        {cardContent.map((aCard) => (
          <Box sx={{ minWidth: 300 }}>
            <Card variant="outlined" style={cardStyle}>
              {aCard}
            </Card>
          </Box>
        ))}
      </div>
    </NavLink>
  );

  return (
    <div className="Wrapper">
      <Template content={team} />
    </div>
  );
};

export default UserTeam;
