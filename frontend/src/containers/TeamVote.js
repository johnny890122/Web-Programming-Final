import React from "react";
import Template from "../components/Template";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  Box,
  Button,
  Grid,
  CardContent,
  Chip,
  TextField,
} from "@mui/material";
import { Modal, Tag, DatePicker } from "antd";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { CardActionArea } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  TEAM_VOTE_INIT,
  CREATE_TEAM_VOTE,
  CREATE_TEAM_VOTE_OPTION,
} from "../graphql";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

const cardStyle = {
  width: "45%",
  margin: "1em",
  padding: "1rem",
  display: "inline-block",
};

/* 點擊vote進入detail頁面 */

function TeamVote(props) {
  const dateFormat = "YYYY/MM/DD";
  let nowTime = Date.now();
  let now = new Date();
  let sevenDaysLater = new Date(now);
  sevenDaysLater.setDate(now.getDate() + 7);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isCreateModal1Visible, setIsCreateModal1Visible] =
    React.useState(false);
  const [isCreateModal2Visible, setIsCreateModal2Visible] =
    React.useState(false);

  const [modalContent, setModalContent] = React.useState();

  const [newTitle, setNewTitle] = React.useState("");
  const [newLimit, setNewLimit] = React.useState();
  const [newDescription, setNewDescription] = React.useState("");
  const [endDate, setEndDate] = React.useState();
  const [endTime, setEndTime] = React.useState();

  const votes = useQuery(TEAM_VOTE_INIT, {
    variables: {
      teamID: props.nowTeam,
    },
  });
  const VoteData = [];
  if (!votes.loading) {
    if (votes.data) {
      votes.data.initVote.map((i) =>
        VoteData.push({
          id: i.voteID,
          title: i.voteTitle,
          description: i.voteDescription,
          end: i.voteEnd,
          limit: i.voteLimit,
          voteOption: i.voteOption,
        })
      );
    }
  }
  const [createVote, { data, loading, error }] = useMutation(CREATE_TEAM_VOTE, {
    refetchQueries: [TEAM_VOTE_INIT, "initVote"],
  });

  const handleClose = () => {
    setIsModalVisible(false);
  };
  const handleOpen = (vote) => {
    setIsModalVisible(true);
    setModalContent(
      <>
        <Typography variant="h4">{vote.title}</Typography>
        <div className="tags" style={{ marginTop: "0.75rem" }}>
          <Tag color="gold">{vote.description}</Tag>
          <Tag color="red">due at {vote.end}</Tag>
          <Tag color="blue">vote up to {vote.limit} options</Tag>
        </div>
        <FormGroup style={{ marginTop: "0.75rem" }}>
          {vote.voteOption.map((option) => (
            <FormControlLabel
              control={<Checkbox size="medium" />}
              label={option.voteOptionName}
            />
          ))}
        </FormGroup>
      </>
    );
  };
  const handleOpenCreate = () => {
    setIsCreateModal1Visible(true);
  };
  const handleSubmitCreate = async () => {
    let tempDate = endDate.toDateString();
    let tempTime = endTime.toTimeString();
    console.log(tempDate);
    console.log(tempTime);
    let endDay = endDate.toDateString() + " " + endTime.toTimeString();
    await createVote({
      variables: {
        voteTitle: newTitle,
        voteDescription: newDescription,
        voteEnd: new Date(endDay).toDateString(),
        voteLimit: newLimit,
        teamID: props.nowTeam,
        creatorID: props.me,
      },
    });
    setNewTitle("");
    setNewDescription("");
    setNewLimit();
    setEndDate(sevenDaysLater);
    setEndTime(sevenDaysLater);
    if (!loading) console.log(data.voteID);
    setIsCreateModal1Visible(false);
    setIsCreateModal2Visible(true);
  };

  const handleSubmitCreateOption = () => {
    setIsCreateModal2Visible(false);
  };

  const modalCreateContent = (
    <>
      <div className="left-right" style={{ display: "flex", flexGrow: "1" }}>
        <div className="left" style={{ width: "15rem" }}>
          <TextField
            label="Title"
            size="small"
            style={{ margin: "0.5rem", width: "15rem" }}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            label="Vote Limit"
            size="small"
            style={{ margin: "0.5rem", width: "15rem" }}
            onChange={(e) => setNewLimit(parseInt(e.target.value))}
          />
        </div>
        <div className="right" style={{ marginLeft: "1rem" }}>
          <TextField
            label="Description"
            size="small"
            multiline
            rows={4}
            style={{ margin: "0.5rem", width: "15rem" }}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          id="end-date"
          label="End Date"
          value={endDate ? endDate : sevenDaysLater}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              style={{ margin: "0.5rem", width: "15rem" }}
            />
          )}
        />
        <TimePicker
          id="end-time"
          label="End Time"
          value={endTime ? endTime : sevenDaysLater}
          onChange={(newValue) => {
            setEndTime(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              style={{ margin: "0.5rem", width: "15rem" }}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );

  const modalCreateOptionContent = (
    <>
      <TextField
        label="Option 1"
        size="small"
        style={{ margin: "0.5rem" }}
        // onChange={(e) => setNewDescription(e.target.value)}
      />
    </>
  );

  const EndVote = (vote) => (
    <Card style={cardStyle} onClick={() => handleOpen(vote)}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {vote.title}
          </Typography>
          <Chip label="已結束" size="large" />
          {/* <Typography gutterBottom variant="subtitle1" component="div">
              結果 : {vote.result.name} {vote.result.count} 票
            </Typography> */}
          <Typography gutterBottom variant="subtitle2" component="div">
            <AccessTimeFilledIcon sx={{ fontSize: "small" }} /> {vote.end}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  const ActVote = (vote) => (
    <Card style={cardStyle} onClick={() => handleOpen(vote)}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {vote.title}
          </Typography>
          <Chip
            label="投票中"
            color="success"
            variant="outlined"
            size="large"
          />
          {/* {vote.replied ? (
              <Chip label="Replied" color="success" sx={{ m: 1 }} />
            ) : (
              <Chip label="Ureplied" color="error" sx={{ m: 1 }} />
            )} */}
          <Typography gutterBottom variant="subtitle1" component="div">
            {!vote.limit ? "一人多票" : `一人${vote.limit}票`}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            <AccessTimeFilledIcon sx={{ fontSize: "small" }} /> {vote.end}
          </Typography>
          {/*<Box sx={{ m:1, p: 1 }}>
              {vote.options.map(option => 
                  <Typography gutterBottom variant="body1" component="div" key = {option.id}>
                    {option.select ? <CheckBoxOutlineBlankIcon sx={{ fontSize: "small" }} />: <CheckBoxIcon sx={{ fontSize: "small" }} />} {option.name} : {option.count} 票
                  </Typography>)}
            </Box>*/}
        </CardContent>
      </CardActionArea>
    </Card>
  );

  const votelist = (
    <div className="vote-list">
      <Modal
        visible={isModalVisible}
        onCancel={handleClose}
        style={{ zIndex: 1200 }}
        footer={[
          <Button
            key="ok"
            variant="contained"
            onClick={handleClose}
            style={{ margin: "0 0.5rem" }}
          >
            OK
          </Button>,
        ]}
      >
        {modalContent}
      </Modal>
      <Modal
        visible={isCreateModal1Visible}
        title="Create a Vote"
        onCancel={() => setIsCreateModal1Visible(false)}
        style={{ zIndex: 1200 }}
        footer={[
          <Button
            key="ok"
            variant="contained"
            color="success"
            onClick={handleSubmitCreate}
            style={{ margin: "0 0.5rem" }}
          >
            Create
          </Button>,
        ]}
      >
        {modalCreateContent}
      </Modal>
      <Modal
        visible={isCreateModal2Visible}
        title="Add Some Options"
        onCancel={() => setIsCreateModal2Visible(false)}
        style={{ zIndex: 1200 }}
        footer={[
          <Button
            key="ok"
            variant="contained"
            color="success"
            onClick={handleSubmitCreateOption}
            style={{ margin: "0 0.5rem" }}
          >
            Complete
          </Button>,
        ]}
      >
        {modalCreateOptionContent}
      </Modal>
      <div
        className="createBox-container"
        style={{
          display: "flex",
          width: "80vw",
          marginLeft: "1rem",
        }}
      >
        <Button variant="outlined" color="success" onClick={handleOpenCreate}>
          Create
        </Button>
      </div>

      <div
        className="voteBox-container"
        style={{
          display: "flex",
          width: "90vw",
          marginTop: "1rem",
          flexWrap: "wrap",
        }}
      >
        {VoteData.map((vote) =>
          new Date(vote.end).getTime() > nowTime ? ActVote(vote) : EndVote(vote)
        )}
      </div>
    </div>
  );

  return (
    <div className="Wrapper">
      <Template content={votelist} />
    </div>
  );
}

export default TeamVote;
