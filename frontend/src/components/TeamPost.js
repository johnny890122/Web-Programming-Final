import {PostData} from "./ListData";
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';


export default function TeamPost() {
  return (
    <div className = "team-post">
      <h2>Team Post</h2>
      <List className = "team-post-list">
          <ListItem button key = "0">
              <ListItemText primary = "=> New Post"/>
          </ListItem>
          {PostData.map(post => <ListItem button key = {post.id}>
                                  <ListItemText primary = {post.title}
                                                secondary = {<>
                                                  <Typography> {post.author} </Typography>
                                                  <Typography> {post.time} </Typography>
                                                  <Typography> {post.content} </Typography>
                                                </>} /> </ListItem> )}
      </List>
    </div>
  );
};
