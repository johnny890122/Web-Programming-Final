import React, { useState } from "react";
import Notification from "../components/Notification";
import Todo from "../components/Todo/App";
<<<<<<< HEAD

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

  const [todo, setTodo] = useState([]);

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
      <Block enlarge={ showModalWithNotification } component={ <Notification/> } fullscreen={isModalVisible} /> 
      <Block enlarge={ showModalWithTodo } component={ <Todo/> } fullscreen={isModalVisible}/ >
		</div>

		{/* Block 大圖 */}
	 	<Modal title="Testing" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
	 		{componentInModal === "Notification" ? <Notification / > : []}
	 		{componentInModal === "Todo" ? <Todo / > : []}
	    </Modal>

	  </section>
	</section>
	);
=======
import Template from "../components/Template";
import "antd/dist/antd.css";

import { Modal } from "antd";

const UserDashboard = () => {
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

  const dashboard = (
    <Modal
      title="Testing"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ zIndex: 1200 }}
    >
      {componentInModal === "Notification" ? <Notification /> : []}
      {componentInModal === "Todo" ? <Todo /> : []}
    </Modal>
  );

  return (
    <div className="Wrapper">
      <Template content={dashboard} />
    </div>
  );
>>>>>>> main
};

export default UserDashboard;
