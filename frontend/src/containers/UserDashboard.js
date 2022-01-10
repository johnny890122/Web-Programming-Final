import Template from "../components/Template";
import "antd/dist/antd.css";
import "./App.css";
import { useState } from "react";
import Notification from "../components/Notification";
import Block from "../components/Block";
import Todo from "../components/Todo/App";
import DashboardEvent from "../components/DashboardEvent";
import { Modal } from "antd";

import { Button } from '@mui/material';


const UserDashboard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentInModal, setComponentInModal] = useState("");
  const showModalWithNotification = () => {
    setIsModalVisible(true);
    setComponentInModal("Notification");
  };

  const showModalWithTodo = () => {
    setIsModalVisible(true);
    setComponentInModal("To");
  };

  const showModalWithEvent = () => {
    setIsModalVisible(true);
    setComponentInModal("Event");
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
      <Block
        enlarge={showModalWithEvent}
        component={<DashboardEvent me={props.me}/>}
        fullscreen={isModalVisible}
      />

      <Block
        enlarge={showModalWithNotification}
        component={<Notification me={props.me} />}
        fullscreen={isModalVisible}
      />
      <Block
        enlarge={showModalWithTodo}
        component={<Todo me={props.me} />}
        fullscreen={isModalVisible}
      />

      <Modal
        title="Testing"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ zIndex: 1200 }}
      >
        {componentInModal === "Notification" ? <Notification /> : []}
        {componentInModal === "Todo" ? <Todo /> : []}
        {componentInModal === "Event" ? <DashboardEvent /> : []}
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
