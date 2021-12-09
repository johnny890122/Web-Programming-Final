import {VoteData} from "./ListData";
import TeamVoteItem from "./TeamVoteItem";

export default function TeamVote() {
    return (
      <div className = "team-vote">
        <h2>Team Vote</h2>
        <ul className = "team-vote-list">
            {VoteData.map(vote => <TeamVoteItem vote = {vote}
                                                key = {vote.id}/>)}
        </ul>
      </div>
    );
  };