import { EventData, ScoreData, VoteData, BirthData } from "./ListData";
import HpBirth from "./TeamHpBirth";
import HpEvent from "./TeamHpEvent";
import HpScore from "./TeamHpScore";
import HpVote from "./TeamHpVote";

function TeamHP() {
    return (
      <div className = "team-home">
        <h1>Home</h1>
        <div className = "teamHp-event">
            <h2>Upcoming Events</h2>
            <ul className = "teamHp-event-list">
                {EventData.map(event => <HpEvent event = {event}
                                                 key = {event.id}/>)}
            </ul>
        </div>
        <div className = "teamHp-score">
            <h2>Score</h2>
            <ul className = "teamHp-score-list">
                {ScoreData.map(score => <HpScore score = {score}
                                                 key = {score.id}/>)}
            </ul>
        </div>
        <div className = "teamHp-vote">
            <h2>Vote</h2>
            <ul className = "teamHp-vote-list">
                {VoteData.map(vote => <HpVote vote = {vote}
                                              key = {vote.id}/>)}
            </ul>
        </div>
        <div className = "teamHp-birth">
            <h2>Birthday</h2>
            <ul className = "teamHp-birth-list">
                {BirthData.map(birth => <HpBirth birth = {birth}
                                                 key = {birth.id}/>)}
            </ul>
        </div>
      </div>
    );
  };

export default TeamHP