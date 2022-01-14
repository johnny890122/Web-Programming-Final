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
} from "@mui/material";
import { CardActionArea } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Modal, Form, Input } from "antd";
import { TEAM_POST_INIT, CREATE_TEAM_POST } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";

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
        author: i.postAuthor.userID,
        content: i.postContent,
      })
    );
  }

  const [postNow, setPostNow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setMedalMode] = useState("new"); //new, detail, edit
  const [isEdit, setIsEdit] = useState(false);

  const [addPost] = useMutation(CREATE_TEAM_POST);

  

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
  const onSubmit = (values) => {
    console.log('Success:', values);
  };

  const postDetail = (
    <>
      <Typography variant="h3" sx={{ m: 1 }}>
        {postNow ? postNow.title : ""}
      </Typography>
      <Typography variant="h6" sx={{ m: 1 }}>
        作者: {postNow ? postNow.author : ""}
      </Typography>
      <Typography variant="h5" sx={{ m: 1 }}>
        {postNow ? postNow.content : ""}
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
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Content" name="content">
          <Input.TextArea size="large" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmltype="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
  );
  

  const postModal = (
    <Modal
      title="Post"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleOk}
      confirmLoading={isEdit}
      footer={
        modalMode === "new"
          ? [
              <Button key="ok" onClick={handleOk}>
                Cancel
              </Button>,
            ]
          : modalMode === "edit"
          ? [
              <Button key="back" onClick={handleBack}>
                Back
              </Button>,
              <Button key="ok" onClick={handleOk}>
                OK
              </Button>,
            ]
          : [
              <Button key="edit" onClick={handleEdit}>
                Edit
              </Button>,
              <Button key="ok" onClick={handleOk}>
                OK
              </Button>,
            ]
      }
    >
      {modalMode === "new"
        ? postForm
        : modalMode === "edit"
        ? postForm
        : postDetail}
    </Modal>
  );

  const postlist = (
    <Box className="team-post" style={{ marginLeft: "1rem" }}>
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
          marginTop: "1rem",
        }}
      >
        {PostData.map((post) => (
          <ListItem key={post.id} sx={{ width: 700 }}>
            <Card>
              <CardActionArea
                sx={{ width: 700 }}
                onClick={() => {
                  showModal("detail", post);
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ m: 1, p: 1 }}>
                    <Typography gutterBottom variant="h4" component="div">
                      {post.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      {post.time}
                    </Typography>
                  </Box>
                  <Box sx={{ m: 1, p: 1 }}>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      <DriveFileRenameOutlineIcon sx={{ fontSize: "small" }} />{" "}
                      {post.author}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                      {post.content.slice(0, 30)} ...
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
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
