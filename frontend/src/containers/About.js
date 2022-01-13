import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Template from "../components/Template";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { MilitaryTech } from "@mui/icons-material";
import {useQuery} from "@apollo/client";
import { USER_ACHEIEVEMENT_INIT } from "../graphql";
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { GrGraphQl } from "react-icons/gr";
import { SiMongodb } from "react-icons/si";
import { DiNodejs } from "react-icons/di";

import { Avatar } from 'antd';

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
    <div className="box-container" style={{width: "80vw"}}>
      <Typography style={{textAlign: "center"}} mt={4} variant="h5"> 管東管西，管好你的球隊大小事！ </Typography>
    </div>

    <Typography mt={4} variant="h4"> About Us </Typography>

    <div className="box-container" style={{ display: "flex", width: "80vw", alignItems:'center',justifyContent:'center' }}>
        <List className="card-content" style={{margin: "2em"}}>
            <ListItem button>
              <Avatar src="https://joeschmoe.io/api/v1/Johnny" size={160} />
            </ListItem>
            <Typography style={{textAlign: "center"}} mt={4} variant="h5"> Johnny </Typography>
        </List>

        <List className="card-content" style={{margin: "2em"}}>
            <ListItem button>
              <Avatar src="https://joeschmoe.io/api/v1/Yogo" size={160} />
            </ListItem>
            <Typography style={{textAlign: "center"}} mt={4} variant="h5"> Yoga </Typography>
        </List>

        <List className="card-content" style={{margin: "2em"}}>
            <ListItem button>
              <Avatar src="https://joeschmoe.io/api/v1/jeri" size={160} />
            </ListItem>
            <Typography style={{textAlign: "center"}} mt={4} variant="h5"> Money </Typography>
        </List>
    </div>


    <Typography mt={4} variant="h4"> Powered By </Typography>
          <DiNodejs size={90} style={{display: "block"}} />

          <FaReact size={40} style={{margin: "1em"}}/>
          <GrGraphQl size={40} style={{margin: "1em"}} />
          <SiMongodb size={40} style={{margin: "1em"}} />
    </>
  );

  return (
    <div className="Wrapper">
      <Template content={about} />
    </div>
  );
};

export default About;
