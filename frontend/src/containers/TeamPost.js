import React from "react";
import { useState, useRef, useEffect } from "react";
import Template from "../components/Template";
import {
  List,
  ListItem,
  Typography,
  Card,
  Box,
  CardContent,
  Button,
  CardActionArea,
  TextField
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Modal, Form, Input } from "antd";
import { TEAM_POST_INIT, CREATE_TEAM_POST, UPDATE_TEAM_POST, DELETE_TEAM_POST } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShortTextIcon from '@mui/icons-material/ShortText';

/* 連結detail頁面 */

function TeamPost(props) {
  const teamPost = useQuery(TEAM_POST_INIT, {
    variables: { teamID: props.nowTeam },
  });
  const PostData = [];
  if (!teamPost.loading) {
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

  const [postNow, setPostNow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setMedalMode] = useState("new"); //new, detail, edit
  const [isEdit, setIsEdit] = useState(false);

  const [postOnFocus, setPostOnFocus] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const [isDeletedMode, setIsDeletedMode] = useState(false);
  const [addPost] = useMutation(CREATE_TEAM_POST, {refetchQueries: [ TEAM_POST_INIT, "initTeamPost" ]} );
  const [updatePost] = useMutation(UPDATE_TEAM_POST, {refetchQueries: [ TEAM_POST_INIT, "initTeamPost" ]} );
  const [deletePost] = useMutation(DELETE_TEAM_POST, {refetchQueries: [ TEAM_POST_INIT, "initTeamPost" ]} );

  const showModal = (mode, post) => {
    if (mode === "detail") {
      setPostNow(post);
    }
    setMedalMode(mode);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setMedalMode("new");
  };
  const handleEdit = () => {
    setMedalMode("edit");
  };
  const handleBack = () => {
    setMedalMode("detail");
  };
  const handleNew = () => {};

  const handelPostDeleted = async () => {
      await deletePost({
          variables: {
              postID: postOnFocus,
              teamID: props.nowTeam,
          }
      });
      setIsModalVisible(false);
      setIsDeletedMode(false);
  }


  const onSubmit = async () => {
    await addPost({
        variables: {
          creatorID: props.me,
          postTitle: postTitle,
          postContent: postContent,
          teamID: props.nowTeam,
      }
    });

    setPostTitle("");
    setPostContent("");
    setIsModalVisible(false);
    setIsEdit(false);
  };

  const onSave = async () => {
    await updatePost({
        variables: {
          postTitle: postTitle,
          postContent: postContent,
          postID: postOnFocus,
      }
    });

    setPostTitle("");
    setPostContent("");
    setIsModalVisible(false);
    setIsEdit(false);
  }

  const handleClose = () => {
    setIsModalVisible(false);
  }

  const postDetail = (
    <>
      <Typography style={{margin: "0.5em"}} variant="h3" color="textPrimary">
                        {postNow ? postNow.title : ""}
      </Typography>

      <Typography style={{margin: "0.5em"}}  variant="subtitle1" color="text.secondary">
          <EditIcon style={{transform: "scale(1.2)"}} sx={{ fontSize: "large" }} /> {postNow ? postNow.author : ""}
      </Typography>

      <Typography style={{margin: "0.5em"}}  variant="subtitle1" color="text.secondary">
          <AccessTimeIcon sx={{ fontSize: "large" }} /> {postNow ? new Date(postNow.time).toDateString() : ""}
      </Typography>

      <Typography style={{margin: "0.5em"}}  variant="subtitle1" color="text.secondary">
          <ShortTextIcon style={{transform: "scale(1.2)"}} sx={{ fontSize: "large" }} /> {postNow ? postNow.content : ""}
      </Typography>
    </>
  );

  const postForm = (
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={
          modalMode === "edit"
            ? { title: postNow.title, content: postNow.content }
            : {}
        }
        onFinish={onSubmit}
        autoComplete="off"
      >
        <div>
            <TextField
              id="post_title"
              value = {postTitle}
              onChange={(e) => setPostTitle(e.target.value)}

              label="Title"
              sx={{ m: 2 }}
              placeholder="Title" />
        </div>

        <div>
            <TextField
              id="post_content"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              label="Content"
              sx={{ m: 2 }}
              style={{ width: "400px" }}
              multiline
              rows={10}
              placeholder="Content" />
        </div>

        {
          postTitle & postContent ? 
          <Button
          onClick={modalMode === "edit" ? onSave : onSubmit}
          sx={{ m: 2 }}
          color={modalMode === "edit" ? "error" : "success"}
          variant="contained"
          size="large"
          htmltype="submit"
        >
          {modalMode === "edit" ? "Save" : "Submit"}
        </Button > : <></>
        }
       
      </Form>
  );


  const postModal = (
    <Modal
      title= { modalMode === "detail" ? "" : (modalMode === "new" ? "Create" : "Edit")}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleOk}
      confirmLoading={isEdit}
      footer={[ <Button key="close" onClick={handleClose}> Close </Button> ]}
    >
    {
      modalMode != "new"
      ?
        <Typography
          gutterBottom
          variant="h4"
          component="div"
        >
          {
            isEdit
            ? <Button
                onClick={ () => setIsEdit(false) & setIsDeletedMode(false) & setMedalMode("detail") }
                startIcon={<ArrowBackIosIcon sx={{ fontSize: "large" }}/> }
              />
            : <Button
                onClick={ () => setIsEdit(true) & setIsDeletedMode(false) & handleEdit() & setPostTitle(postNow.title) & setPostContent(postNow.content) }
                startIcon={<EditIcon sx={{ fontSize: "large" }}/> }
              />
          }
          <Button
            color= { isDeletedMode ? "error" : "primary"}
            onClick={ () => !isDeletedMode ? setIsDeletedMode(true) : handelPostDeleted() & setIsEdit(false) }
            startIcon={<DeleteOutlineOutlinedIcon sx={{ fontSize: "large" }}/> }
          >
            {!isDeletedMode ? "" : "Are you sure?" }
          </Button>

          <Button
            color="success"
            style={{display: isDeletedMode ? "inline": "none" }}
            key="Cancel"
            onClick={() => setIsDeletedMode(false)}
          >
            Cancel
          </Button>
        </Typography>
      : <></>
    }

      {modalMode === "new"
        ? postForm
        : modalMode === "edit"
        ? postForm
        : postDetail}
    </Modal>
  );

  const postlist = (
    <Box className="team-post" style={{ marginLeft: "1rem" }} >
      {postModal}
      <div
        className="createBox-container"
        style={{
          display: "flex",
          width: "80vw",
          marginLeft: "1rem",
        }}
      >
        <Button
          variant="outlined"
          color="success"
          onClick={() => showModal("new", null)}
        >
          Create
        </Button>
      </div>

      <div
        className="teamBox-container"
        style={{
          marginTop: "1rem", display: "flex", flexWrap: "wrap"
        }}
      >
        {PostData.map((post) => (
          <ListItem key={post.id} style={{flexDirection: "row", width: "400px"}}>
            <Card>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ m: 1, p: 1 }} style={{width: "400px"}} >
                    <Typography gutterBottom variant="h4" component="div">
                      {post.title}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      <DriveFileRenameOutlineIcon sx={{ fontSize: "small" }} />{" "}
                      {post.author}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      <AccessTimeIcon sx={{ fontSize: "small" }} />{" "}
                      {new Date(post.time).toDateString()}
                    </Typography>

                    <Typography gutterBottom variant="body1" component="div">
                      <ShortTextIcon sx={{ fontSize: "small" }} />{" "}
                      {post.content.slice(0, 30)} ...
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "right" }}>
                    <Button
                        size="large"
                        onClick={(e) => setIsModalVisible(true) & showModal("detail", post) & setPostOnFocus(post.id)
                         }>
                        More
                    </Button>
                  </Box>
                </CardContent>
            </Card>
          </ListItem>
        ))}
      </div>
    </Box>
  );

  return (
    <div className="Wrapper">
      <Template content={postlist} />
    </div>
  );
}

export default TeamPost;
