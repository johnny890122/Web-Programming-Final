import React from "react";
import Template from "../components/Template";
import { useState, useEffect } from "react";
import { Steps, Divider, Input, Form, Menu, Dropdown } from "antd";
import { TextField, Button } from "@mui/material";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { Link } from "react-router-dom";
import "../App.css";
import { CREATE_TEAM, TEAM_INIT } from "../graphql";
import { useMutation } from "@apollo/client";

function TeamForm(props) {
  const { TextArea } = Input;

  const teamType = ["volleyball team"];

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
      <Form.Item label="Team Name" required>
        <Input value={props.name} onChange={(e) => handleNameInput(e)} />
      </Form.Item>

      {/*球隊描述*/}
      <Form.Item label="Team Description">
        <TextArea
          value={props.des}
          rows={4}
          onChange={(e) => handleDesInput(e)}
        />
      </Form.Item>

      {/*球隊類型*/}
      <Form.Item label="Team Type">
        <Dropdown.Button
          overlay={menu}
          placement="bottomCenter"
          icon={<UserOutlined />}
        >
          {props.selectedTeamType}
        </Dropdown.Button>
      </Form.Item>
    </Form>
  );
}

function Invite(props) {
  const handleAddBox = () => {
    let temp = JSON.parse(JSON.stringify(props.inputBoxes));
    temp.push(props.inputBoxes[props.inputBoxes.length - 1] + 1);
    props.setInputBoxes(temp);
  };
  const handleInput = (index, value) => {
    let temp = JSON.parse(JSON.stringify(props.inputs));
    temp[index] = value;
    props.setInputs(temp);
  };

  return (
    <>
      {props.inputBoxes.map((box, index) => (
        <TextField
          id="invite-account"
          value={props.inputs[index]}
          label={"Member Account " + box}
          size="small"
          style={{ margin: "0.5rem 1rem" }}
          onChange={(e) => handleInput(index, e.target.value)}
        />
      ))}
      <Form style={{ marginBottom: "2rem" }}>
        <AddCircleOutlineSharpIcon
          style={{
            color: "green",
            fontSize: "2rem",
            margin: "1rem",
            cursor: "pointer",
          }}
          onClick={handleAddBox}
        />
      </Form>
    </>
  );
}

function CreateTeam({ me }) {
  const [name, setTeamName] = useState("");
  const [des, setTeamDes] = useState("");
  const [selectedTeamType, setSelectedTeamType] = useState("---");
  const [startDate, setStartDate] = useState();
  const { Step } = Steps;
  const [inputBoxes, setInputBoxes] = useState([1]);
  const [inputs, setInputs] = useState([]);
  // const [alertDisplay, setAlertDisplay] = useState("none");

  // some constant
  const totalStep = 3;

  // text dict
  const titleText = {
    0: "Fill in Basic Info",
    1: "Add Some Members",
    2: "Create!",
  };

  // define stae here
  const [currentStep, setCurrentStep] = useState(0);
  const [stepText, setStepText] = useState("");
  const [title, setTitle] = useState("0");
  const [addTeam, { data, loading, error }] = useMutation(CREATE_TEAM, {
    refetchQueries: [TEAM_INIT, "initTeam"],
  });
  if (error) console.log(error.message);

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

  const handleSubmit = async () => {
    try {
      await addTeam({
        variables: {
          teamName: name,
          teamDescription: des,
          teamType: selectedTeamType,
          creatorID: me,
          memberAccount: inputs,
        },
      });

      setTeamName("");
      setTeamDes("");
      setInputBoxes([1]);
      setInputs();
    } catch (e) {}
  };

  useEffect(() => {
    setTitle(titleText[currentStep]);
  }, [currentStep]);
  return (
    <div style={{ width: "80%", marginLeft: "2rem" }}>
      <Steps current={currentStep} onChange={handleClickStep}>
        <Step key="0" title="Step 1" description="Fill in Basic Info" />
        <Step key="1" title="Step 2" description="Add Some Members" />
        <Step key="2" title="Step 3" description="Create!" />
      </Steps>

      <Divider />
      <div className="content" style={{ marginLeft: "1rem" }}>
        {currentStep === 0 ? (
          <TeamForm
            name={name}
            setTeamName={setTeamName}
            des={des}
            setTeamDes={setTeamDes}
            selectedTeamType={selectedTeamType}
            setSelectedTeamType={setSelectedTeamType}
            setStartDate={setStartDate}
          />
        ) : (
          []
        )}
        {currentStep === 1 ? (
          <Invite
            inputBoxes={inputBoxes}
            setInputBoxes={setInputBoxes}
            inputs={inputs}
            setInputs={setInputs}
          />
        ) : (
          []
        )}
        {currentStep === 2 ? [] : []}

        <div className="createTeamButtonDiv">
          <div className="createTeamButtonDiv">
            {currentStep === 0 ? (
              []
            ) : (
              <Button
                color="primary"
                variant="outlined"
                icon={<LeftCircleOutlined />}
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
                  color="success"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Create!
                </Button>
              </Link>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                icon={<RightCircleOutlined />}
                onClick={handleNext}
              >
                {" "}
                Next{" "}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const TeamCreate = ({ me }) => {
  return (
    <div className="Wrapper">
      <Template content={<CreateTeam me={me} />} />
    </div>
  );
};

export default TeamCreate;
