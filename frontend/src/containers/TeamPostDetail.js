import React from "react";
import { PostData } from "../components/ListData";
import Table from "../components/Table";
import Template from "../components/Template";

const TeamPostDetail = (id) => {

  const post = PostData.filter(post => post.id === id)

  const postdetail = (
    <Box>
        <Box>
            <Typography gutterBottom variant="h2" component="div">
                {post.title}                        
            </Typography>
            <Typography gutterBottom variant="h2" component="div">
                作者 : {post.authot}                        
            </Typography>
            <Typography gutterBottom variant="h2" component="div">
                發表於 : {post.posttime}                        
            </Typography>
        </Box>    
    </Box>    
) 

  return (
    <div className="Wrapper">
      <Template content={postdetail} />
    </div>
  );
};

export default TeamPostDetail;