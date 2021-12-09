export default function TeamPostItem({post}) {
    return (
        <li className = "team-post-item">
            <div className = "team-post-title">{post.title}</div>
            <div className = "team-post-author">{post.author}</div>
            <div className = "team-post-time">{post.time}</div>
            <div className = "team-post-content">{post.content}</div>
        </li>
    );
  };