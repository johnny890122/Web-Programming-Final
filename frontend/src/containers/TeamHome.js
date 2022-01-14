import React from "react";
import Template from "../components/Template";
import {
  Typography,
  Box,
  Card,
  Button,
  Chip,
  CardContent,
} from "@mui/material";
import { CardActionArea } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import {
  // EventData,
  // ScoreData,
  VoteData,
  // PostData,
} from "../components/ListData";
import {
  TEAM_EVENT_INIT,
  TEAM_POST_INIT,
  TEAM_SCORE_INIT,
  FIND_TEAM_NAME,
} from "../graphql";
import { useQuery } from "@apollo/client";

function TeamHome(props) {
  // const events = EventData.filter((event) => event.type === "team").slice(0, 3);
  // const scores = ScoreData.slice(0, 3);
  const votes = VoteData.slice(0, 3);
  // const posts = PostData.slice(0, 2);

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

  const EventData = [];
  if (!teamEvent.loading) {
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
  const PostData = [];
  if (!teamPost.loading) {
    teamPost.data.initTeamPost.map((i) =>
      PostData.push({
        id: i.postID,
        time: i.postTime,
        title: i.postTitle,
        author: i.postAuthor.userID,
        content: i.postContent,
      })
    );
  }
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
        {EventData.map((event) => (
          <Card
            sx={{ m: 1, width: 150, height: 180, display: "inline-block" }}
            key={event.id}
          >
            <CardActionArea
              sx={{ width: 150, height: 180 }}
              href={`#event-detail`}
            >
              <CardContent sx={{ p: 2 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {event.title}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  <AccessTimeIcon sx={{ fontSize: "small" }} /> {event.start}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <Box sx={{ px: 1, width: "100%", maxWidth: 530, textAlign: "right" }}>
          <Button
            variant="outlined"
            color="success"
            sx={{ m: 1 }}
            href={
              "/team/" +
              (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
              "/Event"
            }
          >
            View All
          </Button>
        </Box>
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
        {PostData.map((post) => (
          <Card
            sx={{ m: 1.5, width: 410, height: 85, display: "block" }}
            key={post.id}
          >
            <CardActionArea
              sx={{ width: 400, height: 85 }}
              href={`#post-detail`}
            >
              <CardContent sx={{ p: 0.5 }}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {post.title}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  <DriveFileRenameOutlineIcon sx={{ fontSize: "small" }} />{" "}
                  {post.author}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  {post.content.slice(0, 30)} ...
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <Box sx={{ px: 1, width: "100%", maxWidth: 470, textAlign: "right" }}>
          <Button
            variant="outlined"
            color="success"
            sx={{ m: 1 }}
            href={
              "/team/" +
              (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
              "/Posts"
            }
          >
            View All
          </Button>
        </Box>
      </Card>

      <Card
        className="teamHp-score"
        sx={{ m: 2, p: 2, width: 470, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 470 }}>
          <Typography gutterBottom variant="h5" component="div">
            <SportsScoreIcon sx={{ mx: 1, my: 0 }} /> Score
          </Typography>
        </Box>
        {ScoreData.map((score) => (
          <Card
            sx={{ m: 1, width: 128, height: 180, display: "inline-block" }}
            key={score.id}
          >
            <CardActionArea
              sx={{ width: 128, height: 180 }}
              href={`#score-detail`}
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
            </CardActionArea>
          </Card>
        ))}
        <Box sx={{ px: 1, width: "100%", maxWidth: 470, textAlign: "right" }}>
          <Button
            variant="outlined"
            color="success"
            sx={{ m: 1 }}
            href={
              "/team/" +
              (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
              "/Score"
            }
          >
            View All
          </Button>
        </Box>
      </Card>

      <Card
        className="teamHp-vote"
        sx={{ m: 2, p: 2, width: 535, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 540 }}>
          <Typography gutterBottom variant="h5" component="div">
            <HowToVoteIcon sx={{ mx: 1, my: 0 }} /> Vote
          </Typography>
        </Box>
        {votes.map((vote) => (
          <Card
            sx={{ m: 1, width: 150, height: 180, display: "inline-block" }}
            key={vote.id}
          >
            <CardActionArea
              sx={{ width: 150, height: 180 }}
              href={`#vote-detail`}
            >
              <CardContent sx={{ p: 2 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {vote.title}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  <AccessTimeFilledIcon sx={{ fontSize: "small" }} /> {vote.end}
                </Typography>
                {vote.act ? (
                  <Chip
                    label="投票中"
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Chip label="已結束" size="small" />
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <Box sx={{ px: 1, width: "100%", maxWidth: 530, textAlign: "right" }}>
          <Button
            variant="outlined"
            color="success"
            sx={{ m: 1 }}
            href={
              "/team/" +
              (findTeamName.loading ? "" : findTeamName.data.findTeamName) +
              "/Vote"
            }
          >
            View All
          </Button>
        </Box>
      </Card>
      <Card
        className="teamHp-gallery"
        sx={{ m: 2, p: 2, width: 470, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 470 }}>
          <Typography gutterBottom variant="h5" component="div">
            <PhotoLibraryIcon sx={{ mx: 1, my: 0 }} /> Gallery
          </Typography>
        </Box>
        {/* gallery */}
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
      </Card>
      <Card
        className="teamHp-gantt"
        sx={{ m: 2, p: 2, width: 535, height: 315, display: "inline-block" }}
      >
        <Box sx={{ width: "100%", maxWidth: 540 }}>
          <Typography gutterBottom variant="h5" component="div">
            <StackedLineChartIcon sx={{ mx: 1, my: 0 }} /> Gantt
          </Typography>
        </Box>
        {/* gantt */}
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
      </Card>
    </div>
  );

  return (
    <div className="Wrapper">
      <Template content={homepage} />
    </div>
  );
}

export default TeamHome;
