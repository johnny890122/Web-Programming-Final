import './App.css';
import Calendar from './Components/Calendar';
import UserTeam from './Components/UserTeam';
import UserAchievement from './Components/UserAchievement';
import TeamHP from './Components/TeamHp';
import TeamPost from './Components/TeamPost';
import TeamScore from './Components/TeamScore';
import TeamVote from './Components/TeamVote';

function App() {
  return (
    <section>
      <Calendar/>
      <UserTeam/>
      <UserAchievement/>
      <TeamHP/>
      <TeamPost/>
      <TeamScore/>
      <TeamVote/>
    </section>
  );
}

export default App;
