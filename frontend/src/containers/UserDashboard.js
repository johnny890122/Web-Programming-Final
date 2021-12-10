import React, { useState } from "react";
import Notification from "../components/Notification";
import Todo from "../components/Todo/App";
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
};

export default UserDashboard;
