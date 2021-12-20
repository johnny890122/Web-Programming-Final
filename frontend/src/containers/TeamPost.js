import React from "react";
import Template from "../components/Template";
import { PostData} from "../components/ListData";
import { List, ListItem, Typography, Card, Box, Button, Grid, CardContent, Chip } from '@mui/material';
import { CardActionArea } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

/* 連結detail頁面 */

function TeamPost() {

  const posts = PostData;

  const postlist = ( 
    <Box className = "team-post"
         sx={{ m: 4, p: 1, width: '100%', maxWidth: 700 }}>
      <Typography display= 'inline' variant="h3" component="div" sx={{ m:2, width: '100%', textAlign: "left" }}>
            <PostAddIcon sx={{ mx: 1 }} fontSize="large"/> Post
      </Typography>
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
          {posts.map(post => <ListItem button key = {post.id}>
                                <Card sx={{ m: 1, p:1, width: '100%' }}>
                                    <CardActionArea sx={{ width: '100%' }}
                                                          href={`#post-detail`}>
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