import React from "react";
import Template from "../components/Template";
import {
  Typography,
  Card,
  Button,
  CardContent,
  TextField,
} from "@mui/material";
import { Modal, Tag, Form } from "antd";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CardActionArea } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  TEAM_VOTE_INIT,
  CREATE_TEAM_VOTE,
  CREATE_TEAM_VOTE_OPTION,
  REPLY_TEAM_VOTE,
  USER_NOTIFICATION_INIT
} from "../graphql";
import { useQuery, useMutation } from "@apollo/client";

const cardStyle = {
  width: "45%",
  margin: "1em",
  padding: "1rem",
  display: "inline-block",
};

/* 點擊vote進入detail頁面 */

function TeamVote(props) {
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
  const [endDate, setEndDate] = React.useState(sevenDaysLater);
  const [endTime, setEndTime] = React.useState(sevenDaysLater);
  const [newVoteID, setNewVoteID] = React.useState("");
  const [nowVote, setNowVote] = React.useState("");

  const [inputBoxes, setInputBoxes] = React.useState([1]);
  const [inputs, setInputs] = React.useState([]);

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

  const [createVote] = useMutation(CREATE_TEAM_VOTE, {
    refetchQueries: [TEAM_VOTE_INIT, USER_NOTIFICATION_INIT],
    onCompleted: (e) => setNewVoteID(e.createVote.voteID),
  });
  const [createVoteOption] = useMutation(CREATE_TEAM_VOTE_OPTION, {
    refetchQueries: [TEAM_VOTE_INIT, "initVote"],
    // onCompleted: (e) => setVoteOptionID(e.createVoteOption.voteOptionID),
  });
  const [replyVote] = useMutation(REPLY_TEAM_VOTE, {
    refetchQueries: [TEAM_VOTE_INIT, "initVote"],
  });

  const checkChecked = (voteOption) => {
    let checked = false;
    for (let i = 0; i < voteOption.votedUser.length; i++) {
      if (voteOption.votedUser[i].userID === props.me) {
        checked = true;
        return true;
      }
    }
    return false;
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };
  const handleOpen = (vote) => {
    setIsModalVisible(true);
    setNowVote(vote.id);
    setModalContent(
      <>
        <Typography variant="h4">{vote.title}</Typography>
        <div className="tags" style={{ marginTop: "0.75rem" }}>
          <p>{vote.description}</p>
          <Tag color="red">due at {vote.end}</Tag>
          <Tag color="blue">vote {vote.limit} options</Tag>
        </div>
        <FormGroup id="reply" style={{ marginTop: "0.75rem" }}>
          {vote.voteOption.map((option, index) => (
            <>
              <FormControlLabel
                control={
                  new Date(vote.end).getTime() > nowTime ? (
                    <Checkbox
                      size="medium"
                      value={option.voteOptionID}
                      defaultChecked={checkChecked(option) ? true : false}
                      onChange={(e) => handleReply(e)}
                    />
                  ) : (
                    <Checkbox
                      size="medium"
                      value={option.voteOptionID}
                      defaultChecked={checkChecked(option) ? true : false}
                      disabled={true}
                    />
                  )
                }
                label={
                  option.voteOptionName +
                  "  (" +
                  (option.votedUser ? option.votedUser.length : 0) +
                  " votes)"
                }
              />
            </>
          ))}
        </FormGroup>
      </>
    );
  };

  const handleReply = async (e) => {
    console.log("user", props.me, "vote for", e.target.value);
    await replyVote({
      variables: {
        voterID: props.me,
        voteOptionID: e.target.value,
      },
    });
  };

  const handleOpenCreate = () => {
    setIsCreateModal1Visible(true);
  };
  const handleSubmitCreate = async () => {
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
    setIsCreateModal1Visible(false);
    setIsCreateModal2Visible(true);
  };

  const handleAddBox = () => {
    let temp = JSON.parse(JSON.stringify(inputBoxes));
    temp.push(inputBoxes[inputBoxes.length - 1] + 1);
    setInputBoxes(temp);
  };
  const handleOptionInput = (index, value) => {
    let temp = JSON.parse(JSON.stringify(inputs));
    temp[index] = value;
    setInputs(temp);
  };

  const handleSubmitCreateOption = async () => {
    for (let i = 0; i < inputs.length; i++) {
      await createVoteOption({
        variables: {
          voteID: newVoteID,
          voteOptionName: inputs[i],
        },
      });
    }
    setNewTitle("");
    setNewDescription("");
    setNewLimit();
    setEndDate(sevenDaysLater);
    setEndTime(sevenDaysLater);
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
      {inputBoxes.map((box, index) => (
        <TextField
          id="options"
          value={inputs[index]}
          label={"Option " + box}
          size="small"
          style={{ margin: "0.5rem 1rem" }}
          onChange={(e) => handleOptionInput(index, e.target.value)}
        />
      ))}
      <Form style={{ marginBottom: "2rem" }}>
        <AddCircleOutlineSharpIcon
          style={{
            color: "green",
            fontSize: "2rem",
            margin: "1rem",
            cursor: "pointer",
          }}
          onClick={handleAddBox}
        />
      </Form>
    </>
  );

  const EndVote = (vote) => (
    <Card style={cardStyle} onClick={() => handleOpen(vote)}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {vote.title}
          </Typography>
          <p>{vote.description}</p>
          <Tag color="default">Ended</Tag>
          {/* <Typography gutterBottom variant="subtitle1" component="div">
              結果 : {vote.result.name} {vote.result.count} 票
            </Typography> */}
          <Tag color="red">due at {vote.end}</Tag>
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
          <p>{vote.description}</p>
          <Tag color="cyan">Ongoing</Tag>
          <Tag color="blue">vote {vote.limit} options</Tag>
          <Tag color="red">due at {vote.end}</Tag>
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
            onClick={() => setIsModalVisible(false)}
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
