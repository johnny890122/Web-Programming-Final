import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Template from "../components/Template";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { MilitaryTech } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { USER_ACHEIEVEMENT_INIT } from "../graphql";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { GrGraphQl } from "react-icons/gr";
import {
  SiCss3,
  SiMongodb,
  SiMaterialui,
  SiApollographql,
} from "react-icons/si";
import { DiNodejs } from "react-icons/di";
import { AiOutlineAntDesign } from "react-icons/ai";
import { IoLogoHtml5, IoLogoCss3, IoLogoJavascript } from "react-icons/io5";

import { Avatar } from "antd";

const About = (props) => {
  const cardStyle = {
    width: "95%",
    margin: "1em",
    padding: "1rem",
    textAlign: "center",
    display: "inline-block",
  };

  const about = (
    <>
      <div className="box-container" style={{ width: "80vw" }}>
        <Typography style={{ textAlign: "center" }} mt={1} variant="h4">
          管東管西，管好你的球隊大小事！{" "}
        </Typography>
      </div>

      <Typography mt={2} variant="h5">
        {" "}
        About Us{" "}
      </Typography>

      <div
        className="box-container"
        style={{
          display: "flex",
          width: "80vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <List className="card-content" style={{ margin: "2em" }}>
          <ListItem button>
            <Avatar src="https://joeschmoe.io/api/v1/Johnny" size={160} />
          </ListItem>
          <Typography style={{ textAlign: "center" }} mt={2} variant="h6">
            Johnny{" "}
          </Typography>
        </List>

        <List className="card-content" style={{ margin: "2em" }}>
          <ListItem button>
            <Avatar src="https://joeschmoe.io/api/v1/Yogo" size={160} />
          </ListItem>
          <Typography style={{ textAlign: "center" }} mt={2} variant="h6">
            Yoga{" "}
          </Typography>
        </List>

        <List className="card-content" style={{ margin: "2em" }}>
          <ListItem button>
            <Avatar src="https://joeschmoe.io/api/v1/jeri" size={160} />
          </ListItem>
          <Typography style={{ textAlign: "center" }} mt={2} variant="h6">
            Lynn{" "}
          </Typography>
        </List>
      </div>

      <Typography mt={2} variant="h5">
        Powered By{" "}
      </Typography>

      <div
        className="logo-container"
        style={{
          height: "5rem",
          margin: "1rem 5rem 2rem 5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IoLogoHtml5 size={40} />
        <IoLogoCss3 size={40} />
        <IoLogoJavascript size={40} />
        <FaReact size={40} />
        <SiMaterialui size={40} />
        <AiOutlineAntDesign size={40} />
        <DiNodejs size={90} />
        <SiMongodb size={40} />
        <GrGraphQl size={40} />
        <SiApollographql size={40} />
      </div>
    </>
  );

  return (
    <div className="Wrapper">
      <Template content={about} />
    </div>
  );
};

export default About;
