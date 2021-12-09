import {ScoreData} from "./ListData";
import TeamScoreItem from "./TeamScoreItem";

export default function TeamScore() {
    return (
      <div className = "team-score">
        <h2>Team Score</h2>
        <ul className = "team-score-list">
            {ScoreData.map(score => <TeamScoreItem score= {score}
                                                   key = {score.id}/>)}
        </ul>
      </div>
    );
  };