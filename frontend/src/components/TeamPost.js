import {PostData} from "./ListData";
import TeamPostItem from "./TeamPostItem";

export default function TeamPost() {
    return (
      <div className = "team-post">
        <h2>Team Post</h2>
        <ul className = "team-post-list">
            <li className = "team-post-item">
                <div className = "create-team-post">New Post</div>
            </li>
            {PostData.map(post => <TeamPostItem post= {post}
                                                key = {post.id}/>)}
        </ul>
      </div>
    );
  };
