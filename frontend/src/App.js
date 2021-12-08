import './App.css';
import 'antd/dist/antd.css';

import { Fragment } from 'react';
import Header from './containers/Header.js';
import NavBar from './containers/NavBar.js';
import Body from './containers/Body.js';
import Block from './components/Block.js';
import Gantt from "./components/Gantt";
import BasicTable from "./components/Table";
import CreateTeam from "./components/CreateTeam"

function App() {
	return (
		<>
			<Header / >
			<NavBar / >
			<Body / >
			<Block 
				title="Block1" 
				description="This is the first testing block."
			/>

			<Gantt />

      		<BasicTable />

      		<div style={{width:"20cm"}}>
				<CreateTeam / >
			</div>
		</>

	)
}

export default App;
