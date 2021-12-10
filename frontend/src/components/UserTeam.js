import UserTeamItem from "./UserTeamItem";
import {TeamData} from "./ListData";

function UserTeam() {
    return (
      <div className = "user-team">
        <h2>Team List</h2>
        <ul className = "user-team-list">
            {TeamData.map(team => <UserTeamItem team = {team}
                                                key={team.id}/>)}
            <li className = "user-team-item" key = "0">
                <div className = "create-user-team">Create Team</div>
            </li>
        </ul>
      </div>
    );
  };
  
export default UserTeam;