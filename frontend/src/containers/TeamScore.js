import React from "react";
import Template from "../components/Template";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { Form, Input, Modal } from "antd";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ChangeHistoryTwoToneIcon from "@mui/icons-material/ChangeHistoryTwoTone";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Link } from "react-router-dom";
import { TEAM_SCORE_INIT } from "../graphql";
import { useQuery } from "@apollo/client";

function Score(props) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  let breadItem = window.location.href
    .replace("http://localhost:3000", "")
    .split("/");
  breadItem.shift();

  const teamScore = useQuery(TEAM_SCORE_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const ScoreData = [];
  if (!teamScore.loading) {
    teamScore.data.initContest.map((i) =>
      ScoreData.push({
        id: i.contestID,
        title: i.contestTitle,
        opponent: i.contestOpponent,
        date: i.contestDate,
        mySet: i.contestMySet,
        oppoSet: i.contestOppoSet,
      })
    );
  }

  // const winScore = (score) => (
  //   <Typography display="inline" variant="h5" component="div">
  //     <CircleOutlinedIcon /> {score.mySet} - {score.oppoSet} <CircleIcon />
  //   </Typography>
  // );

  // const loseScore = (score) => (
  //   <Typography display="inline" variant="h5" component="div">
  //     <CircleIcon /> {score.mySet} - {score.oppoSet} <CircleOutlinedIcon />
  //   </Typography>
  // );

  // const tieScore = (score) => (
  //   <Typography display="inline" variant="h5" component="div">
  //     <ChangeHistoryTwoToneIcon /> {score.mySet} - {score.oppoSet}{" "}
  //     <ChangeHistoryTwoToneIcon />
  //   </Typography>
  // );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const scoreForm = (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>

      <Form.Item label="Content" name="content">
        <Input.TextArea size="large" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  const scoreModal = (
    <Modal title="Score" visible={isModalVisible} onCancel={handleCancel} 
           footer={<Button key="ok" onClick={handleCancel}>
                      Cancel
                   </Button>}>
      {scoreForm}
    </Modal>
  );

  return (
    <Box className="team-score" style={{ marginLeft: "1rem" }}>
      {scoreModal}
      <div className="createBox-container" 
           style={{ display: "flex", width: "80vw", marginLeft: "1rem"}}>
        <Button variant="outlined" color="success" onClick={showModal}>
          Create
        </Button>
      </div>
      <div className="teamScore-container" 
           style={{ marginTop: "1rem", }}>
        {ScoreData.map((score) => (
          <Link to={{ pathname: `/team/${breadItem[1]}/Score/${score.title}/detail`}}>
            <ListItem button key={score.id} sx={{ width: 700 }}>
              <Card>
                <CardActionArea sx={{ width: 700 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ m: 1, p: 1 }} style={{ position: "relative" }}>
                      <Typography display="inline" variant="h5" component="div">
                        {decodeURI(breadItem[1])}
                      </Typography>
                      <Typography
                        display="inline"
                        variant="h5"
                        component="div"
                        style={{ margin: "0 2rem" }}
                      >
                        {score.mySet} - {score.oppoSet}
                      </Typography>
                      {/* {score.win === "win"
                        ? winScore(score)
                        : score.win === "lose"
                        ? loseScore(score)
                        : tieScore(score)} */}
                      <Typography display="inline" variant="h5" component="div">
                        {score.opponent}
                      </Typography>
                      <Typography display="inline" variant="subtitle1" component="div"
                                  style={{position: "absolute",right: "2rem"}}>
                        {/* <EventNoteIcon sx={{ mx: 1, my: 0 }} />  */}
                        {score.date}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItem>
          </Link>
        ))}
      </div>
    </Box>
  );
}

const TeamScore = (props) => {
  let teamScore = <Score nowTeam={props.nowTeam} />;

  return (
    <div className="Wrapper">
      <Template content={teamScore} />
    </div>
  );
};

export default TeamScore;
