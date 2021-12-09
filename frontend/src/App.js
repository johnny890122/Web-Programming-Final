import './App.css';
import { Fragment } from 'react';
import Header from './containers/Header.js';
import NavBar from './containers/NavBar.js';
import Body from './containers/Body.js';
import ListUserTeam from './components/List';


function App() {
	return (
		<>
			<Header />
			<NavBar />
			<Body>
        <ListUserTeam />
      </Body>
		</>
	)
}

export default App;
