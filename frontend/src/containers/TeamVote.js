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
} from "@mui/material";
import { Modal, Tag } from "antd";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { CardActionArea } from "@mui/material";
import { TEAM_VOTE_INIT, TEAM_VOTE_OPTION_INIT } from "../graphql";
import { useQuery } from "@apollo/client";

/* 點擊vote進入detail頁面 */

function TeamVote(props) {
  const nowTime = Date.now();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalContent, setModalContent] = React.useState();
  const [voteToBeFetched, setVoteToBeFetched] = React.useState("");

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
        })
      );
    }
  }
  const options = useQuery(TEAM_VOTE_OPTION_INIT, {
    variables: {
      voteID: voteToBeFetched,
      // voteID: "19478c9a-4489-4951-89ec-660f4ec76c97",
    },
  });
  let OptionData = [];
  if (isModalVisible) {
    if (!options.loading) {
      if (options.data) {
        options.data.initVoteOption.map((i) =>
          OptionData.push({
            optionID: i.voteOptionID,
            optionName: i.voteOptionName,
          })
        );
      }
    }
  }

  const handleClose = () => {
    setIsModalVisible(false);
  };
  const handleOpen = (vote) => {
    setVoteToBeFetched(vote.id);
    setIsModalVisible(true);
    setModalTitle(vote.title);
    setModalContent(
      <>
        <Typography variant="h4">{vote.title}</Typography>
        <p style={{ marginBottom: "0.5rem", marginTop: "1rem" }}>
          {vote.description}
        </p>
        <Tag color="red">due: {vote.end}</Tag>
        <Tag color="blue">you have {vote.limit} tickets</Tag>
        <Button variant="outlined" color="success">
          Vote
        </Button>
        {OptionData.map((option) => (
          <p>{option.optionName}</p>
        ))}
      </>
    );
    console.log(voteToBeFetched);
    console.log(OptionData);
  };

  const EndVote = (vote) => (
    <Card sx={{ p: 1, width: "100%" }} key={vote.id}>
      <CardActionArea sx={{ width: "100%" }}>
        <CardContent>
          <Box>
            <Typography gutterBottom variant="h4" component="div">
              {vote.title}
            </Typography>
            <Chip label="已結束" size="large" />
          </Box>
          <Box sx={{ m: 1, mt: 2 }}>
            {/* <Typography gutterBottom variant="subtitle1" component="div">
              結果 : {vote.result.name} {vote.result.count} 票
            </Typography> */}
            <Typography gutterBottom variant="subtitle2" component="div">
              <AccessTimeFilledIcon sx={{ fontSize: "small" }} /> {vote.end}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  const ActVote = (vote) => (
    <Card sx={{ p: 1, width: "100%" }}>
      <CardActionArea sx={{ width: "100%" }}>
        <CardContent>
          <Box>
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
          </Box>
          <Box sx={{ m: 1 }}>
            <Typography gutterBottom variant="subtitle1" component="div">
              {!vote.limit ? "一人多票" : `一人${vote.limit}票`}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              <AccessTimeFilledIcon sx={{ fontSize: "small" }} /> {vote.end}
            </Typography>
          </Box>
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
    <div className="vote-container">
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
      <div
        className="createBox-container"
        style={{
          display: "flex",
          width: "80vw",
          marginLeft: "1rem",
        }}
      >
        <Button variant="outlined" color="success">
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
        <List className="team-vote-list" sx={{ width: "100%" }}>
          {VoteData.map((vote) => (
            <ListItem
              button
              key={vote.id}
              component="div"
              sx={{ width: "40%", maxHeight: 400 }}
              onClick={() => handleOpen(vote)}
            >
              {new Date(vote.end).getTime() > nowTime
                ? ActVote(vote)
                : EndVote(vote)}
            </ListItem>
          ))}
        </List>
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
