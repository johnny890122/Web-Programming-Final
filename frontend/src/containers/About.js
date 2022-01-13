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
    <Typography style={{textAlign: "center"}} mt={4} variant="h3"> About App </Typography>

    <div>Some 描述</div> 

    <Typography style={{textAlign: "center"}} mt={4} variant="h3"> About Us </Typography>

    <div className="box-container" style={{ display: "flex", width: "80vw", alignItems:'center',justifyContent:'center' }}>
        <List className="card-content" style={{margin: "2em"}}>
            <ListItem button>
              <Avatar src="https://joeschmoe.io/api/v1/random" size={150} />
            </ListItem>
            <ListItemText primary={123} secondary={123}/>
        </List>

        <List className="card-content" style={{margin: "2em"}}>
            <ListItem button>
              <Avatar src="https://joeschmoe.io/api/v1/random" size={150} />
            </ListItem>
            <ListItemText primary={123} secondary={123}/>
        </List>

        <List className="card-content" style={{margin: "2em"}}>
            <ListItem button>
              <Avatar src="https://joeschmoe.io/api/v1/random" size={150} />
            </ListItem>
            <ListItemText primary={123} secondary={123}/>
        </List>
    </div>

    <Typography style={{textAlign: "center"}} mt={4} variant="h3"> Powered by </Typography>

    <div style={{ display: "flex"}}>
          <ListItem className="card-content">
            <FaReact size={40} />
          </ListItem >
          <ListItem className="card-content">
            <SiMongodb size={40} />
          </ListItem>
          <ListItem className="card-content">
            <GrGraphQl size={40} />
          </ListItem>
          <ListItem className="card-content">
           <DiNodejs size={40} / >
          </ListItem>
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
