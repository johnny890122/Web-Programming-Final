import Template from "../components/Template";
import "antd/dist/antd.css";
import {useState} from "react";
import Notification from "../components/Notification";
import Block from "../components/Block";
import Todo from "../components/Todo/App";


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
    <>
      {/*<div className="body-container">*/}
        <Block enlarge={ showModalWithNotification } component={ <Notification/> } fullscreen={isModalVisible} /> 
        <Block enlarge={ showModalWithTodo } component={ <Todo/> } fullscreen={isModalVisible}/ >
        {/*<Block enlarge={ showModalWithTodo } component={<h1>Event 待補</h1>} fullscreen={isModalVisible}/ >*/}

      <Modal
        title="Testing"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ zIndex: 1200 }}
      >
        {componentInModal === "Notification" ? <Notification /> : []}
        {componentInModal === "Todo" ? <Todo /> : []}
        {/*{componentInModal === "Event" ? <Todo /> : []}*/}
      </Modal>
    </>
  );

  return (
    <div className="Wrapper">
      <Template content={dashboard} />
    </div>
  );
};

export default UserDashboard;
