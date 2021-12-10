import "./App.css";
import { useState } from "react";
import UserDashboard from "./containers/UserDashboard";
import LogIn from "./containers/LogIn";

function App() {
  const [logined, setLogined] = useState(false);
  return (
    <section className="wrapper">
      {logined ? (
        <UserDashboard setLogined={setLogined} />
      ) : (
        <LogIn setLogined={setLogined} />
      )}
    </section>
  );
}
export default App;
