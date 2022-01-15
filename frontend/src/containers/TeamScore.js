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
  const CONTEST_KEY = "nowContest";

  let breadItem = window.location.href
    .replace("http://localhost:3000", "")
    .split("/");
  breadItem.shift();

  const teamScore = useQuery(TEAM_SCORE_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const ScoreData = [];
  if (!teamScore.loading) {
    console.log(teamScore.data.initContest)
    teamScore.data.initContest.map((i) =>
      ScoreData.push({
        id: i.contestID,
        title: i.contestTitle,
        opponent: i.contestOpponent,
        date: new Date(i.contestDate).toDateString(),
        mySet: i.contestMySet,
        oppoSet: i.contestOppoSet,
      })
    );
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const scoreForm = () => {

    return (
      <Form name="dynamic_form_nest_item" onFinish={onCreate} autoComplete="off">
        <Row>
          <Form.Item label="局數"
                    name='setNumber'
                    rules={[{ required: true, message: '必填局數' }]}>
                <InputNumber min={1}/>
          </Form.Item>
          <Form.Item label="我方得分"
                    name='setMyPoint'
                    rules={[{ required: true, message: '必填我方得分' }]}>
                <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="對方得分"
                    name='setOppoPoint'
                    rules={[{ required: true, message: '必填對方得分' }]}>
          <InputNumber min={0}/>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label="對方發球失誤"
                    name='setOppoErrServe'>
                <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="對方攻擊失誤"
                    name='setOppoErrAttack'>
                <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="對方處理失誤"
                    name='setOppoErrOther'>
                <InputNumber min={0}/>
          </Form.Item>
        </Row>
        <Form.Item label="備註"
                   name='setNote'
                    >
              <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="得分紀錄"
                   name='setScore'
                    >
              <Input placeholder="ex : oxoox ( 我方得分 : o ，對方得分 : x )"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  };

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
          <Link to={{ pathname: `/team/${breadItem[1]}/Score/${score.title}/detail`}}
                onClick={() => {
                  console.log("now in contest:", score.id);
                  localStorage.setItem(CONTEST_KEY, score.id);
                }}>
            <ListItem button key={score.id} sx={{ width: 700 }}>
              <Card>
                <CardActionArea sx={{ width: 700 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ m: 1, p: 3 }} style={{ position: "relative" }}>
                      <Typography display="inline" variant="h5" component="div" style={{ margin: "0 1rem" }}>
                        {score.title}
                      </Typography>
                      <Typography display="inline" variant="h5" 
                                  component="div" style={{ margin: "0 2rem" }}>
                        {decodeURI(breadItem[1])}
                      </Typography>
                      <Typography
                        display="inline"
                        variant="h5"
                        component="div"
                        style={{ margin: "0 1rem" }}>
                        {score.mySet} - {score.oppoSet}
                      </Typography>
                      {/* {score.win === "win"
                        ? winScore(score)
                        : score.win === "lose"
                        ? loseScore(score)
                        : tieScore(score)} */}
                      <Typography display="inline" variant="h5" component="div" style={{ margin: "0 2rem" }}>
                        {score.opponent}
                      </Typography>
                      <Typography display="inline" variant="subtitle1" component="div"
                                  style={{ margin: "0 2rem" }}>
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
