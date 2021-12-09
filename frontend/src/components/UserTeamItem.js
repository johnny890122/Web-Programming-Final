export default function UserTeamItem({team}) {
    return (
        <li className = "user-team-item">
            <div className = "user-team-name">{team.teamname}</div>
            <div className = "user-team-status">{team.status}</div>
            <div className = "user-team-description">{team.description}</div>
        </li>
    );
  };
