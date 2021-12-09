function EndVote(vote) {
    return(
        <li className = "team-vote-item">
            <div className = "team-vote-title">{vote.title}</div>
            <div className = "team-vote-status">已結束</div>
            <div className = "team-vote-result">結果: {vote.result.name} {vote.result.count}票</div>
        </li>
    );
};

function ActOption(option) {
    return(
        <li className = "team-vote-option" key = {option.id}>
            <div className = "team-vote-option-select">{option.select ? `o`: `x`}</div>
            <div className = "team-vote-option-name">{option.name}</div>
            <div className = "team-vote-option-count">{option.count}</div>
        </li>
    );
};

function ActVote(vote) {
    return(
        <li className = "team-vote-item">
            <div className = "team-vote-title">{vote.title}</div>
            <div className = "team-vote-limit">{!vote.limit ? "一人多票": `一人${vote.limit}票`}</div>
            <div className = "team-vote-end">{vote.end}</div>
            <ul className = "team-vote-options">
                {vote.options.map(option => ActOption(option))}
            </ul>
        </li>
    );
};

function TeamVoteItem({vote}) {
    return (
        <>
            {vote.act ? ActVote(vote): EndVote(vote)}
        </>
    );
  };

export default TeamVoteItem;