export default function HpVote({vote}) {
    return (
        <li className = "teamHp-vote-item">
            <div className = "teamHp-vote-title">{vote.title}</div>
            <div className = "teamHp-vote-end">{vote.end}</div>
            <div className = "teamHp-vote-act">{vote.act}</div>
        </li>
    );
  };