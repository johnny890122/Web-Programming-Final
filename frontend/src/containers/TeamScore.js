import React, { useState } from "react";
import Template from "../components/Template";
import {
  Box,
  ListItem,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Button,
} from "@mui/material";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Popconfirm,
} from "antd";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import {
  TEAM_SCORE_INIT,
  CREATE_TEAM_SCORE,
  UPDATE_CONTEST,
  DELETE_CONTEST,
} from "../graphql";
import { useQuery, useMutation } from "@apollo/client";

function Score(props) {
  const CONTEST_KEY = "";
  localStorage.setItem(CONTEST_KEY, "");

  let breadItem = window.location.href
    .replace("http://localhost:3000", "")
    .split("/");
  breadItem.shift();

  const teamScore = useQuery(TEAM_SCORE_INIT, {
    variables: { teamID: props.nowTeam },
    fetchPolicy: "cache-and-network",
  });
  const ScoreData = [];
  if (!teamScore.loading) {
    console.log(teamScore.data.initContest);
    teamScore.data.initContest.map((i) =>
      ScoreData.push({
        contestID: i.contestID,
        contestTitle: i.contestTitle,
        contestOpponent: i.contestOpponent,
        contestDate: i.contestDate, //new Date(i.contestDate).toDateString(),
        contestMySet: i.contestMySet,
        contestOppoSet: i.contestOppoSet,
        contestIsWin: i.contestIsWin,
      })
    );
  }

  const WinOption = [
    { label: "win", value: "win" },
    { label: "lose", value: "lose" },
    { label: "tie", value: "tie" },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentInModal, setComponentInModal] = useState("");
  const [addContest] = useMutation(CREATE_TEAM_SCORE, {
    refetchQueries: [TEAM_SCORE_INIT, "initContest"],
  });
  const [removeContest] = useMutation(DELETE_CONTEST, {
    refetchQueries: [TEAM_SCORE_INIT, "initContest"],
  });

  const handleCreate = () => {
    setIsModalVisible(true);
    setComponentInModal(scoreForm);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const cancel = (e) => {
    console.log("cancel");
  };

  const onCreate = async (values) => {
    setIsModalVisible(false);
    const newContest = await addContest({
      variables: {
        teamID: props.nowTeam,
        contestDate: values.contestDate.format("YYYY/MM/DD"),
        contestIsWin: values.contestIsWin,
        contestTitle: values.contestTitle,
        contestOpponent: values.contestOpponent,
        contestMySet: values.contestMySet || 0,
        contestOppoSet: values.contestOppoSet || 0,
      },
    });
  };
  const onDelete = async (score) => {
    console.log(score.contestID);
    const deleteContest = await removeContest({
      variables: {
        teamID: props.nowTeam,
        contestID: score.contestID,
      },
    });
  };

  const scoreForm = () => {
    return (
      <Form
        name="create-contest-form"
        onFinish={onCreate}
        autoComplete="off"
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <Form.Item
          label="比賽名稱"
          name="contestTitle"
          rules={[{ required: true, message: "必填比賽名稱" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="比賽日期"
          name="contestDate"
          rules={[{ required: true, message: "必填比賽日期" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="比賽輸贏"
          name="contestIsWin"
          style={{ width: 200 }}
          rules={[{ required: true, message: "必填比賽輸贏" }]}
        >
          <Select options={WinOption} />
        </Form.Item>
        <Form.Item
          label="對手名稱"
          name="contestOpponent"
          rules={[{ required: true, message: "必填對手名稱" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="我方局數" name="contestMySet">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="對方局數" name="contestOppoSet">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const scoreModal = (
    <Modal
      title="Score"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={
        <Button key="ok" onClick={handleCancel}>
          Cancel
        </Button>
      }
    >
      {componentInModal}
    </Modal>
  );

  return (
    <Box className="team-score" style={{ marginLeft: "1rem" }}>
      {scoreModal}
      <div
        className="createBox-container"
        style={{ display: "flex", width: "80vw", marginLeft: "1rem" }}
      >
        <Button variant="outlined" color="success" onClick={handleCreate}>
          Create
        </Button>
      </div>
      <div className="teamScore-container" style={{ marginTop: "1rem" }}>
        {ScoreData.map((score) => (
          <ListItem key={score.contestID} sx={{ width: 1400 }}>
            <Link
              to={{
                pathname: `/team/${breadItem[1]}/Score/${score.contestTitle}/detail`,
              }}
              onClick={() => {
                let cID = score.contestID;
                localStorage.setItem("CONTEST_KEY", cID);
                console.log("now in contest:", score.contestTitle, cID);
              }}
            >
              <Card>
                <CardActionArea sx={{ width: 800, height: 140 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      display="inline"
                      variant="h5"
                      component="div"
                      style={{ margin: "0 1rem" }}
                    >
                      [ {score.contestTitle} ]
                    </Typography>
                    <Typography
                      display="inline"
                      variant="h5"
                      component="div"
                      style={{ margin: "0 2rem" }}
                    >
                      {decodeURI(breadItem[1])}
                    </Typography>
                    <Typography
                      display="inline"
                      variant="h5"
                      component="div"
                      style={{ margin: "0 1rem" }}
                    >
                      {score.contestMySet} - {score.contestOppoSet}
                    </Typography>
                    <Typography
                      display="inline"
                      variant="h5"
                      component="div"
                      style={{ margin: "0 2rem" }}
                    >
                      {score.contestOpponent}
                    </Typography>
                    <Typography
                      display="inline"
                      variant="subtitle1"
                      component="div"
                      style={{ margin: "0 2rem" }}
                    >
                      {score.contestDate}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
            <Popconfirm
              title="Are you sure to delete this contest?"
              onConfirm={() => onDelete(score)}
              onCancel={() => cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlineOutlinedIcon
                style={{
                  marginLeft: "1.25rem",
                  fontSize: "2rem",
                  color: "red",
                  cursor: "pointer",
                }}
              />
            </Popconfirm>
          </ListItem>
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
