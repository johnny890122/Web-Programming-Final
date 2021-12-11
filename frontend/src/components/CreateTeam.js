import { useState, useEffect } from 'react';
import { Steps, Divider, Typography, Input, Button, Tooltip } from 'antd';
import { CopyOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import TeamForm from './CreateTeamForm';
import Invite from './CreateTeamInvite';
import Template from './Template';
import styled from 'styled-components';
import "../App.css";


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

	const handleBack = () =>{
		currentStep > 0 ? setCurrentStep(currentStep - 1) : setCurrentStep(currentStep);
	}

	const handleClickStep = (e) => {
		setCurrentStep(e);
		console.log(e);
	}

	const buttonDiv = styled.div`display: flex; justify-content: space-between;`
	const allButtonDiv = styled.div`display: flex; justify-content: space-between;`

	useEffect(
		() => {
			setTitle(titleText[currentStep])
		}, [currentStep]
	);
		const createTeam = (
			<>
				<Steps current={currentStep} onChange={handleClickStep}>
	          <Step key={0} title="Step 1" description="填寫基本資訊" />
	          <Step key="1" title="Step 2" description="邀請成員" />
	          <Step key="2" title="Step 3" description="客製化頁面" />
	          <Step key="3" title="Step 4" description="建立團隊" />
	      </Steps>

	      <Divider / >

	    	{currentStep === 0 ? <TeamForm / > : []}
	    	{currentStep === 1 ? <Invite / > : []}
	    	{currentStep === 2 ? [] : [] }
	    	{currentStep === 3 ? [] : [] }

	    	<div class="createTeamButtonDiv">
	    		<div class="createTeamButtonDiv">
			    	{ 
			    		currentStep === 0 ? [] :
			    		<Button type="primary" icon={<LeftCircleOutlined />} size="large" onClick={handleBack} >
			      		Back
			      	</Button> 
			      }   			
	    		</div>
	    		<div class="createTeamButtonDiv">
			    	{
			    		currentStep === totalStep-1 ? [] :
			        <Button type="primary" icon={<RightCircleOutlined />} size="large"onClick={handleNext} >
			        	Next
			        </Button>
			    	} 
		    	</div>	
	    	</div>
      </>
		)
    return (
        <div className="Wrapper createTeam">
      			<Template content={createTeam} />
    		</div>
    );
}

export default CreateTeam;