export default function HpScore({score}) {
    return (
        <li className = "teamHp-score-item">
            <div className = "teamHp-score-team">{score.team}</div>
            <div className = "teamHp-score-set">{score.teamSet}:{score.opponentSet}</div>
            <div className = "teamHp-score-opponent">{score.opponent}</div>
        </li>
    );
  };
