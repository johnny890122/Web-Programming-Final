import React from "react";
import Template from "../components/Template";
import { useState, useEffect } from "react";
import {
  Steps,
  Divider,
  Input,
  Button,
  Tooltip,
  Form,
  DatePicker,
  Menu,
  Dropdown,
} from "antd";
import {
  CopyOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  InfoCircleOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../App.css";
import { CREATE_TEAM } from "../graphql";
import { useMutation } from "@apollo/client";

function TeamForm(props) {
  const { TextArea } = Input;

  const teamType = ["ball team", "project", "homework"];

  const handleMenuClick = (e) => {
    props.setSelectedTeamType(e.key);
  };

  const handleNameInput = (e) => {
    props.setTeamName(e.target.value);
  };
  const handleDesInput = (e) => {
    props.setTeamDes(e.target.value);
  };
  const handleDateInput = (dateString) => {
    props.setStartDate(dateString);
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
        <Input onChange={(e) => handleNameInput(e)} />
      </Form.Item>

      {/*球隊描述*/}
      <Form.Item
        label="團隊描述"
        tooltip={{ title: "提示文字", icon: <InfoCircleOutlined /> }}
      >
        <TextArea rows={4} onChange={(e) => handleDesInput(e)} />
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
          {props.selectedTeamType}
        </Dropdown.Button>
      </Form.Item>

      {/*成立日期*/}
      <Form.Item
        label="成立日期"
        tooltip={{ title: "提示文字", icon: <InfoCircleOutlined /> }}
      >
        <Input.Group compact>
          <DatePicker onChange={(dateString) => handleDateInput(dateString)} />
        </Input.Group>
      </Form.Item>
    </Form>
  );
}

function Invite() {
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

function CreateTeam(props) {
  const [name, setTeamName] = useState("");
  const [des, setTeamDes] = useState("");
  const [selectedTeamType, setSelectedTeamType] = useState("---");
  const [startDate, setStartDate] = useState();
  const { Step } = Steps;

  // some constant
  const totalStep = 3;

  // text dict
  const titleText = {
    0: "Fill in Basic Info",
    1: "Invite People",
    2: "Create!",
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

  const [addTeam] = useMutation(CREATE_TEAM);
  const handleSubmit = async () => {
    await addTeam({
      variables: {
        teamName: name,
        teamDescription: des,
        // teamCreateTime: startDate,
        teamType: selectedTeamType,
        creatorID: props.me,
      },
    });
    setTeamName("");
    setTeamDes("");
  };

  useEffect(() => {
    setTitle(titleText[currentStep]);
  }, [currentStep]);
  return (
    <>
      <Steps current={currentStep} onChange={handleClickStep}>
        <Step key="0" title="Step 1" description="Fill in Basic Info" />
        <Step key="1" title="Step 2" description="Invite People" />
        <Step key="2" title="Step 3" description="Create!" />
      </Steps>

      <Divider />

      {currentStep === 0 ? (
        <TeamForm
          setTeamName={setTeamName}
          setTeamDes={setTeamDes}
          selectedTeamType={selectedTeamType}
          setSelectedTeamType={setSelectedTeamType}
          setStartDate={setStartDate}
        />
      ) : (
        []
      )}
      {currentStep === 1 ? <Invite /> : []}
      {currentStep === 2 ? [] : []}

      <div className="createTeamButtonDiv">
        <div className="createTeamButtonDiv">
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
        <div className="createTeamButtonDiv">
          {currentStep === totalStep - 1 ? (
            <Link to="/user/Team">
              <Button
                type="primary"
                size="large"
                style={{ background: "#16982B" }}
                onClick={handleSubmit}
              >
                Success!
              </Button>
            </Link>
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

const TeamCreate = () => {
  return (
    <div className="Wrapper">
      <Template content={<CreateTeam />} />
    </div>
  );
};

export default TeamCreate;
