import { useState, useEffect } from 'react';
import { Steps, Divider, Typography, Input, Button, Tooltip } from 'antd';
import { CopyOutlined, RightCircleOutlined } from '@ant-design/icons';
import TeamForm from './CreateTeamForm';
import Invite from './CreateTeamInvite';


function CreateTeam () {
	const { Title } = Typography;
	const { Step } = Steps;

	// some constant
	const totalStep = 4;

	// text dict
	const titleText = {
		0 : "填寫基本資訊", 
		1 : "Invite People",
		2 : "Customize your page",
		3 : "Create", 
	}

	// define stae here
	const [currentStep, setCurrentStep] = useState(0);
	const [stepText, setStepText] = useState("");
	const [title, setTitle] = useState("0");

	const handleNext = () => {
		currentStep < totalStep-1 ? setCurrentStep(currentStep + 1) : setCurrentStep(currentStep);
	}

	useEffect(
		() => {
			setTitle(titleText[currentStep])
		}, [currentStep]
	);

    return (
      <>
      	<Title>{title}</Title>

      	{currentStep === 0 ? <TeamForm / > : []}
      	{currentStep === 1 ? <Invite / > : []}
      	{currentStep === 2 ? <Title>Something</Title> : [] }
      	{currentStep === 3 ? <Title>Something</Title> : [] }

        <Steps current={currentStep}>
          <Step title="Step 1" description="填寫基本資訊" />
          <Step title="Step 2" description="Invite people" />
          <Step title="Step 3" description="Customize your page" />
          <Step title="Step 4" description="建立" />
        </Steps>

        <Button 
        	type="primary" 
        	icon={<RightCircleOutlined />} 
        	size="large"
        	onClick={handleNext}
        	>
        	Next
        </Button>

      </>
    );
}

export default CreateTeam;