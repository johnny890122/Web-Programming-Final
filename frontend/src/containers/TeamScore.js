import React, { useState } from "react";
import Template from "../components/Template";
import { Box, Grid, List, ListItem, Typography, Card, CardActionArea, CardContent,} from "@mui/material";
import { Row, Col, Modal, Form, Input, Button, Space, InputNumber, Select, DatePicker } from 'antd';
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ChangeHistoryTwoToneIcon from "@mui/icons-material/ChangeHistoryTwoTone";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { Link } from "react-router-dom";
import { TEAM_SCORE_INIT, CREATE_TEAM_SCORE } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";

function Score(props) {
  
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
        date: i.contestDate,//new Date(i.contestDate).toDateString(),
        mySet: i.contestMySet,
        oppoSet: i.contestOppoSet,
      })
    );
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentInModal, setComponentInModal] = useState("");
  const [addContest] = useMutation(CREATE_TEAM_SCORE, {refetchQueries: [ TEAM_SCORE_INIT, "initContest" ]});
  
  

  const handleCreate = () => {
    setIsModalVisible(true);
    setComponentInModal(scoreForm)
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onCreate = async(values) => {
    //console.log(values.contestDate.format('YYYY/MM/DD'));
    const newContest = await addContest(
      {variables: {
        teamID: props.nowTeam,
        contestDate: values.contestDate.format('YYYY/MM/DD'),
        contestIsWin: values.contestIsWin,
        contestTitle: values.contestTitle,
        contestOpponent: values.contestOpponent,
        contestMySet: values.contestMySet || 0,
        contestOppoSet: values.contestOppoSet || 0,
      }});
    //setIsModalVisible(true);
  };

  const scoreForm = () => {

    const WinOption = [
      {label: "win", value: "win"},
      {label: "lose", value: "lose"},
      {label: "tie", value: "tie"}
    ];

    return (
      <Form name="create-contest-form" onFinish={onCreate} autoComplete="off">
          <Form.Item label="比賽名稱"
                    name='contestTitle'
                    rules={[{ required: true, message: '必填比賽名稱' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="比賽日期"
                    name='contestDate'
                    rules={[{ required: true, message: '必填比賽日期' }]}>
                <DatePicker />
          </Form.Item>
          <Form.Item label="比賽輸贏"
                    name='contestIsWin'
                    style={{ width: 200 }}
                    rules={[{ required: true, message: '必填比賽輸贏' }]}>
            <Select options={WinOption}/>
          </Form.Item>
          <Form.Item label="對手名稱"
                    name='contestOpponent'
                    rules={[{ required: true, message: '必填對手名稱' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="我方局數"
                    name='contestMySet'>
                <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="對方局數"
                    name='contestOppoSet'>
                <InputNumber min={0}/>
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
      {componentInModal}
    </Modal>
  );

  return (
    <Box className="team-score" style={{ marginLeft: "1rem" }}>
      {scoreModal}
      <div className="createBox-container" 
           style={{ display: "flex", width: "80vw", marginLeft: "1rem"}}>
        <Button variant="outlined" color="success" onClick={handleCreate}>
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
            <ListItem key={score.id} sx={{ width: 800 }}>
              <Card>
                <CardActionArea sx={{ width: 800, height: 140 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography display="inline" variant="h5" component="div" style={{ margin: "0 1rem" }}>
                          [ {score.title} ]
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
                    <Typography display="inline" variant="h5" component="div" style={{ margin: "0 2rem" }}>
                        {score.opponent}
                    </Typography>
                    <Typography display="inline" variant="subtitle1" component="div"
                                  style={{ margin: "0 2rem" }}>
                        {score.date}
                    </Typography>
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
