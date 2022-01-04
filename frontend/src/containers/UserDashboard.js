import Template from "../components/Template";
import "antd/dist/antd.css";
import "./App.css";
import { useState } from "react";
import Notification from "../components/Notification";
import Block from "../components/Block";
import Todo from "../components/Todo/App";
import DashboardEvent from "../components/DashboardEvent";
import { Modal } from "antd";
import { useLocation} from "react-router-dom";

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

  let location = useLocation();
  const ME_KEY = "me";
  if (!localStorage.getItem(ME_KEY)) {
      localStorage.setItem(ME_KEY, location.state.me);
  }
  const me = localStorage.getItem(ME_KEY);

  const dashboard = (
    <>
      Hello {me}
      <Block
        enlarge={showModalWithEvent}
        component={<DashboardEvent />}
        fullscreen={isModalVisible}
      />

      <Block
        enlarge={showModalWithNotification}
        component={<Notification />}
        fullscreen={isModalVisible}
      />
      <Block
        enlarge={showModalWithTodo}
        component={<Todo />}
        fullscreen={isModalVisible}
      />

      <Modal
        title="Testing"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ zIndex: 1200 }}
      >
        {componentInModal === "Notification" ? <Notification me={me} /> : []}
        {componentInModal === "Todo" ? <Todo me={me} /> : []}
        {componentInModal === "Event" ? <DashboardEvent me={me} /> : []}
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
