import React from "react";
import Template from "../components/Template";
import { Typography, Box, Card, Button, CardContent } from "@mui/material";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShortTextIcon from "@mui/icons-material/ShortText";

import {
  TEAM_EVENT_INIT,
  TEAM_POST_INIT,
  TEAM_SCORE_INIT,
  TEAM_VOTE_INIT,
  FIND_TEAM_NAME,
} from "../graphql";
import { useQuery } from "@apollo/client";

function TeamHome(props) {
  let nowTime = Date.now();
  const findTeamName = useQuery(FIND_TEAM_NAME, {
    variables: { teamID: props.nowTeam },
  });

  const teamEvent = useQuery(TEAM_EVENT_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const teamPost = useQuery(TEAM_POST_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const teamScore = useQuery(TEAM_SCORE_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const teamVote = useQuery(TEAM_VOTE_INIT, {
    variables: { teamID: props.nowTeam },
  });

  const EventData = [];
  if (!teamEvent.loading) {
    if (teamEvent.data) {
      teamEvent.data.initTeamEvent.map((i) =>
        EventData.push({
          id: i.eventID,
          title: i.eventTitle,
          description: i.eventDescription,
          start: i.eventStart,
          end: i.eventEnd,
          location: i.eventLocation,
          posttime: i.eventPostTime,
        })
      ); 
    }
  }
  const PostData = [];
  if (!teamPost.loading) {
    if (teamPost.data) {
      teamPost.data.initTeamPost.map((i) =>
        PostData.push({
          id: i.postID,
          time: i.postTime,
          title: i.postTitle,
          author: i.postAuthor.userAccount,
          content: i.postContent,
        })
      );  
    }
  }
  const ScoreData = [];
  if (!teamScore.loading) {
    if (teamScore.data){
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

  }
  const VoteData = [];
  if (!teamVote.loading) {
    if (teamVote.data) {
      teamVote.data.initVote.map((i) =>
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

  const homepage = (
    <div className="team-home" style={{ display: "flex", flexWrap: "wrap" }}>
      <Card
        className="teamHp-event"
        sx={{ m: 2, p: 2, width: 535, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 540 }}>
          <Typography gutterBottom variant="h5" component="div">
            <EventNoteIcon sx={{ mx: 1, my: 0 }} /> Event
          </Typography>
        </Box>
        {EventData.slice(0, 3).map((event) => (
          <Card
            sx={{ m: 1, width: 150, height: 180, display: "inline-block" }}
            key={event.id}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography gutterBottom variant="h6" component="div">
                {event.title}
              </Typography>

              <Typography gutterBottom variant="subtitle2" component="div">
                <AccessTimeIcon sx={{ fontSize: "small" }} />{" "}
                {new Date(parseInt(event.start)).toDateString()}
              </Typography>

              <Typography gutterBottom variant="subtitle2" component="div">
                <LocationOnIcon sx={{ fontSize: "small" }} /> {event.location}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Link
          to={
            "/team/" +
            (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
            "/Event"
          }
        >
          <Box sx={{ px: 1, width: "100%", maxWidth: 530, textAlign: "right" }}>
            <Button variant="outlined" color="success" sx={{ m: 1 }}>
              View All
            </Button>
          </Box>
        </Link>
      </Card>

      <Card
        className="teamHp-post"
        sx={{ m: 2, p: 2, width: 470, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 470 }}>
          <Typography gutterBottom variant="h5" component="div">
            <PostAddIcon sx={{ mx: 1, my: 0 }} /> Post
          </Typography>
        </Box>
        {PostData.slice(0, 2).map((post) => (
          <Card
            sx={{ m: 1, width: 200, height: 180, display: "inline-block" }}
            key={post.id}
          >
            <CardContent sx={{ p: 0.5 }}>
              <Typography gutterBottom variant="h6" component="div">
                {post.title}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                <DriveFileRenameOutlineIcon sx={{ fontSize: "small" }} />{" "}
                {post.author}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                <AccessTimeIcon sx={{ fontSize: "small" }} />{" "}
                {new Date(post.time).toDateString()}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                <ShortTextIcon sx={{ fontSize: "small" }} />{" "}
                {post.content.slice(0, 30)} ...
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Link
          to={
            "/team/" +
            (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
            "/Posts"
          }
        >
          <Box sx={{ px: 1, width: "100%", maxWidth: 470, textAlign: "right" }}>
            <Button variant="outlined" color="success" sx={{ m: 1 }}>
              View All
            </Button>
          </Box>
        </Link>
      </Card>

      <Card
        className="teamHp-score"
        sx={{ m: 2, p: 2, width: 535, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 540 }}>
          <Typography gutterBottom variant="h5" component="div">
            <SportsScoreIcon sx={{ mx: 1, my: 0 }} /> Score
          </Typography>
        </Box>
        {ScoreData.slice(0, 3).map((score) => (
          <Card
            sx={{ m: 1, width: 150, height: 180, display: "inline-block" }}
            key={score.id}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography gutterBottom variant="h6" component="div">
                {score.opponent}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                <CalendarTodayIcon sx={{ fontSize: "small" }} /> {score.date}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {score.mySet} : {score.oppoSet}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Link
          to={
            "/team/" +
            (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
            "/Score"
          }
        >
          <Box sx={{ px: 1, width: "100%", maxWidth: 535, textAlign: "right" }}>
            <Button variant="outlined" color="success" sx={{ m: 1 }}>
              View All
            </Button>
          </Box>
        </Link>
      </Card>

      <Card
        className="teamHp-vote"
        sx={{ m: 2, p: 2, width: 470, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 470 }}>
          <Typography gutterBottom variant="h5" component="div">
            <HowToVoteIcon sx={{ mx: 1, my: 0 }} /> Vote
          </Typography>
        </Box>
        {VoteData.slice(0, 2).map((vote) => (
          <Card
            sx={{ m: 1, width: 200, height: 180, display: "inline-block" }}
            key={vote.id}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography gutterBottom variant="h6" component="div">
                {vote.title}
              </Typography>
              {new Date(vote.end).getTime() > nowTime ? (
                <Tag color="cyan">Ongoing</Tag>
              ) : (
                <Tag color="default">End</Tag>
              )}
              <br />
              <Tag color="red" style={{ marginTop: "0.5rem" }}>
                due: {vote.end}
              </Tag>
            </CardContent>
          </Card>
        ))}
        <Link
          to={
            "/team/" +
            (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
            "/Vote"
          }
        >
          <Box sx={{ px: 1, width: "100%", maxWidth: 530, textAlign: "right" }}>
            <Button variant="outlined" color="success" sx={{ m: 1 }}>
              View All
            </Button>
          </Box>
        </Link>
      </Card>
      {/* <Card
        className="teamHp-gallery"
        sx={{ m: 2, p: 2, width: 470, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 470 }}>
          <Typography gutterBottom variant="h5" component="div">
            <PhotoLibraryIcon sx={{ mx: 1, my: 0 }} /> Gallery
          </Typography>
        </Box>
        <Box sx={{ px: 1, width: "100%", maxWidth: 530, textAlign: "right" }}>
          <Button
            variant="outlined"
            color="success"
            sx={{ m: 1 }}
            href={
              "/team/" +
              (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
              "/Gallery"
            }
          >
            View All
          </Button>
        </Box>
      </Card> */}
      {/* <Card
        className="teamHp-gantt"
        sx={{ m: 2, p: 2, width: 535, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 540 }}>
          <Typography gutterBottom variant="h5" component="div">
            <StackedLineChartIcon sx={{ mx: 1, my: 0 }} /> Gantt
          </Typography>
        </Box>
        <Box sx={{ px: 1, width: "100%", maxWidth: 530, textAlign: "right" }}>
          <Button
            variant="outlined"
            color="success"
            sx={{ m: 1 }}
            href={
              "/team/" +
              (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
              "/Gantt"
            }
          >
            View All
          </Button>
        </Box>
      </Card> */}
    </div>
  );

  return (
    <div className="Wrapper">
      <Template content={homepage} />
    </div>
  );
}

export default TeamHome;
