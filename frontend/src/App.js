import "./App.css";
import 'antd/dist/antd.css';

import { useState } from "react";
import UserDashboard from "./containers/UserDashboard";
import LogIn from "./containers/LogIn";

function App() {
  const [logined, setLogined] = useState(true);
  return (
    // <div style={{width:"20cm"}} >
    //    <Notification / >
    // </div>
    
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
