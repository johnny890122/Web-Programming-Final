import React from "react";
import { useState, useRef, useEffect } from "react";
import Template from "../components/Template";
import { PostData} from "../components/ListData";
import { List, ListItem, Typography, Card, Box, CardContent } from '@mui/material';
import { CardActionArea } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Modal, Button, Form, Input } from 'antd';

/* 連結detail頁面 */

function TeamPost() {

  const formLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const posts = PostData;
  const [postNow, setPostNow] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const showModal = (post) => {
    setPostNow(post)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsEdit(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleBack = () => {
    setIsEdit(false);
  };

  const onSubmit = () => {
    console.log('Success');
  };

  const postDetail = (
    <>
      <Typography variant="h3" sx={{ m: 1  }}>
        {postNow ? postNow.title: ""}
      </Typography>
      <Typography variant="h6" sx={{ m: 1 }}>
        作者: {postNow ? postNow.author: ""}
      </Typography>
      <Typography variant="h5" sx={{ m: 1 }}>
        {postNow ? postNow.content: ""}
      </Typography>
    </>
  )

  const postForm = (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ title: postNow.title, content: postNow.content }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
      >
        <Input.TextArea size="large"/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )

  const postModal = (
    <Modal title="Post" visible={isModalVisible}
           onOk={handleOk} onCancel={handleOk}
           confirmLoading={isEdit}
           footer={isEdit? [
              <Button key="back" onClick={handleBack}>Back</Button>,
              <Button key="ok" onClick={handleOk}>OK</Button>
            ] : [
              <Button key="edit" onClick={handleEdit}>Edit</Button>,
              <Button key="ok" onClick={handleOk}>OK</Button>
            ]}>
      {isEdit ? postForm : postDetail}     
    </Modal>
  )

  const postlist = ( 
    <Box className = "team-post"
         sx={{ m: 4, p: 1, width: '100%', maxWidth: 700 }}>
      <Typography display= 'inline' variant="h3" component="div" sx={{ m:2, width: '100%', textAlign: "left" }}>
            <PostAddIcon sx={{ mx: 1 }} fontSize="large"/> Post
      </Typography>
      {postModal}
      <List className = "team-post-list" sx={{ p:1, width: '100%' }}>
          <ListItem button key = "0">
              <Card sx={{ m: 1, p:1, width: '100%' }}>
                  <CardActionArea sx={{ width: '100%' }}
                                        href={`#post-detail`}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ m:1, p: 1 }}>
                        <Typography gutterBottom variant="h4" component="div" >
                            <AddCircleOutlineIcon /> Create New Post
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
              </Card>
          </ListItem>
          {posts.map(post => <ListItem key = {post.id}>
                              <Card sx={{ m: 1, p:1, width: '100%' }}>
                                    <CardActionArea sx={{ width: '100%' }} onClick={() => {showModal(post)}}
                                                    >
                                      <CardContent sx={{ p: 2 }}>
                                        <Box sx={{ m:1, p: 1 }}>
                                          <Typography gutterBottom variant="h4" component="div" >
                                              {post.title}
                                          </Typography>
                                          <Typography gutterBottom variant="subtitle2" component="div" >
                                              {post.time}
                                          </Typography>
                                        </Box>
                                        <Box sx={{ m:1, p: 1 }}>
                                          <Typography gutterBottom variant="subtitle1" component="div">
                                            <DriveFileRenameOutlineIcon sx={{ fontSize: "small" }} /> {post.author}
                                          </Typography>
                                          <Typography gutterBottom variant="body1" component="div">
                                            {post.content.slice(0, 30)} ...
                                          </Typography>
                                        </Box>
                                      </CardContent>
                                    </CardActionArea>
                                </Card>
                             </ListItem> )}
      </List>
    </Box>
  )

  return (
    <div className="Wrapper">
        <Template content={postlist} />
     </div>
  );
};

export default TeamPost