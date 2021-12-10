import React from "react";
import Header from "./Header.js";
import NavBar from "./NavBar.js";
import Body from "./Body.js";
import Notification from "../components/Notification";
import Block from "../components/Block";
import Todo from "../components/Todo/App";

import { Modal, Button } from 'antd';
import { useState } from "react";

const UserDashboard = ({ setLogined }) => {

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [componentInModal, setComponentInModal] = useState("");
	const showModalWithNotification = () => {
    	setIsModalVisible(true);
    	setComponentInModal("Notification");
  	};

  	const showModalWithTodo = () => {
    	setIsModalVisible(true);
    	setComponentInModal("Todo");
  	};

  	const handleOk = () => {
    	setIsModalVisible(false);
    	setComponentInModal("");
  	};
	const handleCancel = () => {
    	setIsModalVisible(false);
  	};

	return (
	<section className="wrapper">
	  <section className="header-container">
		<Header />
	  </section>
	  <section className="page-container">
		<div className="navbar-container">
			<NavBar />
		</div>

		{/* Block 本體 */}
		<div className="body-container">
			<Block enlarge={ showModalWithNotification } component={ <Notification/> } /> 
			<Block enlarge={ showModalWithNotification } component={ <Todo/> }/ >
		</div>

		{/* Block 大圖 */}
	 	<Modal title="Testing" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
	 		{componentInModal === "Notification" ? <Notification / > : []}
	 		{componentInModal === "Todo" ? <Todo / > : []}
	    </Modal>

	  </section>
	</section>
	);
};

export default UserDashboard;
