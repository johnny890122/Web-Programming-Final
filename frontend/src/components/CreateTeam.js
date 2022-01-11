import { useState, useEffect } from "react";
import {
  Steps,
  Divider,
  Typography,
  Input,
  Button,
  Tooltip,
  Form,
  Radio,
  DatePicker,
  Menu,
  Dropdown,
} from "antd";
import {
  CopyOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Template from "./Template";
import styled from "styled-components";
import "../App.css";
import moment from "moment";

function TeamForm() {
  const { TextArea } = Input;

  const teamType = ["a", "b", "c", "d", "e"];
  const [selectedTeamType, setSelectedTeamType] = useState("---");
  const handleMenuClick = (e) => {
    setSelectedTeamType(e.key);
  };
  const menu = (
    <Menu>
      {" "}
      {teamType.map((e) => (
        <Menu.Item key={e} icon={<UserOutlined />} onClick={handleMenuClick}>
          {e}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Form>
      {/*隊名*/}
      <Form.Item label="團隊名稱" required tooltip="This is a required field">
        <Input />
      </Form.Item>

      {/*球隊描述*/}
      <Form.Item
        label="團隊描述"
        tooltip={{ title: "提示文字", icon: <InfoCircleOutlined /> }}
      >
        <TextArea rows={4} />
      </Form.Item>

      {/*球隊類型*/}
      <Form.Item
        label="團隊類型"
        tooltip={{ title: "提示文字", icon: <InfoCircleOutlined /> }}
      >
        <Dropdown.Button
          overlay={menu}
          placement="bottomCenter"
          icon={<UserOutlined />}
        >
          {selectedTeamType}
        </Dropdown.Button>
      </Form.Item>

      {/*成立日期*/}
      <Form.Item
        label="成立日期"
        tooltip={{ title: "提示文字", icon: <InfoCircleOutlined /> }}
      >
        <Input.Group compact>
          <DatePicker />
        </Input.Group>
      </Form.Item>
    </Form>
  );
}

function Invite() {
  const { Title } = Typography;

  return (
    <Form>
      {/* 輸入電子郵件 */}
      <Form.Item
        label="輸入郵件"
        tooltip={{ title: "提示文字", icon: <InfoCircleOutlined /> }}
      >
        <Input
          defaultValue="Amy"
          icon={<CopyOutlined />}
          addonAfter={
            <Tooltip title="Invite">
              {" "}
              <UserAddOutlined />{" "}
            </Tooltip>
          }
        />
      </Form.Item>

      <Form.Item
        label="複製連結"
        tooltip={{ title: "提示文字", icon: <InfoCircleOutlined /> }}
      >
        <Input
          defaultValue="git@github.com:ant-design/ant-design.git"
          icon={<CopyOutlined />}
          addonAfter={
            <Tooltip title="copy url">
              {" "}
              <CopyOutlined />{" "}
            </Tooltip>
          }
        />
      </Form.Item>
    </Form>
  );
}

function CreateTeam() {
  const { Title } = Typography;
  const { Step } = Steps;

  // some constant
  const totalStep = 4;

  // text dict
  const titleText = {
    0: "填寫基本資訊",
    1: "Invite People",
    2: "Customize your page",
    3: "Create",
  };

  // define stae here
  const [currentStep, setCurrentStep] = useState(0);
  const [stepText, setStepText] = useState("");
  const [title, setTitle] = useState("0");

  const handleNext = () => {
    currentStep < totalStep - 1
      ? setCurrentStep(currentStep + 1)
      : setCurrentStep(currentStep);
  };

  const handleBack = () => {
    currentStep > 0
      ? setCurrentStep(currentStep - 1)
      : setCurrentStep(currentStep);
  };

  const handleClickStep = (e) => {
    setCurrentStep(e);
  };

  const buttonDiv = styled.div`
    display: flex;
    justify-content: space-between;
  `;
  const allButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  useEffect(() => {
    setTitle(titleText[currentStep]);
  }, [currentStep]);
  return (
    <>
      <Steps current={currentStep} onChange={handleClickStep}>
        <Step key="0" title="Step 1" description="填寫基本資訊" />
        <Step key="1" title="Step 2" description="邀請成員" />
        <Step key="2" title="Step 3" description="客製化頁面" />
        <Step key="3" title="Step 4" description="建立團隊" />
      </Steps>

      <Divider />

      {currentStep === 0 ? <TeamForm /> : []}
      {currentStep === 1 ? <Invite /> : []}
      {currentStep === 2 ? [] : []}
      {currentStep === 3 ? [] : []}

      <div class="createTeamButtonDiv">
        <div class="createTeamButtonDiv">
          {currentStep === 0 ? (
            []
          ) : (
            <Button
              type="primary"
              icon={<LeftCircleOutlined />}
              size="large"
              onClick={handleBack}
            >
              {" "}
              Back{" "}
            </Button>
          )}
        </div>
        <div class="createTeamButtonDiv">
          {currentStep === totalStep - 1 ? (
            []
          ) : (
            <Button
              type="primary"
              icon={<RightCircleOutlined />}
              size="large"
              onClick={handleNext}
            >
              {" "}
              Next{" "}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateTeam;
