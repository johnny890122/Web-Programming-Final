export default function TeamScoreItem({score}) {
    return (
        <li className = "team-score-item">
            <div className = "team-score-date">{score.date}</div>            
            <div className = "team-score-win">{score.win}</div>
            <div className = "team-score-team">{score.team}</div>
            <div className = "team-score-set">{score.teamSet} : {score.opponentSet}</div>
            <div className = "team-score-opponent">{score.opponent}</div>
        </li>
    );
  };